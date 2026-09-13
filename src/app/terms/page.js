import Link from 'next/link';
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

      <section className="section-pad bg-white pt-28">
        <div className="container max-w-[820px]">
          <h1 className="section-title mb-4">
            Terms of Engagement
          </h1>
          <p className="text-ofs-gray-600 mb-10 leading-relaxed">
            These terms govern use of the OFS Group India website and submission of enquiries, RFQs, and
            job applications to Oriented Facility Solution Pvt Ltd.
          </p>

          <div className="flex flex-col gap-8 text-ofs-gray-700 leading-relaxed">
            <section>
              <h2 className="font-heading text-[1.35rem] font-extrabold text-ofs-navy-950 mb-3">
                Website Use
              </h2>
              <p>
                Content on ofsgroupindia.com is provided for general information about OFS services,
                industries served, and company capabilities. Service descriptions do not constitute a binding
                offer until confirmed through a formal quotation or contract.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-[1.35rem] font-extrabold text-ofs-navy-950 mb-3">
                Enquiries and RFQs
              </h2>
              <p>
                Information submitted through contact forms, RFQ requests, or email is used to assess project
                requirements and prepare commercial proposals. Response timelines depend on scope, technical
                complexity, and resource availability.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-[1.35rem] font-extrabold text-ofs-navy-950 mb-3">
                Intellectual Property
              </h2>
              <p>
                All website content, branding, logos, and materials are owned by Oriented Facility Solution
                Pvt Ltd unless otherwise stated. Unauthorized reproduction or commercial use is prohibited
                without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-[1.35rem] font-extrabold text-ofs-navy-950 mb-3">
                Governing Contact
              </h2>
              <p>
                For contractual or legal enquiries, contact OFS Group India through the{' '}
                <Link href="/contact" className="text-ofs-red-600 font-bold hover:underline">
                  Contact page
                </Link>{' '}
                or email{' '}
                <a href="mailto:info@ofsgroupindia.com" className="text-ofs-red-600 font-bold hover:underline">
                  info@ofsgroupindia.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
