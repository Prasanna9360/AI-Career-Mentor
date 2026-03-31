/**
 * ChatBot.jsx
 * -----------
 * Floating career advice chatbot widget.
 * Rule-based responses from backend /api/chat endpoint,
 * with graceful fallback for offline mode.
 */

import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../utils/api';

// Fallback responses when backend is offline
const FALLBACK_RESPONSES = {
  'data scientist': 'For Data Science, focus on Python, SQL, Statistics, and ML libraries like scikit-learn. Coursera\'s ML specialization is a great start! 🎓',
  'web developer': 'Web Dev path: HTML → CSS → JavaScript → React. freeCodeCamp is perfect for free, structured learning! 🌐',
  'ai engineer': 'AI Engineer roadmap: Python → ML → Deep Learning → NLP → MLOps. DeepLearning.ai specializations are excellent! 🤖',
  'courses': 'Top free resources: freeCodeCamp, fast.ai, Kaggle Learn, and YouTube channels like Sentdex. For paid: Coursera & Udemy! 📚',
  'salary': 'Salaries vary: Data Scientist $90k-150k | AI Engineer $120k-200k | Web Dev $70k-130k (US averages) 💰',
  'resume': 'Keep your resume to 1 page under 5 years experience. Quantify achievements, link GitHub projects! ✨',
  'interview': 'For tech interviews: practice LeetCode (Easy/Medium), review system design, and do mock interviews. Preparation is key! 💪',
  'python': 'Python is the #1 skill for data jobs. Start with "Python for Everybody" on Coursera or Python.org tutorials! 🐍',
  'default': 'I\'m your AI Career Mentor! Ask me about job roles, skills to learn, courses, salary expectations, or resume tips. 🚀',
};

function getFallbackResponse(message) {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(FALLBACK_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return FALLBACK_RESPONSES.default;
}

const QUICK_QUESTIONS = [
  '📊 Skills for Data Scientist?',
  '🌐 How to become a Web Dev?',
  '💰 What are typical salaries?',
  '📚 Best free courses?',
];

function MessageBubble({ msg }) {
  const isBot = msg.role === 'bot';
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', gap: '0.5rem',
      justifyContent: isBot ? 'flex-start' : 'flex-end',
      marginBottom: '0.75rem',
      animation: 'slideUp 0.3s ease forwards',
    }}>
      {isBot && (
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.9rem',
        }}>
          🤖
        </div>
      )}
      <div style={{
        maxWidth: '80%', padding: '0.6rem 0.9rem', borderRadius: isBot ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
        background: isBot
          ? 'rgba(99, 102, 241, 0.15)'
          : 'linear-gradient(135deg, var(--primary), var(--secondary))',
        border: isBot ? '1px solid rgba(99, 102, 241, 0.25)' : 'none',
        color: 'var(--text-main)', fontSize: '0.85rem', lineHeight: 1.5,
      }}>
        {msg.text}
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: '👋 Hi! I\'m your AI Career Mentor. Ask me anything about jobs, skills, or how to level up your career!' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleOpen = () => {
    setIsOpen(true);
    setUnread(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await sendChatMessage(userMsg);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: response }]);
        setIsTyping(false);
        if (!isOpen) setUnread(n => n + 1);
      }, 400);
    } catch {
      // Fallback when backend is offline
      const fallback = getFallbackResponse(userMsg);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: fallback }]);
        setIsTyping(false);
      }, 500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div
          className="animate-scale-in"
          style={{
            position: 'fixed', bottom: '100px', right: '1.5rem',
            width: '340px', height: '480px',
            background: 'var(--bg-dark)', border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
            overflow: 'hidden', zIndex: 999,
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
          }}>
            <div style={{ fontSize: '1.5rem' }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>Career Mentor AI</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>
                <span style={{ color: '#4ade80' }}>●</span> Always here to help
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white',
                width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer',
                fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </div>

          {/* Quick questions */}
          <div style={{
            padding: '0.75rem 0.75rem 0', display: 'flex', gap: '0.4rem', flexWrap: 'wrap',
          }}>
            {QUICK_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q.replace(/^[^\s]+\s/, ''))}
                style={{
                  padding: '0.25rem 0.6rem', borderRadius: '100px', fontSize: '0.72rem',
                  background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.25)',
                  color: 'var(--primary-light)', cursor: 'pointer', transition: 'all 0.2s',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => e.target.style.background = 'rgba(99, 102, 241, 0.25)'}
                onMouseLeave={e => e.target.style.background = 'rgba(99, 102, 241, 0.12)'}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}

            {isTyping && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem',
                }}>
                  🤖
                </div>
                <div style={{
                  padding: '0.6rem 0.9rem', borderRadius: '4px 14px 14px 14px',
                  background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.25)',
                  display: 'flex', gap: '0.3rem', alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: 'var(--primary-light)', display: 'inline-block',
                      animation: `pulse-ring 0.9s ease infinite`,
                      animationDelay: `${i * 0.15}s`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '0.75rem', borderTop: '1px solid var(--glass-border)',
            display: 'flex', gap: '0.5rem',
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about careers, skills..."
              style={{
                flex: 1, padding: '0.6rem 0.9rem', borderRadius: 'var(--radius-sm)',
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)',
                color: 'var(--text-main)', fontSize: '0.85rem', fontFamily: 'inherit',
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              style={{
                width: '38px', height: '38px', borderRadius: 'var(--radius-sm)',
                background: input.trim() ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'rgba(255,255,255,0.05)',
                border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                color: 'white', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s', flexShrink: 0,
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={handleOpen}
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem',
          width: '60px', height: '60px', borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
          border: 'none', cursor: 'pointer', zIndex: 1000,
          boxShadow: '0 4px 20px var(--primary-glow)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 8px 30px var(--primary-glow)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px var(--primary-glow)';
        }}
        title="Career Mentor Chat"
        aria-label="Open career chatbot"
      >
        {isOpen ? '✕' : '💬'}
        {/* Unread indicator */}
        {!isOpen && unread > 0 && (
          <div style={{
            position: 'absolute', top: '2px', right: '2px',
            width: '18px', height: '18px', borderRadius: '50%',
            background: '#ef4444', color: 'white',
            fontSize: '0.65rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid var(--bg-deep)',
          }}>
            {unread}
          </div>
        )}
      </button>
    </>
  );
}
