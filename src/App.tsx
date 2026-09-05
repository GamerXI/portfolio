import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { BootLoader } from './components/BootLoader';
import { CustomCursor } from './components/CustomCursor';
import { Scene3D } from './components/Scene3D';
import { HUD } from './components/HUD';
import { HeroChapter } from './chapters/HeroChapter';
import { IdentityChapter } from './chapters/IdentityChapter';
import { SystemsChapter } from './chapters/SystemsChapter';
import { MissionsChapter } from './chapters/MissionsChapter';
import { TimelineChapter } from './chapters/TimelineChapter';
import { UplinkChapter } from './chapters/UplinkChapter';
import './App.css';

const sections = ['hero', 'identity', 'systems', 'missions', 'timeline', 'uplink'];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('hero');
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLoading(false);
      return;
    }

    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading, prefersReducedMotion]);

  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));

      const viewportCenter = scrollTop + window.innerHeight / 2;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + scrollTop;
          const sectionBottom = sectionTop + rect.height;
          
          if (viewportCenter >= sectionTop && viewportCenter < sectionBottom) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  if (isLoading) {
    return <BootLoader onComplete={handleLoadComplete} />;
  }

  return (
    <div className="app">
      <CustomCursor />
      {!prefersReducedMotion && (
        <div className="scene-wrapper">
          <Scene3D scrollProgress={scrollProgress} />
        </div>
      )}
      
      <HUD currentSection={currentSection} scrollProgress={scrollProgress} />

      <main className="chapters">
        <HeroChapter />
        <IdentityChapter />
        <SystemsChapter />
        <MissionsChapter />
        <TimelineChapter />
        <UplinkChapter />
      </main>

      {/* Viewport frame */}
      <div className="viewport-frame" aria-hidden="true" />
      <div className="frame-corner frame-corner--tl" aria-hidden="true" />
      <div className="frame-corner frame-corner--tr" aria-hidden="true" />
      <div className="frame-corner frame-corner--bl" aria-hidden="true" />
      <div className="frame-corner frame-corner--br" aria-hidden="true" />

      {/* Left utility rail */}
      <div className="utility-rail" aria-hidden="true">
        <div className="utility-glyph">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
      </div>

      <div className="grain-overlay" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
    </div>
  );
}

export default App;
