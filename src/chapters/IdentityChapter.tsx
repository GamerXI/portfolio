import { motion, useReducedMotion } from 'framer-motion';
import { portfolioContent } from '../content/portfolio';
import './IdentityChapter.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const stats = [
  { value: '4+', label: 'YEARS EXP', accent: 'cyan' },
  { value: '40%', label: 'PERF BOOST', accent: 'magenta' },
  { value: '50%', label: 'AUTOMATION', accent: 'cyan' },
  { value: '2021', label: 'SINCE', accent: 'magenta' },
];

export function IdentityChapter() {
  const prefersReducedMotion = useReducedMotion();
  const { bio, location, email } = portfolioContent.personal;

  const bioLines = bio.split('\n\n');

  return (
    <section id="identity" className="chapter identity-chapter">
      <motion.div
        className="identity-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.header className="section-header" variants={itemVariants}>
          <div className="section-marker">
            <span className="section-marker-dot" />
            <span className="section-number">001</span>
          </div>
          <h2 className="section-title">IDENTITY.</h2>
          <span className="section-label">// WHO_I_AM</span>
        </motion.header>

        <div className="identity-grid">
          <motion.div className="identity-bio" variants={itemVariants}>
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
          </motion.div>

          <motion.div className="identity-panel" variants={itemVariants}>
            <div className="panel-header">
              <span className="panel-icon">◈</span>
              <span className="panel-title">SYSTEM STATUS</span>
            </div>
            
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`stat-card ${stat.accent}`}
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
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
          </motion.div>
        </div>

        <motion.div className="identity-skills-preview" variants={itemVariants}>
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
        </motion.div>
      </motion.div>
    </section>
  );
}
