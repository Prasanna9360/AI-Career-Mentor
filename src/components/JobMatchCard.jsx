/**
 * JobMatchCard.jsx  (v4 — Final Polish)
 * -----------------------------------------
 * Employment card with:
 *  - Professional readiness label ("⚠️ Needs Improvement" vs "🚀 Strong Match")
 *  - "Progress: X% complete → Y% remaining" line
 *  - ⏱ Time estimate chip
 *  - 👥 Candidate comparison insight
 *  - ⚡ Impact insight (learning X boosts match from A% → B%)
 *  - 🔥 Critical / ⚪ Other skill split in expanded view
 *  - Gradient progress bar
 */

import React, { useState, useEffect } from 'react';

/* ── Helpers ── */
function pctColor(pct) {
  if (pct >= 65) return '#10b981';
  if (pct >= 40) return '#f59e0b';
  return '#ef4444';
}

function progressClass(pct) {
  if (pct >= 65) return 'progress-high';
  if (pct >= 40) return 'progress-mid';
  return 'progress-low';
}

function readinessLabel(pct) {
  if (pct >= 75) return { text: '🚀 Strong Match',           cls: 'badge-success', short: 'Strong'    };
  if (pct >= 55) return { text: '⭐ Good Progress',          cls: 'badge-info',    short: 'Good'      };
  if (pct >= 35) return { text: '📈 Partial Fit',            cls: 'badge-warning', short: 'Partial'   };
  return              { text: '⚠️ Needs Improvement',        cls: 'badge-danger',  short: 'Low'       };
}

