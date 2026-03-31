/**
 * InsightsPanel.jsx
 * -----------------
 * Displays AI-generated, human-like career insights for the user.
 * Each insight is rendered as an animated card with icon + text.
 */

import React from 'react';

// Derive a subtle background color from the emoji prefix
function getInsightStyle(text) {
  if (text.startsWith('🚀')) return { accent: '#10b981', bg: 'rgba(16,185,129,0.07)', border: 'rgba(16,185,129,0.2)' };
  if (text.startsWith('⭐')) return { accent: '#06b6d4', bg: 'rgba(6,182,212,0.07)', border: 'rgba(6,182,212,0.2)' };
  if (text.startsWith('📈')) return { accent: '#f59e0b', bg: 'rgba(245,158,11,0.07)', border: 'rgba(245,158,11,0.2)' };
  if (text.startsWith('💪')) return { accent: '#ef4444', bg: 'rgba(239,68,68,0.07)', border: 'rgba(239,68,68,0.2)' };
  if (text.startsWith('🎯')) return { accent: '#8b5cf6', bg: 'rgba(139,92,246,0.07)', border: 'rgba(139,92,246,0.2)' };
  if (text.startsWith('📚')) return { accent: '#6366f1', bg: 'rgba(99,102,241,0.07)', border: 'rgba(99,102,241,0.2)' };
  if (text.startsWith('✅')) return { accent: '#10b981', bg: 'rgba(16,185,129,0.07)', border: 'rgba(16,185,129,0.2)' };
  if (text.startsWith('💡')) return { accent: '#f472b6', bg: 'rgba(244,114,182,0.07)', border: 'rgba(244,114,182,0.2)' };
  if (text.startsWith('🌟')) return { accent: '#fbbf24', bg: 'rgba(251,191,36,0.07)', border: 'rgba(251,191,36,0.2)' };
  if (text.startsWith('📊')) return { accent: '#06b6d4', bg: 'rgba(6,182,212,0.07)', border: 'rgba(6,182,212,0.2)' };
  if (text.startsWith('🔍')) return { accent: '#94a3b8', bg: 'rgba(148,163,184,0.07)', border: 'rgba(148,163,184,0.2)' };
  return { accent: '#6366f1', bg: 'rgba(99,102,241,0.07)', border: 'rgba(99,102,241,0.2)' };
}

function InsightCard({ text, index }) {
  const style = getInsightStyle(text);
  const emoji = text.match(/^(\p{Emoji})/u)?.[1] || '💡';
  const message = text.replace(/^(\p{Emoji}\s*)/u, '').trim();

  return (
    <div
      style={{
        display: 'flex', alignItems: 'flex-start', gap: '0.9rem',
        padding: '1rem 1.1rem', borderRadius: 'var(--radius-md)',
        background: style.bg, border: `1px solid ${style.border}`,
        marginBottom: '0.65rem',
        animation: `slideUp 0.45s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms both`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateX(4px)';
        e.currentTarget.style.boxShadow = `0 4px 16px ${style.border}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateX(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Icon bubble */}
      <div style={{
        width: '36px', height: '36px', flexShrink: 0,
        borderRadius: '10px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '1.1rem',
        background: `${style.accent}22`, border: `1px solid ${style.accent}44`,
      }}>
        {emoji}
      </div>

      {/* Text */}
      <div style={{ flex: 1, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55, paddingTop: '2px' }}>
        {message}
      </div>
    </div>
  );
}

export default function InsightsPanel({ insights = [], bestFitJob = '', bestFitScore = 0 }) {
  if (!insights.length) return null;

  return (
    <div className="glass-card animate-slide-up" style={{ padding: '1.75rem' }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '1.25rem' }}>
        <div className="section-icon section-icon-purple">🧠</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 0 }}>
            AI Career Insights
          </h3>
          <p style={{ fontSize: '0.82rem', marginBottom: 0 }}>
            Personalised analysis based on your resume
          </p>
        </div>
        {/* "Ready for X" pill */}
        {bestFitJob && (
          <div style={{
            padding: '0.35rem 0.85rem', borderRadius: '100px',
            background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
            fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary-light)',
            whiteSpace: 'nowrap',
          }}>
            {bestFitScore}% → {bestFitJob}
          </div>
        )}
      </div>

      {/* Insight cards */}
      <div>
        {insights.map((insight, i) => (
          <InsightCard key={i} text={insight} index={i} />
        ))}
      </div>
    </div>
  );
}
