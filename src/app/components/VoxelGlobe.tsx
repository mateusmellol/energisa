import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
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

function GlobeMesh({ tiles, targetPhi, targetTheta, targetScale, highlightRegion }: {
  tiles: TileData[];
  targetPhi: number;
  targetTheta: number;
  targetScale: number;
  highlightRegion?: string;
}) {
  const glassMeshRef  = useRef<THREE.InstancedMesh>(null);
  const solidMeshRef  = useRef<THREE.InstancedMesh>(null);
  const groupRef      = useRef<THREE.Group>(null);

  // Animation state
  const spreadRef    = useRef(0);   // 0 → 1 fill progress
  const prevRegion   = useRef<string | undefined>(undefined);
  const dummy        = useMemo(() => new THREE.Object3D(), []);
  const tempColor    = useMemo(() => new THREE.Color(), []);

  // Geometry
  const roundedGeom = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 4, 0.15), []);

  // Pre-compute per-tile data that doesn't change
  const tileInfo = useMemo(() => tiles.map((t) => {
    // Extract the position from the tile's matrix
    const pos = new THREE.Vector3();
    pos.setFromMatrixPosition(t.matrix);
    const dir = pos.clone().normalize(); // outward normal direction

    // Elevated matrix = push pos by ELEVATION units along dir
    const elevatedPos = pos.clone().add(dir.clone().multiplyScalar(ELEVATION));
    dummy.position.copy(elevatedPos);
    // Inherit the rotation from the original matrix (lookAt center)
    const m = t.matrix;
    const e = m.elements;
    dummy.rotation.setFromRotationMatrix(new THREE.Matrix4().set(
      e[0], e[4], e[8],  0,
      e[1], e[5], e[9],  0,
      e[2], e[6], e[10], 0,
      0,    0,    0,     1
    ).transpose());
    // Keep original scale from matrix
    const sx = new THREE.Vector3(e[0], e[1], e[2]).length();
    const sy = new THREE.Vector3(e[4], e[5], e[6]).length();
    const sz = new THREE.Vector3(e[8], e[9], e[10]).length();
    dummy.scale.set(sx, sy, sz);
    dummy.updateMatrix();

    return {
      baseMatrix: t.matrix,
      elevMatrix: dummy.matrix.clone(),
      latDeg: t.latDeg,
      lonDeg: t.lonDeg,
    };
  }), [tiles, dummy]);

  // Initialize glass mesh matrices + colors
  useEffect(() => {
    const mesh = glassMeshRef.current;
    if (!mesh) return;
    tileInfo.forEach((t, i) => mesh.setMatrixAt(i, t.baseMatrix));
    mesh.instanceMatrix.needsUpdate = true;
    if (!mesh.instanceColor) {
      mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(tileInfo.length * 3), 3);
    }
    tileInfo.forEach((_, i) => mesh.setColorAt(i, tempColor.set('#cccccc')));
    mesh.instanceColor.needsUpdate = true;
  }, [tileInfo, tempColor]);

  // Initialize solid mesh (starts empty)
  useEffect(() => {
    const mesh = solidMeshRef.current;
    if (!mesh) return;
    // Start with all tiles hidden (scale 0)
    const hide = new THREE.Matrix4().makeScale(0, 0, 0);
    for (let i = 0; i < tileInfo.length; i++) mesh.setMatrixAt(i, hide);
    mesh.instanceMatrix.needsUpdate = true;
    if (!mesh.instanceColor) {
      mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(tileInfo.length * 3), 3);
    }
    for (let i = 0; i < tileInfo.length; i++) mesh.setColorAt(i, tempColor.set(HIGHLIGHT_COLOR));
    mesh.instanceColor.needsUpdate = true;
  }, [tileInfo, tempColor]);

  // Pre-compute distances from region center for spread animation
  const highlightDists = useMemo(() => {
    if (!highlightRegion) return null;
    const center = REGION_CENTERS[highlightRegion];
    if (!center) return null;
    return tileInfo.map((t) => ({
      dist: isInRegion(t.latDeg, t.lonDeg, highlightRegion)
        ? Math.hypot(t.latDeg - center.lat, t.lonDeg - center.lon)
        : Infinity, // not in region
    }));
  }, [highlightRegion, tileInfo]);

  // Spread max distance (used to normalize animation progress)
  const maxDist = useMemo(() => {
    if (!highlightDists) return 1;
    return Math.max(...highlightDists.map((d) => (isFinite(d.dist) ? d.dist : 0))) || 1;
  }, [highlightDists]);

  // Reset animation when region changes
  useEffect(() => {
    if (prevRegion.current !== highlightRegion) {
      spreadRef.current = 0;
      prevRegion.current = highlightRegion;
    }
  }, [highlightRegion]);

  const hideMatrix = useMemo(() => new THREE.Matrix4().makeScale(0, 0, 0), []);

  // Animation loop – drive the spread effect
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
      groupRef.current.rotation.x += (targetTheta - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetPhi - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.y += delta * 0.1;
    }

    const solidMesh = solidMeshRef.current;
    const glassMesh = glassMeshRef.current;
    if (!solidMesh || !glassMesh || !highlightDists) return;

    // Advance spread — fast: fills in ~0.5s
    spreadRef.current = Math.min(1, spreadRef.current + delta * 2.2);
    const threshold = spreadRef.current * maxDist;

    for (let i = 0; i < tileInfo.length; i++) {
      const d = highlightDists[i].dist;
      const shouldShow = isFinite(d) && d <= threshold;

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
      {/* Base glass globe — always visible */}
      <instancedMesh
        ref={glassMeshRef}
        args={[undefined, undefined, tileInfo.length]}
        onPointerMove={(e) => e.stopPropagation()}
      >
        <primitive object={roundedGeom} attach="geometry" />
        <meshPhysicalMaterial
          transparent
          transmission={0.95}
          opacity={0.8}
          roughness={0.1}
          metalness={0.1}
          ior={1.45}
          thickness={1.0}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          iridescence={1.0}
          iridescenceIOR={1.25}
          iridescenceThicknessRange={[100, 350]}
          side={THREE.DoubleSide}
        />
      </instancedMesh>

      {/* Solid elevated highlight mesh — animated spread */}
      <instancedMesh
        ref={solidMeshRef}
        args={[undefined, undefined, tileInfo.length]}
      >
        <primitive object={roundedGeom} attach="geometry" />
        {/* Opaque, vibrant, non-transparent material for highlights */}
        <meshStandardMaterial
          color={HIGHLIGHT_COLOR}
          roughness={0.25}
          metalness={0.3}
          emissive={HIGHLIGHT_COLOR}
          emissiveIntensity={0.4}
        />
      </instancedMesh>
    </group>
  );
}

interface VoxelGlobeProps {
  targetPhi?: number;
  targetTheta?: number;
  targetScale?: number;
  highlightRegion?: string;
  className?: string;
}

export function VoxelGlobe({ targetPhi = -0.77, targetTheta = 0.31, targetScale = 1.0, highlightRegion, className = '' }: VoxelGlobeProps) {
  const [tiles, setTiles] = useState<TileData[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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
      className={`relative aspect-square select-none ${className}`}
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
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          
          <Environment files="/holographic-env.jpg" />
          <directionalLight position={[10, 10, 5]} intensity={1.0} />
          
          {tiles.length > 0 && (
            <GlobeMesh 
              tiles={tiles} 
              targetPhi={targetPhi} 
              targetTheta={targetTheta} 
              targetScale={targetScale} 
              highlightRegion={highlightRegion}
            />
          )}
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
        </Canvas>
      )}
    </div>
  );
}
