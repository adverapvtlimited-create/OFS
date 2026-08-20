import Link from 'next/link';
import ContactCTA from '@/components/sections/ContactCTA';
import JsonLd from '@/components/SEO/JsonLd';
import { PAGE_SEO } from '@/config/seo.config';
import { buildPageMetadata } from '@/lib/seo';
import { buildWebPageSchema } from '@/lib/schema';

const seo = PAGE_SEO.terms;

export const metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: seo.path,
});

export default function TermsPage() {
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
          <h1 className="section-title" style={{ marginBottom: '1rem' }}>
            Terms of Engagement
          </h1>
          <p style={{ color: 'var(--ofs-gray-600)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            These terms govern use of the OFS Group India website and submission of enquiries, RFQs, and
            job applications to Oriented Facility Solution Pvt Ltd.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--ofs-gray-700)', lineHeight: 1.75 }}>
            <section>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.75rem' }}>
                Website Use
              </h2>
              <p>
                Content on ofsgroupindia.com is provided for general information about OFS services,
                industries served, and company capabilities. Service descriptions do not constitute a binding
                offer until confirmed through a formal quotation or contract.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.75rem' }}>
                Enquiries and RFQs
              </h2>
              <p>
                Information submitted through contact forms, RFQ requests, or email is used to assess project
                requirements and prepare commercial proposals. Response timelines depend on scope, technical
                complexity, and resource availability.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.75rem' }}>
                Intellectual Property
              </h2>
              <p>
                All website content, branding, logos, and materials are owned by Oriented Facility Solution
                Pvt Ltd unless otherwise stated. Unauthorized reproduction or commercial use is prohibited
                without prior written consent.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.75rem' }}>
                Governing Contact
              </h2>
              <p>
                For contractual or legal enquiries, contact OFS Group India through the{' '}
                <Link href="/contact" style={{ color: 'var(--ofs-red-600)', fontWeight: 700 }}>
                  Contact page
                </Link>{' '}
                or email{' '}
                <a href="mailto:info@ofsgroupindia.com" style={{ color: 'var(--ofs-red-600)', fontWeight: 700 }}>
                  info@ofsgroupindia.com
                </a>
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
