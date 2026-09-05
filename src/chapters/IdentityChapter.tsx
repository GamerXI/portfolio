import { portfolioContent } from '../content/portfolio';
import { ScrollReveal } from '../components/ScrollReveal';
import './IdentityChapter.css';

const stats = [
  { value: '4+', label: 'YEARS EXP', accent: 'cyan' },
  { value: '40%', label: 'PERF BOOST', accent: 'magenta' },
  { value: '50%', label: 'AUTOMATION', accent: 'cyan' },
  { value: '2021', label: 'SINCE', accent: 'magenta' },
];

export function IdentityChapter() {
  const { bio, location, email } = portfolioContent.personal;

  const bioLines = bio.split('\n\n');

  return (
    <section id="identity" className="chapter identity-chapter">
      <div className="identity-container">
        <ScrollReveal className="section-header">
          <div className="section-marker">
            <span className="section-marker-dot" />
            <span className="section-number">001</span>
          </div>
          <h2 className="section-title">IDENTITY.</h2>
          <span className="section-label">// WHO_I_AM</span>
        </ScrollReveal>

        <div className="identity-grid">
          <ScrollReveal className="identity-bio" y={56}>
            <div className="bio-terminal">
              <div className="terminal-header">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
                <span className="terminal-title">profile.sys</span>
              </div>
              <div className="terminal-content">
                {bioLines.map((paragraph: string, index: number) => (
                  <p key={index} className="bio-paragraph">
                    <span className="line-number">{String(index + 1).padStart(2, '0')}</span>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="identity-panel" x={40}>
            <div className="panel-header">
              <span className="panel-icon">◈</span>
              <span className="panel-title">SYSTEM STATUS</span>
            </div>

            <div className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.label} className={`stat-card ${stat.accent}`}>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="info-rows">
              <div className="info-row">
                <span className="info-key">LOCATION:</span>
                <span className="info-value">{location}</span>
              </div>
              <div className="info-row">
                <span className="info-key">CONTACT:</span>
                <span className="info-value">{email}</span>
              </div>
              <div className="info-row">
                <span className="info-key">STATUS:</span>
                <span className="info-value available">
                  <span className="status-dot" /> AVAILABLE FOR HIRE
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="identity-skills-preview">
          <div className="preview-label">
            <span className="label-bracket">[</span>
            <span className="label-text">PRIMARY SYSTEMS</span>
            <span className="label-bracket">]</span>
          </div>
          <div className="preview-tags">
            {['Node.js', 'React', 'Python', 'Docker', 'REST APIs', 'AI/ML'].map((skill) => (
              <span key={skill} className="preview-tag">
                {skill}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
