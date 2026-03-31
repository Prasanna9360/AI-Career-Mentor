/**
 * Dashboard.jsx  (v3 — Skill-to-Employment Mapping Platform)
 * -----------------------------------------------------------
 * Tabs: Overview · Skill-to-Employment · JD Match · Roadmap · Courses · Resume Tips
 */

import React, { useState } from 'react';
import SkillsPanel        from './SkillsPanel';
import JobMatchCard       from './JobMatchCard';
import MissingSkills      from './MissingSkills';
import CoursesPanel       from './CoursesPanel';
import ReadinessScore     from './ReadinessScore';
import InsightsPanel      from './InsightsPanel';
import CareerRoadmap      from './CareerRoadmap';
import ResumeSuggestions  from './ResumeSuggestions';
import JDMatcher          from './JDMatcher';

const TABS = [
  { id: 'overview',  label: 'Overview',              icon: '🏠' },
  { id: 'jobs',      label: 'Skill-to-Employment',   icon: '🏢' },
  { id: 'jd',        label: 'JD Match',              icon: '📋' },
  { id: 'roadmap',   label: 'Roadmap',               icon: '🗺️' },
  { id: 'courses',   label: 'Courses',               icon: '📚' },
  { id: 'resume',    label: 'Resume Tips',            icon: '📝' },
];

