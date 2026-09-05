import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 2000;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;
      
      const isCyan = Math.random() > 0.3;
      colors[i3] = isCyan ? 0 : 1;
      colors[i3 + 1] = isCyan ? 1 : 0;
      colors[i3 + 2] = 1;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingOrb({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function GridFloor() {
  return (
    <gridHelper
      args={[100, 50, '#00ffff', '#1a1a2e']}
      position={[0, -10, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  
  useFrame(() => {
    const targetZ = 15 - scrollProgress * 10;
    const targetY = 2 + Math.sin(scrollProgress * Math.PI) * 3;
    const targetX = Math.sin(scrollProgress * Math.PI * 2) * 2;
    
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.position.z += (targetZ - camera.position.z) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

interface Scene3DProps {
  scrollProgress: number;
}

export function Scene3D({ scrollProgress }: Scene3DProps) {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return (
      <div className="scene-fallback">
        <div className="fallback-gradient" />
      </div>
    );
  }

  return (
    <div className="scene-container">
      <Canvas
        camera={{ position: [0, 2, 15], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={['#000000', 10, 50]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff00ff" />
          
          <CameraController scrollProgress={scrollProgress} />
          <ParticleField />
          <Stars radius={100} depth={50} count={3000} factor={4} fade speed={0.5} />
          <GridFloor />
          
          <FloatingOrb position={[-5, 2, -10]} color="#00ffff" scale={1.5} />
          <FloatingOrb position={[6, -1, -8]} color="#ff00ff" scale={1} />
          <FloatingOrb position={[0, 5, -15]} color="#00ff88" scale={0.8} />
        </Suspense>
      </Canvas>
    </div>
  );
}
