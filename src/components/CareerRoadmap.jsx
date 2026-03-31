/**
 * CareerRoadmap.jsx
 * -----------------
 * Visualizes the career roadmap as an ordered checklist of skills.
 * Completed steps are green ✔, pending steps are dimmed ✗.
 * Features a path visualization connecting each step.
 */

import React, { useState } from 'react';

const STEP_COLORS = {
  done:    { bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.35)', text: '#34d399', icon: '#10b981' },
  core:    { bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.35)', text: '#818cf8', icon: '#6366f1' },
  next:    { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)',  text: '#fbbf24', icon: '#f59e0b' },
  pending: { bg: 'rgba(255,255,255,0.02)',border: 'rgba(255,255,255,0.06)',text: '#475569', icon: '#334155' },
};

function getStepStyle(step, isNext) {
  if (step.completed) return STEP_COLORS.done;
  if (isNext) return STEP_COLORS.next;
  if (step.is_core) return STEP_COLORS.core;
  return STEP_COLORS.pending;
}

export default function CareerRoadmap({ roadmap = [], roadmapJob = '' }) {
  const [expanded, setExpanded] = useState(false);
  if (!roadmap.length) return null;

  const firstIncomplete = roadmap.findIndex(s => !s.completed);
  const displaySteps = expanded ? roadmap : roadmap.slice(0, 7);
  const completedCount = roadmap.filter(s => s.completed).length;
  const progress = Math.round((completedCount / roadmap.length) * 100);

  return (
    <div className="glass-card animate-slide-up delay-100" style={{ padding: '1.75rem' }}>
      {/* Header */}
      <div className="section-header">
        <div className="section-icon section-icon-cyan">🗺️</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 0 }}>
            Career Roadmap
          </h3>
          <p style={{ fontSize: '0.82rem', marginBottom: 0 }}>
            Step-by-step path to become a <strong style={{ color: 'var(--primary-light)' }}>{roadmapJob}</strong>
          </p>
        </div>
        {/* Progress pill */}
        <div style={{
          padding: '0.3rem 0.8rem', borderRadius: '100px', flexShrink: 0,
          background: progress >= 60
            ? 'rgba(16,185,129,0.15)' : progress >= 30
            ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)',
          border: `1px solid ${progress >= 60 ? 'rgba(16,185,129,0.3)' : progress >= 30 ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)'}`,
          fontSize: '0.78rem', fontWeight: 700,
          color: progress >= 60 ? '#34d399' : progress >= 30 ? '#fbbf24' : '#f87171',
        }}>
          {completedCount}/{roadmap.length} done
        </div>
      </div>

      {/* Overall progress bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>Overall completion</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-light)' }}>{progress}%</span>
        </div>
        <div className="progress-track">
          <div
            className={`progress-fill ${progress >= 60 ? 'progress-high' : progress >= 30 ? 'progress-mid' : 'progress-low'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div style={{ position: 'relative' }}>
        {/* Vertical connector line */}
        <div style={{
          position: 'absolute', left: '17px', top: '24px',
          bottom: expanded ? '24px' : '10px',
          width: '2px',
          background: 'linear-gradient(to bottom, rgba(99,102,241,0.4), rgba(99,102,241,0.05))',
          zIndex: 0,
        }} />

        {displaySteps.map((step, i) => {
          const isNext = step.step - 1 === firstIncomplete;
          const style = getStepStyle(step, isNext);
          return (
            <div
              key={step.step}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.85rem',
                marginBottom: '0.55rem', position: 'relative', zIndex: 1,
                animation: `slideUp 0.35s ease ${i * 50}ms both`,
              }}
            >
              {/* Step circle */}
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: step.completed ? 'rgba(16,185,129,0.2)' : isNext ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                border: `2px solid ${style.border}`,
                fontSize: step.completed ? '1rem' : '0.75rem',
                fontWeight: 700, color: style.text,
                transition: 'all 0.25s ease',
                boxShadow: isNext ? `0 0 12px ${style.icon}55` : 'none',
              }}>
                {step.completed ? '✓' : step.step}
              </div>

              {/* Step content */}
              <div style={{
                flex: 1, padding: '0.55rem 0.9rem', borderRadius: 'var(--radius-sm)',
                background: style.bg, border: `1px solid ${style.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                opacity: step.completed ? 1 : step.step - 1 > firstIncomplete + 2 ? 0.5 : 1,
                transition: 'opacity 0.2s ease',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: step.completed || isNext ? 600 : 400, color: style.text }}>
                    {step.skill.charAt(0).toUpperCase() + step.skill.slice(1)}
                  </span>
                  {step.is_core && !step.completed && (
                    <span style={{
                      fontSize: '0.65rem', padding: '0.15rem 0.45rem', borderRadius: '100px',
                      background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.35)',
                      color: '#818cf8', fontWeight: 600,
                    }}>CORE</span>
                  )}
                  {isNext && (
                    <span style={{
                      fontSize: '0.65rem', padding: '0.15rem 0.45rem', borderRadius: '100px',
                      background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.35)',
                      color: '#fbbf24', fontWeight: 600,
                    }}>NEXT</span>
                  )}
                </div>
                <span style={{ fontSize: '1rem' }}>
                  {step.completed ? '✅' : isNext ? '⏳' : '⬜'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show more/less */}
      {roadmap.length > 7 && (
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setExpanded(e => !e)}
          style={{ marginTop: '0.75rem', width: '100%' }}
        >
          {expanded ? `▲ Show Less` : `▼ Show All ${roadmap.length} Steps`}
        </button>
      )}
    </div>
  );
}
