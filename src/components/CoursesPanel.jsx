/**
 * CoursesPanel.jsx
 * ----------------
 * Displays recommended courses for skill gaps.
 * Shows platform badge, difficulty, duration, and direct link.
 */

import React from 'react';

const PLATFORM_COLORS = {
  'Coursera':        { bg: 'rgba(0, 86, 210, 0.15)', border: 'rgba(0, 86, 210, 0.35)', color: '#60a5fa' },
  'DeepLearning.ai': { bg: 'rgba(6, 182, 212, 0.12)', border: 'rgba(6, 182, 212, 0.3)', color: '#22d3ee' },
  'freeCodeCamp':    { bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)', color: '#34d399' },
  'Udemy':           { bg: 'rgba(244, 114, 182, 0.12)', border: 'rgba(244, 114, 182, 0.3)', color: '#f472b6' },
  'Google':          { bg: 'rgba(234, 179, 8, 0.12)', border: 'rgba(234, 179, 8, 0.3)', color: '#fbbf24' },
  'AWS Training':    { bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)', color: '#fbbf24' },
  'Udacity':         { bg: 'rgba(99, 102, 241, 0.12)', border: 'rgba(99, 102, 241, 0.3)', color: '#818cf8' },
  'Microsoft Learn': { bg: 'rgba(99, 102, 241, 0.12)', border: 'rgba(99, 102, 241, 0.3)', color: '#818cf8' },
  'Hugging Face':    { bg: 'rgba(234, 179, 8, 0.12)', border: 'rgba(234, 179, 8, 0.3)', color: '#fbbf24' },
  'Atlassian':       { bg: 'rgba(99, 102, 241, 0.12)', border: 'rgba(99, 102, 241, 0.3)', color: '#818cf8' },
  'pytorch.org':     { bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.3)', color: '#f87171' },
};

const DIFFICULTY_COLOR = {
  'Beginner':     '#10b981',
  'Intermediate': '#f59e0b',
  'Advanced':     '#ef4444',
};

function CourseCard({ course, index }) {
  const plt = PLATFORM_COLORS[course.platform] || PLATFORM_COLORS['Coursera'];

  return (
    <div
      className="glass-card-flat animate-slide-up"
      style={{
        padding: '1.25rem', marginBottom: '0.75rem',
        border: '1px solid var(--glass-border)',
        animationDelay: `${index * 0.08}s`,
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        {/* Icon */}
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
          background: 'rgba(15, 23, 45, 0.8)', border: '1px solid var(--glass-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
        }}>
          {course.icon}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-main)',
                textDecoration: 'none', lineHeight: 1.3,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--primary-light)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-main)'}
            >
              {course.title} ↗
            </a>
          </div>

          {/* Badges row */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Platform */}
            <span style={{
              padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600,
              background: plt.bg, border: `1px solid ${plt.border}`, color: plt.color,
            }}>
              {course.platform}
            </span>

            {/* Difficulty */}
            <span style={{
              padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 500,
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)',
              color: DIFFICULTY_COLOR[course.difficulty] || 'var(--text-sub)',
            }}>
              {course.difficulty}
            </span>

            {/* Duration */}
            <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
              ⏱ {course.duration}
            </span>

            {/* Free badge */}
            {course.free && (
              <span className="badge badge-free" style={{ fontSize: '0.7rem' }}>FREE</span>
            )}
          </div>

          {/* Skill tag */}
          <div style={{ marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Fills gap: <span style={{ color: 'var(--primary-light)' }}>{course.skill}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPanel({ courses = [] }) {
  return (
    <div className="glass-card animate-slide-up delay-300" style={{ padding: '1.75rem' }}>
      {/* Header */}
      <div className="section-header">
        <div className="section-icon section-icon-green">📚</div>
        <div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 0 }}>
            Recommended Courses
          </h3>
          <p style={{ fontSize: '0.82rem', marginBottom: 0 }}>
            Curated learning paths to bridge your skill gaps
          </p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span className="badge badge-info">{courses.length} courses</span>
        </div>
      </div>

      {courses.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '2rem',
          color: 'var(--text-dim)', fontSize: '0.9rem',
        }}>
          🎉 No skill gaps found! You're fully loaded for your target roles.
        </div>
      ) : (
        <div>
          {courses.map((course, i) => (
            <CourseCard key={`${course.url}-${i}`} course={course} index={i} />
          ))}

          <div style={{
            marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--text-dim)',
            textAlign: 'center',
          }}>
            💡 Click any course title to open it in a new tab
          </div>
        </div>
      )}
    </div>
  );
}
