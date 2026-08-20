import React from 'react';
import Hero from '@/components/sections/Hero';
import AboutPreview from '@/components/sections/AboutPreview';
import ServicesGrid from '@/components/sections/ServicesGrid';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import IndustriesSection from '@/components/sections/IndustriesSection';
import StatsCounter from '@/components/sections/StatsCounter';
import RenewablesCTA from '@/components/sections/RenewablesCTA';
import BlogPreview from '@/components/sections/BlogPreview';
import CareersPreview from '@/components/sections/CareersPreview';
import ContactCTA from '@/components/sections/ContactCTA';
import JsonLd from '@/components/SEO/JsonLd';
import { buildHomeFAQSchema, buildWebPageSchema } from '@/lib/schema';
import { PAGE_SEO } from '@/config/seo.config';

const homeSeo = PAGE_SEO.home;

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({
            title: homeSeo.title,
            description: homeSeo.description,
            path: homeSeo.path,
          }),
          buildHomeFAQSchema(),
        ]}
      />

      <Hero />
      <AboutPreview />
      <ServicesGrid />
      <WhyChooseUs />
      <IndustriesSection />
      <StatsCounter />
      <RenewablesCTA />
      <BlogPreview />
      <CareersPreview />
      <ContactCTA />

      {/* Homepage FAQ — crawlable content for common search queries */}
      <section
        className="section-pad"
        style={{ background: 'var(--ofs-gray-50)' }}
        aria-labelledby="home-faq-heading"
      >
        <div className="container" style={{ maxWidth: '820px' }}>
          <h2
            id="home-faq-heading"
            className="section-title"
            style={{ textAlign: 'center', marginBottom: '2.5rem' }}
          >
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              {
                question: 'What services does OFS Group India provide?',
                answer:
                  'OFS provides procurement & shipping, engineering & EPC support, integrated facility management, spare parts procurement & MRO, industrial logistics & shipping, and hospitality & catering services for marine, offshore, energy, and industrial sectors.',
              },
              {
                question: 'Which industries does OFS serve?',
                answer:
                  'OFS serves oil & gas, marine & offshore, renewable energy, power generation, petrochemicals & refining, pharmaceuticals & chemicals, cement manufacturing, mining & minerals, and heavy engineering industries.',
              },
              {
                question: 'Where is OFS Group India headquartered?',
                answer:
                  'OFS Group India is headquartered in Mumbai, Maharashtra at Dynasty Business Park, Andheri-Kurla Road, Andheri (East). OFS also maintains a USA global office in St. Petersburg, Florida.',
              },
              {
                question: 'How can I request a quotation or consultation from OFS?',
                answer:
                  'Submit an RFQ or consultation request through our Contact page, call +91 98200 00000, or email info@ofsgroupindia.com.',
              },
            ].map((faq) => (
              <details
                key={faq.question}
                style={{
                  background: 'var(--ofs-white)',
                  border: '1px solid var(--ofs-gray-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem 1.5rem',
                }}
              >
                <summary
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    color: 'var(--ofs-navy-950)',
                    cursor: 'pointer',
                    listStyle: 'none',
                  }}
                >
                  {faq.question}
                </summary>
                <p
                  style={{
                    marginTop: '0.85rem',
                    fontSize: '0.95rem',
                    color: 'var(--ofs-gray-600)',
                    lineHeight: 1.65,
                  }}
                >
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
