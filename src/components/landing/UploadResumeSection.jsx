/**
 * UploadResumeSection.jsx
 * Full drag-and-drop upload zone embedded in the landing page
 * No login required — completely public
 */
import React, { useState, useRef, useCallback } from 'react';

export default function UploadResumeSection({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = useCallback((file) => {
    setError('');
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF files are supported. Please select a .pdf file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File too large. Please upload a PDF under 10 MB.');
      return;
    }
    setSelectedFile(file);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault(); setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleAnalyze = async () => {
    if (!selectedFile || isLoading) return;
    setIsLoading(true);
    try {
      await onUpload(selectedFile);
    } finally {
      setIsLoading(false);
    }
  };

  const formatSize = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

  return (
    <section id="upload" style={{
      padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
      background: 'linear-gradient(180deg, #030712 0%, #0a0f1e 100%)',
      position: 'relative',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 14px', borderRadius: '100px',
            background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
            fontSize: '0.75rem', fontWeight: 700, color: '#a5b4fc',
            letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            📄 Try It Now — No Sign In Required
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 800, color: '#f8fafc',
            letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '0.75rem',
          }}>
            Upload Your Resume &{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Get Instant AI Insights
            </span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
            Drag & drop your PDF resume below. Our AI analyzes it in under 5 seconds — completely free, no account needed.
          </p>
        </div>

        {/* Main upload card */}
        <div style={{
          background: 'rgba(15,23,42,0.8)',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: '24px',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.08)',
        }}>
          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !selectedFile && fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${
                isDragging ? '#6366f1' :
                selectedFile ? '#22c55e' :
                'rgba(255,255,255,0.12)'
              }`,
              borderRadius: '16px',
              padding: 'clamp(2.5rem, 5vw, 4rem) 2rem',
              textAlign: 'center',
              cursor: selectedFile ? 'default' : 'pointer',
              transition: 'all 0.3s ease',
              background: isDragging
                ? 'rgba(99,102,241,0.08)'
                : selectedFile
                ? 'rgba(34,197,94,0.05)'
                : 'rgba(255,255,255,0.02)',
              boxShadow: isDragging ? '0 0 0 4px rgba(99,102,241,0.2)' : 'none',
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={e => handleFile(e.target.files[0])}
              style={{ display: 'none' }}
              id="resumeFileInput"
            />

            {selectedFile ? (
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <div style={{
                  fontWeight: 700, fontSize: '1.05rem',
                  color: '#22c55e', marginBottom: '0.4rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {selectedFile.name}
                </div>
                <div style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  {formatSize(selectedFile.size)} · PDF Document · Ready to analyze
                </div>
                <button
                  onClick={e => { e.stopPropagation(); setSelectedFile(null); setError(''); }}
                  style={{
                    padding: '8px 18px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#94a3b8', fontSize: '0.82rem',
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                  }}
                >
                  🔄 Change File
                </button>
              </div>
            ) : (
              <div>
                <div style={{
                  width: '72px', height: '72px', margin: '0 auto 1.25rem',
                  borderRadius: '18px',
                  background: isDragging ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)',
                  border: `1px solid ${isDragging ? 'rgba(99,102,241,0.5)' : 'rgba(99,102,241,0.2)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem',
                  transform: isDragging ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                }}>
                  📄
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: '1.05rem',
                  color: isDragging ? '#a5b4fc' : '#e2e8f0',
                  marginBottom: '0.5rem',
                }}>
                  {isDragging ? 'Drop your resume here!' : 'Drag & drop your resume'}
                </div>
                <div style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
                  or <span style={{ color: '#6366f1', fontWeight: 600 }}>click to browse files</span>
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontSize: '0.75rem', color: '#334155',
                  padding: '4px 12px', borderRadius: '100px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  📋 PDF only · Max 10 MB · 100% private
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={{
              marginTop: '1rem', padding: '10px 14px', borderRadius: '10px',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
              color: '#f87171', fontSize: '0.85rem',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Analyze Button */}
          {selectedFile && (
            <button
              id="analyze-resume-btn"
              onClick={handleAnalyze}
              disabled={isLoading}
              style={{
                width: '100%', marginTop: '1.25rem',
                padding: '15px', borderRadius: '12px', border: 'none',
                background: isLoading
                  ? 'rgba(99,102,241,0.5)'
                  : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff',
                fontSize: '1.05rem', fontWeight: 700,
                cursor: isLoading ? 'wait' : 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                boxShadow: isLoading ? 'none' : '0 4px 24px rgba(99,102,241,0.5)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.6)'; }}}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = isLoading ? 'none' : '0 4px 24px rgba(99,102,241,0.5)'; }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    animation: 'spin 0.7s linear infinite',
                  }} />
                  Analyzing with AI…
                </>
              ) : '🚀 Analyze My Resume — Free'}
            </button>
          )}

          {/* What you'll get row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.75rem', marginTop: '1.5rem',
          }}>
            {[
              { icon: '📊', text: 'ATS Score' },
              { icon: '🎯', text: '25 Job Matches' },
              { icon: '🔍', text: 'Skill Gap Report' },
              { icon: '🗺️', text: 'Learning Roadmap' },
              { icon: '💰', text: 'Salary Insights' },
              { icon: '🧠', text: 'Interview Prep' },
            ].map(f => (
              <div key={f.text} style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '8px 12px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                fontSize: '0.8rem', color: '#64748b',
              }}>
                <span style={{ fontSize: '1rem' }}>{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>
        </div>

        {/* Privacy note */}
        <div style={{
          textAlign: 'center', marginTop: '1.25rem',
          fontSize: '0.78rem', color: '#334155',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        }}>
          🔒 Your resume is never stored or shared. Analyzed locally and discarded immediately.
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
