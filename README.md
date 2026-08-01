# NeverlostDB (DB Guardian)

**NeverlostDB** is a developer-focused, client-side web application built with Next.js (App Router, JavaScript) designed to protect free-tier and production databases (MongoDB, Supabase / PostgreSQL) from sleeping, data loss, and downtime.

The application allows developers to visually configure their database infrastructure and generates ready-to-use Node.js code utilizing the `db-guardian` package that can be copy-pasted directly into backend projects.

---

## 🚀 Key Features Built

### 1. Landing Page (`/`)
- **Hero Section**: Introduces the problem of free-tier database sleep and data loss with an interactive terminal preview block.
- **Core Features Overview**: Detailed breakdown of 3 core mechanisms:
  - **Auto-Backup**: Automated data replication between primary and secondary databases (Mirror vs. Merge modes).
  - **Keep-Alive Pinging**: Periodic pings to keep backend services and databases active.
  - **Failover Protection**: Monitoring primary database health and sending instant notifications w hen issues arise.
- **How It Works Quick Guide**: 3-step visual onboarding guide.

### 2. Multi-Step Configure Wizard (`/configure`)
- **Step 1 - Database Setup**: Connect 2 to 4 databases. Select database engine (MongoDB, Supabase/PostgreSQL), input connection string, and assign roles (`primary`, `secondary`, `backup-only`).
- **Step 2 - Backup Settings**: Select backup intervals (`30m`, `1h`, `2h`, `6h`, `12h`, `24h`, or custom cron format), target specific collections/tables, and pick backup mode (`mirror` vs. `merge`).
- **Step 3 - Keep-Alive Settings**: Configure backend server ping URL, ping interval (`5m` to `30m`), and database query pings.
- **Step 4 - Alert Settings**: Configure failure alerts via Telegram, Slack, or Email with webhook/email input fields.
- **Step 5 - Code Generation**:
  - Automatically generates `npm install db-guardian`.
  - Generates `.env.example` referencing environment variables (`DB1_URL`, `DB2_URL`, etc.).
  - Generates a full production-ready JavaScript script (`db-guardian-setup.js`) with plain-English comments explaining every configuration section.
  - Features interactive "Copy" buttons with visual feedback and a "Download as .js file" button.

### 3. Documentation & Tutorial (`/docs`)
- **Interactive Sidebar Navigation**: Smooth scrolling sidebar section links.
- **9 Detailed Guides**:
  1. Getting Started
  2. Connecting MongoDB
  3. Connecting Supabase / PostgreSQL
  4. Understanding Backup Modes (Mirror vs. Merge)
  5. Setting Up Keep-Alive
  6. Setting Up Failover
  7. Setting Up Alerts (Telegram, Slack, Email)
  8. Restoring From Backup
  9. Frequently Asked Questions (FAQ Accordion)
- **Code Snippets & Callouts**: Syntax-highlighted code blocks with copy buttons and visual callouts highlighting common developer mistakes.

### 4. How It Works Page (`/how-it-works`)
- **5-Step Detailed Visual Guide**: Explains the full flow from user configuration to automated protection and alert management.
- **Client-Side Privacy Guarantee**: Highlights that connection URLs are processed purely in the browser and never sent to external servers.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (ES6+, React 19)
- **Styling**: Custom CSS Design System with dark mode by default (`#0F172A`), electric teal accent (`#06B6D4`), and light mode support.
- **Fonts**: IBM Plex Sans (Body) & JetBrains Mono (Headings & Code syntax).
- **Code Generator**: Modular pure JavaScript generator in `lib/generateCode.js`.
- **Syntax Highlighting**: `react-syntax-highlighter` (Prism `oneDark`).

---

## 📂 Project Structure

```
├── app/
│   ├── configure/        # Multi-step configuration form page
│   ├── docs/             # Documentation page & FAQ accordion
│   ├── how-it-works/     # Visual 5-step process page
│   ├── globals.css       # Global design system & theme tokens
│   ├── layout.js         # Root layout with fonts & metadata
│   └── page.js           # Hero & feature landing page
├── components/
│   ├── CodeBlock.js      # Syntax-highlighted code container with copy button
│   ├── DatabaseCard.js   # Individual database config card for Step 1
│   ├── DocsSidebar.js    # Sticky section navigation for documentation
│   ├── FAQAccordion.js   # Expandable accordion component for FAQs
│   ├── Footer.js         # Site footer component
│   ├── Navbar.js         # Floating navigation bar with theme toggle
│   └── StepIndicator.js  # Progress step bar for wizard
├── lib/
│   └── generateCode.js   # Pure JS function mapping form state to Node.js code
└── package.json          # Project dependencies
```

---

## 🚦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📑 Summary of Completed Work for Next Steps / Claude Handover

- **Scaffold & Setup**: Initialized Next.js App Router project (pure JavaScript), set up dependencies (`react-syntax-highlighter`), and built a custom dark/light design system.
- **Core App**: Implemented all 4 pages (`/`, `/configure`, `/docs`, `/how-it-works`), multi-step form state management, code generator (`lib/generateCode.js`), download capabilities, and responsive UI.
- **Git & Repository Cleanup**: Cleaned up accidentally committed `.agent/` folders and nested `.git` submodules. Restructured application files directly into root, renamed package to `neverlost-db`, and force-pushed a clean initial commit to GitHub repository `Snarenkumar/NeverlostDB-`.
