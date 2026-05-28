/**
 * App.jsx — v10
 * Updated routing:
 * - Landing page is now PUBLIC (shown to everyone, no auth required)
 * - Auth modal overlays landing page when "Get Started" is clicked
 * - After login → Upload → Dashboard flow
 */
import React, { useState, useEffect, Component } from 'react';
import LandingPage  from './components/LandingPage';
import Dashboard    from './components/Dashboard';
import AuthPage     from './components/AuthPage';
import CopilotPanel from './components/CopilotPanel';
import { uploadResume } from './utils/api';
import { ThemeProvider }              from './context/ThemeContext';
import { CopilotProvider, useCopilot } from './context/CopilotContext';
import { AuthProvider, useAuth }       from './context/AuthContext';

/* ── Global error boundary ─────────────────────────────────── */
class RootErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', background: '#0b0f1a', padding: '32px' }}>
        <div style={{ fontSize: '40px' }}>🛠</div>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9' }}>Something went wrong</div>
        <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace', background: '#182030', padding: '12px 16px', borderRadius: 8, maxWidth: 500, wordBreak: 'break-word' }}>
          {this.state.error?.message || 'Unknown error'}
        </div>
        <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
          style={{ padding: '10px 24px', background: '#6366f1', border: 'none', borderRadius: 8, color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '14px' }}>
          Reload App
        </button>
      </div>
    );
    return this.props.children;
  }
}

/* ── AI Analysis Loading Screen ────────────────────────────── */
function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', background: '#030712' }}>
      {/* Animated orb */}
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', border: '3px solid rgba(99,102,241,0.15)', borderTop: '3px solid #6366f1', animation: 'spin 0.85s linear infinite', position: 'absolute' }} />
        <div style={{ width: 80, height: 80, borderRadius: '50%', border: '3px solid rgba(139,92,246,0.1)', borderBottom: '3px solid #8b5cf6', animation: 'spin 1.2s linear infinite reverse', position: 'absolute' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>🧠</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
          Analyzing your resume…
        </div>
        <div style={{ fontSize: '13px', color: '#475569' }}>
          Extracting skills · Matching roles · Generating insights
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['Parsing PDF', 'Finding Skills', 'Matching Jobs', 'AI Insights'].map((s, i) => (
          <div key={s} style={{
            padding: '4px 14px',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '100px', fontSize: '11px', color: '#a5b4fc',
            opacity: 0, animation: `fadeIn 0.4s ease ${i * 0.6}s forwards`,
          }}>{s}</div>
        ))}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeIn { to { opacity: 1; } }`}</style>
    </div>
  );
}

/* ── Auth Modal Overlay ─────────────────────────────────────── */
function AuthModal({ mode, onClose, onSwitch, onSkip }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(3,7,18,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: '#0a0f1e',
        border: '1px solid rgba(99,102,241,0.25)',
        borderRadius: '20px',
        overflow: 'hidden',
        width: '100%', maxWidth: '440px',
        boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
        animation: 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1)',
        position: 'relative',
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#64748b', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', zIndex: 1,
          }}
        >✕</button>
        <AuthPage
          mode={mode}
          onSwitch={onSwitch}
          onSkip={() => { onClose(); onSkip(); }}
        />
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
}

/* ── Inner App ─────────────────────────────────────────────── */
function AppInner() {
  const { isLoggedIn, logout, loading: authLoading } = useAuth();
  const { setProfile } = useCopilot();

  const [authMode,     setAuthMode]     = useState('login');
  const [showAuth,     setShowAuth]     = useState(false);
  const [appState,     setAppState]     = useState('landing'); // always start at landing
  const [analysisData, setAnalysisData] = useState(null);
  const [error,        setError]        = useState('');

  // Sync resume into copilot
  useEffect(() => {
    try { if (analysisData) setProfile(analysisData); } catch (e) { console.warn('setProfile:', e); }
  }, [analysisData]);

  /* ── Demo mode ── */
  const handleDemo = async () => {
    setError('');
    setShowAuth(false);
    setAppState('loading');
    setTimeout(async () => {
      try {
        const { DEMO_DATA } = await import('./utils/demoData');
        setAnalysisData(DEMO_DATA);
        setAppState('dashboard');
      } catch (err) {
        setError('Failed to load demo data.');
        setAppState('landing');
      }
    }, 1500);
  };

  /* ── Upload resume ── */
  const handleUpload = async (file) => {
    setError('');
    setAppState('loading');
    try {
      const data = await uploadResume(file);
      setAnalysisData(data);
      setAppState('dashboard');
    } catch (err) {
      setError(err.message || 'Failed to analyze resume. Make sure the backend is running.');
      setAppState('landing');
    }
  };

  /* ── "Get Started" click from landing ── */
  const handleGetStarted = () => {
    if (isLoggedIn) {
      // Already logged in → go straight to demo/upload
      handleDemo();
    } else {
      // Show auth modal
      setShowAuth(true);
    }
  };

  /* ── Reset ── */
  const handleReset = () => {
    setAppState('landing');
    setAnalysisData(null);
    setError('');
  };

  /* ── Logout ── */
  const handleLogout = async () => {
    await logout();
    setAppState('landing');
    setAnalysisData(null);
  };

  /* ── Auth skip = demo ── */
  const handleAuthSkip = () => handleDemo();

  /* ── Auth success (from AuthPage callback) ── */
  const handleAuthSuccess = () => {
    setShowAuth(false);
    handleDemo(); // take them to demo after login
  };

  if (authLoading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#030712' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(99,102,241,0.15)', borderTop: '3px solid #6366f1', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <>
      {/* Landing page — always visible unless in loading/dashboard */}
      {appState === 'landing' && (
        <LandingPage
          onUpload={handleUpload}
          onDemo={handleGetStarted}
          error={error}
          onLogout={handleLogout}
        />
      )}

      {appState === 'loading' && <LoadingScreen />}

      {appState === 'dashboard' && analysisData && (
        <RootErrorBoundary>
          <Dashboard data={analysisData} onReset={handleReset} onLogout={handleLogout} />
        </RootErrorBoundary>
      )}

      {/* Auth modal overlay */}
      {showAuth && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuth(false)}
          onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')}
          onSkip={handleAuthSkip}
        />
      )}

      <RootErrorBoundary>
        <CopilotPanel resumeContext={analysisData} />
      </RootErrorBoundary>
    </>
  );
}

/* ── Root ─────────────────────────────────────────────────── */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CopilotProvider>
          <AppInner />
        </CopilotProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
