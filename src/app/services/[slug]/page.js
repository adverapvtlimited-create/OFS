import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Package, 
  Wrench, 
  ShieldCheck, 
  Anchor, 
  Building2, 
  Settings, 
  ArrowUpRight, 
  CheckCircle2, 
  HelpCircle,
  Phone,
  Mail,
  Send,
  Flame,
  Ship,
  Sun
} from 'lucide-react';
import servicesData from '@/data/services.json';
import industriesData from '@/data/industries.json';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Breadcrumbs from '@/components/SEO/Breadcrumbs';
import JsonLd from '@/components/SEO/JsonLd';
import { buildPageMetadata } from '@/lib/seo';
import { buildServiceSchema, buildFAQSchema, buildWebPageSchema } from '@/lib/schema';

const iconMap = {
  Package: Package,
  Wrench: Wrench,
  ShieldCheck: ShieldCheck,
  Anchor: Anchor,
  Building2: Building2,
  Settings: Settings,
  Flame: Flame,
  Ship: Ship,
  Sun: Sun
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) {
    return buildPageMetadata({
      title: 'Service Not Found | OFS Group India',
      description: 'The requested OFS service page could not be found.',
      path: '/services',
      noindex: true,
    });
  }

  return buildPageMetadata({
    title: `${service.title} | OFS Group India`,
    description: service.description,
    path: `/services/${service.slug}`,
    keywords: [service.title, service.shortTitle, 'OFS Group India', service.badge],
    ogImage: service.heroImage,
  });
}

