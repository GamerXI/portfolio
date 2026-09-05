import { portfolioContent } from '../content/portfolio';
import type { Skill } from '../content/portfolio';
import { ScrollReveal } from '../components/ScrollReveal';
import './SystemsChapter.css';

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
      <div className="systems-container">
        <ScrollReveal className="section-header">
          <div className="section-marker">
            <span className="section-marker-dot" />
            <span className="section-number">002</span>
          </div>
          <h2 className="section-title">SYSTEMS.</h2>
          <span className="section-label">// SKILL_MATRIX</span>
        </ScrollReveal>

        <div className="systems-grid">
          {categoryOrder.map((categoryKey, i) => {
            const categorySkills = skillsByCategory[categoryKey];
            if (!categorySkills) return null;

            return (
              <ScrollReveal key={categoryKey} className="system-cluster" y={40} delay={Math.min(i * 0.05, 0.4)}>
                <div className="cluster-header">
                  <span className="cluster-icon">{categoryIcons[categoryKey]}</span>
                  <span className="cluster-title">{categoryLabels[categoryKey]}</span>
                  <span className="cluster-count">{categorySkills.length}</span>
                </div>

                <div className="cluster-skills">
                  {categorySkills.map((skill: Skill) => (
                    <div key={skill.name} className="skill-node">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="systems-console">
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
        </ScrollReveal>
      </div>
    </section>
  );
}
