import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { useMotionValue, useSpring } from "motion/react";
import { Canvas, useFrame } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import * as THREE from 'three';

const GLOBE_RADIUS = 2;
const LAT_STEPS = 60;
const LON_STEPS = 120;
const FALLBACK_TILE_COUNT = 2000;
const HIGHLIGHT_COLOR = '#D4EC28';
const GLOBE_IMAGE_URL = 'https://unpkg.com/three-globe/example/img/earth-water.png';

const ENERGISA_LIGHT_KEY = '#FFFFFF';
const ENERGISA_LIGHT_FILL = '#FFFFFF';
const ENERGISA_LIGHT_RIM = '#FFFFFF';
const ENERGISA_LIGHT_SOFT = '#FFFFFF';

let tileDataPromise: Promise<TileData[]> | null = null;

export interface TileData {
  matrix: THREE.Matrix4;
  latDeg: number;
  lonDeg: number;
}

function buildFallbackTiles() {
  const fallbackTiles: TileData[] = [];
  const dummy = new THREE.Object3D();

  for (let i = 0; i < FALLBACK_TILE_COUNT; i++) {
    const y = 1 - (i / (FALLBACK_TILE_COUNT - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = (Math.PI * (3 - Math.sqrt(5))) * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    const latDeg = Math.asin(y) * (180 / Math.PI);
    const lonDeg = Math.atan2(x, z) * (180 / Math.PI);

    dummy.position.set(x * GLOBE_RADIUS, y * GLOBE_RADIUS, z * GLOBE_RADIUS);
    dummy.lookAt(0, 0, 0);
    dummy.scale.set(0.05, 0.05, 0.05);
    dummy.updateMatrix();

    fallbackTiles.push({
      matrix: dummy.matrix.clone(),
      latDeg,
      lonDeg,
    });
  }

  return fallbackTiles;
}

function buildTileMatrices(image: HTMLImageElement): TileData[] {
  const offscreen = document.createElement('canvas');
  offscreen.width = image.width;
  offscreen.height = image.height;

  const ctx = offscreen.getContext('2d');
  if (!ctx) return buildFallbackTiles();

  ctx.drawImage(image, 0, 0);
  const { data } = ctx.getImageData(0, 0, offscreen.width, offscreen.height);

  const width = offscreen.width;
  const height = offscreen.height;
  const fixedData = new Uint8ClampedArray(data);

  for (let pass = 0; pass < 3; pass++) {
    const tempData = new Uint8ClampedArray(fixedData);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        let r = 0;
        let g = 0;
        let b = 0;
        let count = 0;

        for (let dx = -2; dx <= 2; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const nextX = (x + dx + width) % width;
            const nextY = Math.max(0, Math.min(height - 1, y + dy));
            const nextIdx = (nextY * width + nextX) * 4;

            r += tempData[nextIdx];
            g += tempData[nextIdx + 1];
            b += tempData[nextIdx + 2];
            count++;
          }
        }

        fixedData[idx] = Math.round(r / count);
        fixedData[idx + 1] = Math.round(g / count);
        fixedData[idx + 2] = Math.round(b / count);
      }
    }
  }

  for (let y = 0; y < height; y++) {
    const leftIdx = (y * width + width - 1) * 4;
    const rightIdx = (y * width) * 4;
    const blendR = (fixedData[leftIdx] + fixedData[rightIdx]) / 2;
    const blendG = (fixedData[leftIdx + 1] + fixedData[rightIdx + 1]) / 2;
    const blendB = (fixedData[leftIdx + 2] + fixedData[rightIdx + 2]) / 2;

    fixedData[leftIdx] = Math.round(blendR);
    fixedData[leftIdx + 1] = Math.round(blendG);
    fixedData[leftIdx + 2] = Math.round(blendB);
    fixedData[rightIdx] = Math.round(blendR);
    fixedData[rightIdx + 1] = Math.round(blendG);
    fixedData[rightIdx + 2] = Math.round(blendB);
  }

  const dummy = new THREE.Object3D();
  const tiles: TileData[] = [];
  const latStep = Math.PI / LAT_STEPS;
  const lonStep = (2 * Math.PI) / LON_STEPS;
  const tileHeight = GLOBE_RADIUS * latStep * 0.9;
  const tileWidth = GLOBE_RADIUS * lonStep * 0.9;

  for (let row = 0; row < LAT_STEPS; row++) {
    const lat = Math.PI / 2 - (row + 0.5) * latStep;
    const v = (row + 0.5) / LAT_STEPS;

    for (let col = 0; col < LON_STEPS; col++) {
      const lon = -Math.PI + (col + 0.5) * lonStep;
      const u = (col + 0.5) / LON_STEPS;

      const px = Math.min(Math.floor(u * width), width - 1);
      const py = Math.min(Math.floor(v * height), height - 1);
      const idx = (py * width + px) * 4;
      const brightness = (fixedData[idx] + fixedData[idx + 1] + fixedData[idx + 2]) / 3;

      if (brightness > 100) continue;

      const x = GLOBE_RADIUS * Math.cos(lat) * Math.sin(lon);
      const y = GLOBE_RADIUS * Math.sin(lat);
      const z = GLOBE_RADIUS * Math.cos(lat) * Math.cos(lon);

      dummy.position.set(x, y, z);
      dummy.lookAt(0, 0, 0);
      dummy.scale.set(tileWidth, tileHeight, 0.15);
      dummy.updateMatrix();

      tiles.push({
        matrix: dummy.matrix.clone(),
        latDeg: lat * (180 / Math.PI),
        lonDeg: lon * (180 / Math.PI),
      });
    }
  }

  return tiles;
}

