import { useRef, useState, useEffect, useMemo } from 'react';
import { motion as m, useSpring, useMotionValue } from "motion/react";
import { Canvas, useFrame } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';

import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import * as THREE from 'three';

const GLOBE_RADIUS = 2;
const LAT_STEPS = 60;
const LON_STEPS = 120;
const HIGHLIGHT_COLOR = '#D4EC28';
const ENERGISA_LIGHT_KEY = '#FFFFFF';
const ENERGISA_LIGHT_FILL = '#FFFFFF';
const ENERGISA_LIGHT_RIM = '#FFFFFF';
const ENERGISA_LIGHT_SOFT = '#FFFFFF';

export interface TileData {
  matrix: THREE.Matrix4;
  latDeg: number;
  lonDeg: number;
}

function buildTileMatrices(image: HTMLImageElement): TileData[] {
  const offscreen = document.createElement('canvas');
  offscreen.width = image.width;
  offscreen.height = image.height;
  const ctx = offscreen.getContext('2d')!;
  ctx.drawImage(image, 0, 0);
  let { data } = ctx.getImageData(0, 0, offscreen.width, offscreen.height);

  const w = offscreen.width;
  const h = offscreen.height;
  const fixedData = new Uint8ClampedArray(data);
  
  // Aggressive blur pass to remove all vertical division lines
  for (let pass = 0; pass < 3; pass++) {
    const tempData = new Uint8ClampedArray(fixedData);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        let r = 0, g = 0, b = 0, count = 0;
        
        // Average with neighbors
        for (let dx = -2; dx <= 2; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const nx = (x + dx + w) % w;
            const ny = Math.max(0, Math.min(h - 1, y + dy));
            const nidx = (ny * w + nx) * 4;
            r += tempData[nidx];
            g += tempData[nidx + 1];
            b += tempData[nidx + 2];
            count++;
          }
        }
        fixedData[idx] = Math.round(r / count);
        fixedData[idx + 1] = Math.round(g / count);
        fixedData[idx + 2] = Math.round(b / count);
      }
    }
  }
  
  // Additional horizontal seam fix for Russia region (lon 180)
  for (let y = 0; y < h; y++) {
    const idxLeft = (y * w + w - 1) * 4;
    const idxRight = (y * w) * 4;
    const blendR = (fixedData[idxLeft] + fixedData[idxRight]) / 2;
    const blendG = (fixedData[idxLeft + 1] + fixedData[idxRight + 1]) / 2;
    const blendB = (fixedData[idxLeft + 2] + fixedData[idxRight + 2]) / 2;
    fixedData[idxLeft] = Math.round(blendR);
    fixedData[idxLeft + 1] = Math.round(blendG);
    fixedData[idxLeft + 2] = Math.round(blendB);
    fixedData[idxRight] = Math.round(blendR);
    fixedData[idxRight + 1] = Math.round(blendG);
    fixedData[idxRight + 2] = Math.round(blendB);
  }
  
  ctx.putImageData(new ImageData(fixedData, w, h), 0, 0);
  const finalData = ctx.getImageData(0, 0, w, h);

  const dummy = new THREE.Object3D();
  const tiles: TileData[] = [];
  const latStep = Math.PI / LAT_STEPS;
  const lonStep = (2 * Math.PI) / LON_STEPS;

  const tileH = GLOBE_RADIUS * latStep * 0.9;
  const tileW = GLOBE_RADIUS * lonStep * 0.9;

  for (let row = 0; row < LAT_STEPS; row++) {
    const lat = Math.PI / 2 - (row + 0.5) * latStep;
    const v = (row + 0.5) / LAT_STEPS;
    for (let col = 0; col < LON_STEPS; col++) {
      const lon = -Math.PI + (col + 0.5) * lonStep;
      const u = (col + 0.5) / LON_STEPS;

      const px = Math.min(Math.floor(u * w), w - 1);
      const py = Math.min(Math.floor(v * h), h - 1);
      const idx = (py * w + px) * 4;

      const brightness = (finalData.data[idx] + finalData.data[idx + 1] + finalData.data[idx + 2]) / 3;
      if (brightness > 100) continue;

      const x = GLOBE_RADIUS * Math.cos(lat) * Math.sin(lon);
      const y = GLOBE_RADIUS * Math.sin(lat);
      const z = GLOBE_RADIUS * Math.cos(lat) * Math.cos(lon);

      dummy.position.set(x, y, z);
      dummy.lookAt(0, 0, 0);
      dummy.scale.set(tileW, tileH, 0.15);
      dummy.updateMatrix();

      tiles.push({
        matrix: dummy.matrix.clone(),
        latDeg: lat * (180 / Math.PI),
        lonDeg: lon * (180 / Math.PI)
      });
    }
  }
  return tiles;
}

