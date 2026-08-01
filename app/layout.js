import './globals.css';

export const metadata = {
  title: 'DB Guardian — Protect Your Databases From Data Loss',
  description: 'Generate custom Node.js code to auto-backup, keep-alive, and failover-protect your free-tier databases. Never lose data again.',
  keywords: ['database backup', 'keep-alive', 'failover', 'MongoDB', 'Supabase', 'free tier'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