function loadTileData() {
  if (tileDataPromise) return tileDataPromise;

  tileDataPromise = new Promise<TileData[]>((resolve) => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';

    const resolveFallback = () => resolve(buildFallbackTiles());
    const timeout = window.setTimeout(resolveFallback, 5000);

    image.onload = () => {
      window.clearTimeout(timeout);

      try {
        const generatedTiles = buildTileMatrices(image);
        resolve(generatedTiles.length > 50 ? generatedTiles : buildFallbackTiles());
      } catch (error) {
        console.error("VoxelGlobe Error:", error);
        resolveFallback();
      }
    };

    image.onerror = () => {
      window.clearTimeout(timeout);
      resolveFallback();
    };

    image.src = GLOBE_IMAGE_URL;
  });

  return tileDataPromise;
}

const REGION_CENTERS: Record<string, { lat: number; lon: number }> = {
  mg: { lat: -18.5, lon: -44.5 },
  br: { lat: -14.0, lon: -51.0 },
  sa: { lat: -15.0, lon: -60.0 },
};

function isInRegion(lat: number, lon: number, region: string) {
  if (region === 'mg') {
    if (!(lat >= -22.9 && lat <= -14.2 && lon >= -51.0 && lon <= -43.5)) return false;
    if (lat < -19.0 && lon > -46.5) return false;
    return true;
  }

  if (region === 'br') {
    let inside = lat < 6 && lat > -35 && lon > -75 && lon < -33;
    if (lat < -22 && lon < -58) inside = false;
    if (lat < -10 && lon < -65) inside = false;
    if (lat > -2 && lon < -70) inside = false;
    return inside;
  }

  if (region === 'sa') return lat < 14 && lat > -57 && lon > -83 && lon < -33;
  return false;
}

