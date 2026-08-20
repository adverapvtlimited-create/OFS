import Link from 'next/link';
import ContactCTA from '@/components/sections/ContactCTA';
import JsonLd from '@/components/SEO/JsonLd';
import { PAGE_SEO } from '@/config/seo.config';
import { buildPageMetadata } from '@/lib/seo';
import { buildWebPageSchema } from '@/lib/schema';

const seo = PAGE_SEO.privacy;

export const metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: seo.path,
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          title: seo.title,
          description: seo.description,
          path: seo.path,
        })}
      />

      <section
        className="section-pad"
        style={{ background: 'var(--ofs-white)', paddingTop: '7rem' }}
      >
        <div className="container" style={{ maxWidth: '820px' }}>
          <h1
            className="section-title"
            style={{ marginBottom: '1rem' }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--ofs-gray-600)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            This Privacy Policy explains how Oriented Facility Solution Pvt Ltd (OFS Group India) collects,
            uses, and protects information submitted through ofsgroupindia.com and related contact channels.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--ofs-gray-700)', lineHeight: 1.75 }}>
            <section>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.75rem' }}>
                Information We Collect
              </h2>
              <p>
                When you submit an enquiry, RFQ, career application, or contact form, we may collect your name,
                email address, phone number, company details, project requirements, resume/CV files, and any
                additional information you choose to provide.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.75rem' }}>
                How We Use Your Information
              </h2>
              <p>
                We use submitted information to respond to business enquiries, evaluate job applications,
                provide procurement and technical support services, and communicate regarding projects or
                opportunities you have requested. We do not sell personal information to third parties.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.75rem' }}>
                Data Security
              </h2>
              <p>
                OFS implements reasonable administrative and technical safeguards to protect information
                submitted through our website. However, no internet transmission method is completely secure.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.75rem' }}>
                Contact
              </h2>
              <p>
                For privacy-related questions, contact OFS Group India at{' '}
                <a href="mailto:info@ofsgroupindia.com" style={{ color: 'var(--ofs-red-600)', fontWeight: 700 }}>
                  info@ofsgroupindia.com
                </a>{' '}
                or visit our{' '}
                <Link href="/contact" style={{ color: 'var(--ofs-red-600)', fontWeight: 700 }}>
                  Contact page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
