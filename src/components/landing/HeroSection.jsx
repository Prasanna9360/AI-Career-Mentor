/**
 * HeroSection.jsx
 * Premium AI startup hero with animated gradient, typewriter, floating UI elements
 */
import React, { useState, useEffect } from 'react';

const PHRASES = [
  'Your Perfect Career Path',
  'Hidden Skill Gaps',
  'Top Job Matches',
  'Your Market Value',
  'Interview Readiness',
];

function useTypewriter(phrases, speed = 75, pause = 2200) {
  const [text, setText] = useState('');
  const [pi, setPi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = phrases[pi];
    let t;
    if (!del && ci < cur.length) t = setTimeout(() => setCi(i => i + 1), speed);
    else if (!del && ci === cur.length) t = setTimeout(() => setDel(true), pause);
    else if (del && ci > 0) t = setTimeout(() => setCi(i => i - 1), speed / 2);
    else { setDel(false); setPi(i => (i + 1) % phrases.length); }
    setText(cur.slice(0, ci));
    return () => clearTimeout(t);
  }, [ci, del, pi, phrases, speed, pause]);

  return text;
}

const FLOATING_BADGES = [
  { icon: '✅', text: 'ATS Score: 94%', color: '#22c55e', delay: '0s', x: '-10%', y: '20%' },
  { icon: '🎯', text: '25 Job Matches', color: '#6366f1', delay: '0.5s', x: '105%', y: '15%' },
  { icon: '📊', text: 'Skill Gap Analysis', color: '#8b5cf6', delay: '1s', x: '108%', y: '60%' },
  { icon: '🚀', text: 'Career Roadmap Ready', color: '#06b6d4', delay: '1.5s', x: '-15%', y: '65%' },
];

export default function HeroSection({ onGetStarted, onAnalyzeResume, onExploreCareers }) {
  const typed = useTypewriter(PHRASES);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #030712 0%, #0f0c29 40%, #0a0f2c 70%, #030712 100%)',
    }}>
      {/* Animated gradient orbs */}
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%',
        width: '60vw', height: '60vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        animation: 'orbFloat 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-10%',
        width: '50vw', height: '50vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        animation: 'orbFloat 10s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '30%', right: '20%',
        width: '30vw', height: '30vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
        animation: 'orbFloat 12s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(99,102,241,0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />

      {/* Top gradient fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '120px',
        background: 'linear-gradient(180deg, rgba(3,7,18,0.8) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 6vw, 6rem)',
        maxWidth: '900px', margin: '0 auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Eyebrow badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px', borderRadius: '100px',
          background: 'rgba(99,102,241,0.12)',
          border: '1px solid rgba(99,102,241,0.35)',
          marginBottom: '2rem',
          fontSize: '0.78rem', fontWeight: 700, color: '#a5b4fc',
          letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 8px #6366f1', flexShrink: 0 }} />
          AI-Powered Career Intelligence Platform
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
          color: '#f8fafc',
          marginBottom: '1.25rem',
        }}>
          AI Discovers
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
            minWidth: '12ch',
          }}>
            {typed}
            <span style={{ WebkitTextFillColor: '#6366f1', animation: 'blink 1s step-end infinite' }}>|</span>
          </span>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
          color: '#94a3b8',
          maxWidth: '600px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.7,
        }}>
          Upload your resume and get instant AI-powered career analysis — skill gap detection,
          25 job matches, ATS feedback, salary insights, and a personalized learning roadmap.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center',
          flexWrap: 'wrap', marginBottom: '3.5rem',
        }}>
          <button
            id="hero-get-started"
            onClick={onGetStarted}
            style={{
              padding: '14px 32px', borderRadius: '12px', border: 'none',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff', fontSize: '1rem', fontWeight: 700,
              cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: '0 4px 24px rgba(99,102,241,0.45), 0 0 40px rgba(99,102,241,0.15)',
              transition: 'all 0.25s ease',
              letterSpacing: '-0.01em',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.55), 0 0 60px rgba(99,102,241,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px rgba(99,102,241,0.45), 0 0 40px rgba(99,102,241,0.15)'; }}
          >
            🚀 Get Started Free
          </button>
          <button
            id="hero-analyze-resume"
            onClick={onAnalyzeResume}
            style={{
              padding: '14px 32px', borderRadius: '12px',
              border: '1px solid rgba(99,102,241,0.4)',
              background: 'rgba(99,102,241,0.08)',
              color: '#a5b4fc', fontSize: '1rem', fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              transition: 'all 0.25s ease', backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.18)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.7)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.transform = ''; }}
          >
            📄 Analyze Resume
          </button>
          <a
            href="#features"
            id="hero-explore-careers"
            style={{
              padding: '14px 32px', borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              color: '#94a3b8', fontSize: '1rem', fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              transition: 'all 0.25s ease', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#f1f5f9'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.transform = ''; }}
          >
            🎯 Explore Careers
          </a>
        </div>

        {/* Trust signals */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: 'clamp(1rem, 3vw, 2.5rem)', flexWrap: 'wrap',
          color: '#475569', fontSize: '0.82rem', fontWeight: 500,
        }}>
          {[
            { icon: '🔒', text: 'No data stored' },
            { icon: '⚡', text: 'Under 5s analysis' },
            { icon: '🤖', text: 'Groq AI powered' },
            { icon: '🆓', text: 'Completely free' },
            { icon: '🎓', text: '5000+ students helped' },
          ].map(item => (
            <span key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {item.icon} {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Floating UI Badges */}
      {FLOATING_BADGES.map((badge, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: badge.x, top: badge.y,
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 16px',
            background: 'rgba(13,17,35,0.85)',
            border: `1px solid ${badge.color}40`,
            borderRadius: '12px',
            backdropFilter: 'blur(20px)',
            boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${badge.color}20`,
            fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0',
            animation: `floatBadge 4s ease-in-out infinite`,
            animationDelay: badge.delay,
            whiteSpace: 'nowrap',
            zIndex: 3,
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>{badge.icon}</span>
          <span style={{ color: badge.color }}>{badge.text}</span>
        </div>
      ))}

      {/* Bottom gradient fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
        background: 'linear-gradient(0deg, #030712 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.97); }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blink { 50% { opacity: 0; } }
        @media (max-width: 900px) {
          [style*="position: absolute"][style*="left: -"] { display: none; }
          [style*="position: absolute"][style*="left: 10"] { display: none; }
        }
      `}</style>
    </section>
  );
}