function GlobeMesh({
  tiles,
  targetPhi,
  targetTheta,
  highlightRegion,
  groupRef,
}: {
  tiles: TileData[];
  targetPhi: number;
  targetTheta: number;
  highlightRegion?: string;
  groupRef: RefObject<THREE.Group | null>;
}) {
  const glassMeshRef = useRef<THREE.InstancedMesh>(null);
  const solidMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);
  const roundedGeometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 4, 0.15), []);
  const hiddenMatrix = useMemo(() => new THREE.Matrix4().makeScale(0, 0, 0), []);
  const highlightColor = useMemo(() => new THREE.Color(HIGHLIGHT_COLOR), []);
  const whiteColor = useMemo(() => new THREE.Color('#ffffff'), []);

  const tileInfo = useMemo(
    () =>
      tiles.map((tile) => {
        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        const scale = new THREE.Vector3();

        tile.matrix.decompose(position, quaternion, scale);
        dummy.position.copy(position);
        dummy.quaternion.copy(quaternion);
        dummy.scale.set(scale.x * 0.2, scale.y * 0.2, scale.z * 0.2);
        dummy.updateMatrix();

        return {
          baseMatrix: dummy.matrix.clone(),
          latDeg: tile.latDeg,
          lonDeg: tile.lonDeg,
        };
      }),
    [tiles, dummy],
  );

  const transitionRef = useRef({
    progress: 1,
    isShrinking: false,
    prevRegion: highlightRegion,
  });
  const currentStatesRef = useRef<Float32Array | null>(null);
  const targetStatesRef = useRef<Float32Array | null>(null);
  const highlightedIndicesRef = useRef<number[]>([]);
  const tileTransitionDists = useRef<Float32Array>(new Float32Array(0));
  const waveTimeRef = useRef(0);
  const floatTimeRef = useRef(0);
  const tileRandomPhaseRef = useRef<Float32Array>(new Float32Array(0));

  useEffect(() => {
    const glassMesh = glassMeshRef.current;
    if (!glassMesh) return;

    for (let i = 0; i < tileInfo.length; i++) {
      glassMesh.setMatrixAt(i, tileInfo[i].baseMatrix);
    }

    glassMesh.instanceMatrix.needsUpdate = true;
  }, [tileInfo]);

  useEffect(() => {
    const solidMesh = solidMeshRef.current;
    if (!solidMesh) return;

    for (let i = 0; i < tileInfo.length; i++) {
      solidMesh.setMatrixAt(i, hiddenMatrix);
    }

    solidMesh.instanceMatrix.needsUpdate = true;
  }, [hiddenMatrix, tileInfo]);

  useEffect(() => {
    if (tileInfo.length === 0 || currentStatesRef.current) return;

    const solidMesh = solidMeshRef.current;
    const glassMesh = glassMeshRef.current;
    const currentStates = new Float32Array(tileInfo.length);
    const targetStates = new Float32Array(tileInfo.length);
    const highlightedIndices: number[] = [];

    for (let i = 0; i < tileInfo.length; i++) {
      const active = highlightRegion ? isInRegion(tileInfo[i].latDeg, tileInfo[i].lonDeg, highlightRegion) : false;
      const state = active ? 1 : 0;
      currentStates[i] = state;
      targetStates[i] = state;

      if (active) highlightedIndices.push(i);

      if (solidMesh && glassMesh) {
        solidMesh.setMatrixAt(i, active ? tileInfo[i].baseMatrix : hiddenMatrix);
        glassMesh.setMatrixAt(i, active ? hiddenMatrix : tileInfo[i].baseMatrix);
      }
    }

    currentStatesRef.current = currentStates;
    targetStatesRef.current = targetStates;
    highlightedIndicesRef.current = highlightedIndices;

    if (solidMesh) solidMesh.instanceMatrix.needsUpdate = true;
    if (glassMesh) glassMesh.instanceMatrix.needsUpdate = true;
  }, [hiddenMatrix, highlightRegion, tileInfo]);

  useEffect(() => {
    if (transitionRef.current.prevRegion === highlightRegion) return;

    const currentStates = currentStatesRef.current;
    const targetStates = targetStatesRef.current;
    if (!currentStates || !targetStates) return;

    let currentActiveCount = 0;
    let targetActiveCount = 0;

    for (let i = 0; i < tileInfo.length; i++) {
      const isTarget = highlightRegion ? isInRegion(tileInfo[i].latDeg, tileInfo[i].lonDeg, highlightRegion) : false;
      targetStates[i] = isTarget ? 1 : 0;
      if (currentStates[i]) currentActiveCount++;
      if (targetStates[i]) targetActiveCount++;
    }

    const isShrinking = targetActiveCount < currentActiveCount;
    const waveRegion = highlightRegion ?? transitionRef.current.prevRegion;
    const regionCenter = waveRegion ? REGION_CENTERS[waveRegion] : undefined;
    const center = regionCenter ?? { lat: -15, lon: -50 };
    const distances = new Float32Array(tileInfo.length);
    let minDist = Infinity;
    let maxDist = 0;

    for (let i = 0; i < tileInfo.length; i++) {
      if (currentStates[i] !== targetStates[i]) {
        const distance = Math.hypot(tileInfo[i].latDeg - center.lat, tileInfo[i].lonDeg - center.lon);
        distances[i] = distance;
        if (distance < minDist) minDist = distance;
        if (distance > maxDist) maxDist = distance;
      }
    }

    const normalized = new Float32Array(tileInfo.length);
    const range = maxDist - minDist || 1;

    for (let i = 0; i < tileInfo.length; i++) {
      normalized[i] = currentStates[i] !== targetStates[i] ? (distances[i] - minDist) / range : 0;
    }

    tileTransitionDists.current = normalized;
    transitionRef.current = {
      progress: 0,
      isShrinking,
      prevRegion: highlightRegion,
    };
  }, [highlightRegion, tileInfo]);

  useEffect(() => {
    const phases = new Float32Array(tileInfo.length);
    for (let i = 0; i < tileInfo.length; i++) {
      phases[i] = Math.random() * Math.PI * 2;
    }
    tileRandomPhaseRef.current = phases;
  }, [tileInfo]);

  useEffect(() => {
    const solidMesh = solidMeshRef.current;
    if (!solidMesh) return;

    solidMesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(tileInfo.length * 3), 3);
  }, [tileInfo.length]);

  const thetaMotionValue = useMotionValue(targetTheta);
  const phiMotionValue = useMotionValue(targetPhi);
  const thetaSpring = useSpring(thetaMotionValue, { stiffness: 45, damping: 14, restDelta: 0.001 });
  const phiSpring = useSpring(phiMotionValue, { stiffness: 45, damping: 14, restDelta: 0.001 });

  useEffect(() => {
    thetaMotionValue.set(targetTheta);
    phiMotionValue.set(targetPhi);
  }, [phiMotionValue, targetPhi, targetTheta, thetaMotionValue]);

  useFrame((_, delta) => {
    floatTimeRef.current += delta;
    waveTimeRef.current += delta * 1.25;

    if (groupRef.current) {
      groupRef.current.rotation.x = thetaSpring.get() + Math.sin(floatTimeRef.current * 0.4) * 0.0165;
      groupRef.current.rotation.y = phiSpring.get() + Math.cos(floatTimeRef.current * 0.3) * 0.022;
    }

    const solidMesh = solidMeshRef.current;
    const glassMesh = glassMeshRef.current;
    const currentStates = currentStatesRef.current;
    const targetStates = targetStatesRef.current;
    if (!solidMesh || !glassMesh || !currentStates || !targetStates) return;

    const transition = transitionRef.current;
    if (transition.progress < 1) {
      transition.progress = Math.min(1, transition.progress + delta * 2.0);
      const highlightedIndices: number[] = [];

      for (let i = 0; i < tileInfo.length; i++) {
        const distNorm = tileTransitionDists.current[i] ?? 0;
        const threshold = transition.isShrinking ? 1 - distNorm : distNorm;

        if (transition.progress > threshold) {
          currentStates[i] = targetStates[i];
        }

        const shouldShow = currentStates[i] === 1;
        if (shouldShow) highlightedIndices.push(i);

        solidMesh.setMatrixAt(i, shouldShow ? tileInfo[i].baseMatrix : hiddenMatrix);
        glassMesh.setMatrixAt(i, shouldShow ? hiddenMatrix : tileInfo[i].baseMatrix);
      }

      highlightedIndicesRef.current = highlightedIndices;
      solidMesh.instanceMatrix.needsUpdate = true;
      glassMesh.instanceMatrix.needsUpdate = true;
    }

    const highlightedIndices = highlightedIndicesRef.current;
    const phases = tileRandomPhaseRef.current;

    for (let i = 0; i < highlightedIndices.length; i++) {
      const index = highlightedIndices[i];
      const pulse = (Math.sin(waveTimeRef.current + (phases[index] ?? 0)) + 1) * 0.5;
      solidMesh.setColorAt(index, tempColor.copy(highlightColor).lerp(whiteColor, pulse * 0.6));
    }

    if (highlightedIndices.length > 0 && solidMesh.instanceColor) {
      solidMesh.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={glassMeshRef}
        args={[undefined, undefined, tileInfo.length]}
        onPointerMove={(event: { stopPropagation: () => void }) => event.stopPropagation()}
        renderOrder={1}
      >
        <primitive object={roundedGeometry} attach="geometry" />
        <meshPhysicalMaterial
          transparent
          depthWrite={false}
          color="#262626"
          roughness={0.1}
          metalness={0.2}
          side={THREE.FrontSide}
        />
      </instancedMesh>

      <instancedMesh
        ref={solidMeshRef}
        args={[undefined, undefined, tileInfo.length]}
        renderOrder={2}
      >
        <primitive object={roundedGeometry} attach="geometry" />
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

export function VoxelGlobe({
  targetPhi = 1.0,
  targetTheta = -0.24,
  highlightRegion,
  className = '',
}: VoxelGlobeProps) {
  const [tiles, setTiles] = useState<TileData[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const groupRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<CameraControls | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.15);
      },
      { threshold: [0, 0.15, 0.35] },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isMounted = true;

    loadTileData().then((nextTiles) => {
      if (isMounted) setTiles(nextTiles);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    controlsRef.current?.setLookAt(0, 0, 8, 0, 0, 0, true);
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
        <div
          className="absolute inset-0 flex items-center justify-center text-sm"
          style={{ color: 'rgba(246,248,237,0.3)', fontFamily: 'Sora, sans-serif' }}
        >
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
          <ambientLight intensity={0.6} />
          <directionalLight position={[4.35, 5, 4.59]} intensity={1.2} color={ENERGISA_LIGHT_KEY} />
          <directionalLight position={[-3.69, 2, 3.93]} intensity={0.8} color={ENERGISA_LIGHT_FILL} />
          <pointLight position={[-4.23, 0, 9.06]} intensity={2.0} color={ENERGISA_LIGHT_RIM} />
          <pointLight position={[-2.42, -5, 6.64]} intensity={0.8} color={ENERGISA_LIGHT_SOFT} />
          <pointLight position={[7.13, -1, 1.09]} intensity={0.6} color={ENERGISA_LIGHT_FILL} />
          <pointLight position={[-4.23, 10, 9.06]} intensity={1.2} color={ENERGISA_LIGHT_RIM} />
          <pointLight position={[5.5, -4.5, 4.5]} intensity={0.75} color={ENERGISA_LIGHT_SOFT} />
          <pointLight position={[0, 10, 0]} intensity={0.8} />
          <pointLight position={[0, -10, 0]} intensity={0.5} />
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
              left: 1,
              middle: 0,
              right: 0,
              wheel: 0,
            }}
            touches={{
              one: 32,
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
