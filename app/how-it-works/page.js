'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const STEPS = [
  {
    num: 1,
    title: 'Enter Your Database Details',
    desc: 'Tell us what databases you use (MongoDB, Supabase/PostgreSQL), how many you have, and what role each one plays — primary, secondary, or backup-only.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    num: 2,
    title: 'We Generate Code For Your Setup',
    desc: 'Based on your configuration, we generate a complete, ready-to-paste Node.js file — with environment variable references, backup settings, keep-alive pings, and alert configurations.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    num: 3,
    title: 'Paste It Into Your Project',
    desc: 'Copy the generated code, create a new file in your project (e.g. guardian.js), paste it in, and add your real database URLs to your .env file.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      </svg>
    ),
  },
  {
    num: 4,
    title: 'Your Data Auto-Backs Up On Schedule',
    desc: 'Once running, DB Guardian replicates your data from primary to secondary databases at the interval you chose — every 30 minutes, every hour, or on a custom schedule.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    num: 5,
    title: 'Get Alerted When Something Breaks',
    desc: 'If a backup fails, a database goes offline, or a keep-alive ping times out, you get an instant notification via Telegram, Slack, or email — so you can fix it before users notice.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />

      <section className="hero" style={{ paddingBottom: '40px' }}>
        <div className="hero-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-badge">
            <span className="badge badge-accent">Simple Setup</span>
          </div>
          <h1>How DB Guardian Works</h1>
          <p className="hero-subtitle">
            From zero to fully protected databases in 5 simple steps.
            No complex setup, no DevOps knowledge required.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="steps-vertical">
            {STEPS.map((step, index) => (
              <div className="step-row" key={step.num}>
                <div className="step-number-col">
                  <div className="step-number">{step.num}</div>
                  {index < STEPS.length - 1 && <div className="step-line" />}
                </div>
                <div className="step-content">
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-glow)',
                    color: 'var(--accent)',
                    marginBottom: '12px',
                  }}>
                    {step.icon}
                  </div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy section */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(34, 197, 94, 0.1)',
            color: 'var(--cta-green)',
            margin: '0 auto 24px',
            border: '2px solid rgba(34, 197, 94, 0.2)',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 style={{ marginBottom: '12px' }}>Your Data Stays Private</h2>
          <p style={{ maxWidth: '560px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            DB Guardian never sends, stores, or logs your database URLs.
            Everything happens locally in your browser. The generated code
            uses environment variables so your secrets stay in your <code>.env</code> file.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-lg">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Ready to Get Started?</h2>
          <p style={{ maxWidth: '500px', margin: '12px auto 32px', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Configure your database setup and get production-ready code in under 2 minutes.
          </p>
          <div className="hero-actions">
            <Link href="/configure" className="btn btn-primary btn-lg">
              Generate My Setup
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link href="/docs" className="btn btn-secondary btn-lg">
              Read the Docs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
