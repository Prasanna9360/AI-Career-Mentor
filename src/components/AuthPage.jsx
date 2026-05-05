/**
 * AuthPage.jsx — v2
 * Login + Signup + Google Sign-In
 * Production-ready: real API calls, loading states, error messages, toasts.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

/* ── Field component ─────────────────────────────────────────── */
function Field({ label, type = 'text', value, onChange, placeholder, error, autoComplete, icon }) {
  const [focused, setFocused] = useState(false);
  const [showPw,  setShowPw]  = useState(false);
  const isPassword = type === 'password';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-2)', letterSpacing: '-0.01em' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type={isPassword && showPw ? 'text' : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          style={{
            height: '44px', width: '100%',
            padding: isPassword ? '0 44px 0 14px' : '0 14px',
            background: 'var(--bg-input)',
            border: `1px solid ${error ? 'var(--danger)' : focused ? 'var(--primary)' : 'var(--border-md)'}`,
            borderRadius: '10px',
            color: 'var(--text-1)', fontSize: '14px',
            outline: 'none', transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
            boxShadow: focused && !error ? '0 0 0 3px var(--primary-glow)' : 'none',
            fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPw(v => !v)}
            tabIndex={-1}
            style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: 'var(--text-4)', padding: 0 }}
            title={showPw ? 'Hide password' : 'Show password'}
          >
            {showPw ? '🙈' : '👁'}
          </button>
        )}
      </div>
      {error && <span style={{ fontSize: '12px', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '4px' }}>⚠ {error}</span>}
    </div>
  );
}

/* ── Toast ─────────────────────────────────────────────────── */
function Toast({ message, type = 'success', visible }) {
  if (!visible) return null;
  const cfg = {
    success: { bg: 'var(--success-subtle)', border: 'var(--success-border)', color: 'var(--success)', icon: '✅' },
    error:   { bg: 'var(--danger-subtle)',  border: 'var(--danger-border)',  color: 'var(--danger)',  icon: '⚠️' },
  }[type];
  return (
    <div style={{
      position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 9999, padding: '12px 20px',
      background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color,
      borderRadius: '10px', fontSize: '13px', fontWeight: 600,
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      animation: 'slideDown 0.3s cubic-bezier(0.16,1,0.3,1)',
      display: 'flex', alignItems: 'center', gap: '8px',
      maxWidth: '380px', textAlign: 'center',
    }}>
      {cfg.icon} {message}
    </div>
  );
}

/* ── Google Sign-In button ─────────────────────────────────── */
function GoogleButton({ onClick, loading }) {
  return (
    <button
      type="button" onClick={onClick} disabled={loading}
      style={{
        width: '100%', height: '44px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
        background: 'var(--bg-card)', border: '1px solid var(--border-md)',
        borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: '14px', fontWeight: 600, color: 'var(--text-2)',
        transition: 'all 0.18s ease', fontFamily: 'Inter, sans-serif',
        opacity: loading ? 0.6 : 1,
      }}
      onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = 'var(--bg-card-hover)'; e.currentTarget.style.borderColor = 'var(--border-active)'; }}}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.borderColor = 'var(--border-md)'; }}
    >
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M47.5 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h13.2c-.6 3-2.3 5.5-4.9 7.2v6h7.9c4.6-4.3 7.3-10.6 7.3-17.3z"/>
        <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.9-6c-2.1 1.4-4.8 2.2-8 2.2-6.2 0-11.4-4.2-13.3-9.8H2.5v6.2C6.5 42.5 14.7 48 24 48z"/>
        <path fill="#FBBC05" d="M10.7 28.6c-.5-1.4-.7-2.9-.7-4.6s.3-3.2.7-4.6v-6.2H2.5C.9 16.6 0 20.2 0 24s.9 7.4 2.5 10.8l8.2-6.2z"/>
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.7 0 6.5 5.5 2.5 13.2l8.2 6.2C12.6 13.7 17.8 9.5 24 9.5z"/>
      </svg>
      Continue with Google
    </button>
  );
}

