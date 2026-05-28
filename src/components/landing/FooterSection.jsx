/**
 * FooterSection.jsx
 * Full footer with nav links, socials, copyright
 */
import React from 'react';

const NAV_LINKS = [
  { label: 'Hero', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', icon: '🐙', href: 'https://github.com/Prasannaganesann' },
  { label: 'LinkedIn', icon: '💼', href: 'https://www.linkedin.com/in/prasanna-g-867b2b2a3' },
  { label: 'Repo', icon: '⭐', href: 'https://github.com/Prasannaganesann/AI-Career-Mentor' },
];

export default function FooterSection() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      background: '#020408',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: 'clamp(3rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem) 2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top: Logo + Nav */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '2rem',
          marginBottom: '3rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem',
                boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
              }}>🧠</div>
              <div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800, fontSize: '1rem', color: '#f8fafc',
                }}>AI Career Mentor</div>
                <div style={{ fontSize: '0.68rem', color: '#475569' }}>v9 · Open Source</div>
              </div>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.7, maxWidth: '280px' }}>
              AI-powered career guidance for students and freshers. Free forever. Open source.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.25rem' }}>
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: '1rem',
            }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {NAV_LINKS.slice(0, 4).map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: '0.85rem', color: '#475569',
                    textDecoration: 'none', transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#a5b4fc'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#475569'; }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: '1rem',
            }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {NAV_LINKS.slice(4).map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: '0.85rem', color: '#475569',
                    textDecoration: 'none', transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#a5b4fc'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#475569'; }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://github.com/Prasannaganesann/AI-Career-Mentor"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.85rem', color: '#475569', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#a5b4fc'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#475569'; }}
              >
                GitHub Repo
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright + Disclaimer */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <div style={{ fontSize: '0.8rem', color: '#334155' }}>
            © {year} AI Career Mentor · Built by{' '}
            <a
              href="https://github.com/Prasannaganesann"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#6366f1', textDecoration: 'none' }}
            >
              Prasanna G
            </a>
            {' '}· All rights reserved
          </div>
          <div style={{
            fontSize: '0.72rem', color: '#1e293b',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <span style={{
              padding: '3px 10px', borderRadius: '100px',
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: '#4c4f8f', fontSize: '0.7rem',
            }}>
              🤖 Built using AI-powered website generation tools
            </span>
            <span style={{ color: '#1e293b' }}>·</span>
            <span style={{ color: '#1e293b' }}>Open Source · MIT License</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
