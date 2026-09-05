import { useRef } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface CrystalFormProps {
  mouse: RefObject<THREE.Vector2>;
  scrollProgress: number;
  /** Use the expensive transmission material (desktop only). */
  glass?: boolean;
  reactive?: boolean;
}

/**
 * The amber crystal that anchors the hero. A faceted form using a glass
 * transmission material on capable devices (a cheaper physical material
 * otherwise). It hovers and slowly turns, then dissolves as the visitor
 * scrolls past the hero into the story.
 */
export function CrystalForm({ mouse, scrollProgress, glass = true, reactive = true }: CrystalFormProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    if (!group || !mesh) return;

    // Present in the hero, dissolves over the first ~22% of the scroll.
    const intensity = THREE.MathUtils.clamp(1 - scrollProgress / 0.22, 0, 1);
    group.visible = intensity > 0.01;
    group.scale.setScalar(0.6 + intensity * 0.9);

    const mat = mesh.material as THREE.Material & { opacity: number };
    mat.transparent = true;
    mat.opacity = intensity;

    const t = state.clock.elapsedTime;
    mesh.rotation.y = t * 0.18;
    mesh.rotation.x = Math.sin(t * 0.3) * 0.15;

    const mx = reactive ? mouse.current.x : 0;
    const my = reactive ? mouse.current.y : 0;
    const targetX = 3.2 + mx * 0.6;
    const targetY = 0.4 + my * 0.6;
    group.position.x += (targetX - group.position.x) * Math.min(1, delta * 2);
    group.position.y += (targetY - group.position.y) * Math.min(1, delta * 2);
  });

  return (
    <group ref={groupRef} position={[3.2, 0.4, 0]}>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.6, 0]} />
          {glass ? (
            <MeshTransmissionMaterial
              samples={6}
              resolution={256}
              thickness={1.4}
              roughness={0.08}
              ior={1.5}
              chromaticAberration={0.04}
              distortion={0.25}
              distortionScale={0.4}
              temporalDistortion={0.1}
              color="#e8a54b"
              attenuationColor="#c4842f"
              attenuationDistance={2.4}
              background={new THREE.Color('#0c0a09')}
            />
          ) : (
            <meshPhysicalMaterial
              color="#e8a54b"
              emissive="#c4842f"
              emissiveIntensity={0.35}
              metalness={0.1}
              roughness={0.15}
              transmission={0.6}
              thickness={1.2}
              ior={1.4}
              flatShading
            />
          )}
        </mesh>
      </Float>
    </group>
  );
}
