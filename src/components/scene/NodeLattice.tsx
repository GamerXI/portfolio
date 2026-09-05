import { useMemo, useRef } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NodeLatticeProps {
  mouse: RefObject<THREE.Vector2>;
  scrollProgress: number;
  reactive?: boolean;
}

/** Range of scroll over which the lattice is visible (peaks at the Systems chapter). */
const CENTER = 0.42;
const SPREAD = 0.22;

/**
 * A structured node lattice — a grid of amber nodes wired to their nearest
 * neighbours. It fades in mid-scroll (around the Systems chapter) and out
 * again, reading as the "systems / architecture" beat of the story.
 */
export function NodeLattice({ mouse, scrollProgress, reactive = true }: NodeLatticeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeMatRef = useRef<THREE.PointsMaterial>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);

  const { nodePositions, edgePositions } = useMemo(() => {
    const cols = 6;
    const rows = 4;
    const depth = 4;
    const gap = 3.4;
    const jitter = 0.7;

    const grid: THREE.Vector3[] = [];
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        for (let z = 0; z < depth; z++) {
          grid.push(
            new THREE.Vector3(
              (x - (cols - 1) / 2) * gap + (Math.sin(x * 12.9 + y) * jitter),
              (y - (rows - 1) / 2) * gap + (Math.cos(y * 7.3 + z) * jitter),
              (z - (depth - 1) / 2) * gap + (Math.sin(z * 3.1 + x) * jitter)
            )
          );
        }
      }
    }

    const nodePositions = new Float32Array(grid.length * 3);
    grid.forEach((v, i) => {
      nodePositions[i * 3] = v.x;
      nodePositions[i * 3 + 1] = v.y;
      nodePositions[i * 3 + 2] = v.z;
    });

    // Wire nodes that sit within a threshold — nearest-neighbour edges only.
    const threshold = gap * 1.35;
    const edges: number[] = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = i + 1; j < grid.length; j++) {
        if (grid[i].distanceTo(grid[j]) <= threshold) {
          edges.push(
            grid[i].x, grid[i].y, grid[i].z,
            grid[j].x, grid[j].y, grid[j].z
          );
        }
      }
    }
    return { nodePositions, edgePositions: new Float32Array(edges) };
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Bell curve visibility around the Systems beat.
    const d = (scrollProgress - CENTER) / SPREAD;
    const intensity = Math.exp(-d * d);

    if (nodeMatRef.current) nodeMatRef.current.opacity = intensity * 0.9;
    if (lineMatRef.current) lineMatRef.current.opacity = intensity * 0.28;
    group.visible = intensity > 0.01;

    const scale = 0.85 + intensity * 0.2;
    group.scale.setScalar(scale);

    // Continuous idle spin blended with a scroll-driven turn (reverses on
    // scroll-up), plus pointer parallax with inertia.
    const t = state.clock.elapsedTime;
    const mx = reactive ? mouse.current.x : 0;
    const my = reactive ? mouse.current.y : 0;
    group.rotation.y = t * 0.05 + scrollProgress * Math.PI * 3 + mx * 0.35;
    group.rotation.x += ((Math.sin(t * 0.1) * 0.06 + my * 0.25) - group.rotation.x) * Math.min(1, delta * 2);
  });

  return (
    <group ref={groupRef} position={[0, 0, -4]} visible={false}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMatRef}
          color="#e8a54b"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={nodeMatRef}
          color="#f0d7a8"
          size={0.16}
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
