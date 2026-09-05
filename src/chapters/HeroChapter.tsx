import { motion, useReducedMotion } from 'framer-motion';
import { portfolioContent } from '../content/portfolio';
import './HeroChapter.css';

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
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

export function HeroChapter() {
  const prefersReducedMotion = useReducedMotion();
  const { name, role, tagline, resumeUrl } = portfolioContent.personal;
  const resumeHref = resumeUrl
    ? `${import.meta.env.BASE_URL}${resumeUrl}`
    : null;
  const [firstName, lastName] = name.split(' ');

  return (
    <section id="hero" className="chapter hero-chapter">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status indicator */}
        <motion.div className="hero-status" variants={itemVariants}>
          <span className="status-dot-wrapper">
            <span className="status-dot" />
          </span>
          <span className="status-text">AVAILABLE FOR WORK</span>
        </motion.div>

        {/* Main title - bold condensed display */}
        <motion.div className="hero-title" variants={itemVariants}>
          <span className="title-line">{firstName}</span>
          <span className="title-line">{lastName}.</span>
        </motion.div>

        {/* Role subtitle */}
        <motion.div className="hero-role" variants={itemVariants}>
          <span className="role-text">{role}</span>
        </motion.div>

        {/* Tagline */}
        <motion.p className="hero-tagline" variants={itemVariants}>
          {tagline}
        </motion.p>

        {/* CTA Button - chamfered style */}
        <motion.div className="hero-cta" variants={itemVariants}>
          <button 
            className="btn-chamfer"
            onClick={() => document.getElementById('identity')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>EXPLORE</span>
          </button>
          {resumeHref && (
            <a
              className="btn-chamfer btn-chamfer--ghost"
              href={resumeHref}
              download="Suhail_Saifi_Resume.pdf"
            >
              <span>DOWNLOAD RESUME</span>
            </a>
          )}
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="scroll-text">SCROLL</span>
        <motion.span 
          className="scroll-arrow"
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
