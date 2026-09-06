import React from 'react';
import Hero from '@/components/sections/Hero';
import BrandMarquee from '@/components/sections/BrandMarquee';
import AboutPreview from '@/components/sections/AboutPreview';
import ServicesGrid from '@/components/sections/ServicesGrid';
import CaseStudies from '@/components/sections/CaseStudies';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import StatsCounter from '@/components/sections/StatsCounter';
import ContactCTA from '@/components/sections/ContactCTA';
import JsonLd from '@/components/SEO/JsonLd';
import { buildHomeFAQSchema, buildWebPageSchema } from '@/lib/schema';
import { PAGE_SEO } from '@/config/seo.config';
import faqs from '@/data/faqs.json';
import { ChevronDown } from 'lucide-react';

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
      <BrandMarquee />
      <AboutPreview />
      <ServicesGrid />
      <CaseStudies />
      <WhyChooseUs />
      <StatsCounter />
      <ContactCTA />

      <section
        className="py-10 sm:py-12 lg:py-16 bg-ofs-gray-50"
        aria-labelledby="home-faq-heading"
      >
        <div className="w-full max-w-[820px] mx-auto px-5 sm:px-8">
          <h2
            id="home-faq-heading"
            className="text-[clamp(2rem,3.8vw,3rem)] font-heading font-extrabold tracking-[-0.03em] text-ofs-navy-950 text-center mb-8 leading-[1.15]"
          >
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-white border border-ofs-gray-200 rounded-md px-5 py-4 sm:px-6 transition-all duration-200"
              >
                <summary className="font-heading font-extrabold text-ofs-navy-950 cursor-pointer list-none select-none flex items-center justify-between gap-4">
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-ofs-red-600 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-[0.95rem] text-ofs-gray-600 leading-relaxed pr-8">
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
