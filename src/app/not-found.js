import Link from 'next/link';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { PAGE_SEO } from '@/config/seo.config';
import { buildPageMetadata } from '@/lib/seo';

const seo = PAGE_SEO.notFound;

export const metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: '/404',
  noindex: true,
});

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '70vh',
        display: 'grid',
        placeContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem',
        background: 'var(--ofs-navy-50)',
      }}
    >
      <div style={{ maxWidth: '540px', margin: '0 auto' }}>
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(4rem, 8vw, 7rem)',
            fontWeight: 900,
            color: 'var(--ofs-red-600)',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
          aria-hidden="true"
        >
          404
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--ofs-navy-950)',
            marginBottom: '1rem',
          }}
        >
          Page Not Found
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--ofs-gray-600)', lineHeight: 1.6, marginBottom: '2rem' }}>
          The requested page could not be located. Explore OFS services, industries, or return to the homepage.
        </p>

        <nav style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} aria-label="Helpful links">
          <Link href="/" className="btn btn-primary">
            <Home size={16} /> Return to Homepage
          </Link>
          <Link href="/services" className="btn btn-outline">
            <Compass size={16} /> Explore OFS Services
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact OFS Group India
          </Link>
        </nav>
      </div>
    </section>
  );
}
