import { useEffect, useState, useCallback, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';
import './CustomCursor.css';

const INTERACTIVE_SELECTOR =
  'a, button, .btn-chamfer, [data-cursor="interactive"], [role="button"], input, textarea, select, label[for]';

const TRAIL_LENGTH = 8;
const TRAIL_INTERVAL_MS = 24;

type TrailPoint = { id: number; x: number; y: number };

function useCanShowCustomCursor(prefersReducedMotion: boolean | null) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    const finePointer = window.matchMedia('(pointer: fine)');
    const update = () => setEnabled(finePointer.matches && !prefersReducedMotion);
    update();
    finePointer.addEventListener('change', update);
    return () => finePointer.removeEventListener('change', update);
  }, [prefersReducedMotion]);

  return enabled;
}

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const enabled = useCanShowCustomCursor(prefersReducedMotion);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(cursorY, { stiffness: 320, damping: 28, mass: 0.6 });

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);
  const lastTrailAtRef = useRef(0);

  const isInteractiveTarget = useCallback((target: EventTarget | null) => {
    if (!(target instanceof Element)) return false;
    return Boolean(target.closest(INTERACTIVE_SELECTOR));
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-custom-cursor');
      return;
    }

    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      cursorX.set(clientX);
      cursorY.set(clientY);
      setIsVisible(true);
      setIsHovering(isInteractiveTarget(event.target));

      const now = performance.now();
      if (now - lastTrailAtRef.current >= TRAIL_INTERVAL_MS) {
        lastTrailAtRef.current = now;
        const id = ++trailIdRef.current;
        setTrail((prev) => {
          const next = [...prev, { id, x: clientX, y: clientY }];
          return next.slice(-TRAIL_LENGTH);
        });
      }
    };

    const onOver = (event: MouseEvent) => {
      setIsHovering(isInteractiveTarget(event.target));
    };

    const onLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
      setTrail([]);
    };

    const onDown = () => setIsHovering(true);
    const onUp = (event: MouseEvent) => {
      setIsHovering(isInteractiveTarget(event.target));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [enabled, cursorX, cursorY, isInteractiveTarget]);

  // Fade trail dots after they age
  useEffect(() => {
    if (!enabled || trail.length === 0) return;
    const timer = window.setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, 90);
    return () => window.clearTimeout(timer);
  }, [enabled, trail]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor" aria-hidden="true">
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.span
            key={point.id}
            className="cursor-trail-dot"
            initial={{ opacity: 0.45, scale: 0.85 }}
            animate={{ opacity: 0, scale: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              left: point.x,
              top: point.y,
              opacity: ((index + 1) / TRAIL_LENGTH) * 0.4,
            }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className={`cursor-ring${isHovering ? ' is-hovering' : ''}`}
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0,
        }}
      />

      <motion.div
        className={`cursor-dot${isHovering ? ' is-hovering' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  );
}
