import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { KernelSize, BlendFunction } from 'postprocessing';

import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import * as THREE from 'three';

const GLOBE_RADIUS = 2;
const LAT_STEPS = 80;
const LON_STEPS = 160;
const GLASS_COLOR = '#cccccc';
const HIGHLIGHT_COLOR = '#D4EC28';
const HOVER_COLOR = '#ffffff';

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
  const { data } = ctx.getImageData(0, 0, offscreen.width, offscreen.height);

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

      const px = Math.min(Math.floor(u * offscreen.width), offscreen.width - 1);
      const py = Math.min(Math.floor(v * offscreen.height), offscreen.height - 1);
      const idx = (py * offscreen.width + px) * 4;

      const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
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

const ELEVATION = 0.18; // How many units highlighted tiles are raised

function GlobeMesh({ tiles, targetPhi, targetTheta, highlightRegion, groupRef, resetKey }: {
  tiles: TileData[];
  targetPhi: number;
  targetTheta: number;
  highlightRegion?: string;
  groupRef: React.RefObject<THREE.Group | null>;
  resetKey?: string;
}) {
  const glassMeshRef = useRef<THREE.InstancedMesh>(null);
  const solidMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  // Geometry
  const roundedGeom = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 4, 0.15), []);

  // Pre-compute per-tile data
  const tileInfo = useMemo(() => tiles.map((t) => {
    const pos = new THREE.Vector3();
    pos.setFromMatrixPosition(t.matrix);
    const dir = pos.clone().normalize();
    const elevatedPos = pos.clone().add(dir.clone().multiplyScalar(ELEVATION));
    dummy.position.copy(elevatedPos);
    const m = t.matrix;
    const e = m.elements;
    dummy.rotation.setFromRotationMatrix(new THREE.Matrix4().set(
      e[0], e[4], e[8], 0,
      e[1], e[5], e[9], 0,
      e[2], e[6], e[10], 0,
      0, 0, 0, 1
    ).transpose());
    const sx = new THREE.Vector3(e[0], e[1], e[2]).length();
    const sy = new THREE.Vector3(e[4], e[5], e[6]).length();
    const sz = new THREE.Vector3(e[8], e[9], e[10]).length();

    // Elevated state: slightly larger glowing dots for highlights
    dummy.scale.set(sx * 0.4, sy * 0.4, sz * 0.4);
    dummy.updateMatrix();
    const elevMatrix = dummy.matrix.clone();

    // Base state: tiny glowing dots (point-cloud aesthetic)
    dummy.scale.set(sx * 0.2, sy * 0.2, sz * 0.2);
    dummy.updateMatrix();
    const baseMatrix = dummy.matrix.clone();

    return { baseMatrix, elevMatrix, latDeg: t.latDeg, lonDeg: t.lonDeg };
  }), [tiles, dummy]);

  // Initialize glass mesh
  useEffect(() => {
    const mesh = glassMeshRef.current;
    if (!mesh) return;
    tileInfo.forEach((t, i) => mesh.setMatrixAt(i, t.baseMatrix));
    mesh.instanceMatrix.needsUpdate = true;
    if (!mesh.instanceColor) {
      mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(tileInfo.length * 3), 3);
    }
    tileInfo.forEach((_, i) => mesh.setColorAt(i, tempColor.set('#a3a3a3')));
    mesh.instanceColor.needsUpdate = true;
  }, [tileInfo, tempColor]);

  // Initialize solid mesh (hidden)
  useEffect(() => {
    const mesh = solidMeshRef.current;
    if (!mesh) return;
    const hide = new THREE.Matrix4().makeScale(0, 0, 0);
    for (let i = 0; i < tileInfo.length; i++) mesh.setMatrixAt(i, hide);
    mesh.instanceMatrix.needsUpdate = true;
    if (!mesh.instanceColor) {
      mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(tileInfo.length * 3), 3);
    }
    for (let i = 0; i < tileInfo.length; i++) mesh.setColorAt(i, tempColor.set(HIGHLIGHT_COLOR));
    mesh.instanceColor.needsUpdate = true;
  }, [tileInfo, tempColor]);

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
    currentStatesRef.current = new Float32Array(tileInfo.length);
    targetStatesRef.current = new Float32Array(tileInfo.length);
    for (let i = 0; i < tileInfo.length; i++) {
      const active = highlightRegion ? isInRegion(tileInfo[i].latDeg, tileInfo[i].lonDeg, highlightRegion) : false;
      currentStatesRef.current[i] = active ? 1 : 0;
      targetStatesRef.current[i] = active ? 1 : 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileInfo]);

  // Per-transition wave distances: computed fresh each time region changes
  // normalized within the tiles that are actually changing, so wave always
  // spreads evenly regardless of region size.
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

    // Use the destination region center as wave origin
    const waveRegion = highlightRegion ?? transitionRef.current.prevRegion;
    const regionCenter = waveRegion ? REGION_CENTERS[waveRegion] : undefined;
    const center = regionCenter ?? { lat: -15, lon: -50 };

    // Compute distances only for tiles that are changing, normalize within that set
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

    // Normalize 0→1 within the changing set, starting exactly at 0 for the first tile
    const normalized = new Float32Array(tileInfo.length);
    const range = (maxDist - minDist) || 1;
    for (let i = 0; i < tileInfo.length; i++) {
      if (curr[i] !== target[i]) {
        normalized[i] = (dists[i] - minDist) / range;
      } else {
        normalized[i] = 0;
      }
    }
    tileTransitionDists.current = normalized;

    transitionRef.current = {
      progress: 0,
      isShrinking,
      prevRegion: highlightRegion,
    };
  }, [highlightRegion, tileInfo]);

  const hideMatrix = useMemo(() => new THREE.Matrix4().makeScale(0, 0, 0), []);

  // Animation loop
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += (targetTheta - groupRef.current.rotation.x) * 0.12;
      groupRef.current.rotation.y += (targetPhi - groupRef.current.rotation.y) * 0.12;
      groupRef.current.rotation.y += delta * 0.08;
    }

    const solidMesh = solidMeshRef.current;
    const glassMesh = glassMeshRef.current;
    const curr = currentStatesRef.current;
    const target = targetStatesRef.current;
    if (!solidMesh || !glassMesh || !curr || !target) return;

    const tState = transitionRef.current;

    // Advance wave — fast (~0.5s total)
    if (tState.progress < 1) {
      tState.progress = Math.min(1, tState.progress + delta * 2.0);
    }

    for (let i = 0; i < tileInfo.length; i++) {
      // If expanding: wave radiates outward from center (distNorm 0→1)
      // If shrinking: wave collapses inward from edges (1-distNorm)
      const distNorm = tileTransitionDists.current[i] ?? 0;
      const threshold = tState.isShrinking ? (1 - distNorm) : distNorm;

      // Flip tile as soon as progress passes the threshold
      if (tState.progress > threshold) {
        curr[i] = target[i];
      }

      const shouldShow = curr[i] === 1;

      // Layer 2 (solid): show elevated tile when active
      solidMesh.setMatrixAt(i, shouldShow ? tileInfo[i].elevMatrix : hideMatrix);
      // Layer 1 (glass): hide tile when it's active in layer 2 to prevent overlap
      glassMesh.setMatrixAt(i, shouldShow ? hideMatrix : tileInfo[i].baseMatrix);
    }

    solidMesh.instanceMatrix.needsUpdate = true;
    glassMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      {/* Base glass globe — hollow glass cubes with defined edges */}
      <instancedMesh
        ref={glassMeshRef}
        args={[undefined, undefined, tileInfo.length]}
        onPointerMove={(e: { stopPropagation: () => void }) => e.stopPropagation()}
        renderOrder={1}
      >
        <primitive object={roundedGeom} attach="geometry" />
        {/* Base globe — matrix of tiny semi-transparent glowing dots */}
        <meshPhysicalMaterial
          transparent
          depthWrite={false}
          transmission={0.7}
          opacity={0.8}
          color="#737373"
          emissive="#000000"
          emissiveIntensity={0.0}
          roughness={0.1}
          metalness={0.2}
          ior={1.45}
          thickness={0.5}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          envMapIntensity={0.5}
          side={THREE.FrontSide}
        />
      </instancedMesh>

      {/* Solid elevated highlight mesh — animated spread */}
      <instancedMesh
        ref={solidMeshRef}
        args={[undefined, undefined, tileInfo.length]}
        renderOrder={2}
      >
        <primitive object={roundedGeom} attach="geometry" />
        {/* Semi-transparent glass with yellow tint for highlights */}
        <meshPhysicalMaterial
          transparent
          depthWrite={false}
          transmission={0.2}
          opacity={1.0}
          color={HIGHLIGHT_COLOR}
          emissive={HIGHLIGHT_COLOR}
          emissiveIntensity={0.5}
          roughness={0.05}
          metalness={0.9}
          ior={1.6}
          thickness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={1.5}
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
  const groupRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);

  // Reset OrbitControls when targets change
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [targetPhi, targetTheta]);

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

  return (
    <div
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
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          {/* Primary Lighting Setup (3-Point) */}
          <ambientLight intensity={0.4} />
          
          {/* Key Light (Frontal/Yellowish) */}
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fffcf0" />
          
          {/* Fill Light (Side/Neutral) */}
          <directionalLight position={[-5, 2, 2]} intensity={0.5} color="#ffffff" />
          
          {/* Rim Light (Back/Blueish for depth) */}
          <pointLight position={[0, 0, -10]} intensity={1.5} color="#4040ff" />
          
          {/* Top/Bottom Accents */}
          <pointLight position={[0, 10, 0]} intensity={0.5} />
          <pointLight position={[0, -10, 0]} intensity={0.3} />

          {tiles.length > 0 && (
            <GlobeMesh
              groupRef={groupRef}
              tiles={tiles}
              targetPhi={targetPhi}
              targetTheta={targetTheta}
              highlightRegion={highlightRegion}
              resetKey={highlightRegion ?? 'default'}
            />
          )}
          <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            makeDefault
          />

          <EffectComposer>
            <Bloom
              intensity={0.3}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              kernelSize={KernelSize.SMALL}
              blendFunction={BlendFunction.ADD}
            />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
}