const EXP_COLORS = {
  'Beginner':     { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', text: '#34d399' },
  'Intermediate': { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.3)', text: '#818cf8' },
  'Advanced':     { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', text: '#fbbf24' },
};

const rankEmoji = ['🥇', '🥈', '🥉'];

export default function JobMatchCard({ job, rank }) {
  const [expanded, setExpanded] = useState(false);
  const [barWidth,  setBarWidth] = useState(0);

  const color     = pctColor(job.match_percentage);
  const label     = readinessLabel(job.match_percentage);
  const expStyle  = EXP_COLORS[job.experience_level] || EXP_COLORS['Intermediate'];
  const totalSkills   = (job.matched_skills?.length || 0) + (job.missing_skills?.length || 0);
  const remaining     = (100 - job.match_percentage).toFixed(1);
  const isTopPick     = rank === 1;

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(job.match_percentage), 120);
    return () => clearTimeout(t);
  }, [job.match_percentage]);

  return (
    <div
      className="glass-card animate-slide-up"
      style={{
        padding: '1.5rem',
        cursor: 'pointer',
        border: isTopPick ? `1px solid ${color}40` : '1px solid var(--glass-border)',
        animationDelay: `${(rank - 1) * 0.1}s`,
        transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: isTopPick ? `0 4px 24px ${color}18` : 'none',
      }}
      onClick={() => setExpanded(e => !e)}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 28px ${color}22`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = isTopPick ? `0 4px 24px ${color}18` : 'none'; }}
    >
      {/* ── Top row ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.85rem' }}>
        {/* Icon + rank */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: `${color}12`, border: `1px solid ${color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
          }}>
            {job.icon}
          </div>
          {rank <= 3 && (
            <div style={{ position: 'absolute', top: '-9px', right: '-9px', fontSize: '1rem', lineHeight: 1 }}>
              {rankEmoji[rank - 1]}
            </div>
          )}
        </div>

        {/* Title + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
            <h3 style={{ fontSize: '0.97rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              {job.title}
            </h3>
            <span style={{
              fontSize: '0.65rem', padding: '0.15rem 0.55rem', borderRadius: '100px',
              background: label.cls === 'badge-success' ? 'rgba(16,185,129,0.12)'
                        : label.cls === 'badge-info'    ? 'rgba(6,182,212,0.1)'
                        : label.cls === 'badge-warning' ? 'rgba(245,158,11,0.1)'
                        : 'rgba(239,68,68,0.1)',
              border: label.cls === 'badge-success' ? '1px solid rgba(16,185,129,0.3)'
                    : label.cls === 'badge-info'    ? '1px solid rgba(6,182,212,0.25)'
                    : label.cls === 'badge-warning' ? '1px solid rgba(245,158,11,0.25)'
                    : '1px solid rgba(239,68,68,0.25)',
              color: label.cls === 'badge-success' ? '#34d399'
                   : label.cls === 'badge-info'    ? '#22d3ee'
                   : label.cls === 'badge-warning' ? '#fbbf24'
                   : '#f87171',
              fontWeight: 700,
            }}>
              {label.text} ({job.match_percentage}% Ready)
            </span>
          </div>

          {/* Company — highlighted */}
          {job.company_name && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
              fontSize: '0.8rem', fontWeight: 700,
              color: 'var(--primary-light)', marginBottom: '0.3rem',
              padding: '0.1rem 0', letterSpacing: '0.01em',
            }}>
              🏢 <span style={{ textDecoration: 'underline', textUnderlineOffset: '2px', textDecorationColor: 'rgba(99,102,241,0.4)' }}>{job.company_name}</span>
            </div>
          )}

          {/* Meta chips row */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.73rem', color: 'var(--text-sub)' }}>💰 {job.salary_range}</span>
            <span style={{ fontSize: '0.73rem', color: 'var(--text-sub)' }}>📈 {job.demand}</span>
            {job.experience_level && (
              <span style={{
                fontSize: '0.65rem', padding: '0.1rem 0.42rem', borderRadius: '100px',
                background: expStyle.bg, border: `1px solid ${expStyle.border}`,
                color: expStyle.text, fontWeight: 600,
              }}>
                {job.experience_level}
              </span>
            )}
          </div>
        </div>

        {/* BIG match % */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{
            fontSize: '1.8rem', fontWeight: 900, lineHeight: 1,
            color,
            textShadow: `0 0 20px ${color}60`,
          }}>
            {job.match_percentage}%
          </div>
          <div style={{ fontSize: '0.62rem', color: 'var(--text-dim)', marginTop: '2px', fontWeight: 500 }}>
            match score
          </div>
        </div>
      </div>

      {/* ── Headline with symbol ── */}
      <div style={{
        padding: '0.6rem 0.9rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.85rem',
        background: `${color}0D`, border: `1px solid ${color}2A`,
        fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.4,
      }}>
        {job.match_percentage >= 65 ? '🚀' : job.match_percentage >= 40 ? '⭐' : '💪'}{' '}
        You are{' '}
        <span style={{ color, fontWeight: 800 }}>{job.match_percentage}% match</span>
        {' '}for <strong>{job.title}</strong>
        {job.company_name && <> at <strong style={{ color: 'var(--primary-light)' }}>{job.company_name}</strong></>}
      </div>

      {/* ── Gradient progress bar ── */}
      <div style={{ marginBottom: '0.45rem' }}>
        <div className="progress-track">
          <div
            style={{
              height: '100%', borderRadius: '100px',
              width: `${barWidth}%`,
              background: `linear-gradient(90deg, ${color}cc, ${color})`,
              boxShadow: `0 0 10px ${color}50`,
              transition: 'width 1s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        </div>
      </div>

      {/* ── Progress insight line ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
        <span style={{ fontSize: '0.76rem', color: 'var(--text-sub)' }}>
          Progress: <strong style={{ color }}>{job.match_percentage}% complete</strong>
          <span style={{ color: 'var(--text-dim)' }}> → {remaining}% remaining</span>
        </span>
        <span style={{ fontSize: '0.74rem', color: 'var(--text-sub)' }}>
          {job.matched_skills?.length || 0}/{totalSkills} skills
        </span>
      </div>

      {/* ── Time estimate + expand toggle ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {job.time_estimate && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            fontSize: '0.72rem', color: 'var(--text-dim)', fontStyle: 'italic',
          }}>
            ⏱ {job.time_estimate}
          </span>
        )}
        <span style={{
          marginLeft: 'auto', fontSize: '0.76rem', color: 'var(--primary-light)',
          display: 'flex', alignItems: 'center', gap: '0.25rem',
        }}>
          {expanded ? '▲ Hide' : '▼ Details'}
        </span>
      </div>

      {/* ── Expanded section ── */}
      {expanded && (
        <div style={{ marginTop: '1.15rem', paddingTop: '1.15rem', borderTop: '1px solid var(--glass-border)' }}>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.55, marginBottom: '1rem' }}>{job.description}</p>

          {/* Impact insight */}
          {job.impact_insight && (
            <div style={{
              padding: '0.65rem 0.9rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem',
              background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)',
              fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: 500,
              display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
            }}>
              <span style={{ flexShrink: 0 }}>⚡</span>
              <span style={{ lineHeight: 1.5 }}>{job.impact_insight}</span>
            </div>
          )}

          {/* Candidate comparison */}
          {job.candidate_comparison && (
            <div style={{
              padding: '0.55rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem',
              background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)',
              fontSize: '0.78rem', color: 'var(--text-sub)',
              display: 'flex', gap: '0.4rem', alignItems: 'center',
            }}>
              <span>👥</span> {job.candidate_comparison}
            </div>
          )}

          {/* ✅ Skills you have */}
          {(job.matched_skills?.length > 0) && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34d399', marginBottom: '0.45rem' }}>
                ✅ Skills You Have ({job.matched_skills.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {job.matched_skills.map(s => (
                  <span key={s} className="skill-chip skill-chip-success" style={{ fontSize: '0.72rem' }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* 🔥 Critical missing skills */}
          {(job.missing_critical?.length > 0) && (
            <div style={{ marginBottom: '0.85rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f87171', marginBottom: '0.45rem' }}>
                🔥 Critical Skills to Acquire ({job.missing_critical.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {job.missing_critical.map(s => (
                  <span key={s} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    padding: '0.25rem 0.6rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600,
                    background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171',
                  }}>
                    🔥 {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ⚪ Secondary missing */}
          {(job.missing_secondary?.length > 0) && (
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '0.45rem' }}>
                ⚪ Other Skills ({job.missing_secondary.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {job.missing_secondary.map(s => (
                  <span key={s} className="skill-chip skill-chip-danger" style={{ fontSize: '0.72rem' }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Fallback if no split data */}
          {!job.missing_critical && (job.missing_skills?.length > 0) && (
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f87171', marginBottom: '0.45rem' }}>
                ❌ Skills to Acquire ({job.missing_skills.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {job.missing_skills.map(s => (
                  <span key={s} className="skill-chip skill-chip-danger" style={{ fontSize: '0.72rem' }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
