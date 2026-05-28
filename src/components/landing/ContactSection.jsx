/**
 * ContactSection.jsx
 * Contact form + social links + CTA
 */
import React, { useState, useRef, useEffect } from 'react';

export default function ContactSection({ onGetStarted }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const INPUT_STYLE = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', color: '#f8fafc',
    fontSize: '0.9rem', fontFamily: "'Inter', sans-serif",
    outline: 'none', transition: 'all 0.2s ease',
    boxSizing: 'border-box',
  };

  return (
    <section ref={ref} id="contact" style={{
      padding: 'clamp(5rem, 9vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      background: 'linear-gradient(180deg, #060d1f 0%, #030712 100%)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* CTA Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
          border: '1px solid rgba(99,102,241,0.25)',
          borderRadius: '24px',
          padding: 'clamp(2.5rem, 5vw, 4rem)',
          textAlign: 'center',
          marginBottom: '4rem',
          position: 'relative', overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
          {/* Background orb */}
          <div style={{
            position: 'absolute', top: '-50%', left: '50%',
            transform: 'translateX(-50%)',
            width: '300px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'relative', zIndex: 1,
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚀</div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800, color: '#f8fafc',
              letterSpacing: '-0.04em', marginBottom: '1rem',
            }}>
              Ready to Launch Your Career?
            </h2>
            <p style={{
              color: '#94a3b8', fontSize: '1.05rem', maxWidth: '500px',
              margin: '0 auto 2rem', lineHeight: 1.7,
            }}>
              Join 5000+ students who used AI Career Mentor to land internships and jobs.
              It's free, instant, and genuinely life-changing.
            </p>
            <button
              onClick={onGetStarted}
              style={{
                padding: '14px 40px', borderRadius: '12px', border: 'none',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff', fontSize: '1rem', fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(99,102,241,0.45)',
                transition: 'all 0.25s ease',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px rgba(99,102,241,0.45)'; }}
            >
              Get Started Free →
            </button>
          </div>
        </div>

        {/* Contact grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '3rem', alignItems: 'start',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s',
        }} className="contact-grid">
          {/* Left: Info + Socials */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '5px 14px', borderRadius: '100px',
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
              fontSize: '0.75rem', fontWeight: 700, color: '#a5b4fc',
              letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.25rem',
            }}>
              📬 Get In Touch
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 800, color: '#f8fafc',
              letterSpacing: '-0.04em', marginBottom: '1rem',
            }}>
              Let's Connect
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Have questions, feedback, or want to collaborate? Reach out through any channel below.
              I'm always happy to connect with students, recruiters, and fellow developers.
            </p>

            {/* Contact links */}
            {[
              {
                icon: '📧',
                label: 'Email',
                value: 'prasannasudhaganesan@gmail.com',
                href: 'mailto:prasannasudhaganesan@gmail.com',
                color: '#6366f1',
              },
              {
                icon: '💼',
                label: 'LinkedIn',
                value: 'Prasanna G',
                href: 'https://www.linkedin.com/in/prasanna-g-867b2b2a3',
                color: '#0077b5',
              },
              {
                icon: '🐙',
                label: 'GitHub',
                value: 'Prasannaganesann',
                href: 'https://github.com/Prasannaganesann',
                color: '#e2e8f0',
              },
              {
                icon: '⭐',
                label: 'Project Repo',
                value: 'AI-Career-Mentor',
                href: 'https://github.com/Prasannaganesann/AI-Career-Mentor',
                color: '#f59e0b',
              },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '1rem 1.25rem',
                  background: 'rgba(15,23,42,0.6)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px', marginBottom: '0.7rem',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${link.color}12`;
                  e.currentTarget.style.borderColor = `${link.color}40`;
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(15,23,42,0.6)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.transform = '';
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>{link.icon}</span>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{link.label}</div>
                  <div style={{ fontSize: '0.88rem', color: link.color, fontWeight: 600 }}>{link.value}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: '#475569', fontSize: '1rem' }}>→</span>
              </a>
            ))}
          </div>

          {/* Right: Contact Form */}
          <div>
            <div style={{
              background: 'rgba(15,23,42,0.8)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px', padding: '2rem',
              backdropFilter: 'blur(20px)',
            }}>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.2rem', fontWeight: 700,
                color: '#f8fafc', marginBottom: '1.5rem',
              }}>
                Send a Message
              </h3>

              {submitted ? (
                <div style={{
                  textAlign: 'center', padding: '3rem 1rem',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                  <h4 style={{ color: '#22c55e', fontFamily: "'Space Grotesk'", marginBottom: '0.5rem' }}>Message Sent!</h4>
                  <p style={{ color: '#64748b', fontSize: '0.88rem' }}>Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>Your Name</label>
                    <input
                      type="text"
                      placeholder="Arjun Sharma"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      style={INPUT_STYLE}
                      onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.2)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>Email Address</label>
                    <input
                      type="email"
                      placeholder="arjun@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      style={INPUT_STYLE}
                      onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.2)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>Message</label>
                    <textarea
                      placeholder="Hi! I'd love to collaborate / give feedback / ask a question..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      rows={4}
                      style={{ ...INPUT_STYLE, resize: 'vertical', minHeight: '110px' }}
                      onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.2)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%', padding: '13px',
                      background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      border: 'none', borderRadius: '10px',
                      color: '#fff', fontSize: '0.95rem', fontWeight: 700,
                      cursor: loading ? 'wait' : 'pointer',
                      transition: 'all 0.25s ease',
                      fontFamily: "'Space Grotesk', sans-serif",
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    }}
                  >
                    {loading ? (
                      <>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', animation: 'spin 0.7s linear infinite' }} />
                        Sending…
                      </>
                    ) : '📤 Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
