'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-badge">
            <span className="badge badge-accent">Open Source</span>
          </div>
          <h1>
            Stop Losing Data to{' '}
            <span style={{ color: 'var(--accent)' }}>Sleeping Databases</span>
          </h1>
          <p className="hero-subtitle">
            Free-tier databases sleep, crash, or get accidentally wiped.
            DB Guardian keeps them backed up, alive, and protected — automatically.
          </p>
          <div className="hero-actions">
            <Link href="/configure" className="btn btn-primary btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Generate My Setup
            </Link>
            <Link href="/docs" className="btn btn-secondary btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              View Docs
            </Link>
          </div>

          {/* Terminal-style preview */}
          <div style={{
            marginTop: '64px',
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
            background: 'var(--bg-code)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              background: '#161B22',
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F' }} />
              <span style={{ marginLeft: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                terminal
              </span>
            </div>
            <pre style={{
              padding: '20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              lineHeight: '1.8',
              color: '#E6EDF3',
              overflow: 'auto',
              margin: 0,
            }}>
              <span style={{ color: '#7EE787' }}>$</span> npm install neverlost-db{'\n'}
              <span style={{ color: '#7EE787' }}>$</span> node setup.js{'\n'}
              <span style={{ color: '#8B949E' }}>{'>'} </span>
              <span style={{ color: '#58A6FF' }}>DB Guardian</span> is now protecting your databases!{'\n'}
              <span style={{ color: '#8B949E' }}>{'>'} </span>Backup interval: <span style={{ color: '#D2A8FF' }}>1h</span>{'\n'}
              <span style={{ color: '#8B949E' }}>{'>'} </span>Databases connected: <span style={{ color: '#D2A8FF' }}>2</span>{'\n'}
              <span style={{ color: '#8B949E' }}>{'>'} </span>Keep-alive: <span style={{ color: '#7EE787' }}>active</span>
            </pre>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2>Everything You Need to Protect Your Data</h2>
            <p style={{ maxWidth: '560px', margin: '12px auto 0', color: 'var(--text-muted)' }}>
              Three powerful features that work together to keep your databases safe, backed up, and responsive.
            </p>
          </div>

          <div className="features-grid">
            {/* Auto-Backup */}
            <div className="card card-glow feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <h3>Auto-Backup</h3>
              <p>
                Automatically replicate your data to secondary databases on a schedule you control.
                Mirror or merge mode — your choice.
              </p>
            </div>

            {/* Keep-Alive */}
            <div className="card card-glow feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3>Keep-Alive Pinging</h3>
              <p>
                Free-tier services love to sleep. DB Guardian pings your backend and databases
                at regular intervals so they never go dormant.
              </p>
            </div>

            {/* Failover */}
            <div className="card card-glow feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3>Failover Protection</h3>
              <p>
                When your primary database goes down, DB Guardian detects the failure and can
                alert you instantly via Telegram, Slack, or email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Mini Section */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2>How It Works</h2>
            <p style={{ maxWidth: '500px', margin: '12px auto 0', color: 'var(--text-muted)' }}>
              Three steps from zero to fully protected databases.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {[
              {
                num: '01',
                title: 'Configure Your Setup',
                desc: 'Tell us your database types, how many you have, and your preferred backup schedule.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                ),
              },
              {
                num: '02',
                title: 'Copy the Generated Code',
                desc: 'We generate a ready-to-paste Node.js file tailored to your exact database setup.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                ),
              },
              {
                num: '03',
                title: 'Run & Relax',
                desc: 'Install the package, run the script, and your databases are automatically protected.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
              },
            ].map((step) => (
              <div key={step.num} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--accent-glow)',
                  color: 'var(--accent)',
                  margin: '0 auto 16px',
                  border: '2px solid var(--border-accent)',
                }}>
                  {step.icon}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--accent)',
                  marginBottom: '8px',
                  fontWeight: 600,
                }}>
                  STEP {step.num}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-lg">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Ready to Protect Your Databases?</h2>
          <p style={{ maxWidth: '500px', margin: '12px auto 32px', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Generate your custom setup in under 2 minutes. No sign-up, no payment — everything runs in your browser.
          </p>
          <div className="hero-actions">
            <Link href="/configure" className="btn btn-primary btn-lg">
              Generate My Setup
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
