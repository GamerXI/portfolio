import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Horizontal travel (px) the block slides in from. */
  x?: number;
  /** Vertical travel (px) the block slides in from. */
  y?: number;
  /** Stagger delay (s). */
  delay?: number;
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * A proper eased reveal-on-scroll (the classic Framer-Motion pattern): the
 * element springs in — fade + slide — when it scrolls into view, and animates
 * back out when it leaves, so it replays smoothly whether you scroll down or
 * back up. Not a scroll-scrubbed opacity, which reads as a flicker.
 */
export function ScrollReveal({
  children,
  className,
  x = 0,
  y = 46,
  delay = 0,
  amount = 0.3,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
