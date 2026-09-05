import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { createAvatar } from '@bible-strong/avatar-react';
import '@bible-strong/avatar-react/styles.css';
import { freddyAvatar } from './avatar/freddyAvatar';
import './Avatar.css';

// Build the concrete avatar component once from the definition. Exported so
// the boot loader can render the same character.
export const FreddyAvatar = createAvatar(freddyAvatar);

// Lively moods cycled at random while idle ('angry' is reserved for clicks).
const MOODS = [
  'idle', 'thinking', 'searching', 'working', 'happy', 'curious', 'proud',
  'playful', 'listening', 'excited', 'celebrate', 'confused', 'suspicious', 'surprised',
];

/** Pick a gaze expression from the pointer's position (normalized -1..1). */
function gazeFor(nx: number, ny: number): string {
  const ax = Math.abs(nx);
  const ay = Math.abs(ny);
  if (ax < 0.22 && ay < 0.22) return 'small-attentive';
  if (ay > ax) return ny < 0 ? 'upward-side-glance' : 'gentle-downward-gaze';
  return nx > 0 ? 'far-right-glance' : 'curious-left';
}

type Target = { animation: string } | { expression: string };

/**
 * The Freddy avatar (rendered by @bible-strong/avatar-react), wired to the
 * page: while idle he cycles random moods, the pointer steers his gaze (the
 * engine tweens between expressions), a click makes him angry, and scrolling
 * fades him out past the hero.
 */
export function Avatar() {
  const reduced = useReducedMotion();
  const [coarse, setCoarse] = useState(false);
  const [target, setTarget] = useState<Target>({ animation: 'idle' });
  const moodRef = useRef('idle');
  const angryRef = useRef(false);
  const idleTimer = useRef<number | undefined>(undefined);
  const angryTimer = useRef<number | undefined>(undefined);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.1, 0.24], [1, 0], { clamp: true });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const q = window.matchMedia('(pointer: coarse), (hover: none)');
    const update = () => setCoarse(q.matches);
    update();
    q.addEventListener('change', update);
    return () => q.removeEventListener('change', update);
  }, []);

  const interactive = !reduced && !coarse;

  // Randomly cycle moods while idle (doesn't interrupt an active gaze or anger).
  useEffect(() => {
    if (reduced) return;
    let id: number;
    const tick = () => {
      const next = MOODS[Math.floor(Math.random() * MOODS.length)];
      moodRef.current = next;
      if (!angryRef.current) {
        setTarget((prev) => ('expression' in prev ? prev : { animation: next }));
      }
      id = window.setTimeout(tick, 5500 + Math.random() * 5000);
    };
    id = window.setTimeout(tick, 3500 + Math.random() * 3000);
    return () => window.clearTimeout(id);
  }, [reduced]);

  // Pointer steers the gaze; after a rest he returns to the current mood loop.
  useEffect(() => {
    if (!interactive) return;
    let region = '';
    const onMove = (e: PointerEvent) => {
      if (angryRef.current) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      const g = gazeFor(nx, ny);
      if (g !== region) {
        region = g;
        setTarget({ expression: g });
      }
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        region = '';
        if (!angryRef.current) setTarget({ animation: moodRef.current });
      }, 1700);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.clearTimeout(idleTimer.current);
    };
  }, [interactive]);

  useEffect(() => () => window.clearTimeout(angryTimer.current), []);

  // A click (or tap) makes him angry for a moment, then back to his mood.
  const handleClick = () => {
    if (reduced) return;
    angryRef.current = true;
    setTarget({ animation: 'angry' });
    window.clearTimeout(angryTimer.current);
    angryTimer.current = window.setTimeout(() => {
      angryRef.current = false;
      setTarget({ animation: moodRef.current });
    }, 2600);
  };

  const avatarEl = reduced ? (
    <FreddyAvatar defaultExpression="neutral" autoplay={false} size="100%" ariaLabel="Avatar" />
  ) : 'expression' in target ? (
    <FreddyAvatar expression={target.expression} size="100%" ariaLabel="Avatar" />
  ) : (
    <FreddyAvatar animation={target.animation} size="100%" ariaLabel="Avatar" />
  );

  return (
    <motion.div
      className={`hero-avatar${reduced ? ' is-static' : ''}`}
      style={{ opacity }}
      onClick={handleClick}
      aria-hidden="true"
    >
      {avatarEl}
    </motion.div>
  );
}
