import { portfolioContent } from '../content/portfolio';
import type { Experience } from '../content/portfolio';
import { ScrollReveal } from '../components/ScrollReveal';
import './TimelineChapter.css';

export function TimelineChapter() {
  const { experience } = portfolioContent;

  return (
    <section id="timeline" className="chapter timeline-chapter">
      <div className="timeline-container">
        <ScrollReveal className="section-header">
          <div className="section-marker">
            <span className="section-marker-dot" />
            <span className="section-number">004</span>
          </div>
          <h2 className="section-title">TIMELINE.</h2>
          <span className="section-label">// CAREER_LOG</span>
        </ScrollReveal>

        <div className="timeline-track">
          <div className="track-line">
            <div className="track-progress" style={{ transformOrigin: 'top' }} />
          </div>

          {experience.map((exp: Experience, index: number) => (
            <ScrollReveal key={exp.id} className="timeline-entry" x={-44} delay={Math.min(index * 0.08, 0.5)}>
              <div className="entry-marker">
                <div className="marker-dot" />
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
                        <li key={hIndex} className="highlight-item">
                          <span className="highlight-bullet">&gt;</span>
                          <span className="highlight-text">{highlight}</span>
                        </li>
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
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="timeline-footer">
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
        </ScrollReveal>
      </div>
    </section>
  );
}
