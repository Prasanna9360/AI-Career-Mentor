/**
 * ServicesSection.jsx
 * 6 professional service cards
 */
import React, { useRef, useState, useEffect } from 'react';

const SERVICES = [
  {
    icon: '📝',
    title: 'Resume Review',
    desc: 'AI-powered resume analysis with ATS score, readability check, keyword density, and section-by-section feedback.',
    features: ['ATS compatibility', 'Keyword analysis', 'Format review'],
    color: '#6366f1',
  },
  {
    icon: '🧭',
    title: 'Career Mentorship',
    desc: 'Groq AI acts as your personal career advisor, answering questions, mapping paths, and guiding decisions.',
    features: ['24/7 AI mentor', 'Career path mapping', 'Industry insights'],
    color: '#8b5cf6',
  },
  {
    icon: '🗂️',
    title: 'Portfolio Guidance',
    desc: 'Get actionable advice on projects to build, technologies to showcase, and how to structure your portfolio.',
    features: ['Project suggestions', 'Tech stack advice', 'GitHub tips'],
    color: '#06b6d4',
  },
  {
    icon: '🎤',
    title: 'Mock Interviews',
    desc: 'Practice with AI-generated role-specific questions in both technical and behavioral formats with scoring.',
    features: ['MCQ format', 'Difficulty levels', 'Score tracking'],
    color: '#22c55e',
  },
  {
    icon: '🔬',
    title: 'AI Skill Assessment',
    desc: 'Understand your skill levels across 200+ technologies. Get a clear picture of strengths and blind spots.',
    features: ['Skill profiling', 'Gap analysis', 'Priority learning'],
    color: '#f59e0b',
  },
  {
    icon: '📊',
    title: 'Job Readiness Tracking',
    desc: 'Track your progress towards your target role with a readiness score that updates as you learn new skills.',
    features: ['Readiness score', 'Progress tracking', 'Goal planning'],
    color: '#ec4899',
  },
];

function ServiceCard({ service, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1.75rem',
        background: hovered
          ? `linear-gradient(135deg, ${service.color}15, ${service.color}05)`
          : 'rgba(15,23,42,0.7)',
        border: `1px solid ${hovered ? service.color + '50' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '18px',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 40px ${service.color}18` : 'none',
        backdropFilter: 'blur(16px)',
        cursor: 'default',
        opacity: visible ? 1 : 0,
        animation: visible ? `fadeSlideUp 0.5s ease ${index * 0.08}s both` : 'none',
      }}
    >
      {/* Icon */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        background: `${service.color}18`,
        border: `1px solid ${service.color}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.6rem', marginBottom: '1.25rem',
        filter: hovered ? `drop-shadow(0 0 12px ${service.color})` : 'none',
        transition: 'filter 0.3s ease',
      }}>
        {service.icon}
      </div>

      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1.05rem', fontWeight: 700,
        color: hovered ? service.color : '#e2e8f0',
        marginBottom: '0.6rem',
        transition: 'color 0.3s ease',
      }}>{service.title}</h3>

      <p style={{
        fontSize: '0.85rem', color: '#64748b',
        lineHeight: 1.65, marginBottom: '1rem',
      }}>{service.desc}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {service.features.map(f => (
          <div key={f} style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            fontSize: '0.78rem', color: '#475569',
          }}>
            <div style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: service.color, flexShrink: 0,
            }} />
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="services" style={{
      padding: 'clamp(5rem, 9vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      background: 'linear-gradient(180deg, #030712 0%, #060d1f 100%)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.4), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 14px', borderRadius: '100px',
            background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.3)',
            fontSize: '0.75rem', fontWeight: 700, color: '#f9a8d4',
            letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.25rem',
          }}>
            🛠️ Services
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: 800, color: '#f8fafc',
            letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1rem',
          }}>
            Complete Career Growth{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ec4899, #f59e0b)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Toolkit</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
            Six specialized AI services designed to cover every stage of your career journey
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} visible={visible} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
