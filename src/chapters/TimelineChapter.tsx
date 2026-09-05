import { motion, useReducedMotion } from 'framer-motion';
import { portfolioContent } from '../content/portfolio';
import type { Experience } from '../content/portfolio';
import './TimelineChapter.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export function TimelineChapter() {
  const prefersReducedMotion = useReducedMotion();
  const { experience } = portfolioContent;

  return (
    <section id="timeline" className="chapter timeline-chapter">
      <motion.div
        className="timeline-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.header className="section-header" variants={itemVariants}>
          <div className="section-marker">
            <span className="section-marker-dot" />
            <span className="section-number">004</span>
          </div>
          <h2 className="section-title">TIMELINE.</h2>
          <span className="section-label">// CAREER_LOG</span>
        </motion.header>

        <div className="timeline-track">
          <div className="track-line">
            <motion.div
              className="track-progress"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {experience.map((exp: Experience, index: number) => (
            <motion.article
              key={exp.id}
              className="timeline-entry"
              variants={itemVariants}
            >
              <div className="entry-marker">
                <motion.div
                  className="marker-dot"
                  initial={prefersReducedMotion ? {} : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                />
                <span className="marker-date">{exp.period}</span>
              </div>

              <div className="entry-card">
                <div className="card-header">
                  <div className="card-meta">
                    <span className="meta-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="meta-divider">//</span>
                    <span className="meta-status">ACTIVE</span>
                  </div>
                </div>

                <div className="card-body">
                  <h3 className="card-role">{exp.role}</h3>
                  <div className="card-company">
                    <span className="company-icon">◈</span>
                    <span className="company-name">{exp.company}</span>
                  </div>

                  <p className="card-description">{exp.description}</p>

                  {exp.highlights && (
                    <ul className="card-highlights">
                      {exp.highlights.map((highlight: string, hIndex: number) => (
                        <motion.li
                          key={hIndex}
                          className="highlight-item"
                          initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: hIndex * 0.1 + 0.3 }}
                        >
                          <span className="highlight-bullet">&gt;</span>
                          <span className="highlight-text">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="card-footer">
                  <div className="footer-tags">
                    {['Node.js', 'React', 'Docker', 'Python'].slice(0, 3).map((tech) => (
                      <span key={tech} className="footer-tag">{tech}</span>
                    ))}
                  </div>
                  <span className="footer-duration">
                    {(() => {
                      const start = new Date('2021-12-01');
                      const now = new Date();
                      const years = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365));
                      return `${years}+ YEARS`;
                    })()}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div className="timeline-footer" variants={itemVariants}>
          <div className="footer-stat">
            <span className="stat-value">
              {new Date().getFullYear() - 2021}+
            </span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="footer-divider" />
          <div className="footer-stat">
            <span className="stat-value">1</span>
            <span className="stat-label">Company</span>
          </div>
          <div className="footer-divider" />
          <div className="footer-stat">
            <span className="stat-value">∞</span>
            <span className="stat-label">Projects Built</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
