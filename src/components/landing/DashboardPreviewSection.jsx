/**
 * DashboardPreviewSection.jsx
 * Mock UI preview of the real dashboard features
 */
import React, { useRef, useState, useEffect } from 'react';

const TABS = ['Resume Analysis', 'Job Matches', 'Skill Gaps', 'Interview Prep'];

const MOCK_JOBS = [
  { title: 'ML Engineer', company: 'Google', match: 94, color: '#6366f1' },
  { title: 'Data Scientist', company: 'Microsoft', match: 88, color: '#8b5cf6' },
  { title: 'AI Researcher', company: 'Meta', match: 81, color: '#06b6d4' },
  { title: 'Backend Engineer', company: 'Stripe', match: 76, color: '#22c55e' },
];

const MOCK_SKILLS = [
  { name: 'Python', level: 90, status: 'strong', color: '#22c55e' },
  { name: 'Machine Learning', level: 75, status: 'good', color: '#6366f1' },
  { name: 'React', level: 60, status: 'moderate', color: '#f59e0b' },
  { name: 'Docker', level: 30, status: 'gap', color: '#ef4444' },
  { name: 'Kubernetes', level: 10, status: 'missing', color: '#ef4444' },
];

function TabContent({ activeTab }) {
  if (activeTab === 0) return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {[
          { label: 'ATS Score', value: '94%', color: '#22c55e', icon: '✅' },
          { label: 'Skills Found', value: '18', color: '#6366f1', icon: '⚡' },
          { label: 'Job Matches', value: '25', color: '#8b5cf6', icon: '🎯' },
        ].map(m => (
          <div key={m.label} style={{
            flex: 1, minWidth: '90px',
            padding: '0.9rem 1rem',
            background: `${m.color}12`,
            border: `1px solid ${m.color}35`,
            borderRadius: '12px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.3rem', marginBottom: '4px' }}>{m.icon}</div>
            <div style={{
              fontFamily: "'Space Grotesk'",
              fontSize: '1.4rem', fontWeight: 800,
              color: m.color, lineHeight: 1,
            }}>{m.value}</div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '3px' }}>{m.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '0.9rem' }}>
        <div style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          💡 Top Suggestion
        </div>
        <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
          Add quantifiable metrics to your experience section. Resumes with numbers get 40% more callbacks.
        </p>
      </div>
    </div>
  );

  if (activeTab === 1) return (
    <div>
      {MOCK_JOBS.map((job, i) => (
        <div key={job.title} style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.75rem', marginBottom: '0.6rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '10px',
          animation: `fadeSlideIn 0.4s ease ${i * 0.08}s both`,
        }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '8px',
            background: `${job.color}20`, border: `1px solid ${job.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', flexShrink: 0,
          }}>💼</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0' }}>{job.title}</div>
            <div style={{ fontSize: '0.72rem', color: '#475569' }}>{job.company}</div>
          </div>
          <div style={{
            padding: '4px 10px', borderRadius: '100px',
            background: `${job.color}20`, color: job.color,
            fontSize: '0.78rem', fontWeight: 700,
          }}>{job.match}%</div>
        </div>
      ))}
    </div>
  );

  if (activeTab === 2) return (
    <div>
      {MOCK_SKILLS.map((skill, i) => (
        <div key={skill.name} style={{ marginBottom: '0.85rem', animation: `fadeSlideIn 0.4s ease ${i * 0.07}s both` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.82rem', color: '#c4c4d4', fontWeight: 500 }}>{skill.name}</span>
            <span style={{
              fontSize: '0.72rem', padding: '2px 8px', borderRadius: '100px',
              background: `${skill.color}18`, color: skill.color, fontWeight: 600,
            }}>
              {skill.status}
            </span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '100px',
              width: `${skill.level}%`,
              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
              transition: 'width 1s ease',
            }} />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {[
        { q: 'Explain the difference between supervised and unsupervised learning?', diff: 'Medium', type: 'Technical' },
        { q: 'How would you handle missing data in a large dataset?', diff: 'Hard', type: 'Technical' },
        { q: 'Describe a time you had to learn a new technology quickly.', diff: 'Easy', type: 'Behavioral' },
      ].map((q, i) => (
        <div key={i} style={{
          padding: '0.85rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '10px', marginBottom: '0.6rem',
          animation: `fadeSlideIn 0.4s ease ${i * 0.1}s both`,
        }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
            <span style={{
              fontSize: '0.65rem', padding: '2px 7px', borderRadius: '100px',
              background: q.diff === 'Hard' ? 'rgba(239,68,68,0.15)' : q.diff === 'Medium' ? 'rgba(245,158,11,0.15)' : 'rgba(34,197,94,0.15)',
              color: q.diff === 'Hard' ? '#f87171' : q.diff === 'Medium' ? '#fbbf24' : '#4ade80',
              fontWeight: 700,
            }}>{q.diff}</span>
            <span style={{
              fontSize: '0.65rem', padding: '2px 7px', borderRadius: '100px',
              background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', fontWeight: 700,
            }}>{q.type}</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>{q.q}</p>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPreviewSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(t => (t + 1) % TABS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} id="dashboard-preview" style={{
      padding: 'clamp(5rem, 9vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      background: 'linear-gradient(180deg, #070e20 0%, #030712 100%)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 14px', borderRadius: '100px',
            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
            fontSize: '0.75rem', fontWeight: 700, color: '#86efac',
            letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.25rem',
          }}>
            🖥️ Live Preview
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: 800, color: '#f8fafc',
            letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1rem',
          }}>
            See What You Get —{' '}
            <span style={{
              background: 'linear-gradient(135deg, #22c55e, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Instantly</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
            A real preview of the AI dashboard you'll get after uploading your resume
          </p>
        </div>

        {/* Mock browser frame */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
          transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
          maxWidth: '820px', margin: '0 auto',
        }}>
          {/* Browser chrome */}
          <div style={{
            background: 'rgba(15,23,42,0.95)',
            border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: '16px 16px 0 0',
            padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: '8px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <div style={{
              flex: 1, marginLeft: '8px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '6px', padding: '4px 12px',
              fontSize: '0.72rem', color: '#475569',
            }}>
              🔒 ai-career-mentor.vercel.app/dashboard
            </div>
          </div>

          {/* Dashboard content */}
          <div style={{
            background: 'rgba(10,15,30,0.98)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderTop: 'none',
            borderRadius: '0 0 16px 16px',
            padding: '1.5rem',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)',
          }}>
            {/* Nav tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {TABS.map((tab, i) => (
                <button key={tab} onClick={() => setActiveTab(i)} style={{
                  padding: '6px 14px', borderRadius: '8px', border: 'none',
                  background: activeTab === i ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
                  color: activeTab === i ? '#a5b4fc' : '#475569',
                  fontSize: '0.78rem', fontWeight: activeTab === i ? 700 : 500,
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  borderBottom: activeTab === i ? '2px solid #6366f1' : '2px solid transparent',
                }}>
                  {tab}
                </button>
              ))}
            </div>

            <TabContent activeTab={activeTab} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
