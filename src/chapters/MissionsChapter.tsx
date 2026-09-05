import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { portfolioContent } from '../content/portfolio';
import type { Project } from '../content/portfolio';
import { ScrollReveal } from '../components/ScrollReveal';
import './MissionsChapter.css';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function MissionsChapter() {
  const prefersReducedMotion = useReducedMotion();
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const { projects } = portfolioContent;
  const featuredProjects = projects.filter((p: Project) => p.featured);

  return (
    <section id="missions" className="chapter missions-chapter">
      <div className="missions-container">
        <ScrollReveal className="section-header">
          <div className="section-marker">
            <span className="section-marker-dot" />
            <span className="section-number">003</span>
          </div>
          <h2 className="section-title">MISSIONS.</h2>
          <span className="section-label">// PROJECT_ARCHIVE</span>
        </ScrollReveal>

        <div className="missions-grid">
          {featuredProjects.map((project: Project, index: number) => (
            <motion.article
              key={project.id}
              className={`mission-card ${expandedProject === project.id ? 'expanded' : ''}`}
              layoutId={project.id}
              onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 48 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.7, ease: EASE, delay: Math.min(index * 0.08, 0.4) }}
            >
              <div className="card-header">
                <div className="card-status">
                  <span className="status-indicator" />
                  <span className="status-text">MISSION_{String(index + 1).padStart(2, '0')}</span>
                </div>
                <span className="card-year">2024</span>
              </div>

              <div className="card-content">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-description">{project.description}</p>

                <AnimatePresence>
                  {expandedProject === project.id && (
                    <motion.div
                      className="card-expanded"
                      initial={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="card-long-desc">{project.longDescription}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="card-tech">
                  {project.technologies.slice(0, 5).map((tech: string) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="tech-more">+{project.technologies.length - 5}</span>
                  )}
                </div>
              </div>

              <div className="card-footer">
                <div className="card-links">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="card-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>SOURCE</span>
                    </a>
                  )}
                  {project.npm && (
                    <a 
                      href={project.npm} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="card-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z"/>
                      </svg>
                      <span>NPM</span>
                    </a>
                  )}
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="card-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      <span>LIVE</span>
                    </a>
                  )}
                </div>
                <button 
                  className="expand-btn"
                  aria-expanded={expandedProject === project.id}
                  aria-label={expandedProject === project.id ? 'Collapse details' : 'Expand details'}
                >
                  <span className="expand-icon">{expandedProject === project.id ? '−' : '+'}</span>
                </button>
              </div>

              <div className="card-corner tl" />
              <div className="card-corner tr" />
              <div className="card-corner bl" />
              <div className="card-corner br" />
            </motion.article>
          ))}
        </div>

        <ScrollReveal className="missions-footer">
          <span className="footer-label">ARCHIVE STATUS</span>
          <span className="footer-value">{projects.length} TOTAL MISSIONS</span>
        </ScrollReveal>
      </div>
    </section>
  );
}
