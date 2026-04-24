import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const GLOBE_RADIUS = 2;
const BOX_SIZE = 0.05;
const SAMPLES = 8000;

function createVoxelPositions(image: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(image, 0, 0);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  const positions: THREE.Vector3[] = [];
  
  // Fibonacci sphere algorithm
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  for (let i = 0; i < SAMPLES; i++) {
    const y = 1 - (i / (SAMPLES - 1)) * 2; // y goes from 1 to -1
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    // Convert to lat/lon
    // y = sin(lat) -> lat = asin(y)
    // x = cos(lat)*cos(lon) -> lon = atan2(z, x)
    const lat = Math.asin(y);
    const lon = Math.atan2(z, x);

    // Map to UV (equirectangular projection)
    const u = 0.5 + lon / (2 * Math.PI);
    const v = 0.5 - lat / Math.PI;

    // Map to image pixel
    const px = Math.floor(u * canvas.width);
    const py = Math.floor(v * canvas.height);
    const index = (py * canvas.width + px) * 4;
    
    // Check if pixel is land (using the earth bump map where land is lighter)
    const red = data[index];
    if (red > 20) {
      positions.push(new THREE.Vector3(x, y, z).multiplyScalar(GLOBE_RADIUS));
    }
  }

  return positions;
}

function VoxelGlobeGroup({ positions, targetPhi, targetTheta, targetScale }: { positions: THREE.Vector3[], targetPhi: number, targetTheta: number, targetScale: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorObj = useMemo(() => new THREE.Color(), []);

  // Update instance matrices once
  useEffect(() => {
    if (!meshRef.current) return;
    positions.forEach((pos, i) => {
      dummy.position.copy(pos);
      dummy.lookAt(0, 0, 0); // Orient box facing out
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current) return;
    
    // Smooth lerp for scale and rotation based on Timeline tabs
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    
    // Three.js and Cobe mapping differences:
    // Cobe phi matches Y rotation. Cobe theta matches X rotation.
    // We add a continuous slow rotation on Y
    groupRef.current.rotation.x += (targetTheta - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetPhi - groupRef.current.rotation.y) * 0.05;
    
    // Auto rotation base
    groupRef.current.rotation.y += delta * 0.1;

    // Update colors based on hover
    // This is intensive to do every frame, but fine for ~2000 instances
    for (let i = 0; i < positions.length; i++) {
      if (i === hoveredIdx) {
        colorObj.set('#EAFE1F'); // Highlight color
      } else {
        colorObj.set('#fdfdfc'); // Glass base
      }
      meshRef.current.setColorAt(i, colorObj);
    }
    meshRef.current.instanceColor!.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh 
        ref={meshRef} 
        args={[undefined, undefined, positions.length]}
        onPointerMove={(e) => {
          e.stopPropagation();
          setHoveredIdx(e.instanceId ?? null);
        }}
        onPointerOut={() => setHoveredIdx(null)}
      >
        <boxGeometry args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]} />
        <meshPhysicalMaterial 
          transmission={0.95}
          opacity={1}
          metalness={0.1}
          roughness={0.05}
          ior={1.5}
          thickness={0.5}
          clearcoat={1}
        />
      </instancedMesh>
    </group>
  );
}

interface GlobeCdnProps {
  targetPhi?: number
  targetTheta?: number
  targetScale?: number
  className?: string
}

export function VoxelGlobe({
  targetPhi = -0.77,
  targetTheta = 0.31,
  targetScale = 1.0,
  className = "",
}: GlobeCdnProps) {
  const [positions, setPositions] = useState<THREE.Vector3[] | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    // Use a very reliable and CORS-friendly source (unpkg)
    img.src = 'https://unpkg.com/three-globe/example/img/earth-dark.jpg'; 
    
    const timeout = setTimeout(() => {
      if (!positions) {
        console.warn("VoxelGlobe: Loading timeout, using fallback grid.");
        generateFallback();
      }
    }, 5000);

    const generateFallback = () => {
      const fallbackPositions = [];
      for (let i = 0; i < 2000; i++) {
        const y = 1 - (i / 1999) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = (Math.PI * (3 - Math.sqrt(5))) * i;
        fallbackPositions.push(new THREE.Vector3(
          Math.cos(theta) * radius,
          y,
          Math.sin(theta) * radius
        ).multiplyScalar(GLOBE_RADIUS));
      }
      setPositions(fallbackPositions);
      clearTimeout(timeout);
    };

    img.onload = () => {
      try {
        const pos = createVoxelPositions(img);
        if (pos.length > 0) {
          setPositions(pos);
          clearTimeout(timeout);
        } else {
          generateFallback();
        }
      } catch (e) {
        console.error("VoxelGlobe Error:", e);
        generateFallback();
      }
    };

    img.onerror = () => {
      console.error("VoxelGlobe: Image load failed.");
      generateFallback();
    };
  }, []);

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      {!positions && (
        <div className="absolute inset-0 flex items-center justify-center font-sans text-sm text-neutral-400">
          Iniciando Glass Voxel Globe...
        </div>
      )}
      {positions && (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Environment preset="city" />
          
          <VoxelGlobeGroup 
            positions={positions} 
            targetPhi={targetPhi} 
            targetTheta={targetTheta} 
            targetScale={targetScale} 
          />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate={false} 
            rotateSpeed={0.5}
          />
        </Canvas>
      )}
    </div>
  );
}
