import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export const metadata = {
  title: '404 — Page Not Found | OFS Group India',
};

export default function NotFound() {
  return (
    <section style={{
      minHeight: '70vh',
      display: 'grid',
      placeContent: 'center',
      textAlign: 'center',
      padding: '4rem 1.5rem',
      background: 'var(--ofs-navy-50)'
    }}>
      <div style={{ maxWidth: '540px', margin: '0 auto' }}>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(4rem, 8vw, 7rem)',
          fontWeight: 900,
          color: 'var(--ofs-red-600)',
          lineHeight: 1,
          marginBottom: '1rem'
        }}>
          404
        </div>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.75rem',
          fontWeight: 800,
          color: 'var(--ofs-navy-950)',
          marginBottom: '1rem'
        }}>
          Operational Coordinate Not Found
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--ofs-gray-600)', lineHeight: 1.6, marginBottom: '2rem' }}>
          The requested page or documentation asset could not be located. Please check the URL or return to our homepage.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">
            <Home size={16} /> Return to Homepage
          </Link>
          <Link href="/services" className="btn btn-outline">
            <Compass size={16} /> Explore Capabilities
          </Link>
        </div>
      </div>
    </section>
  );
}