// --- Region helpers ---
const REGION_CENTERS: Record<string, { lat: number; lon: number }> = {
  mg: { lat: -18.5, lon: -44.5 },
  br: { lat: -14.0, lon: -51.0 },
  sa: { lat: -15.0, lon: -60.0 },
};

function isInRegion(lat: number, lon: number, region: string): boolean {
  if (region === 'mg') {
    // Base bounding box: landlocked interior of Minas Gerais
    if (!(lat >= -22.9 && lat <= -14.2 && lon >= -51.0 && lon <= -43.5)) return false;
    // Trim bottom-right corner: southern rows don't extend as far east
    if (lat < -19.0 && lon > -46.5) return false;
    return true;
  }
  if (region === 'br') {
    let ok = lat < 6 && lat > -35 && lon > -75 && lon < -33;
    if (lat < -22 && lon < -58) ok = false;
    if (lat < -10 && lon < -65) ok = false;
    if (lat > -2 && lon < -70) ok = false;
    return ok;
  }
  if (region === 'sa') return lat < 14 && lat > -57 && lon > -83 && lon < -33;
  return false;
}

// No elevation â€” highlighted tiles stay at their original position, only color changes

function GlobeMesh({ tiles, targetPhi, targetTheta, highlightRegion, groupRef }: {
  tiles: TileData[];
  targetPhi: number;
  targetTheta: number;
  highlightRegion?: string;
  groupRef: React.RefObject<THREE.Group | null>;
}) {
  const glassMeshRef = useRef<THREE.InstancedMesh>(null);
  const solidMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  // Shared geometry for both meshes
  const roundedGeom = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 4, 0.15), []);

  // Pre-compute per-tile data â€” single base matrix (no elevation, no scale change on highlight)
  const tileInfo = useMemo(() => tiles.map((t) => {
    const m = t.matrix;
    const e = m.elements;
    dummy.position.setFromMatrixPosition(m);
    dummy.rotation.setFromRotationMatrix(new THREE.Matrix4().set(
      e[0], e[4], e[8], 0,
      e[1], e[5], e[9], 0,
      e[2], e[6], e[10], 0,
      0, 0, 0, 1
    ).transpose());
    const sx = new THREE.Vector3(e[0], e[1], e[2]).length();
    const sy = new THREE.Vector3(e[4], e[5], e[6]).length();
    const sz = new THREE.Vector3(e[8], e[9], e[10]).length();

    dummy.scale.set(sx * 0.2, sy * 0.2, sz * 0.2);
    dummy.updateMatrix();
    const baseMatrix = dummy.matrix.clone();

    return { baseMatrix, latDeg: t.latDeg, lonDeg: t.lonDeg };
  }), [tiles, dummy]);

  const hideMatrix = useMemo(() => new THREE.Matrix4().makeScale(0, 0, 0), []);

  // Initialize glass mesh (base dots â€” always visible when not highlighted)
  useEffect(() => {
    const mesh = glassMeshRef.current;
    if (!mesh) return;
    tileInfo.forEach((t, i) => mesh.setMatrixAt(i, t.baseMatrix));
    mesh.instanceMatrix.needsUpdate = true;
  }, [tileInfo]);

  // Initialize solid mesh (highlighted dots â€” hidden initially)
  useEffect(() => {
    const mesh = solidMeshRef.current;
    if (!mesh) return;
    const hide = new THREE.Matrix4().makeScale(0, 0, 0);
    for (let i = 0; i < tileInfo.length; i++) mesh.setMatrixAt(i, hide);
    mesh.instanceMatrix.needsUpdate = true;
  }, [tileInfo]);

  // --- Wave transition state ---
  const transitionRef = useRef({
    progress: 1,
    isShrinking: false,
    prevRegion: highlightRegion,
  });

  const currentStatesRef = useRef<Float32Array | null>(null);
  const targetStatesRef = useRef<Float32Array | null>(null);

  // Initialize tile states once tileInfo is ready
  useEffect(() => {
    if (tileInfo.length === 0) return;
    if (currentStatesRef.current) return;

    const solidMesh = solidMeshRef.current;
    const glassMesh = glassMeshRef.current;

    currentStatesRef.current = new Float32Array(tileInfo.length);
    targetStatesRef.current = new Float32Array(tileInfo.length);
    for (let i = 0; i < tileInfo.length; i++) {
      const active = highlightRegion ? isInRegion(tileInfo[i].latDeg, tileInfo[i].lonDeg, highlightRegion) : false;
      currentStatesRef.current[i] = active ? 1 : 0;
      targetStatesRef.current[i] = active ? 1 : 0;

      if (solidMesh && glassMesh) {
        solidMesh.setMatrixAt(i, active ? tileInfo[i].baseMatrix : hideMatrix);
        glassMesh.setMatrixAt(i, active ? hideMatrix : tileInfo[i].baseMatrix);
      }
    }

    if (solidMesh) solidMesh.instanceMatrix.needsUpdate = true;
    if (glassMesh) glassMesh.instanceMatrix.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileInfo]);

  // Per-transition wave distances
  const tileTransitionDists = useRef<Float32Array>(new Float32Array(0));

  // When region changes, setup the wave transition
  useEffect(() => {
    if (transitionRef.current.prevRegion === highlightRegion) return;

    const curr = currentStatesRef.current;
    const target = targetStatesRef.current;
    if (!curr || !target) return;

    let currentActiveCount = 0;
    let targetActiveCount = 0;

    for (let i = 0; i < tileInfo.length; i++) {
      const isTarget = highlightRegion ? isInRegion(tileInfo[i].latDeg, tileInfo[i].lonDeg, highlightRegion) : false;
      target[i] = isTarget ? 1 : 0;
      if (curr[i]) currentActiveCount++;
      if (target[i]) targetActiveCount++;
    }

    const isShrinking = targetActiveCount < currentActiveCount;

    const waveRegion = highlightRegion ?? transitionRef.current.prevRegion;
    const regionCenter = waveRegion ? REGION_CENTERS[waveRegion] : undefined;
    const center = regionCenter ?? { lat: -15, lon: -50 };

    const dists = new Float32Array(tileInfo.length);
    let minDist = Infinity;
    let maxDist = 0;

    for (let i = 0; i < tileInfo.length; i++) {
      if (curr[i] !== target[i]) {
        const d = Math.hypot(tileInfo[i].latDeg - center.lat, tileInfo[i].lonDeg - center.lon);
        dists[i] = d;
        if (d < minDist) minDist = d;
        if (d > maxDist) maxDist = d;
      }
    }

    const normalized = new Float32Array(tileInfo.length);
    const range = (maxDist - minDist) || 1;
    for (let i = 0; i < tileInfo.length; i++) {
      normalized[i] = curr[i] !== target[i] ? (dists[i] - minDist) / range : 0;
    }
    tileTransitionDists.current = normalized;

    transitionRef.current = { progress: 0, isShrinking, prevRegion: highlightRegion };
  }, [highlightRegion, tileInfo]);

  const highlightColor = useMemo(() => new THREE.Color(HIGHLIGHT_COLOR), []);
  const whiteColor = useMemo(() => new THREE.Color('#ffffff'), []);

  // Animation loop
  const isTransitioningRef = useRef(false);
  const waveTimeRef = useRef(0);
  const floatTimeRef = useRef(0);
  const tileRandomPhaseRef = useRef<Float32Array>(new Float32Array(0));

  // Smooth spring rotation
  const thetaMV = useMotionValue(targetTheta);
  const phiMV = useMotionValue(targetPhi);
  const thetaSpring = useSpring(thetaMV, { stiffness: 45, damping: 14, restDelta: 0.001 });
  const phiSpring = useSpring(phiMV, { stiffness: 45, damping: 14, restDelta: 0.001 });

  useEffect(() => {
    thetaMV.set(targetTheta);
    phiMV.set(targetPhi);
  }, [targetTheta, targetPhi, thetaMV, phiMV]);

  useFrame((_, delta) => {
    floatTimeRef.current += delta;
    const floatX = Math.sin(floatTimeRef.current * 0.4) * 0.0165;
    const floatY = Math.cos(floatTimeRef.current * 0.3) * 0.022;

    if (groupRef.current) {
      groupRef.current.rotation.x = thetaSpring.get() + floatX;
      groupRef.current.rotation.y = phiSpring.get() + floatY;
    }

    const solidMesh = solidMeshRef.current;
    const glassMesh = glassMeshRef.current;
    const curr = currentStatesRef.current;
    const target = targetStatesRef.current;
    if (!solidMesh || !glassMesh || !curr || !target) return;
    const tState = transitionRef.current;
    waveTimeRef.current += delta * 1.25;

    if (tileRandomPhaseRef.current.length !== tileInfo.length) {
      const phases = new Float32Array(tileInfo.length);
      for (let i = 0; i < tileInfo.length; i++) phases[i] = Math.random() * Math.PI * 2;
      tileRandomPhaseRef.current = phases;
    }

    // Wave transition â€” swap glass â†” solid as wave front passes each tile
    if (tState.progress < 1) {
      isTransitioningRef.current = true;
      tState.progress = Math.min(1, tState.progress + delta * 2.0);

      for (let i = 0; i < tileInfo.length; i++) {
        const distNorm = tileTransitionDists.current[i] ?? 0;
        const threshold = tState.isShrinking ? (1 - distNorm) : distNorm;
        if (tState.progress > threshold) curr[i] = target[i];

        const shouldShow = curr[i] === 1;
        solidMesh.setMatrixAt(i, shouldShow ? tileInfo[i].baseMatrix : hideMatrix);
        glassMesh.setMatrixAt(i, shouldShow ? hideMatrix : tileInfo[i].baseMatrix);
      }

      solidMesh.instanceMatrix.needsUpdate = true;
      glassMesh.instanceMatrix.needsUpdate = true;
    } else if (isTransitioningRef.current) {
      isTransitioningRef.current = false;
    }

    // Pulse animation on highlighted dots â€” color lerp yellow â†’ white, no geometry change
    const phases = tileRandomPhaseRef.current;
    let hasHighlight = false;
    if (!solidMesh.instanceColor) {
      solidMesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(tileInfo.length * 3), 3);
    }
    for (let i = 0; i < tileInfo.length; i++) {
      if (curr[i] === 1) {
        hasHighlight = true;
        const phase = phases[i] ?? 0;
        const pulse = (Math.sin(waveTimeRef.current + phase) + 1) * 0.5;
        solidMesh.setColorAt(i, tempColor.copy(highlightColor).lerp(whiteColor, pulse * 0.6));
      }
    }

    if (hasHighlight && solidMesh.instanceColor) solidMesh.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      {/* Base dots â€” gray, shown when tile is NOT highlighted */}
      <instancedMesh
        ref={glassMeshRef}
        args={[undefined, undefined, tileInfo.length]}
        onPointerMove={(e: { stopPropagation: () => void }) => e.stopPropagation()}
        renderOrder={1}
      >
        <primitive object={roundedGeom} attach="geometry" />
        <meshPhysicalMaterial
          transparent
          depthWrite={false}
          color="#262626"
          roughness={0.1}
          metalness={0.2}
          side={THREE.FrontSide}
        />
      </instancedMesh>

      {/* Highlight dots â€” same geometry/size, only color+emissive differs */}
      <instancedMesh
        ref={solidMeshRef}
        args={[undefined, undefined, tileInfo.length]}
        renderOrder={2}
      >
        <primitive object={roundedGeom} attach="geometry" />
        <meshPhysicalMaterial
          vertexColors
          color={HIGHLIGHT_COLOR}
          emissive={HIGHLIGHT_COLOR}
          emissiveIntensity={2.8}
          transparent
          opacity={0.9}
          roughness={0.05}
          metalness={0.1}
          side={THREE.FrontSide}
        />
      </instancedMesh>

    </group>
  );
}