export default function Dashboard({ data, onReset }) {
  const [activeTab, setActiveTab] = useState('overview');

  const {
    filename,
    extracted_skills          = [],
    job_matches               = [],
    top_3_matches             = [],
    career_readiness_score    = 0,
    best_fit_job              = '',
    best_fit_job_score        = 0,
    global_recommended_courses = [],
    insights                  = [],
    roadmap                   = [],
    roadmap_job               = '',
    resume_suggestions        = {},
  } = data;

  // Consolidated courses (global + per-job gaps, deduplicated)
  const allCourses = (() => {
    const seen = new Set();
    const result = [];
    const add = (courses) => courses.forEach(c => {
      if (!seen.has(c.url)) { seen.add(c.url); result.push(c); }
    });
    add(global_recommended_courses);
    top_3_matches.forEach(j => add(j.recommended_courses || []));
    return result.slice(0, 10);
  })();

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '5rem' }}>

      {/* ── Sticky Navbar ─────────────────────────────── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2rem', borderBottom: '1px solid var(--glass-border)',
        background: 'rgba(3,7,18,0.92)', backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 200,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🧠</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)', lineHeight: 1 }}>
              AI Career Mentor
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Skill-to-Employment Mapping · v3</div>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {best_fit_job && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.8rem', color: 'var(--text-sub)',
            }}>
              <span style={{ color: '#10b981', fontWeight: 700 }}>{best_fit_job_score}%</span>
              <span>ready for</span>
              <span style={{ color: 'var(--primary-light)', fontWeight: 600 }}>{best_fit_job}</span>
            </div>
          )}
          <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ color: 'var(--text-dim)' }}>📄</span> {filename}
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onReset}>
            ← New Resume
          </button>
        </div>
      </nav>

      {/* ── Tab Bar ──────────────────────────────────── */}
      <div style={{
        display: 'flex', gap: '0', overflowX: 'auto',
        borderBottom: '1px solid var(--glass-border)',
        background: 'rgba(10,15,30,0.6)', backdropFilter: 'blur(12px)',
        position: 'sticky', top: '61px', zIndex: 100,
        padding: '0 2rem',
      }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.8rem 1.1rem', background: 'none', border: 'none',
              borderBottom: `2px solid ${activeTab === tab.id ? 'var(--primary)' : 'transparent'}`,
              color: activeTab === tab.id ? 'var(--primary-light)' : 'var(--text-sub)',
              fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: activeTab === tab.id ? 600 : 400,
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--text-main)'; }}
            onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--text-sub)'; }}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* ── Content ──────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            {/* Title row */}
            <div className="animate-slide-up" style={{ marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.65rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                Your Career Dashboard
              </h2>
              <p style={{ fontSize: '0.88rem' }}>
                AI analysis complete · {extracted_skills.length} skills detected · {job_matches.length} roles analyzed
              </p>
            </div>

            {/* Row 1: Readiness + Skills */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)',
              gap: '1.25rem', marginBottom: '1.25rem',
            }} className="dash-row-1">
              <ReadinessScore
                score={career_readiness_score}
                bestFitJob={best_fit_job}
                bestFitScore={best_fit_job_score}
              />
              <SkillsPanel skills={extracted_skills} />
            </div>

            {/* Row 2: AI Insights (full width) */}
            <div style={{ marginBottom: '1.25rem' }}>
              <InsightsPanel
                insights={insights}
                bestFitJob={best_fit_job}
                bestFitScore={best_fit_job_score}
              />
            </div>

            {/* Row 3: Top 3 Job Matches */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div className="section-header" style={{ marginBottom: '1rem' }}>
                <div className="section-icon section-icon-cyan">💼</div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: 0 }}>
                    Top Job Matches
                  </h3>
                  <p style={{ fontSize: '0.8rem', marginBottom: 0 }}>
                    Your best-fit career paths — click to expand
                  </p>
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ marginLeft: 'auto' }}
                  onClick={() => setActiveTab('jobs')}
                >
                  See All →
                </button>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem',
              }}>
                {top_3_matches.map((job, i) => (
                  <JobMatchCard key={job.id} job={job} rank={i + 1} />
                ))}
              </div>
            </div>

            {/* Row 4: Gap Analysis + Roadmap preview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
              gap: '1.25rem',
            }} className="dash-row-3">
              <MissingSkills jobMatches={job_matches} />
              <CareerRoadmap roadmap={roadmap.slice(0, 7)} roadmapJob={roadmap_job} />
            </div>
          </div>
        )}

        {/* ── SKILL-TO-EMPLOYMENT TAB ── */}
        {activeTab === 'jobs' && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                Skill-to-Employment Mapping
              </h2>
              <p style={{ fontSize: '0.88rem' }}>{job_matches.length} roles matched with company &amp; experience level · sorted by fit</p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1rem',
            }}>
              {job_matches.map((job, i) => (
                <JobMatchCard key={job.id} job={job} rank={i + 1} />
              ))}
            </div>
          </div>
        )}

        {/* ── JD MATCH TAB ── */}
        {activeTab === 'jd' && (
          <JDMatcher resumeSkills={extracted_skills} />
        )}

        {/* ── ROADMAP TAB ── */}
        {activeTab === 'roadmap' && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                Your Career Roadmap
              </h2>
              <p style={{ fontSize: '0.88rem' }}>
                Step-by-step learning path for your best-fit role
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: '1.25rem' }}
              className="dash-row-1">
              <CareerRoadmap roadmap={roadmap} roadmapJob={roadmap_job} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <MissingSkills jobMatches={job_matches} />
              </div>
            </div>
          </div>
        )}

        {/* ── COURSES TAB ── */}
        {activeTab === 'courses' && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                Recommended Courses
              </h2>
              <p style={{ fontSize: '0.88rem' }}>Curated learning paths to bridge your skill gaps</p>
            </div>
            <CoursesPanel courses={allCourses} />
          </div>
        )}

        {/* ── RESUME TIPS TAB ── */}
        {activeTab === 'resume' && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                Resume Improvement Tips
              </h2>
              <p style={{ fontSize: '0.88rem' }}>
                Targeted suggestions to make your resume stand out
              </p>
            </div>
            <ResumeSuggestions suggestions={resume_suggestions} />
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: 'center', marginTop: '3rem',
          color: 'var(--text-dim)', fontSize: '0.78rem',
        }}>
          Built with ❤️ for hackathon · AI Skill-to-Employment Mapping Platform v3.0
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .dash-row-1, .dash-row-3 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          nav { padding: 0.85rem 1rem !important; flex-wrap: wrap; gap: 0.5rem; }
        }
      `}</style>
    </div>
  );
}
