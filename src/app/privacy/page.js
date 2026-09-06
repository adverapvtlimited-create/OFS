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

      <section className="section-pad bg-white pt-28">
        <div className="container max-w-[820px]">
          <h1 className="section-title mb-4">
            Privacy Policy
          </h1>
          <p className="text-ofs-gray-600 mb-10 leading-relaxed">
            This Privacy Policy explains how Oriented Facility Solution Pvt Ltd (OFS Group India) collects,
            uses, and protects information submitted through ofsgroupindia.com and related contact channels.
          </p>

          <div className="flex flex-col gap-8 text-ofs-gray-700 leading-relaxed">
            <section>
              <h2 className="font-heading text-[1.35rem] font-extrabold text-ofs-navy-950 mb-3">
                Information We Collect
              </h2>
              <p>
                When you submit an enquiry, RFQ, career application, or contact form, we may collect your name,
                email address, phone number, company details, project requirements, resume/CV files, and any
                additional information you choose to provide.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-[1.35rem] font-extrabold text-ofs-navy-950 mb-3">
                How We Use Your Information
              </h2>
              <p>
                We use submitted information to respond to business enquiries, evaluate job applications,
                provide procurement and technical support services, and communicate regarding projects or
                opportunities you have requested. We do not sell personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-[1.35rem] font-extrabold text-ofs-navy-950 mb-3">
                Data Security
              </h2>
              <p>
                OFS implements reasonable administrative and technical safeguards to protect information
                submitted through our website. However, no internet transmission method is completely secure.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-[1.35rem] font-extrabold text-ofs-navy-950 mb-3">
                Contact
              </h2>
              <p>
                For privacy-related questions, contact OFS Group India at{' '}
                <a href="mailto:info@ofsgroupindia.com" className="text-ofs-red-600 font-bold hover:underline">
                  info@ofsgroupindia.com
                </a>{' '}
                or visit our{' '}
                <Link href="/contact" className="text-ofs-red-600 font-bold hover:underline">
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
