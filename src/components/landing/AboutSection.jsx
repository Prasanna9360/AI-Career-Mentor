/**
 * AboutSection.jsx — v2 (fixed: moved useState out of .map())
 */
import React, { useRef, useState, useEffect } from 'react';

const PILLARS = [
  {
    icon: '🧠',
    title: 'AI-Powered Intelligence',
    desc: 'Groq AI analyzes your resume in seconds, extracting skills, detecting gaps, and matching you with real opportunities.',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.03))',
  },
  {
    icon: '🎓',
    title: 'Student-First Mission',
    desc: 'Built specifically for freshers, students, and early-career professionals who need guidance, not just job boards.',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.03))',
  },
  {
    icon: '📈',
    title: 'Career Intelligence',
    desc: 'Real salary data, ATS scoring, LinkedIn optimization, and personalized roadmaps — all in one platform.',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.03))',
  },
  {
    icon: '🌍',
    title: 'Always Free',
    desc: 'No paywalls, no subscriptions. Every student deserves world-class career guidance regardless of background.',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.03))',
  },
];

/* Extracted to proper component so useState is valid */
function PillarCard({ pillar, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      key={pillar.title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1.75rem',
        background: hovered ? pillar.gradient : 'rgba(15,23,42,0.5)',
        border: `1px solid ${hovered ? pillar.color + '40' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        opacity: visible ? 1 : 0,
        animation: visible ? `fadeSlideUp 0.6s ease ${0.3 + index * 0.1}s both` : 'none',
        backdropFilter: 'blur(10px)',
        cursor: 'default',
      }}
    >
      <div style={{
        fontSize: '2rem', marginBottom: '1rem',
        filter: hovered ? `drop-shadow(0 0 10px ${pillar.color})` : 'none',
        transition: 'filter 0.3s ease',
      }}>{pillar.icon}</div>
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1.05rem', fontWeight: 700,
        color: hovered ? pillar.color : '#e2e8f0',
        marginBottom: '0.6rem', transition: 'color 0.3s ease',
      }}>{pillar.title}</h3>
      <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.65 }}>
        {pillar.desc}
      </p>
    </div>
  );
}

export default function AboutSection() {
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
    <section ref={ref} id="about" style={{
      padding: 'clamp(5rem, 9vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      background: 'linear-gradient(180deg, #030712 0%, #060d1f 100%)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header — responsive 2-col → 1-col */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem', alignItems: 'center', marginBottom: '4rem',
        }}>
          {/* Left: text */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '5px 14px', borderRadius: '100px',
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
              fontSize: '0.75rem', fontWeight: 700, color: '#a5b4fc',
              letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.25rem',
            }}>
              About The Platform
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800, color: '#f8fafc',
              letterSpacing: '-0.04em', lineHeight: 1.1,
              marginBottom: '1.25rem',
            }}>
              Your Personal
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                AI Career Advisor
              </span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '1rem' }}>
              AI Career Mentor was born from a simple frustration: career guidance is expensive,
              biased, and often irrelevant for tech students. We built an open-source platform
              that gives every student access to the same AI-powered insights used by top recruiters.
            </p>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7 }}>
              From resume parsing to career roadmaps, salary benchmarking to interview preparation —
              everything is powered by Groq's lightning-fast AI and backed by real industry data.
            </p>
          </div>

          {/* Right: accuracy card */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}>
            <div style={{
              background: 'rgba(15,23,42,0.8)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '20px',
              padding: '2rem',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                }}>🧠</div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, color: '#f8fafc', fontSize: '0.95rem' }}>AI Career Mentor</div>
                  <div style={{ fontSize: '0.75rem', color: '#475569' }}>Version 9.0 · Free & Open Source</div>
                </div>
              </div>
              {[
                { label: 'Resume Analysis Accuracy', value: 94, color: '#6366f1' },
                { label: 'Job Match Precision', value: 89, color: '#8b5cf6' },
                { label: 'ATS Score Accuracy', value: 97, color: '#06b6d4' },
                { label: 'Student Satisfaction', value: 95, color: '#22c55e' },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{item.label}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: item.color }}>{item.value}%</span>
                  </div>
                  <div style={{ height: '5px', background: 'rgba(255,255,255,0.07)', borderRadius: '100px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '100px',
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
                      width: visible ? `${item.value}%` : '0%',
                      transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1) 0.5s',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pillars grid — uses proper PillarCard component */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}>
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} visible={visible} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
