/**
 * App.jsx
 * -------
 * Root component for AI Career Mentor.
 * Manages global state: 'upload' | 'loading' | 'dashboard'
 */

import React, { useState } from 'react';
import UploadSection from './components/UploadSection';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import { uploadResume } from './utils/api';

export default function App() {
  const [appState, setAppState] = useState('upload'); // 'upload' | 'loading' | 'dashboard'
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = async (file) => {
    setError('');
    setAppState('loading');

    try {
      const data = await uploadResume(file);
      setAnalysisData(data);
      setAppState('dashboard');
    } catch (err) {
      setError(err.message || 'Failed to analyze resume. Please try again.');
      setAppState('upload');
    }
  };

  const handleReset = () => {
    setAppState('upload');
    setAnalysisData(null);
    setError('');
  };

  return (
    <>
      {/* ── Upload Screen ── */}
      {appState === 'upload' && (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '2rem',
        }}>
          <UploadSection onUpload={handleUpload} isLoading={false} />

          {/* Error display */}
          {error && (
            <div style={{
              maxWidth: '680px', width: '100%', marginTop: '1rem',
              padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)',
              background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#f87171', fontSize: '0.9rem', textAlign: 'center',
            }}>
              ⚠️ {error}
              <div style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: 'var(--text-sub)' }}>
                Make sure the Python backend is running:{' '}
                <code style={{ color: 'var(--primary-light)', fontSize: '0.8rem' }}>
                  cd backend && uvicorn main:app --reload
                </code>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Loading Screen ── */}
      {appState === 'loading' && <LoadingScreen />}

      {/* ── Dashboard ── */}
      {appState === 'dashboard' && analysisData && (
        <Dashboard data={analysisData} onReset={handleReset} />
      )}

      {/* ── Global Chatbot (always visible) ── */}
      <ChatBot />
    </>
  );
}
