import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              DB Guardian
            </div>
            <p className="footer-tagline">
              Keep your databases backed up and alive. Open source, forever free.
            </p>
          </div>

          <ul className="footer-links">
            <li><Link href="/configure">Configure</Link></li>
            <li><Link href="/docs">Docs</Link></li>
            <li><Link href="/how-it-works">How It Works</Link></li>
            <li><a href="https://www.npmjs.com/package/neverlost-db" target="_blank" rel="noopener noreferrer">npm</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