interface VoxelGlobeProps {
  targetPhi?: number;
  targetTheta?: number;
  highlightRegion?: string;
  className?: string;
}

export function VoxelGlobe({ targetPhi = 1.0, targetTheta = -0.24, highlightRegion, className = '' }: VoxelGlobeProps) {
  const [tiles, setTiles] = useState<TileData[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const groupRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);
  const rootRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.15);
      },
      {
        threshold: [0, 0.15, 0.35],
      },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = 'https://unpkg.com/three-globe/example/img/earth-water.png';

    const timeout = setTimeout(() => {
      if (!tiles) generateFallback();
    }, 5000);

    const generateFallback = () => {
      const fallbackTiles: TileData[] = [];
      const dummy = new THREE.Object3D();
      for (let i = 0; i < 2000; i++) {
        const y = 1 - (i / 1999) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = (Math.PI * (3 - Math.sqrt(5))) * i;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;

        // Approximate lat/lon for fallback
        const latDeg = Math.asin(y) * (180 / Math.PI);
        const lonDeg = Math.atan2(x, z) * (180 / Math.PI);

        dummy.position.set(x * GLOBE_RADIUS, y * GLOBE_RADIUS, z * GLOBE_RADIUS);
        dummy.lookAt(0, 0, 0);
        dummy.scale.set(0.05, 0.05, 0.05);
        dummy.updateMatrix();
        fallbackTiles.push({
          matrix: dummy.matrix.clone(),
          latDeg,
          lonDeg
        });
      }
      setTiles(fallbackTiles);
    };

    img.onload = () => {
      clearTimeout(timeout);
      try {
        const generatedTiles = buildTileMatrices(img);
        if (generatedTiles.length > 50) {
          setTiles(generatedTiles);
        } else {
          generateFallback();
        }
      } catch (e) {
        console.error("VoxelGlobe Error:", e);
        generateFallback();
      }
    };
    img.onerror = () => {
      clearTimeout(timeout);
      generateFallback();
    };
  }, []);

  // Smooth camera reset
  useEffect(() => {
    if (controlsRef.current) {
      // setLookAt(posX, posY, posZ, targetX, targetY, targetZ, enableTransition)
      controlsRef.current.setLookAt(0, 0, 8, 0, 0, 0, true);
    }
  }, [highlightRegion]);

  return (
    <div
      ref={rootRef}
      className={`relative select-none ${className}`}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
    >
      {tiles === null && (
        <div className="absolute inset-0 flex items-center justify-center text-sm" style={{ color: 'rgba(246,248,237,0.3)', fontFamily: 'Sora, sans-serif' }}>
          Carregando globo...
        </div>
      )}
      {tiles !== null && (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 1.5]}
          frameloop={isInView ? 'always' : 'never'}
          gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
          onCreated={({ gl }) => gl.setClearColor('#121312', 1)}
        >
          {/* Primary Lighting Setup */}
          <ambientLight intensity={0.6} />

          {/* Key light pulled left so it stops grazing the seam from the front */}
          <directionalLight position={[4.35, 5, 4.59]} intensity={1.2} color={ENERGISA_LIGHT_KEY} />

          {/* Fill Light (Side/Neutral) */}
          <directionalLight position={[-3.69, 2, 3.93]} intensity={0.8} color={ENERGISA_LIGHT_FILL} />

          {/* Rim Light moved to the front */}
          <pointLight position={[-4.23, 0, 9.06]} intensity={2.0} color={ENERGISA_LIGHT_RIM} />

          {/* New Accents for coverage */}
          <pointLight position={[-2.42, -5, 6.64]} intensity={0.8} color={ENERGISA_LIGHT_SOFT} />
          <pointLight position={[7.13, -1, 1.09]} intensity={0.6} color={ENERGISA_LIGHT_FILL} />
          <pointLight position={[-4.23, 10, 9.06]} intensity={1.2} color={ENERGISA_LIGHT_RIM} />
          <pointLight position={[5.5, -4.5, 4.5]} intensity={0.75} color={ENERGISA_LIGHT_SOFT} />

          {/* Top/Bottom Accents */}
          <pointLight position={[0, 10, 0]} intensity={0.8} />
          <pointLight position={[0, -10, 0]} intensity={0.5} />

          {/* Former back lighting moved to the front and front rim sent behind */}
          <pointLight position={[-6.16, 3, 3.75]} intensity={1.1} color={ENERGISA_LIGHT_KEY} />
          <directionalLight position={[-6.22, 4, 1.51]} intensity={0.85} color={ENERGISA_LIGHT_SOFT} />
          <directionalLight position={[-3.93, -1, 3.69]} intensity={0.65} color={ENERGISA_LIGHT_FILL} />

          {tiles.length > 0 && (
            <GlobeMesh
              groupRef={groupRef}
              tiles={tiles}
              targetPhi={targetPhi}
              targetTheta={targetTheta}
              highlightRegion={highlightRegion}
            />
          )}
          <CameraControls
            ref={controlsRef}
            minDistance={8}
            maxDistance={8}
            dollyToCursor={false}
            mouseButtons={{
              left: 1, // ACTION.ROTATE
              middle: 0,
              right: 0,
              wheel: 0,
            }}
            touches={{
              one: 32, // ACTION.TOUCH_ROTATE
              two: 0,
              three: 0,
            }}
          />

          <EffectComposer>
            <Bloom
              intensity={0.6}
              luminanceThreshold={0.65}
              luminanceSmoothing={0.85}
              kernelSize={KernelSize.MEDIUM}
            />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
}
