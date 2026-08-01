'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StepIndicator from '@/components/StepIndicator';
import DatabaseCard from '@/components/DatabaseCard';
import CodeBlock from '@/components/CodeBlock';
import { generateCode } from '@/lib/generateCode';

const STEP_LABELS = ['Databases', 'Backup', 'Keep-Alive', 'Alerts', 'Code'];

const DEFAULT_DB = { type: 'mongodb', url: '', role: 'primary' };

function getDefaultDatabases(count) {
  const roles = ['primary', 'secondary', 'backup-only', 'backup-only'];
  return Array.from({ length: count }, (_, i) => ({
    ...DEFAULT_DB,
    role: roles[i] || 'backup-only',
  }));
}

export default function ConfigurePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    dbCount: 2,
    databases: getDefaultDatabases(2),
    backup: {
      interval: '1h',
      custom: '',
      specificCollections: false,
      collections: '',
      mode: 'mirror',
    },
    keepAlive: {
      backendAwake: false,
      backendUrl: '',
      pingInterval: '5m',
      dbAwake: false,
    },
    alerts: {
      enabled: false,
      method: 'email',
      webhook: '',
      recipientEmail: '',
      smtpHost: '',
      smtpPort: '587',
      smtpUser: '',
      smtpPass: '',
    },
  });

  const updateField = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleDbCountChange = (count) => {
    const numCount = parseInt(count, 10);
    setFormData((prev) => ({
      ...prev,
      dbCount: numCount,
      databases: getDefaultDatabases(numCount),
    }));
  };

  const handleDbChange = (index, updatedDb) => {
    setFormData((prev) => {
      const dbs = [...prev.databases];
      dbs[index] = updatedDb;
      return { ...prev, databases: dbs };
    });
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const generated = currentStep === 5 ? generateCode(formData) : null;

  const handleDownload = () => {
    if (!generated) return;
    const content = generated.setupCode;
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'db-guardian-setup.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const startOver = () => {
    setCurrentStep(1);
    setFormData({
      dbCount: 2,
      databases: getDefaultDatabases(2),
      backup: {
        interval: '1h',
        custom: '',
        specificCollections: false,
        collections: '',
        mode: 'mirror',
      },
      keepAlive: {
        backendAwake: false,
        backendUrl: '',
        pingInterval: '5m',
        dbAwake: false,
      },
      alerts: {
        enabled: false,
        method: 'email',
        webhook: '',
        recipientEmail: '',
        smtpHost: '',
        smtpPort: '587',
        smtpUser: '',
        smtpPass: '',
      },
    });
  };

  return (
    <>
      <Navbar />

      <div className="configure-page">
        <div className="container-narrow">
          <div className="configure-header">
            <h1>Configure Your Setup</h1>
            <p>Fill in your database details and we will generate ready-to-use code for you.</p>
          </div>

          <StepIndicator steps={STEP_LABELS} currentStep={currentStep} />

          {/* Step 1: Databases */}
          {currentStep === 1 && (
            <div className="step-content-area" key="step1">
              <div className="form-group" style={{ marginBottom: '24px', maxWidth: '320px' }}>
                <label className="form-label" htmlFor="db-count">How many databases do you want to connect?</label>
                <select
                  id="db-count"
                  className="form-select"
                  value={formData.dbCount}
                  onChange={(e) => handleDbCountChange(e.target.value)}
                >
                  <option value={2}>2 databases</option>
                  <option value={3}>3 databases</option>
                  <option value={4}>4 databases</option>
                </select>
              </div>

              <div className="db-cards-grid">
                {formData.databases.map((db, i) => (
                  <DatabaseCard
                    key={i}
                    index={i}
                    db={db}
                    onChange={handleDbChange}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Backup Settings */}
          {currentStep === 2 && (
            <div className="step-content-area" key="step2">
              <div className="card" style={{ maxWidth: '560px' }}>
                <h3 style={{ marginBottom: '24px', fontSize: '1.15rem' }}>Backup Settings</h3>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label className="form-label" htmlFor="backup-interval">Backup Interval</label>
                  <select
                    id="backup-interval"
                    className="form-select"
                    value={formData.backup.interval}
                    onChange={(e) => updateField('backup', 'interval', e.target.value)}
                  >
                    <option value="30m">Every 30 minutes</option>
                    <option value="1h">Every 1 hour</option>
                    <option value="2h">Every 2 hours</option>
                    <option value="6h">Every 6 hours</option>
                    <option value="12h">Every 12 hours</option>
                    <option value="24h">Every 24 hours</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                {formData.backup.interval === 'custom' && (
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="form-label" htmlFor="custom-interval">
                      Custom Interval (e.g. &quot;2h&quot;, &quot;45m&quot;, or cron: &quot;*/30 * * * *&quot;)
                    </label>
                    <input
                      id="custom-interval"
                      type="text"
                      className="form-input"
                      placeholder="2h or */30 * * * *"
                      value={formData.backup.custom}
                      onChange={(e) => updateField('backup', 'custom', e.target.value)}
                    />
                  </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <label className="form-checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.backup.specificCollections}
                      onChange={(e) => updateField('backup', 'specificCollections', e.target.checked)}
                    />
                    Only backup specific collections/tables
                  </label>
                </div>

                {formData.backup.specificCollections && (
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="form-label" htmlFor="collections">
                      Collection / Table names (comma-separated)
                    </label>
                    <input
                      id="collections"
                      type="text"
                      className="form-input"
                      placeholder="users, orders, products"
                      value={formData.backup.collections}
                      onChange={(e) => updateField('backup', 'collections', e.target.value)}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Backup Mode</label>
                  <div className="form-radio-group">
                    <label className={`form-radio-label ${formData.backup.mode === 'mirror' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="backup-mode"
                        value="mirror"
                        checked={formData.backup.mode === 'mirror'}
                        onChange={(e) => updateField('backup', 'mode', e.target.value)}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Mirror</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Overwrite secondary completely</div>
                      </div>
                    </label>
                    <label className={`form-radio-label ${formData.backup.mode === 'merge' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="backup-mode"
                        value="merge"
                        checked={formData.backup.mode === 'merge'}
                        onChange={(e) => updateField('backup', 'mode', e.target.value)}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Merge</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Only add new/changed records</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Keep-Alive */}
          {currentStep === 3 && (
            <div className="step-content-area" key="step3">
              <div className="card" style={{ maxWidth: '560px' }}>
                <h3 style={{ marginBottom: '24px', fontSize: '1.15rem' }}>Keep-Alive Settings</h3>

                <div style={{ marginBottom: '20px' }}>
                  <label className="form-checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.keepAlive.backendAwake}
                      onChange={(e) => updateField('keepAlive', 'backendAwake', e.target.checked)}
                    />
                    Keep my backend awake
                  </label>
                </div>

                {formData.keepAlive.backendAwake && (
                  <div style={{ padding: '16px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', marginBottom: '20px', border: '1px solid var(--border)' }}>
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label" htmlFor="backend-url">Backend URL</label>
                      <input
                        id="backend-url"
                        type="text"
                        className="form-input"
                        placeholder="https://my-app.onrender.com"
                        value={formData.keepAlive.backendUrl}
                        onChange={(e) => updateField('keepAlive', 'backendUrl', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="ping-interval">Ping Interval</label>
                      <select
                        id="ping-interval"
                        className="form-select"
                        value={formData.keepAlive.pingInterval}
                        onChange={(e) => updateField('keepAlive', 'pingInterval', e.target.value)}
                      >
                        <option value="5m">Every 5 minutes</option>
                        <option value="10m">Every 10 minutes</option>
                        <option value="15m">Every 15 minutes</option>
                        <option value="30m">Every 30 minutes</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="form-checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.keepAlive.dbAwake}
                      onChange={(e) => updateField('keepAlive', 'dbAwake', e.target.checked)}
                    />
                    Keep my databases awake
                  </label>
                  <p style={{ marginTop: '6px', fontSize: '0.8rem', color: 'var(--text-dim)', paddingLeft: '30px' }}>
                    Uses the database URLs from Step 1 to send periodic lightweight queries.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Alerts */}
          {currentStep === 4 && (
            <div className="step-content-area" key="step4">
              <div className="card" style={{ maxWidth: '560px' }}>
                <h3 style={{ marginBottom: '4px', fontSize: '1.15rem' }}>Alert Settings</h3>
                <p style={{ marginBottom: '24px', fontSize: '0.875rem', color: 'var(--text-dim)' }}>Optional — get notified when something goes wrong.</p>

                <div style={{ marginBottom: '20px' }}>
                  <label className="form-checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.alerts.enabled}
                      onChange={(e) => updateField('alerts', 'enabled', e.target.checked)}
                    />
                    Send me alerts on failure
                  </label>
                </div>

                {formData.alerts.enabled && (
                  <div style={{ padding: '16px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label">Alert Method</label>
                      <div className="form-radio-group">
                        {['telegram', 'slack', 'email'].map((method) => (
                          <label
                            key={method}
                            className={`form-radio-label ${formData.alerts.method === method ? 'active' : ''}`}
                          >
                            <input
                              type="radio"
                              name="alert-method"
                              value={method}
                              checked={formData.alerts.method === method}
                              onChange={(e) => updateField('alerts', 'method', e.target.value)}
                            />
                            {method.charAt(0).toUpperCase() + method.slice(1)}
                          </label>
                        ))}
                      </div>
                    </div>

                    {formData.alerts.method === 'email' ? (
                      <>
                        <div className="form-group" style={{ marginBottom: '16px' }}>
                          <label className="form-label" htmlFor="alert-recipient-email">
                            Recipient Email Address (Where to send alerts)
                          </label>
                          <input
                            id="alert-recipient-email"
                            type="email"
                            className="form-input"
                            placeholder="alerts-admin@example.com"
                            value={formData.alerts.recipientEmail}
                            onChange={(e) => updateField('alerts', 'recipientEmail', e.target.value)}
                          />
                        </div>

                        <div style={{ marginTop: '16px', padding: '12px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                          <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '12px', color: 'var(--text-primary)' }}>
                            SMTP Server Configuration (For sending emails)
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div className="form-group">
                              <label className="form-label" htmlFor="smtp-host">SMTP Host</label>
                              <input
                                id="smtp-host"
                                type="text"
                                className="form-input"
                                placeholder="smtp.gmail.com"
                                value={formData.alerts.smtpHost}
                                onChange={(e) => updateField('alerts', 'smtpHost', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label" htmlFor="smtp-port">SMTP Port</label>
                              <input
                                id="smtp-port"
                                type="text"
                                className="form-input"
                                placeholder="587"
                                value={formData.alerts.smtpPort}
                                onChange={(e) => updateField('alerts', 'smtpPort', e.target.value)}
                              />
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div className="form-group">
                              <label className="form-label" htmlFor="smtp-user">SMTP Username / Email</label>
                              <input
                                id="smtp-user"
                                type="text"
                                className="form-input"
                                placeholder="your-sender-email@gmail.com"
                                value={formData.alerts.smtpUser}
                                onChange={(e) => updateField('alerts', 'smtpUser', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label" htmlFor="smtp-pass">SMTP Password / App Password</label>
                              <input
                                id="smtp-pass"
                                type="password"
                                className="form-input"
                                placeholder="••••••••••••"
                                value={formData.alerts.smtpPass}
                                onChange={(e) => updateField('alerts', 'smtpPass', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="form-group">
                        <label className="form-label" htmlFor="alert-webhook">
                          {`${formData.alerts.method.charAt(0).toUpperCase() + formData.alerts.method.slice(1)} Webhook URL`}
                        </label>
                        <input
                          id="alert-webhook"
                          type="text"
                          className="form-input"
                          placeholder={
                            formData.alerts.method === 'telegram'
                              ? 'https://api.telegram.org/bot<token>/sendMessage'
                              : 'https://hooks.slack.com/services/...'
                          }
                          value={formData.alerts.webhook}
                          onChange={(e) => updateField('alerts', 'webhook', e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Generated Code */}
          {currentStep === 5 && generated && (
            <div className="step-content-area generated-section" key="step5">
              <div>
                <h3>1. Install the Package</h3>
                <CodeBlock code={generated.installCmd} language="bash" filename="terminal" />
              </div>

              <div>
                <h3>2. Create Your .env File</h3>
                <CodeBlock code={generated.envExample} language="bash" filename=".env" />
                <div className="env-warning" style={{ marginTop: '12px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  Never commit your .env file to GitHub — add it to your .gitignore
                </div>
              </div>

              <div>
                <h3>3. Your Setup File</h3>
                <CodeBlock code={generated.setupCode} language="javascript" filename="db-guardian-setup.js" />
              </div>

              <div className="generated-actions">
                <button className="btn btn-primary" onClick={handleDownload}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download as .js File
                </button>
                <button className="btn btn-secondary" onClick={startOver}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  Start Over
                </button>
              </div>
            </div>
          )}

          {/* Step Navigation */}
          {currentStep < 5 && (
            <div className="step-nav">
              <button
                className="btn btn-secondary"
                onClick={prevStep}
                disabled={currentStep === 1}
                style={{ opacity: currentStep === 1 ? 0.4 : 1 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Previous
              </button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                Step {currentStep} of 5
              </span>
              <button className="btn btn-primary" onClick={nextStep}>
                {currentStep === 4 ? 'Generate Code' : 'Next'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          )}

          {currentStep === 5 && (
            <div className="step-nav" style={{ justifyContent: 'center' }}>
              <button className="btn btn-ghost" onClick={() => setCurrentStep(1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to Step 1
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
