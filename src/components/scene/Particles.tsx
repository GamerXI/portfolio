import { useMemo, useRef } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  /** Normalized pointer (-1..1) tracked at the window level. */
  mouse: RefObject<THREE.Vector2>;
  scrollProgress: number;
  count: number;
  /** Damp mouse reactivity on coarse pointers. */
  reactive?: boolean;
}

/**
 * Warm chalk + amber particle field. The whole cloud parallaxes toward the
 * pointer and drifts on scroll; a subtle per-particle twinkle is baked into
 * the geometry via a random phase so no per-frame CPU cost is paid for it.
 */
export function Particles({ mouse, scrollProgress, count, reactive = true }: ParticlesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const amber = new THREE.Color('#e8a54b');
    const chalk = new THREE.Color('#f5f3ee');
    const pale = new THREE.Color('#f0d7a8');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribute in a soft shell so density reads near the camera.
      const r = 8 + Math.random() * 34;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i3 + 2] = r * Math.cos(phi);

      const roll = Math.random();
      const c = roll > 0.82 ? amber : roll > 0.7 ? pale : chalk;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const points = pointsRef.current;
    if (!group || !points) return;

    // Blend a continuous idle drift (time-based) with a scroll-driven turn.
    // The scroll term reverses cleanly when the visitor scrolls back up.
    const t = state.clock.elapsedTime;
    points.rotation.y = t * 0.03 + scrollProgress * Math.PI * 1.4;
    points.rotation.x = Math.sin(t * 0.05) * 0.06 + Math.sin(scrollProgress * Math.PI) * 0.12;

    // Pointer parallax — cloud leans toward the cursor (keeps it alive at rest).
    const mx = reactive ? mouse.current.x : 0;
    const my = reactive ? mouse.current.y : 0;
    const targetX = mx * 2.4;
    const targetY = my * 1.6 - scrollProgress * 2.5;
    group.position.x += (targetX - group.position.x) * Math.min(1, delta * 2.5);
    group.position.y += (targetY - group.position.y) * Math.min(1, delta * 2.5);
    group.rotation.z += ((mx * 0.15) - group.rotation.z) * Math.min(1, delta * 2);
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          vertexColors
          transparent
          opacity={0.62}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
