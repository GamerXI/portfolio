import { useEffect, useRef, Suspense } from 'react';
import type { RefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';
import { useSceneQuality } from './scene/useSceneQuality';
import { Particles } from './scene/Particles';
import { NodeLattice } from './scene/NodeLattice';

/** Amber grid that recedes into the fog — a faint floor for the space. */
function GridFloor({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame(() => {
    if (ref.current) {
      const mat = ref.current.material as THREE.Material & { opacity: number };
      mat.transparent = true;
      mat.opacity = 0.18 + Math.sin(scrollProgress * Math.PI) * 0.12;
    }
  });
  return (
    <gridHelper ref={ref} args={[120, 60, '#e8a54b', '#2a2622']} position={[0, -9, 0]} />
  );
}

/**
 * Scroll-driven camera. The camera pulls in and arcs as the visitor scrolls,
 * with a small pointer parallax layered on top so the space feels alive.
 */
function CameraRig({
  scrollProgress,
  mouse,
  reactive,
}: {
  scrollProgress: number;
  mouse: RefObject<THREE.Vector2>;
  reactive: boolean;
}) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const s = scrollProgress;
    // Dolly in through the story, then ease back out at the end.
    const targetZ = 16 - s * 9 + Math.pow(s, 3) * 6;
    const targetY = 1.5 + Math.sin(s * Math.PI) * 3.5;
    const targetX = Math.sin(s * Math.PI * 2) * 3;

    const mx = reactive ? mouse.current.x : 0;
    const my = reactive ? mouse.current.y : 0;

    const k = Math.min(1, delta * 1.8);
    camera.position.x += (targetX + mx * 1.4 - camera.position.x) * k;
    camera.position.y += (targetY + my * 1.0 - camera.position.y) * k;
    camera.position.z += (targetZ - camera.position.z) * k;

    // Look slightly ahead into the scroll direction.
    const lookY = -s * 1.5;
    target.current.set(0, lookY, -2);
    camera.lookAt(target.current);
  });

  return null;
}

interface Scene3DProps {
  scrollProgress: number;
}

export function Scene3D({ scrollProgress }: Scene3DProps) {
  const prefersReducedMotion = useReducedMotion();
  const quality = useSceneQuality();
  const mouse = useRef(new THREE.Vector2(0, 0));

  // Track the pointer at the window level — the canvas itself has
  // pointer-events disabled so it never sees the events directly.
  useEffect(() => {
    if (prefersReducedMotion || quality.coarse) return;
    const onMove = (e: PointerEvent) => {
      mouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [prefersReducedMotion, quality.coarse]);

  // Reduced motion: a calm static gradient, no WebGL.
  if (prefersReducedMotion) {
    return (
      <div className="scene-fallback">
        <div className="fallback-gradient" />
      </div>
    );
  }

  const reactive = !quality.coarse;

  return (
    <div className="scene-container">
      <Canvas
        camera={{ position: [0, 1.5, 16], fov: 60 }}
        dpr={[1, quality.dprMax]}
        gl={{ antialias: !quality.coarse, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={['#0c0a09', 14, 52]} />
          <ambientLight intensity={0.35} />
          <pointLight position={[8, 10, 8]} intensity={0.8} color="#e8a54b" />
          <pointLight position={[-10, -8, -6]} intensity={0.35} color="#f5f3ee" />
          <directionalLight position={[4, 6, 5]} intensity={0.5} color="#f0d7a8" />

          <CameraRig scrollProgress={scrollProgress} mouse={mouse} reactive={reactive} />

          <Particles
            mouse={mouse}
            scrollProgress={scrollProgress}
            count={quality.particleCount}
            reactive={reactive}
          />

          <NodeLattice mouse={mouse} scrollProgress={scrollProgress} reactive={reactive} />

          {!quality.coarse && <GridFloor scrollProgress={scrollProgress} />}

          {/* Subtle bloom + vignette give the ambient particle field an amber
              haze and a cinematic frame. Desktop only. */}
          {!quality.coarse && (
            <EffectComposer>
              <Bloom
                intensity={0.6}
                luminanceThreshold={0.6}
                luminanceSmoothing={0.4}
                mipmapBlur
                radius={0.6}
              />
              <Vignette eskil={false} offset={0.25} darkness={0.7} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
