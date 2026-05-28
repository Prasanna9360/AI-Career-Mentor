/**
 * LandingPage.jsx — v11
 * - Resume upload section embedded directly (no login required)
 * - All sign-in / auth UI removed
 * - 12 sections total
 */
import React, { useState, useEffect } from 'react';
import HeroSection              from './landing/HeroSection';
import UploadResumeSection      from './landing/UploadResumeSection';
import StatsSection             from './landing/StatsSection';
import AboutSection             from './landing/AboutSection';
import FeaturesSection          from './landing/FeaturesSection';
import HowItWorksSection        from './landing/HowItWorksSection';
import DashboardPreviewSection  from './landing/DashboardPreviewSection';
import ServicesSection          from './landing/ServicesSection';
import TestimonialsSection      from './landing/TestimonialsSection';
import TechStackSection         from './landing/TechStackSection';
import ContactSection           from './landing/ContactSection';
import FooterSection            from './landing/FooterSection';

const NAV_ITEMS = [
  { label: 'Upload',       href: '#upload' },
  { label: 'Features',     href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services',     href: '#services' },
  { label: 'Contact',      href: '#contact' },
];

function Navbar({ onUploadClick }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToUpload = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(1.5rem, 4vw, 3rem)',
      height: scrolled ? '60px' : '72px',
      background: scrolled ? 'rgba(3,7,18,0.94)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
    }}>
      {/* Logo */}
      <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '9px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', flexShrink: 0,
          boxShadow: '0 4px 16px rgba(99,102,241,0.45)',
        }}>🧠</div>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800, fontSize: '0.95rem',
          color: '#f8fafc', letterSpacing: '-0.02em',
        }}>AI Career Mentor</span>
        <span style={{
          padding: '2px 7px', borderRadius: '100px',
          background: 'rgba(99,102,241,0.15)',
          border: '1px solid rgba(99,102,241,0.3)',
          fontSize: '0.62rem', fontWeight: 700, color: '#a5b4fc',
        }}>v9</span>
      </a>

      {/* Desktop nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
        {NAV_ITEMS.map(item => (
          <a
            key={item.label}
            href={item.href}
            style={{
              padding: '8px 14px', borderRadius: '8px',
              fontSize: '0.85rem', fontWeight: 500,
              color: '#94a3b8', textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f8fafc'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent'; }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }} className="desktop-cta">
        <a
          href="https://github.com/Prasannaganesann/AI-Career-Mentor"
          target="_blank" rel="noopener noreferrer"
          style={{
            padding: '7px 14px', borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)',
            color: '#94a3b8', fontSize: '0.82rem', fontWeight: 600,
            textDecoration: 'none', transition: 'all 0.2s ease',
            display: 'flex', alignItems: 'center', gap: '5px',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#f8fafc'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#94a3b8'; }}
        >
          🐙 GitHub
        </a>
        <button
          onClick={scrollToUpload}
          style={{
            padding: '8px 20px', borderRadius: '8px', border: 'none',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', fontSize: '0.85rem', fontWeight: 700,
            cursor: 'pointer', fontFamily: "'Inter', sans-serif",
            boxShadow: '0 2px 12px rgba(99,102,241,0.4)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.55)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(99,102,241,0.4)'; }}
        >
          📄 Analyze Resume
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(o => !o)}
        style={{
          display: 'none', width: '36px', height: '36px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer',
        }}
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(3,7,18,0.97)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          padding: '1rem 2rem 1.5rem',
          display: 'flex', flexDirection: 'column', gap: '0.5rem',
        }}>
          {NAV_ITEMS.map(item => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{ padding: '10px', fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'none', borderRadius: '8px' }}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={scrollToUpload}
            style={{
              marginTop: '0.5rem', padding: '12px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none', borderRadius: '10px',
              color: '#fff', fontSize: '0.9rem', fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            📄 Analyze My Resume — Free
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-menu-btn { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
    </nav>
  );
}

export default function LandingPage({ onUpload, onDemo, error }) {
  const scrollToUpload = () =>
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div style={{ background: '#030712', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Sticky Navbar — no auth buttons */}
      <Navbar onUploadClick={scrollToUpload} />

      {/* Hero — CTA scrolls to upload */}
      <HeroSection
        onGetStarted={scrollToUpload}
        onAnalyzeResume={scrollToUpload}
        onExploreCareers={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* ★ Upload section — embedded directly, no login needed */}
      <UploadResumeSection onUpload={onUpload} />

      <StatsSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DashboardPreviewSection />
      <ServicesSection />
      <TestimonialsSection />
      <TechStackSection />
      <ContactSection onGetStarted={scrollToUpload} />
      <FooterSection />

      {/* Error banner */}
      {error && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9000,
          padding: '12px 20px',
          background: 'rgba(239,68,68,0.15)',
          border: '1px solid rgba(239,68,68,0.35)',
          borderRadius: '12px', color: '#fca5a5',
          fontSize: '0.85rem', fontWeight: 600,
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 24px rgba(239,68,68,0.2)',
          maxWidth: '360px',
        }}>
          ⚠️ {error}
        </div>
      )}

      <style>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
