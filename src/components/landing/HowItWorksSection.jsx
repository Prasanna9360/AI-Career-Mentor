/**
 * HowItWorksSection.jsx
 * Visual 5-step connected timeline workflow
 */
import React, { useRef, useState, useEffect } from 'react';

const STEPS = [
  {
    step: '01',
    icon: '📤',
    title: 'Upload Your Resume',
    desc: 'Drag & drop your PDF resume. Our parser extracts every skill, experience, and achievement in seconds.',
    color: '#6366f1',
    detail: 'Supports any PDF format · Private & secure · Instant extraction',
  },
  {
    step: '02',
    icon: '🔬',
    title: 'AI Skill Analysis',
    desc: 'Groq AI maps your skills against 200+ technical and soft skills. Your profile is built in real-time.',
    color: '#8b5cf6',
    detail: 'NLP-powered parsing · Skill clustering · Experience scoring',
  },
  {
    step: '03',
    icon: '🎯',
    title: 'Career Matching',
    desc: '25 job roles are scored against your profile. See which careers align best with a compatibility percentage.',
    color: '#06b6d4',
    detail: '25 job roles · ATS scoring · Salary benchmarks included',
  },
  {
    step: '04',
    icon: '📚',
    title: 'Learning Recommendations',
    desc: 'Get a step-by-step roadmap with specific courses, certifications, and projects to fill your skill gaps.',
    color: '#22c55e',
    detail: 'Curated courses · Timeline planning · Priority ordering',
  },
  {
    step: '05',
    icon: '🚀',
    title: 'Internship & Job Matching',
    desc: 'Receive targeted internship and job suggestions matched to your exact profile, with tips to stand out.',
    color: '#f59e0b',
    detail: 'Personalized suggestions · Company insights · Application tips',
  },
];

function StepCard({ step, index, visible, isLast }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      opacity: visible ? 1 : 0,
      animation: visible ? `fadeSlideUp 0.6s ease ${index * 0.12}s both` : 'none',
    }}>
      {/* Step number + icon circle */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: hovered
            ? `linear-gradient(135deg, ${step.color}, ${step.color}aa)`
            : `linear-gradient(135deg, ${step.color}25, ${step.color}10)`,
          border: `2px solid ${hovered ? step.color : step.color + '50'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2rem',
          transition: 'all 0.3s ease',
          boxShadow: hovered ? `0 0 32px ${step.color}50, 0 0 0 8px ${step.color}10` : 'none',
          cursor: 'default',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {step.icon}
        {/* Step number badge */}
        <div style={{
          position: 'absolute', top: '-6px', right: '-6px',
          width: '24px', height: '24px',
          background: step.color,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.65rem', fontWeight: 800, color: '#fff',
          fontFamily: "'Space Grotesk', sans-serif",
          boxShadow: `0 2px 8px ${step.color}60`,
        }}>
          {step.step}
        </div>
      </div>

      {/* Connector line (except last) */}
      {!isLast && (
        <div style={{
          position: 'absolute',
          top: '40px',
          left: 'calc(50% + 40px)',
          right: 'calc(-50% + 40px)',
          height: '2px',
          background: `linear-gradient(90deg, ${step.color}60, ${STEPS[index + 1]?.color}60)`,
          zIndex: 1,
        }} />
      )}

      {/* Card content */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          marginTop: '1.25rem',
          padding: '1.25rem',
          background: hovered ? `${step.color}10` : 'rgba(15,23,42,0.6)',
          border: `1px solid ${hovered ? step.color + '40' : 'rgba(255,255,255,0.07)'}`,
          borderRadius: '14px',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          cursor: 'default',
          width: '100%',
        }}
      >
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.95rem', fontWeight: 700,
          color: hovered ? step.color : '#e2e8f0',
          marginBottom: '0.5rem',
          transition: 'color 0.3s ease',
        }}>{step.title}</h3>
        <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6, marginBottom: '0.75rem' }}>
          {step.desc}
        </p>
        <div style={{
          fontSize: '0.72rem', color: step.color + 'aa',
          fontStyle: 'italic', lineHeight: 1.4,
        }}>
          {step.detail}
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
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
    <section ref={ref} id="how-it-works" style={{
      padding: 'clamp(5rem, 9vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      background: 'linear-gradient(180deg, #030712 0%, #070e20 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background orb */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 14px', borderRadius: '100px',
            background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)',
            fontSize: '0.75rem', fontWeight: 700, color: '#67e8f9',
            letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.25rem',
          }}>
            ⚡ How It Works
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: 800, color: '#f8fafc',
            letterSpacing: '-0.04em', lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            From Resume to Roadmap{' '}
            <span style={{
              background: 'linear-gradient(135deg, #06b6d4, #22c55e)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              in 5 Steps
            </span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto' }}>
            Our AI workflow is simple, fast, and delivers real actionable results
          </p>
        </div>

        {/* Steps — horizontal timeline desktop, vertical mobile */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          position: 'relative',
          alignItems: 'flex-start',
        }} className="steps-container">
          {STEPS.map((step, i) => (
            <div key={step.step} style={{ flex: 1, position: 'relative' }}>
              <StepCard step={step} index={i} visible={visible} isLast={i === STEPS.length - 1} />
              {/* Horizontal connector */}
              {i < STEPS.length - 1 && (
                <div style={{
                  position: 'absolute', top: '40px',
                  left: 'calc(50% + 44px)', right: '-50%',
                  height: '2px', zIndex: 1,
                  background: `linear-gradient(90deg, ${step.color}70, ${STEPS[i + 1].color}70)`,
                }} className="step-connector" />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .steps-container { flex-direction: column !important; }
          .step-connector { display: none !important; }
        }
      `}</style>
    </section>
  );
}
