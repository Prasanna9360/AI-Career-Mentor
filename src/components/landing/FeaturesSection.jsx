/**
 * FeaturesSection.jsx
 * 8 AI feature cards with icons and hover glow effects
 */
import React, { useRef, useState, useEffect } from 'react';

const FEATURES = [
  {
    icon: '📄',
    title: 'AI Resume Analyzer',
    desc: 'Deep PDF parsing extracts every skill, tool, and technology. Get an instant profile score with actionable improvement tips.',
    color: '#6366f1',
    tag: 'Core Feature',
  },
  {
    icon: '🔍',
    title: 'Skill Gap Detection',
    desc: 'Compare your skills against 25 real job requirements. Know exactly what to learn to land your target role.',
    color: '#8b5cf6',
    tag: 'AI Powered',
  },
  {
    icon: '🎯',
    title: 'Career Recommendations',
    desc: '25 job role matches ranked by compatibility percentage. Find roles you never even considered that fit your profile.',
    color: '#06b6d4',
    tag: 'Smart Matching',
  },
  {
    icon: '💼',
    title: 'Internship Suggestions',
    desc: 'Get personalized internship recommendations with company names, required skills, and how to position your profile.',
    color: '#f59e0b',
    tag: 'Opportunities',
  },
  {
    icon: '🗺️',
    title: 'Learning Roadmaps',
    desc: 'Personalized step-by-step roadmaps with curated courses, certifications, and timelines for your target role.',
    color: '#22c55e',
    tag: 'Growth Path',
  },
  {
    icon: '⚡',
    title: 'ATS Resume Feedback',
    desc: 'Know your exact ATS compatibility score. Get specific fixes to ensure your resume passes automated screening.',
    color: '#ec4899',
    tag: 'Job Ready',
  },
  {
    icon: '🧠',
    title: 'AI Interview Prep',
    desc: 'Groq AI generates role-specific MCQ questions with explanations. Practice mode with score tracking included.',
    color: '#14b8a6',
    tag: 'Interview AI',
  },
  {
    icon: '💰',
    title: 'Salary Intelligence',
    desc: 'Real market salary data for entry, mid, and senior levels across 25 roles. Negotiate with confidence.',
    color: '#f97316',
    tag: 'Market Data',
  },
];

function FeatureCard({ feature, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1.75rem',
        background: hovered
          ? `linear-gradient(135deg, ${feature.color}18, ${feature.color}06)`
          : 'rgba(15,23,42,0.7)',
        border: `1px solid ${hovered ? feature.color + '55' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '18px',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? `0 24px 48px ${feature.color}20, 0 0 0 1px ${feature.color}20` : '0 4px 16px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(16px)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        animation: visible ? `fadeSlideUp 0.5s ease ${index * 0.07}s both` : 'none',
      }}
    >
      {/* Background glow */}
      {hovered && (
        <div style={{
          position: 'absolute', top: '-30%', right: '-30%',
          width: '80%', height: '80%', borderRadius: '50%',
          background: `radial-gradient(circle, ${feature.color}15 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      )}

      {/* Tag */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        padding: '3px 10px', borderRadius: '100px',
        background: `${feature.color}15`,
        border: `1px solid ${feature.color}35`,
        fontSize: '0.68rem', fontWeight: 700, color: feature.color,
        letterSpacing: '0.04em', textTransform: 'uppercase',
        marginBottom: '1.1rem',
      }}>
        {feature.tag}
      </div>

      {/* Icon */}
      <div style={{
        fontSize: '2.4rem', marginBottom: '0.9rem',
        filter: hovered ? `drop-shadow(0 0 16px ${feature.color})` : 'none',
        transition: 'filter 0.3s ease',
      }}>{feature.icon}</div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1.05rem', fontWeight: 700,
        color: hovered ? feature.color : '#e2e8f0',
        marginBottom: '0.6rem',
        transition: 'color 0.3s ease',
      }}>{feature.title}</h3>

      {/* Desc */}
      <p style={{
        fontSize: '0.85rem', color: '#64748b',
        lineHeight: 1.65, margin: 0,
      }}>{feature.desc}</p>

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: '10%', right: '10%',
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${feature.color}${hovered ? '80' : '00'}, transparent)`,
        transition: 'all 0.4s ease',
        borderRadius: '100px',
      }} />
    </div>
  );
}

export default function FeaturesSection() {
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
    <section ref={ref} id="features" style={{
      padding: 'clamp(5rem, 9vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      background: 'linear-gradient(180deg, #060d1f 0%, #030712 100%)',
      position: 'relative',
    }}>
      {/* Section divider */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 14px', borderRadius: '100px',
            background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)',
            fontSize: '0.75rem', fontWeight: 700, color: '#c4b5fd',
            letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.25rem',
          }}>
            ✨ AI Features
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: 800, color: '#f8fafc',
            letterSpacing: '-0.04em', lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            Everything You Need to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Land Your Dream Job
            </span>
          </h2>
          <p style={{
            color: '#64748b', fontSize: '1.05rem',
            maxWidth: '540px', margin: '0 auto', lineHeight: 1.7,
          }}>
            8 powerful AI tools that work together to guide you from resume to offer letter
          </p>
        </div>

        {/* Feature cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}>
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} visible={visible} />
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
