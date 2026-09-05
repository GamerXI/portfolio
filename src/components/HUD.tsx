import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './HUD.css';

interface HUDProps {
  currentSection: string;
  scrollProgress: number;
}

const sections = [
  { id: 'hero', label: 'HOME', num: '00' },
  { id: 'identity', label: 'IDENTITY', num: '01' },
  { id: 'systems', label: 'SYSTEMS', num: '02' },
  { id: 'missions', label: 'MISSIONS', num: '03' },
  { id: 'timeline', label: 'TIMELINE', num: '04' },
  { id: 'uplink', label: 'UPLINK', num: '05' },
];

export function HUD({ currentSection, scrollProgress }: HUDProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top navigation bar */}
      <header className="hud-nav">
        <div className="nav-brand">
          <span className="brand-mark">SS</span>
        </div>
        
        <nav className="nav-links">
          {sections.slice(1).map((section) => (
            <button
              key={section.id}
              className={`nav-link ${currentSection === section.id ? 'active' : ''}`}
              onClick={() => scrollToSection(section.id)}
            >
              <span className="nav-marker" />
              <span className="nav-label">{section.label}</span>
            </button>
          ))}
        </nav>

        <div className="nav-meta">
          <span className="meta-time">
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </span>
        </div>
      </header>

      {/* Right progress rail */}
      <aside className="hud-progress" aria-label="Scroll progress">
        <div className="progress-track">
          <motion.div 
            className="progress-fill"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="progress-numbers">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`progress-dot ${currentSection === section.id ? 'active' : ''}`}
              onClick={() => scrollToSection(section.id)}
              aria-label={section.label}
            >
              <span className="dot-num">{section.num}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Bottom status bar */}
      <footer className="hud-status">
        <span className="status-location">
          // {currentSection.toUpperCase()}_SECTION
        </span>
        <span className="status-scroll">
          {Math.round(scrollProgress * 100)}%
        </span>
      </footer>
    </>
  );
}
