import { useState } from 'react';
import { portfolioContent } from '../content/portfolio';
import type { Social } from '../content/portfolio';
import { ScrollReveal } from '../components/ScrollReveal';
import './UplinkChapter.css';

const socialIcons: Record<string, React.ReactNode> = {
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  npm: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z"/>
    </svg>
  ),
  portfolio: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
};

export function UplinkChapter() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const { personal, socials } = portfolioContent;
  const resumeHref = personal.resumeUrl
    ? `${import.meta.env.BASE_URL}${personal.resumeUrl}`
    : null;

  return (
    <section id="uplink" className="chapter uplink-chapter">
      <div className="uplink-container">
        <ScrollReveal className="section-header">
          <div className="section-marker">
            <span className="section-marker-dot" />
            <span className="section-number">005</span>
          </div>
          <h2 className="section-title">UPLINK.</h2>
          <span className="section-label">// ESTABLISH_CONNECTION</span>
        </ScrollReveal>

        <ScrollReveal className="uplink-terminal">
          <div className="terminal-header">
            <span className="terminal-title">connection_init.sys</span>
            <span className="terminal-status">
              <span className="status-dot" /> READY
            </span>
          </div>
          <div className="terminal-body">
            <div className="terminal-line">
              <span className="line-prompt">&gt;</span>
              <span className="line-text">ESTABLISHING SECURE UPLINK...</span>
            </div>
            <div className="terminal-line">
              <span className="line-prompt">&gt;</span>
              <span className="line-text">READY FOR TRANSMISSION</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="uplink-main">
          <div className="main-message">
            <h3 className="message-title">Let's Build Something Together</h3>
            <p className="message-text">
              Available for full-time opportunities and interesting projects.
              Let's discuss how I can help bring your ideas to life.
            </p>
          </div>

          <div className="uplink-actions">
            <a href={`mailto:${personal.email}`} className="email-button">
              <span className="button-label">PRIMARY CHANNEL</span>
              <span className="button-email">{personal.email}</span>
              <span className="button-icon">→</span>
            </a>
            {resumeHref && (
              <a
                href={resumeHref}
                download="Suhail_Saifi_Resume.pdf"
                className="resume-button"
              >
                <span className="button-label">DOSSIER</span>
                <span className="button-email">Download Resume</span>
                <span className="button-icon">↓</span>
              </a>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal className="uplink-channels">
          <div className="channels-header">
            <span className="channels-label">SECONDARY CHANNELS</span>
            <span className="channels-count">{socials.length} ACTIVE</span>
          </div>
          <div className="channels-grid">
            {socials.map((social: Social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`channel-card ${hoveredSocial === social.platform ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredSocial(social.platform)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <div className="channel-icon">
                  {socialIcons[social.platform.toLowerCase()] || socialIcons.portfolio}
                </div>
                <div className="channel-info">
                  <span className="channel-name">{social.platform}</span>
                  <span className="channel-handle">{social.handle || social.url}</span>
                </div>
                <span className="channel-arrow">↗</span>
              </a>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="uplink-footer">
          <div className="footer-info">
            <span className="footer-label">LOCATION</span>
            <span className="footer-value">{personal.location}</span>
          </div>
          <div className="footer-divider" />
          <div className="footer-info">
            <span className="footer-label">TIMEZONE</span>
            <span className="footer-value">IST (UTC+5:30)</span>
          </div>
          <div className="footer-divider" />
          <div className="footer-info">
            <span className="footer-label">STATUS</span>
            <span className="footer-value available">
              <span className="status-dot" /> AVAILABLE
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal className="copyright">
          <span>© {new Date().getFullYear()} {personal.name}</span>
          <span className="copyright-divider">|</span>
          <span>ALL SYSTEMS OPERATIONAL</span>
        </ScrollReveal>
      </div>
    </section>
  );
}