/* ── Main AuthPage ──────────────────────────────────────────── */
export default function AuthPage({ mode = 'login', onSwitch, onSkip }) {
  const { login, signup, googleAuth } = useAuth();
  const { theme, toggleTheme }         = useTheme();
  const isLogin = mode === 'login';

  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [toast,    setToast]    = useState({ visible: false, message: '', type: 'success' });

  /* ── Load Google Identity Services script ── */
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  function showToast(message, type = 'success') {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3500);
  }

  function validate() {
    const e = {};
    if (!isLogin && !name.trim())   e.name     = 'Name is required';
    if (!email)                     e.email    = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password)                  e.password = 'Password is required';
    else if (password.length < 6)  e.password = 'Min 6 characters';
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate() || loading) return;
    setLoading(true);
    setErrors({});
    try {
      if (isLogin) {
        await login({ email, password });
        showToast('Welcome back! 👋', 'success');
      } else {
        await signup({ name, email, password });
        showToast('Account created! Let\'s build your career 🚀', 'success');
      }
    } catch (err) {
      const msg = err.message;
      showToast(msg, 'error');
      if (/email/i.test(msg))    setErrors({ email: msg });
      else if (/password/i.test(msg)) setErrors({ password: msg });
      else if (/name/i.test(msg))     setErrors({ name: msg });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleClick() {
    if (!GOOGLE_CLIENT_ID) {
      showToast('Google Sign-In not configured yet — use email/password.', 'error');
      return;
    }
    setGLoading(true);
    try {
      await new Promise((resolve, reject) => {
        window.google?.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async ({ credential }) => {
            try { await googleAuth(credential); resolve(); }
            catch (err) { reject(err); }
          },
        });
        window.google?.accounts.id.prompt(notification => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            reject(new Error('Google Sign-In was dismissed.'));
          }
        });
      });
      showToast('Signed in with Google! 🎉', 'success');
    } catch (err) {
      showToast(err.message || 'Google Sign-In failed.', 'error');
    } finally {
      setGLoading(false);
    }
  }

  return (
    <>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />

      <div style={{
        minHeight: '100vh', background: 'var(--bg-base)',
        display: 'flex', flexDirection: 'column',
        backgroundImage: 'radial-gradient(rgba(99,102,241,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}>

        {/* Nav */}
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px', height: 56,
          borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 30, height: 30, background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', boxShadow: '0 2px 12px rgba(99,102,241,0.4)' }}>🧠</div>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--text-1)', letterSpacing: '-0.01em' }}>AI Career Copilot</span>
            <span style={{ fontSize: '10px', padding: '2px 7px', background: 'var(--primary-subtle)', color: 'var(--primary)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 100, fontWeight: 700 }}>v9</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {onSkip && (
              <button onClick={onSkip} style={{ background: 'none', border: '1px solid var(--border-md)', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 500, color: 'var(--text-3)', fontFamily: 'Inter, sans-serif', transition: 'var(--transition)' }}>
                Try Demo →
              </button>
            )}
            <button onClick={toggleTheme} title="Toggle theme"
              style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border-md)', background: 'var(--bg-card)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)' }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>

        {/* Card */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
          <div style={{
            width: '100%', maxWidth: '400px',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '16px', padding: '32px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
            animation: 'cardIn 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ width: 52, height: 52, background: 'var(--primary-subtle)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 16px' }}>
                {isLogin ? '🔐' : '🚀'}
              </div>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.03em', marginBottom: '6px', fontFamily: 'Space Grotesk, sans-serif' }}>
                {isLogin ? 'Welcome back' : 'Create your account'}
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--text-4)', margin: 0 }}>
                {isLogin ? 'Sign in to your career dashboard' : 'Start your AI career journey — free forever'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {!isLogin && (
                <Field label="Full Name" value={name} onChange={setName} placeholder="Alex Johnson" error={errors.name} autoComplete="name" />
              )}
              <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="alex@example.com" error={errors.email} autoComplete="email" />
              <Field label="Password" type="password" value={password} onChange={setPassword} placeholder={isLogin ? '••••••••' : 'Min 6 characters'} error={errors.password} autoComplete={isLogin ? 'current-password' : 'new-password'} />

              {isLogin && (
                <div style={{ textAlign: 'right', marginTop: '-6px' }}>
                  <button type="button" style={{ background: 'none', border: 'none', fontSize: '12px', color: 'var(--primary)', cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: 0 }}>
                    Forgot password?
                  </button>
                </div>
              )}

              <button type="submit" disabled={loading}
                style={{
                  height: '44px', width: '100%', marginTop: '4px',
                  background: loading ? 'var(--primary-dark)' : 'var(--primary)',
                  color: '#fff', border: 'none', borderRadius: '10px',
                  fontSize: '14px', fontWeight: 700, cursor: loading ? 'wait' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'all 0.2s ease', fontFamily: 'Inter, sans-serif',
                  boxShadow: loading ? 'none' : '0 4px 16px rgba(99,102,241,0.35)',
                }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.45)'; }}}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.35)'; }}
              >
                {loading ? (
                  <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  {isLogin ? 'Signing in…' : 'Creating account…'}</>
                ) : (isLogin ? '🔓 Sign In' : '🚀 Create Account')}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-4)', fontWeight: 500 }}>or continue with</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>

            <GoogleButton onClick={handleGoogleClick} loading={gLoading} />

            {/* Switch mode */}
            <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--text-4)' }}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button type="button" onClick={onSwitch}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontSize: '13px', fontFamily: 'Inter, sans-serif', padding: 0 }}>
                {isLogin ? 'Sign up free' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid var(--border)', display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['🔒 Password hashed with bcrypt', '⚡ JWT sessions (7 days)', '🤖 Groq AI powered', '🆓 Always free'].map(t => (
            <span key={t} style={{ fontSize: '12px', color: 'var(--text-4)' }}>{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes cardIn  { from { opacity:0; transform:scale(0.95) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes slideDown { from { opacity:0; transform:translateX(-50%) translateY(-8px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
      `}</style>
    </>
  );
}
