/**
 * StatsSection.jsx
 * Animated counter statistics with intersection observer
 */
import React, { useState, useEffect, useRef } from 'react';

const STATS = [
  { value: 5000, suffix: '+', label: 'Students Guided', icon: '🎓', color: '#6366f1' },
  { value: 1000, suffix: '+', label: 'Career Matches Made', icon: '🎯', color: '#8b5cf6' },
  { value: 95, suffix: '%', label: 'Satisfaction Rate', icon: '⭐', color: '#06b6d4' },
  { value: 300, suffix: '+', label: 'Learning Roadmaps', icon: '🗺️', color: '#22c55e' },
  { value: 25, suffix: '', label: 'Job Roles Covered', icon: '💼', color: '#f59e0b' },
  { value: 5, suffix: 's', label: 'Average Analysis Time', icon: '⚡', color: '#ec4899' },
];

function useCountUp(target, duration = 2000, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatCard({ stat, active, index }) {
  const count = useCountUp(stat.value, 2000 + index * 200, active);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '2rem 1.5rem',
        background: hovered ? `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)` : 'rgba(15,23,42,0.6)',
        border: `1px solid ${hovered ? stat.color + '50' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '20px',
        textAlign: 'center',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 40px ${stat.color}20` : '0 4px 16px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(20px)',
        cursor: 'default',
        opacity: active ? 1 : 0,
        animation: active ? `fadeSlideUp 0.6s ease ${index * 0.1}s both` : 'none',
      }}
    >
      <div style={{
        fontSize: '2.2rem', marginBottom: '0.75rem',
        filter: hovered ? `drop-shadow(0 0 12px ${stat.color})` : 'none',
        transition: 'filter 0.3s ease',
      }}>{stat.icon}</div>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
        fontWeight: 800,
        color: stat.color,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        marginBottom: '0.4rem',
        textShadow: hovered ? `0 0 20px ${stat.color}60` : 'none',
        transition: 'text-shadow 0.3s ease',
      }}>
        {count}{stat.suffix}
      </div>
      <div style={{
        fontSize: '0.88rem',
        color: '#94a3b8',
        fontWeight: 500,
        lineHeight: 1.4,
      }}>{stat.label}</div>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="stats" style={{
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
      background: 'linear-gradient(180deg, #030712 0%, #0a0f1e 50%, #030712 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle top line */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: '#f8fafc',
            letterSpacing: '-0.03em',
            marginBottom: '0.75rem',
          }}>
            Trusted by Students Across India
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
            Real numbers from real career transformations
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1.25rem',
        }}>
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} active={active} index={i} />
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
