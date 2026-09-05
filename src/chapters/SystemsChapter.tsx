import { motion, useReducedMotion } from 'framer-motion';
import { portfolioContent } from '../content/portfolio';
import type { Skill } from '../content/portfolio';
import './SystemsChapter.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const categoryLabels: Record<string, string> = {
  languages: 'LANGUAGES',
  frontend: 'FRONTEND',
  backend: 'BACKEND',
  databases: 'DATABASES',
  devops: 'DEVOPS',
  workflow: 'WORKFLOW',
  ai: 'AI / LLM',
  tools: 'TOOLS',
};

const categoryIcons: Record<string, string> = {
  languages: '◈',
  frontend: '◐',
  backend: '◑',
  databases: '◉',
  devops: '◎',
  workflow: '◇',
  ai: '◆',
  tools: '○',
};

export function SystemsChapter() {
  const prefersReducedMotion = useReducedMotion();
  const { skills } = portfolioContent;

  const skillsByCategory = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categoryOrder = ['languages', 'frontend', 'backend', 'databases', 'devops', 'workflow', 'ai', 'tools'];

  return (
    <section id="systems" className="chapter systems-chapter">
      <motion.div
        className="systems-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.header className="section-header" variants={itemVariants}>
          <div className="section-marker">
            <span className="section-marker-dot" />
            <span className="section-number">002</span>
          </div>
          <h2 className="section-title">SYSTEMS.</h2>
          <span className="section-label">// SKILL_MATRIX</span>
        </motion.header>

        <div className="systems-grid">
          {categoryOrder.map((categoryKey) => {
            const categorySkills = skillsByCategory[categoryKey];
            if (!categorySkills) return null;

            return (
              <motion.div
                key={categoryKey}
                className="system-cluster"
                variants={itemVariants}
              >
                <div className="cluster-header">
                  <span className="cluster-icon">{categoryIcons[categoryKey]}</span>
                  <span className="cluster-title">{categoryLabels[categoryKey]}</span>
                  <span className="cluster-count">{categorySkills.length}</span>
                </div>

                <div className="cluster-skills">
                  {categorySkills.map((skill: Skill, index: number) => (
                    <motion.div
                      key={skill.name}
                      className="skill-node"
                      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    >
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <motion.div
                          className="skill-bar-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div className="systems-console" variants={itemVariants}>
          <div className="console-header">
            <span className="console-label">SYSTEM_DIAGNOSTIC</span>
            <span className="console-status">
              <span className="status-dot" /> ALL SYSTEMS OPERATIONAL
            </span>
          </div>
          <div className="console-output">
            <div className="output-line">
              <span className="output-key">total_skills:</span>
              <span className="output-value">{skills.length}</span>
            </div>
            <div className="output-line">
              <span className="output-key">categories:</span>
              <span className="output-value">{Object.keys(skillsByCategory).length}</span>
            </div>
            <div className="output-line">
              <span className="output-key">avg_proficiency:</span>
              <span className="output-value">
                {Math.round(skills.reduce((sum: number, s: Skill) => sum + s.level, 0) / skills.length)}%
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
