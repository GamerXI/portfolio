import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FreddyAvatar } from './Avatar';
import './BootLoader.css';

interface BootLoaderProps {
  onComplete: () => void;
}

const BOOT_MOODS = ['searching', 'thinking', 'curious', 'excited', 'working'];

export function BootLoader({ onComplete }: BootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'exit'>('loading');
  const [bootAnim] = useState(() => BOOT_MOODS[Math.floor(Math.random() * BOOT_MOODS.length)]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const revealTimeout = setTimeout(() => {
      setPhase('reveal');
    }, 2200);

    const exitTimeout = setTimeout(() => {
      setPhase('exit');
      setTimeout(onComplete, 600);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(revealTimeout);
      clearTimeout(exitTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="boot-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="boot-content">
            {/* Avatar greeting */}
            <motion.div
              className="boot-avatar"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <FreddyAvatar animation={bootAnim} size="100%" ariaLabel="Loading avatar" />
            </motion.div>

            {/* Loading bar */}
            <div className="boot-loading">
              <div className="loading-track">
                <motion.div 
                  className="loading-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <div className="loading-info">
                <span className="loading-label">INITIALIZING</span>
                <span className="loading-percent">{progress}%</span>
              </div>
            </div>

            {/* Terminal status */}
            <div className="boot-status">
              <span className="status-line">// LOADING_PORTFOLIO_SEQUENCE</span>
            </div>
          </div>

          {/* Frame corners */}
          <div className="boot-corner boot-corner--tl" />
          <div className="boot-corner boot-corner--tr" />
          <div className="boot-corner boot-corner--bl" />
          <div className="boot-corner boot-corner--br" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