export default function SingleServicePage({ params }) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const IconComp = iconMap[service.icon] || Package;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: service.shortTitle, href: `/services/${service.slug}` },
  ];

  const schemas = [
    buildWebPageSchema({
      title: `${service.title} | OFS Group India`,
      description: service.description,
      path: `/services/${service.slug}`,
    }),
    buildServiceSchema(service),
    buildFAQSchema(service.faqs),
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={schemas} />
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-ofs-navy-950 to-ofs-navy-900 text-white py-[5.5rem] relative overflow-hidden">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

        <div className="container relative z-10">
          <ScrollReveal direction="down" duration={0.5}>
            <Breadcrumbs items={breadcrumbItems} variant="dark" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <div className="tag-badge badge-red">
                {service.badge}
              </div>
              <div className="tag-pill pill-dark">
                ISO 9001:2015 Assured
              </div>
            </div>
          </ScrollReveal>

          <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.1] text-white mb-6 max-w-[920px]">
            <TextReveal tag="span" duration={0.65}>
              {service.title}
            </TextReveal>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-[1.2rem] text-white/90 max-w-[780px] leading-relaxed mb-9">
              {service.tagline}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.35}>
            <Link href="/contact" className="btn btn-primary btn-lg inline-flex items-center gap-2 no-underline">
              Request Quotation / RFQ <ArrowUpRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Service Content */}
      <section className="section-pad bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[4.5rem] mb-20 items-center">
            {/* Overview & Key Highlights */}
            <ScrollReveal direction="left" delay={0.1}>
              <div>
                <div className="tag-badge badge-red mb-4">
                  OVERVIEW
                </div>
                <h2 className="section-title">
                  <TextReveal tag="span" duration={0.65}>
                    Strategic Scope &amp;
                  </TextReveal>
                  <br />
                  <span className="gradient-text-navy">
                    <TextReveal tag="span" delay={0.2} duration={0.65}>
                      Operational Capabilities
                    </TextReveal>
                  </span>
                </h2>
                <p className="text-[1.05rem] text-ofs-gray-700 leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Core Features Checklist */}
                <div className="flex flex-col gap-3.5">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-ofs-navy-50/60 rounded-md border border-ofs-navy-100">
                      <CheckCircle2 size={18} className="text-ofs-red-600 shrink-0 mt-0.5" />
                      <span className="text-[0.95rem] font-bold text-ofs-navy-950">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Featured Image Banner */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-ofs-gray-200 h-[320px] sm:h-[420px] lg:h-[480px] relative">
                <img 
                  src={service.heroImage} 
                  alt={`${service.title} — OFS Group India`}
                  width={960}
                  height={480}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ofs-navy-950/50 via-ofs-navy-950/10 to-transparent" />
              </div>
            </ScrollReveal>
          </div>

          {/* Capabilities Grid */}
          {service.capabilities && (
            <div className="mb-20">
              <div className="text-center max-w-[720px] mx-auto mb-14">
                <ScrollReveal direction="up">
                  <div className="tag-badge badge-red mb-3.5">
                    DETAILED CAPABILITIES
                  </div>
                </ScrollReveal>
                <h2 className="section-title">
                  <TextReveal tag="span" duration={0.65}>
                    What We Deliver Under
                  </TextReveal>
                  <br />
                  <span className="gradient-text-navy">
                    <TextReveal tag="span" delay={0.2} duration={0.65}>
                      {service.shortTitle}
                    </TextReveal>
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {service.capabilities.map((cap, cIdx) => (
                  <ScrollReveal key={cIdx} direction="up" delay={cIdx * 0.1}>
                    <div className="card-modern p-5 sm:p-6 h-full flex flex-col">
                      <div className="font-mono text-xs font-bold text-ofs-red-600 mb-1.5">
                        FEATURE 0{cIdx + 1}
                      </div>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-ofs-navy-950 mb-2">
                        {cap.title}
                      </h3>
                      <p className="text-xs sm:text-[0.875rem] text-ofs-gray-600 leading-relaxed m-0 flex-1">
                        {cap.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-Step Methodology / Process */}
          {service.process && (
            <div className="bg-ofs-navy-950 text-white rounded-3xl p-8 sm:p-12 lg:p-[4.5rem] mb-20 relative overflow-hidden">
              <div className="bg-grid-pattern-dark absolute inset-0 opacity-40 pointer-events-none" />

              <div className="relative z-10">
                <div className="max-w-[680px] mb-14">
                  <div className="tag-badge badge-red mb-4">
                    EXECUTION METHODOLOGY
                  </div>
                  <h2 className="section-title text-white">
                    Standard Operating Procedure
                  </h2>
                  <p className="text-white/80 text-[1.05rem] leading-relaxed">
                    Our proven 5-stage workflow ensures transparent milestones, risk mitigation, and strict QA/QC sign-offs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {service.process.map((p, pIdx) => (
                    <div key={pIdx} className="bg-white/[0.06] border border-white/10 rounded p-6">
                      <div className="font-mono text-[1.85rem] font-black text-ofs-red-400 mb-3.5 leading-none">
                        {p.step}
                      </div>
                      <h4 className="font-heading text-[1.1rem] font-extrabold text-white mb-2">
                        {p.title}
                      </h4>
                      <p className="text-[0.85rem] text-white/70 leading-relaxed m-0">
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Technical FAQs */}
          {service.faqs && (
            <div className="max-w-[820px] mx-auto mb-16">
              <div className="text-center mb-12">
                <div className="tag-badge badge-red mb-3.5">
                  FREQUENTLY ASKED QUESTIONS
                </div>
                <h2 className="section-title">Technical &amp; Commercial FAQs</h2>
              </div>

              <div className="flex flex-col gap-5">
                {service.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="bg-ofs-gray-50 rounded-lg border border-ofs-gray-200 p-7">
                    <h3 className="font-heading text-lg font-extrabold text-ofs-navy-950 flex items-center gap-2.5 mb-3.5">
                      <HelpCircle size={20} className="text-ofs-red-600 shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-[0.95rem] text-ofs-gray-600 leading-relaxed m-0 pl-7">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related industries for internal linking */}
          <div className="max-w-[820px] mx-auto mb-16">
            <h2 className="section-title mb-5">
              Industries We Support
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {industriesData.slice(0, 4).map((ind) => (
                <Link
                  key={ind.id}
                  href={`/industries/${ind.slug}`}
                  className="p-4 bg-ofs-gray-50 border border-ofs-gray-200 rounded text-ofs-navy-950 font-bold text-[0.9rem] hover:border-ofs-red-300 hover:bg-ofs-red-50/30 transition-colors text-center"
                >
                  {ind.shortName}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-[0.95rem] text-ofs-gray-600">
              <Link href="/industries" className="text-ofs-red-600 font-bold hover:underline">
                View all industries served by OFS
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
