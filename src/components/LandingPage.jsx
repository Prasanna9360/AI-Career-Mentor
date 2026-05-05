/**
 * LandingPage.jsx — v6
 * Asymmetric two-column layout — left: bold editorial text + features
 * Right: upload panel. Completely different from generic AI-generated look.
 * Colors: deep navy background, orange accent, clean typography.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth }  from '../context/AuthContext';
import UserMenu     from './UserMenu';

const PHRASES = [
  'your next job',
  'your skill gaps',
  'your career path',
  'your market value',
  'your ATS score',
];

function useTypewriter(phrases, speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [pi, setPi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = phrases[pi];
    let t;
    if (!del && ci < cur.length) t = setTimeout(() => setCi(i => i + 1), speed);
    else if (!del && ci === cur.length) t = setTimeout(() => setDel(true), pause);
    else if (del && ci > 0) t = setTimeout(() => setCi(i => i - 1), speed / 2);
    else { setDel(false); setPi(i => (i + 1) % phrases.length); }
    setText(cur.slice(0, ci));
    return () => clearTimeout(t);
  }, [ci, del, pi, phrases, speed, pause]);

  return text;
}

const FEATURES = [
  { icon: '⊞', label: '25 Job Roles Matched',       color: 'var(--primary)',  desc: 'From Data Scientist to SRE — mapped to real companies' },
  { icon: '◉', label: 'ATS Score Deep Analyzer',    color: 'var(--blue)',     desc: 'Know exactly what ATS systems look for in your resume' },
  { icon: '◑', label: 'AI Interview Prep',           color: 'var(--green)',    desc: 'Role-specific Q&A bank + Groq AI personalized questions' },
  { icon: '◐', label: 'Salary Market Insights',      color: 'var(--yellow)',   desc: 'Entry/mid/senior salary data for 25 real job roles' },
  { icon: '◒', label: 'LinkedIn Optimizer',          color: 'var(--purple)',   desc: 'Turn your analysis into a magnetic LinkedIn profile' },
  { icon: '⊗', label: 'Groq AI Career Mentor',       color: 'var(--primary)',  desc: 'Context-aware AI that knows your resume and guides you' },
];

export default function LandingPage({ onUpload, onDemo, error, onLogout }) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const typed = useTypewriter(PHRASES);
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn } = useAuth();

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setUploadError('Please upload a PDF file only.');
      return;
    }
    setUploadError('');
    setFileName(file.name);
    setIsLoading(true);
    onUpload(file);
  }, [onUpload]);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const err = error || uploadError;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle background decor — geometric, not blob */}
      <div style={{
        position: 'fixed', top: 0, right: 0,
        width: '40vw', height: '100vh',
        background: 'linear-gradient(180deg, rgba(249,115,22,0.04) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
        borderLeft: '1px solid rgba(249,115,22,0.06)',
      }} />
      <div style={{
        position: 'fixed', bottom: 0, left: 0,
        width: '100%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)',
        zIndex: 0,
      }} />

      {/* Grid dot background */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: 56,
        background: 'rgba(11,15,26,0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 30, height: 30, background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', boxShadow: '0 2px 12px rgba(99,102,241,0.4)' }}>🧠</div>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
            AI Career Copilot
          </span>
          <span style={{ fontSize: '10px', padding: '2px 7px', background: 'var(--primary-subtle)', color: 'var(--primary)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 100, fontWeight: 700 }}>v9</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border-md)', background: 'var(--bg-card)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)' }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          {isLoggedIn ? (
            <UserMenu onLogout={onLogout} />
          ) : null}
        </div>
      </nav>

      {/* ── MAIN: ASYMMETRIC TWO-COLUMN ── */}
      <main style={{
        position: 'relative', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 420px',
        gap: 0,
        minHeight: 'calc(100vh - 60px)',
      }} className="landing-grid">

        {/* ── LEFT: Editorial Hero ── */}
        <div style={{
          padding: 'clamp(2.5rem, 6vw, 5rem) clamp(2rem, 5vw, 5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRight: '1px solid var(--border)',
        }}>
          {/* Eyebrow tag */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            marginBottom: '1.5rem',
            fontSize: '0.75rem', fontWeight: 600,
            color: 'var(--primary)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            <div style={{ width: 20, height: 1, background: 'var(--primary)' }} />
            AI-Powered Career Platform
            <div style={{ width: 20, height: 1, background: 'var(--primary)' }} />
          </div>

          {/* Main headline */}
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: 'var(--text-1)',
            marginBottom: '1rem',
          }}>
            Discover<br />
            <span style={{ color: 'var(--primary)' }}>{typed}</span>
            <span style={{ color: 'var(--primary)', animation: 'blink 1s step-end infinite' }}>_</span>
          </h1>

          <p style={{
            fontSize: 'clamp(0.88rem, 1.3vw, 1rem)',
            color: 'var(--text-3)',
            maxWidth: 440, lineHeight: 1.65, marginBottom: '2rem',
          }}>
            Upload your resume → instant AI analysis.
            25 job matches, ATS score, interview prep, salary data, and career roadmap in under 5s.
          </p>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: '2rem', marginBottom: '3rem',
            flexWrap: 'wrap',
          }}>
            {[
              { n: '25', label: 'Job Roles' },
              { n: '5s',  label: 'Analysis Time' },
              { n: '6',   label: 'AI Tools' },
              { n: '∞',   label: 'Free Forever' },
            ].map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '1.8rem', fontWeight: 700,
                  color: 'var(--text-1)', letterSpacing: '-0.03em', lineHeight: 1,
                }}>{s.n}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-4)', marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Feature list */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', maxWidth: 560 }}>
            {FEATURES.map(f => (
              <div key={f.label} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                transition: 'var(--transition)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${f.color}44`; e.currentTarget.style.background = `${f.color}08`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; }}
              >
                <span style={{ fontSize: '1rem', color: f.color, flexShrink: 0, marginTop: 1 }}>{f.icon}</span>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-1)', marginBottom: '0.15rem' }}>{f.label}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-4)', lineHeight: 1.4 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Upload Panel ── */}
        <div style={{
          background: 'var(--bg-panel)',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1.5rem',
        }}>
          {/* Panel header */}
          <div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.35rem', fontWeight: 700,
              color: 'var(--text-1)', marginBottom: '0.4rem',
              letterSpacing: '-0.02em',
            }}>
              Start your analysis
            </h2>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-4)', lineHeight: 1.5 }}>
              Upload a PDF resume to unlock all 6 AI tools instantly.
            </p>
          </div>

          {/* Upload dropzone */}
          <div
            onDrop={onDrop}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onClick={() => !isLoading && inputRef.current?.click()}
            style={{
              border: `2px dashed ${dragging ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 16,
              padding: '32px 24px',
              background: dragging ? 'var(--primary-subtle)' : 'rgba(255,255,255,0.02)',
              cursor: isLoading ? 'wait' : 'pointer',
              transition: 'var(--transition)',
              textAlign: 'center',
            }}
          >
            {isLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: '3px solid var(--primary-subtle)',
                  borderTop: '3px solid var(--primary)',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '14px' }}>Analyzing your resume…</div>
                <div style={{ fontSize: '12px', color: 'var(--text-4)' }}>Usually takes 3–5 seconds</div>
              </div>
            ) : (
              <>
                <div style={{
                  width: 52, height: 52,
                  background: fileName ? 'var(--green-subtle)' : 'var(--primary-subtle)',
                  border: `1px solid ${fileName ? 'var(--green-border)' : 'rgba(99,102,241,0.3)'}`,
                  borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', margin: '0 auto 16px',
                }}>
                  {fileName ? '✅' : '📄'}
                </div>
                <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-1)', marginBottom: '4px' }}>
                  {fileName || 'Drop your resume here'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-4)', marginBottom: '20px' }}>
                  {fileName ? `✅ ${fileName}` : 'or click to browse · PDF only'}
                </div>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
                  style={{ width: '100%', marginBottom: '8px', justifyContent: 'center' }}
                >
                  {fileName ? '🚀 Analyze Now' : '📤 Upload PDF Resume'}
                </button>
                {!fileName && onDemo && (
                  <button
                    className="btn btn-secondary"
                    onClick={e => { e.stopPropagation(); onDemo(); }}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    ✨ View Demo Dashboard
                  </button>
                )}
              </>
            )}
            <input ref={inputRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
          </div>

          {/* Error */}
          {err && (
            <div className="alert alert-danger" style={{ fontSize: '0.82rem' }}>
              ⚠️ {err}
            </div>
          )}

          {/* What you get */}
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-4)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
              What you'll get instantly
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {[
                '◈ 25 job role matches with % scores',
                '◉ Full ATS compatibility analysis',
                '◑ Interview questions for your best role',
                '◐ Salary range for your profile',
                '⊗ Groq AI career mentor chat',
                '◒ LinkedIn profile optimizer',
              ].map((item, i) => (
                <div key={i} style={{
                  fontSize: '0.78rem', color: 'var(--text-3)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem' }}>{item[0]}</span>
                  {item.slice(2)}
                </div>
              ))}
            </div>
          </div>

          {/* Trust signals */}
          <div style={{
            padding: '0.85rem',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            fontSize: '0.75rem', color: 'var(--text-4)',
            display: 'flex', gap: '1rem', flexWrap: 'wrap',
          }}>
            <span>🔒 Not stored</span>
            <span>⚡ Under 5s</span>
            <span>🤖 Groq AI</span>
            <span>🆓 Always free</span>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @media (max-width: 900px) {
          .landing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
