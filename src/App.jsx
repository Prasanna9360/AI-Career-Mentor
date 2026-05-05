/**
 * App.jsx — v9
 * Root with Auth + Theme + Copilot providers.
 * Auth flow: login/signup → landing → dashboard.
 */

import React, { useState, useEffect, Component } from 'react';
import LandingPage   from './components/LandingPage';
import Dashboard     from './components/Dashboard';
import AuthPage      from './components/AuthPage';
import CopilotPanel  from './components/CopilotPanel';
import { uploadResume } from './utils/api';
import { ThemeProvider }  from './context/ThemeContext';
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

/* ── Loading screen ────────────────────────────────────────── */
function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', background: 'var(--bg-base)' }}>
      <div style={{ width: 52, height: 52, borderRadius: '50%', border: '3px solid var(--primary-subtle)', borderTop: '3px solid var(--primary)', animation: 'spin 0.85s linear infinite' }} />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '6px' }}>
          Analyzing your resume…
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-4)' }}>
          Extracting skills · Matching roles · Generating insights
        </div>
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['Parsing PDF', 'Finding Skills', 'Matching Jobs', 'AI Insights'].map((s, i) => (
          <div key={s} style={{ padding: '4px 12px', background: 'var(--primary-subtle)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 100, fontSize: '11px', color: 'var(--primary)', opacity: 0, animation: `fadeIn 0.4s ease ${i * 0.6}s forwards` }}>{s}</div>
        ))}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeIn { to { opacity: 1; } }`}</style>
    </div>
  );
}

/* ── Inner App ─────────────────────────────────────────────── */
function AppInner() {
  const { user, isLoggedIn, logout, loading: authLoading } = useAuth();
  const { setProfile } = useCopilot();

  const [authMode,     setAuthMode]     = useState('login');
  const [appState,     setAppState]     = useState('auth');
  const [analysisData, setAnalysisData] = useState(null);
  const [error,        setError]        = useState('');

  // Once auth loading resolves, set initial state
  useEffect(() => {
    if (!authLoading) {
      setAppState(isLoggedIn ? 'landing' : 'auth');
    }
  }, [authLoading, isLoggedIn]);

  // When user logs in → go to landing
  useEffect(() => {
    if (isLoggedIn && appState === 'auth') setAppState('landing');
  }, [isLoggedIn]);

  // Sync resume into copilot
  useEffect(() => {
    try { if (analysisData) setProfile(analysisData); } catch (e) { console.warn('setProfile:', e); }
  }, [analysisData]);

  /* ── Demo mode ── */
  const handleDemo = async () => {
    setError('');
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
      setError(err.message || 'Failed to analyze resume. Make sure the backend is running on port 8000.');
      setAppState('landing');
    }
  };

  /* ── Reset to landing ── */
  const handleReset = () => {
    setAppState('landing');
    setAnalysisData(null);
    setError('');
  };

  /* ── Logout ── */
  const handleLogout = async () => {
    await logout();
    setAppState('auth');
    setAnalysisData(null);
    setAuthMode('login');
  };

  return (
    <>
      {/* Show spinner while session is being restored from localStorage/API */}
      {authLoading && (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid var(--primary-subtle)', borderTop: '3px solid var(--primary)', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Auth gate */}
      {!authLoading && appState === 'auth' && (
        <AuthPage
          mode={authMode}
          onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')}
          onSkip={() => { handleDemo(); }}   // guests can skip straight to demo
        />
      )}

      {appState === 'landing' && (
        <LandingPage
          onUpload={handleUpload}
          onDemo={handleDemo}
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
