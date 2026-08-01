'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DocsSidebar from '@/components/DocsSidebar';
import CodeBlock from '@/components/CodeBlock';
import FAQAccordion from '@/components/FAQAccordion';

const SECTIONS = [
  { id: 'beginner-guide', label: 'Beginner Guide: What & Why?' },
  { id: 'production-mongodb-guide', label: 'Guide: I Already Have MongoDB Data' },
  { id: 'getting-started', label: 'Quick Start Code' },
  { id: 'connecting-mongodb', label: 'Connecting MongoDB' },
  { id: 'connecting-supabase', label: 'Connecting Supabase' },
  { id: 'backup-modes', label: 'Backup Modes (Mirror vs Merge)' },
  { id: 'keep-alive', label: 'Setting Up Keep-Alive' },
  { id: 'failover', label: 'Setting Up Failover' },
  { id: 'alerts', label: 'Alerts Setup' },
  { id: 'restoring', label: 'Restoring From Backup' },
  { id: 'faq', label: 'FAQ' },
];

const FAQ_ITEMS = [
  {
    question: 'Will this slow down my production MongoDB database?',
    answer: 'No. NeverlostDB (DB Guardian) uses lightweight read queries for backups and minimal ping operations for keep-alive. The impact on your database performance is negligible — comparable to a single user loading a single page. Operations run in the background on your schedule.',
  },
  {
    question: 'Is my MongoDB connection URL stored or sent anywhere?',
    answer: 'Absolutely not. Everything happens in your browser locally when you generate code. Your actual MongoDB connection string is placed inside your own project\'s .env file on your own server. We never see, store, or log your connection string or database contents.',
  },
  {
    question: 'What if my primary production MongoDB database crashes?',
    answer: 'DB Guardian detects the failure immediately. It will trigger your instant alert (via Telegram, Slack, or Email) so you are notified within seconds. Your backup database (secondary MongoDB or Supabase) contains your backed-up collections, allowing you to restore or failover.',
  },
  {
    question: 'Can I back up my production MongoDB to a free-tier MongoDB cluster?',
    answer: 'Yes! That is one of the most popular setups. You can use your active production MongoDB as Primary and a free MongoDB Atlas (M0 cluster) or Supabase project as your Secondary backup target.',
  },
  {
    question: 'Can I use this with MySQL?',
    answer: 'MySQL support is on the roadmap. Currently, MongoDB and Supabase/PostgreSQL are fully supported.',
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('beginner-guide');
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
            <h1 style={{ marginBottom: '8px' }}>Documentation & Complete Guide</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '48px', fontSize: '1.05rem' }}>
              Step-by-step instructions for beginners and production MongoDB developers.
            </p>

            {/* Beginner Guide */}
            <section id="beginner-guide">
              <h2>Beginner Guide: What is this website & how to use it?</h2>
              <p>
                If you are new here, welcome! <strong>NeverlostDB (DB Guardian)</strong> is a tool designed to solve a major problem faced by developers:
                <strong> database data loss, crashes, and free-tier sleeping.</strong>
              </p>

              <div className="callout callout-info">
                <strong>What does this website do?</strong>
                This website does <em>not</em> touch your database directly. Instead, it is a <strong>code generator</strong>. You select your database settings through our visual form, and we generate standard Node.js code that you copy and paste into your own backend application.
              </div>

              <h3>3 Simple Steps to Use NeverlostDB:</h3>
              <ol>
                <li>
                  <strong>Configure:</strong> Go to the <a href="/configure">Configure Page</a> and tell us about your databases (e.g. MongoDB, Supabase), how often you want backups (e.g. every 1 hour), and where to send failure alerts.
                </li>
                <li>
                  <strong>Copy Code:</strong> Click <em>Generate Code</em>. Copy the <code>.env.example</code> snippet and the <code>setup.js</code> code into your backend project.
                </li>
                <li>
                  <strong>Run in Backend:</strong> Run <code>npm install neverlost-db</code> and start the script in your Node.js backend server. Your databases are now automatically protected!
                </li>
              </ol>
            </section>

            {/* Production MongoDB Guide */}
            <section id="production-mongodb-guide">
              <h2>Step-by-Step: &quot;I already have data in MongoDB, what do I do next?&quot;</h2>
              <p>
                If you already have an existing project running on MongoDB with live data in production, here is your exact step-by-step roadmap to set up automatic backups and crash protection without disturbing your live users:
              </p>

              <div className="callout callout-success">
                <strong>Goal:</strong> Safely replicate your live MongoDB data to a secondary database (like a free MongoDB Atlas cluster or Supabase) automatically.
              </div>

              <h3>Step 1: Get a Secondary (Backup) Database</h3>
              <p>
                To back up your existing MongoDB, you need a second place to store the copied data.
              </p>
              <ul>
                <li>Create a free <strong>MongoDB Atlas</strong> cluster (M0 free tier) or a free <strong>Supabase</strong> project.</li>
                <li>Copy the connection URL for this new backup database.</li>
              </ul>

              <h3>Step 2: Use the Generator Page</h3>
              <p>
                Open the <a href="/configure">Configure Page</a> on this website:
              </p>
              <ul>
                <li>Select <strong>2 databases</strong>.</li>
                <li>Set <strong>Database 1</strong> as <code>MongoDB</code> (Role: <em>Primary</em>) — paste your live MongoDB connection URL as a placeholder.</li>
                <li>Set <strong>Database 2</strong> as <code>MongoDB</code> or <code>Supabase</code> (Role: <em>Secondary</em>) — paste your backup database connection URL.</li>
                <li>Choose your backup interval (e.g. <em>Every 1 hour</em> or <em>Every 6 hours</em>).</li>
                <li>Choose your backup mode:
                  <ul>
                    <li><strong>Mirror:</strong> Overwrites secondary so it is an exact twin of your live MongoDB.</li>
                    <li><strong>Merge:</strong> Only adds new/changed records to secondary (safer if you never want data deleted from backup).</li>
                  </ul>
                </li>
              </ul>

              <h3>Step 3: Add to Your Node.js Backend</h3>
              <p>Open your existing Node.js project terminal and install the guardian package:</p>
              <CodeBlock code="npm install neverlost-db" language="bash" filename="terminal" />

              <p>Create a file named <code>.env</code> in your backend root directory and add your real database connection URLs:</p>
              <CodeBlock
                language="bash"
                filename=".env"
                code={`# Live Production MongoDB
DB1_URL=mongodb+srv://admin:yourpassword@production.mongodb.net/my_live_db

# Backup Database (Secondary)
DB2_URL=mongodb+srv://admin:yourpassword@backup.mongodb.net/my_backup_db`}
              />

              <p>Create a file named <code>guardian.js</code> in your Node.js project and paste the generated code:</p>
              <CodeBlock
                language="javascript"
                filename="guardian.js"
                code={`const { DBGuardian } = require('neverlost-db');
require('dotenv').config();

const guardian = new DBGuardian({
  databases: [
    {
      name: "live-production-mongo",
      type: "mongodb",
      url: process.env.DB1_URL,
      role: "primary",
    },
    {
      name: "backup-mongo",
      type: "mongodb",
      url: process.env.DB2_URL,
      role: "secondary",
    },
  ],
  backup: {
    interval: "1h", // Backs up live MongoDB every hour
    mode: "mirror",
  },
  keepAlive: {
    databases: { enabled: true }, // Keeps free-tier databases from sleeping
  },
});

guardian.start()
  .then(() => console.log('✅ Production MongoDB protection active!'))
  .catch((err) => console.error('❌ Protection error:', err));`}
              />

              <h3>Step 4: Start Protection</h3>
              <p>Run the guardian script alongside your application or as a background service on your server:</p>
              <CodeBlock code="node guardian.js" language="bash" filename="terminal" />

              <div className="callout callout-warning">
                <strong>Result:</strong> Your live production MongoDB data will now automatically sync to your backup database every hour in the background!
              </div>
            </section>

            {/* Getting Started Quick Code */}
            <section id="getting-started">
              <h2>Quick Start Code Reference</h2>
              <p>
                Here is the standard minimal setup code for reference:
              </p>

              <h3>Installation</h3>
              <CodeBlock code="npm install neverlost-db" language="bash" filename="terminal" />

              <h3>Minimal Setup</h3>
              <CodeBlock
                language="javascript"
                filename="setup.js"
                code={`const { DBGuardian } = require('neverlost-db');
require('dotenv').config();

const guardian = new DBGuardian({
  databases: [
    { name: "primary", type: "mongodb", url: process.env.DB1_URL, role: "primary" },
    { name: "backup", type: "mongodb", url: process.env.DB2_URL, role: "secondary" },
  ],
  backup: { interval: "1h", mode: "mirror" },
});

guardian.start();`}
              />
            </section>

            {/* Connecting MongoDB */}
            <section id="connecting-mongodb">
              <h2>Connecting MongoDB</h2>
              <p>
                DB Guardian connects to MongoDB using standard connection strings. Works with MongoDB Atlas, self-hosted instances, or local MongoDB.
              </p>

              <h3>Connection String Formats</h3>
              <CodeBlock
                language="bash"
                filename=".env"
                code={`# MongoDB Atlas
DB1_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Local or Self-Hosted
DB1_URL=mongodb://username:password@127.0.0.1:27017/dbname`}
              />
            </section>

            {/* Connecting Supabase */}
            <section id="connecting-supabase">
              <h2>Connecting Supabase</h2>
              <p>
                For Supabase or PostgreSQL databases, use the direct PostgreSQL URI from your Supabase project settings.
              </p>

              <CodeBlock
                language="bash"
                filename=".env"
                code={`# Supabase PostgreSQL URI
DB1_URL=postgresql://postgres.xxx:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres`}
              />
            </section>

            {/* Backup Modes */}
            <section id="backup-modes">
              <h2>Understanding Backup Modes</h2>
              <h3>Mirror Mode</h3>
              <p>Overwrites the secondary database so it becomes an exact twin of your primary database.</p>

              <h3>Merge Mode</h3>
              <p>Only appends new or modified records. Existing data in secondary is never deleted.</p>
            </section>

            {/* Keep-Alive */}
            <section id="keep-alive">
              <h2>Setting Up Keep-Alive</h2>
              <p>Prevents Render, Railway, Fly.io, or MongoDB Atlas free-tier projects from sleeping by sending periodic pings.</p>

              <CodeBlock
                language="javascript"
                filename="keepalive.js"
                code={`keepAlive: {
  backend: { enabled: true, url: process.env.BACKEND_URL, interval: "10m" },
  databases: { enabled: true },
}`}
              />
            </section>

            {/* Failover */}
            <section id="failover">
              <h2>Setting Up Failover</h2>
              <p>Monitors primary database connection status and triggers alerts immediately if connection drops.</p>
            </section>

            {/* Alerts */}
            <section id="alerts">
              <h2>Alerts & Email Setup (SMTP)</h2>
              <p>
                Get notified immediately via Email, Telegram, or Slack if a backup fails or your primary database crashes.
              </p>

              <h3>Configuring Email Alerts with SMTP</h3>
              <p>
                To receive emails when something goes wrong with your backup, provide your recipient email address and your SMTP server details in your <code>.env</code> file:
              </p>

              <CodeBlock
                language="bash"
                filename=".env"
                code={`# Email Alert Settings
ALERT_RECIPIENT_EMAIL=your-email@example.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-sender-email@gmail.com
SMTP_PASS=your-app-password`}
              />

              <h3>JavaScript Setup Code</h3>
              <CodeBlock
                language="javascript"
                filename="guardian.js"
                code={`const guardian = new DBGuardian({
  databases: [/* your databases */],
  backup: { interval: "1h", mode: "mirror" },
  alerts: {
    enabled: true,
    method: "email",
    recipientEmail: process.env.ALERT_RECIPIENT_EMAIL,
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  },
});`}
              />

              <div className="callout callout-info">
                <strong>Gmail Tip:</strong> If using Gmail SMTP, generate an <em>App Password</em> in your Google Account security settings and set it as <code>SMTP_PASS</code>.
              </div>
            </section>

            {/* Restoring */}
            <section id="restoring">
              <h2>Restoring From Backup</h2>
              <p>To restore your primary database from your secondary backup database:</p>
              <CodeBlock
                language="javascript"
                filename="restore.js"
                code={`guardian.restore({ from: "backup", to: "primary", mode: "mirror" })
  .then(() => console.log('Restore complete!'));`}
              />
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
