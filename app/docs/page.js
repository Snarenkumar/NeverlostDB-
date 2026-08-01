'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DocsSidebar from '@/components/DocsSidebar';
import CodeBlock from '@/components/CodeBlock';
import FAQAccordion from '@/components/FAQAccordion';

const SECTIONS = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'connecting-mongodb', label: 'Connecting MongoDB' },
  { id: 'connecting-supabase', label: 'Connecting Supabase' },
  { id: 'backup-modes', label: 'Backup Modes' },
  { id: 'keep-alive', label: 'Setting Up Keep-Alive' },
  { id: 'failover', label: 'Setting Up Failover' },
  { id: 'alerts', label: 'Alerts Setup' },
  { id: 'restoring', label: 'Restoring From Backup' },
  { id: 'faq', label: 'FAQ' },
];

const FAQ_ITEMS = [
  {
    question: 'Will this slow down my database?',
    answer: 'No. DB Guardian uses lightweight read queries for backups and minimal ping operations for keep-alive. The impact on your database performance is negligible — comparable to a single user making a read request. Backup operations are performed sequentially, not in parallel, to avoid overwhelming your database.',
  },
  {
    question: 'Is my connection URL sent to your servers?',
    answer: 'Absolutely not. Everything happens in your browser. The Configure page generates code locally using JavaScript — your database URLs are never transmitted, stored, or logged by us. The generated code references environment variables (process.env.DB1_URL) so your actual URLs stay in your .env file.',
  },
  {
    question: 'What happens if both databases go down?',
    answer: 'If all connected databases become unreachable, DB Guardian will trigger your configured alerts (Telegram, Slack, or email) so you are immediately notified. It will continue retrying connections with exponential backoff. Your most recent backup remains safe on whichever database was last successfully written to.',
  },
  {
    question: 'Can I use this with MySQL?',
    answer: 'MySQL support is on the roadmap but not yet available. Currently, DB Guardian supports MongoDB and Supabase/PostgreSQL. If you need MySQL support, open an issue on our GitHub repository — community contributions are welcome!',
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const contentRef = useRef(null);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="docs-layout">
          <DocsSidebar
            sections={SECTIONS}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
          />

          <main className="docs-content" ref={contentRef}>
            <h1 style={{ marginBottom: '8px' }}>Documentation</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '48px', fontSize: '1.05rem' }}>
              Everything you need to set up and use DB Guardian in your project.
            </p>

            {/* Getting Started */}
            <section id="getting-started">
              <h2>Getting Started</h2>
              <p>
                DB Guardian is a Node.js package that automatically backs up your databases,
                keeps free-tier services alive, and alerts you when something goes wrong.
                Install it in under a minute.
              </p>

              <h3>Installation</h3>
              <CodeBlock code="npm install db-guardian" language="bash" filename="terminal" />

              <h3>Quick Setup</h3>
              <p>
                Create a new file called <code>guardian.js</code> in your project root and add
                this minimal configuration:
              </p>
              <CodeBlock
                language="javascript"
                filename="guardian.js"
                code={`const { DBGuardian } = require('db-guardian');
require('dotenv').config();

const guardian = new DBGuardian({
  databases: [
    {
      name: "primary",
      type: "mongodb",
      url: process.env.DB1_URL,
      role: "primary",
    },
    {
      name: "backup",
      type: "mongodb",
      url: process.env.DB2_URL,
      role: "secondary",
    },
  ],
  backup: {
    interval: "1h",
    mode: "mirror",
  },
});

guardian.start()
  .then(() => console.log('DB Guardian is running!'))
  .catch((err) => console.error('Failed to start:', err));`}
              />

              <div className="callout callout-info">
                <strong>Tip</strong>
                Use our <a href="/configure" style={{ color: 'inherit', textDecoration: 'underline' }}>Configure page</a> to generate
                code tailored to your exact setup — no manual writing needed.
              </div>
            </section>

            {/* Connecting MongoDB */}
            <section id="connecting-mongodb">
              <h2>Connecting MongoDB</h2>
              <p>
                DB Guardian connects to MongoDB using your connection string. This works with
                MongoDB Atlas (including free-tier M0 clusters), self-hosted MongoDB, and any
                MongoDB-compatible service.
              </p>

              <h3>Connection String Format</h3>
              <CodeBlock
                language="bash"
                filename=".env"
                code={`# MongoDB Atlas (most common)
DB1_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myDatabase

# Self-hosted MongoDB
DB1_URL=mongodb://username:password@localhost:27017/myDatabase`}
              />

              <h3>Configuration</h3>
              <CodeBlock
                language="javascript"
                filename="guardian.js"
                code={`{
  name: "my-mongo-db",
  type: "mongodb",
  url: process.env.DB1_URL,
  role: "primary",  // "primary", "secondary", or "backup-only"
}`}
              />

              <div className="callout callout-warning">
                <strong>Common Mistake</strong>
                Make sure your MongoDB Atlas cluster has your server&apos;s IP address in the
                Network Access whitelist. If you&apos;re on a dynamic IP (like Render or Railway),
                add <code>0.0.0.0/0</code> to allow all connections.
              </div>
            </section>

            {/* Connecting Supabase */}
            <section id="connecting-supabase">
              <h2>Connecting Supabase</h2>
              <p>
                For Supabase and other PostgreSQL databases, use the direct connection string
                (not the pooler URL unless you have many concurrent connections).
              </p>

              <h3>Finding Your Supabase URL</h3>
              <p>
                Go to your Supabase dashboard → Settings → Database → Connection string.
                Use the <strong>URI</strong> format.
              </p>
              <CodeBlock
                language="bash"
                filename=".env"
                code={`# Supabase direct connection
DB1_URL=postgresql://postgres.xxxx:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres

# Standard PostgreSQL
DB1_URL=postgresql://user:password@host:5432/database_name`}
              />

              <h3>Configuration</h3>
              <CodeBlock
                language="javascript"
                filename="guardian.js"
                code={`{
  name: "my-supabase-db",
  type: "supabase",
  url: process.env.DB1_URL,
  role: "primary",
}`}
              />

              <div className="callout callout-warning">
                <strong>Common Mistake</strong>
                Supabase free-tier projects pause after 7 days of inactivity. Use the
                Keep-Alive feature to prevent this — it sends a lightweight query every
                few minutes to keep your project active.
              </div>
            </section>

            {/* Backup Modes */}
            <section id="backup-modes">
              <h2>Understanding Backup Modes</h2>
              <p>
                DB Guardian supports two backup modes. Choose based on your data strategy:
              </p>

              <h3>Mirror Mode</h3>
              <p>
                Completely replaces the data in the secondary database with the data from the
                primary. After a mirror backup, both databases are identical.
              </p>
              <CodeBlock
                language="javascript"
                filename="mirror-config.js"
                code={`backup: {
  interval: "1h",
  mode: "mirror",  // Secondary becomes an exact copy of primary
}`}
              />
              <p>
                <strong>Best for:</strong> Simple setups where you want an exact replica.
                If you accidentally delete data from primary, you have a 1-hour window
                (or whatever your interval is) to recover it from the secondary before
                the next mirror operation.
              </p>

              <h3>Merge Mode</h3>
              <p>
                Only copies new or changed records to the secondary. Existing data in
                the secondary is never deleted.
              </p>
              <CodeBlock
                language="javascript"
                filename="merge-config.js"
                code={`backup: {
  interval: "1h",
  mode: "merge",  // Only adds new or updated records to secondary
}`}
              />
              <p>
                <strong>Best for:</strong> Append-only data (logs, events, analytics) or
                when you want the secondary to accumulate all historical records even if
                they&apos;re deleted from primary.
              </p>

              <div className="callout callout-info">
                <strong>Tip</strong>
                You can also limit backups to specific collections or tables using the
                <code> collections</code> option:
                <br />
                <code>collections: [&quot;users&quot;, &quot;orders&quot;]</code>
              </div>
            </section>

            {/* Keep-Alive */}
            <section id="keep-alive">
              <h2>Setting Up Keep-Alive</h2>
              <p>
                Free-tier hosting services (Render, Railway, Fly.io) and free-tier databases
                (MongoDB Atlas M0, Supabase free) will sleep or pause after a period of
                inactivity. Keep-Alive prevents this by sending periodic pings.
              </p>

              <h3>Backend Keep-Alive</h3>
              <p>Keeps your deployed backend server from sleeping:</p>
              <CodeBlock
                language="javascript"
                filename="keep-alive-config.js"
                code={`keepAlive: {
  backend: {
    enabled: true,
    url: process.env.BACKEND_URL,  // e.g. "https://my-app.onrender.com"
    interval: "10m",               // Ping every 10 minutes
  },
}`}
              />

              <h3>Database Keep-Alive</h3>
              <p>Sends lightweight queries to keep your databases from sleeping:</p>
              <CodeBlock
                language="javascript"
                filename="db-keep-alive.js"
                code={`keepAlive: {
  databases: {
    enabled: true,  // Pings all connected databases automatically
  },
}`}
              />

              <div className="callout callout-warning">
                <strong>Common Mistake</strong>
                Don&apos;t set the ping interval too low (under 5 minutes). Most free-tier
                services consider this excessive and some may throttle or ban your requests.
                10-15 minutes is usually the sweet spot.
              </div>
            </section>

            {/* Failover */}
            <section id="failover">
              <h2>Setting Up Failover</h2>
              <p>
                Failover protection monitors your primary database and automatically detects
                when it becomes unreachable. Combined with alerts, you&apos;ll know immediately
                when something goes wrong.
              </p>

              <CodeBlock
                language="javascript"
                filename="failover-config.js"
                code={`const guardian = new DBGuardian({
  databases: [
    { name: "primary", type: "mongodb", url: process.env.DB1_URL, role: "primary" },
    { name: "failover", type: "mongodb", url: process.env.DB2_URL, role: "secondary" },
  ],
  backup: {
    interval: "30m",
    mode: "mirror",
  },
  alerts: {
    enabled: true,
    method: "telegram",
    webhookUrl: process.env.ALERT_WEBHOOK,
  },
});

// DB Guardian will:
// 1. Back up primary → secondary every 30 minutes
// 2. Monitor primary for connectivity issues
// 3. Send a Telegram alert if primary goes down`}
              />

              <p>
                Your application code should handle the actual switchover to the secondary
                database. DB Guardian ensures the backup is fresh and alerts you when it&apos;s
                time to switch.
              </p>
            </section>

            {/* Alerts */}
            <section id="alerts">
              <h2>Setting Up Alerts</h2>
              <p>
                Get notified instantly when a backup fails, a database goes offline, or
                any critical error occurs.
              </p>

              <h3>Telegram</h3>
              <CodeBlock
                language="javascript"
                filename="telegram-alerts.js"
                code={`alerts: {
  enabled: true,
  method: "telegram",
  webhookUrl: "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage",
  // Chat ID is configured via the ALERT_WEBHOOK env var
}`}
              />
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Create a bot via <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer">@BotFather</a> on Telegram to get your bot token.
              </p>

              <h3>Slack</h3>
              <CodeBlock
                language="javascript"
                filename="slack-alerts.js"
                code={`alerts: {
  enabled: true,
  method: "slack",
  webhookUrl: process.env.ALERT_WEBHOOK,
  // Use a Slack Incoming Webhook URL
}`}
              />

              <h3>Email</h3>
              <CodeBlock
                language="javascript"
                filename="email-alerts.js"
                code={`alerts: {
  enabled: true,
  method: "email",
  email: process.env.ALERT_WEBHOOK,  // Your email address
}`}
              />

              <div className="callout callout-warning">
                <strong>Common Mistake</strong>
                Don&apos;t hardcode webhook URLs or tokens in your source code. Always use
                environment variables and keep them in your <code>.env</code> file.
              </div>
            </section>

            {/* Restoring */}
            <section id="restoring">
              <h2>Restoring From Backup</h2>
              <p>
                If your primary database loses data, you can restore from your secondary
                (backup) database. DB Guardian provides a simple restore command.
              </p>

              <CodeBlock
                language="javascript"
                filename="restore.js"
                code={`const { DBGuardian } = require('db-guardian');
require('dotenv').config();

const guardian = new DBGuardian({
  databases: [
    { name: "primary", type: "mongodb", url: process.env.DB1_URL, role: "primary" },
    { name: "backup", type: "mongodb", url: process.env.DB2_URL, role: "secondary" },
  ],
});

// Restore: copy all data from secondary back to primary
guardian.restore({
  from: "backup",   // source database name
  to: "primary",    // target database name
  mode: "mirror",   // "mirror" for full restore, "merge" for selective
})
  .then(() => console.log('Restore complete!'))
  .catch((err) => console.error('Restore failed:', err));`}
              />

              <div className="callout callout-danger">
                <strong>Warning</strong>
                A mirror restore will overwrite ALL data in the target database. Make sure
                you&apos;re restoring to the correct database. Consider doing a manual backup
                of the target first.
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2>Frequently Asked Questions</h2>
              <div style={{ marginTop: '16px' }}>
                <FAQAccordion items={FAQ_ITEMS} />
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
