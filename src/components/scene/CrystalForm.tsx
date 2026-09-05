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
 * The amber crystal that anchors the hero. A faceted jewel wrapped in a glass
 * transmission material (a cheaper physical material on low-power devices),
 * with a bright amber core that Bloom lifts into a glow. It hovers and slowly
 * turns, then dissolves as the visitor scrolls past the hero.
 */
export function CrystalForm({ mouse, scrollProgress, glass = true, reactive = true }: CrystalFormProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    const core = coreRef.current;
    if (!group || !mesh) return;

    // Present in the hero, dissolves over the first ~22% of the scroll.
    const intensity = THREE.MathUtils.clamp(1 - scrollProgress / 0.22, 0, 1);
    group.visible = intensity > 0.01;
    group.scale.setScalar(0.6 + intensity * 0.9);

    const mat = mesh.material as THREE.Material & { opacity: number };
    mat.transparent = true;
    mat.opacity = intensity;

    const t = state.clock.elapsedTime;
    // Blend a continuous idle turn (time-based) with a scroll-driven spin —
    // the jewel keeps turning at rest and accelerates through the hero, and
    // the scroll term unwinds when scrolling back up.
    mesh.rotation.y = t * 0.12 + scrollProgress * Math.PI * 8;
    mesh.rotation.x = Math.sin(t * 0.3) * 0.1 + Math.sin(scrollProgress * Math.PI * 5) * 0.2;

    // Glow pulse is a lighting cue, kept on a gentle timer.
    const pulse = 0.62 + Math.sin(t * 1.6) * 0.14;
    if (core) {
      const coreMat = core.material as THREE.Material & { opacity: number };
      coreMat.transparent = true;
      coreMat.opacity = intensity * pulse;
      core.rotation.y = -t * 0.1 - scrollProgress * Math.PI * 6;
      core.rotation.x = Math.cos(t * 0.25) * 0.15 + Math.cos(scrollProgress * Math.PI * 4) * 0.2;
    }
    if (lightRef.current) lightRef.current.intensity = intensity * (5 + pulse * 3);

    const mx = reactive ? mouse.current.x : 0;
    const my = reactive ? mouse.current.y : 0;
    const targetX = 3.2 + mx * 0.6;
    const targetY = 0.4 + my * 0.6;
    group.position.x += (targetX - group.position.x) * Math.min(1, delta * 2);
    group.position.y += (targetY - group.position.y) * Math.min(1, delta * 2);
  });

  return (
    <group ref={groupRef} position={[3.2, 0.4, 0]}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.7}>
        {/* Bright amber heart — pushed above 1.0 and untonemapped so Bloom
            turns it into a glow. */}
        <mesh ref={coreRef} scale={0.55}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial
            color={[3.4, 2.0, 0.75]}
            toneMapped={false}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <pointLight ref={lightRef} color="#e8a54b" intensity={6} distance={10} decay={2} />
        {/* Faceted jewel shell. */}
        <mesh ref={meshRef}>
          <dodecahedronGeometry args={[1.6, 0]} />
          {glass ? (
            <MeshTransmissionMaterial
              samples={8}
              resolution={512}
              transmission={1}
              thickness={0.9}
              roughness={0.08}
              ior={1.6}
              chromaticAberration={0.14}
              distortion={0.2}
              distortionScale={0.4}
              temporalDistortion={0.08}
              backside
              backsideThickness={0.4}
              color="#f4c885"
              attenuationColor="#e8a54b"
              attenuationDistance={0.9}
              background={new THREE.Color('#2a1d0c')}
            />
          ) : (
            <meshPhysicalMaterial
              color="#e8a54b"
              emissive="#c4842f"
              emissiveIntensity={0.7}
              metalness={0.2}
              roughness={0.15}
              transmission={0.5}
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
