import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Flame, 
  Ship, 
  Sun, 
  Hammer, 
  Zap, 
  FlaskConical, 
  Mountain, 
  Plane, 
  Anchor, 
  Compass, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import industriesData from '@/data/industries.json';
import servicesData from '@/data/services.json';
import { serviceHref } from '@/lib/offers';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ContactCTA from '@/components/sections/ContactCTA';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/SEO/Breadcrumbs';
import JsonLd from '@/components/SEO/JsonLd';
import { buildPageMetadata } from '@/lib/seo';
import { buildWebPageSchema } from '@/lib/schema';

const iconMap = {
  Flame: Flame,
  Ship: Ship,
  Sun: Sun,
  Hammer: Hammer,
  Zap: Zap,
  FlaskConical: FlaskConical,
  Mountain: Mountain,
  Plane: Plane,
  Anchor: Anchor,
  Compass: Compass
};

export async function generateStaticParams() {
  return industriesData.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({ params }) {
  const ind = industriesData.find((i) => i.slug === params.slug);
  if (!ind) {
    return buildPageMetadata({
      title: 'Industry Not Found | OFS Group India',
      description: 'The requested OFS industry page could not be found.',
      path: '/industries',
      noindex: true,
    });
  }

  return buildPageMetadata({
    title: `${ind.name} Solutions | OFS Group India`,
    description: ind.summary,
    path: `/industries/${ind.slug}`,
    keywords: [ind.name, ind.shortName, 'OFS Group India', 'industrial procurement'],
    ogImage: ind.heroImage,
  });
}

export default function SingleIndustryPage({ params }) {
  const ind = industriesData.find((i) => i.slug === params.slug);

  if (!ind) {
    notFound();
  }

  const IconComp = iconMap[ind.icon] || Flame;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Industries', href: '/industries' },
    { name: ind.shortName, href: `/industries/${ind.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          title: `${ind.name} Solutions | OFS Group India`,
          description: ind.summary,
          path: `/industries/${ind.slug}`,
        })}
      />
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-ofs-navy-950 to-ofs-navy-900 text-white py-[5.5rem] relative overflow-hidden">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

        <Container className="relative z-10">
          <ScrollReveal direction="down" duration={0.5}>
            <Breadcrumbs items={breadcrumbItems} variant="dark" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <div className="tag-badge badge-red">
                SECTOR FOCUS
              </div>
              <div className="tag-pill pill-dark">
                ISO 9001:2015 Assured Supply Chain
              </div>
            </div>
          </ScrollReveal>

          <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.1] text-white mb-6 max-w-[920px]">
            <TextReveal tag="span" duration={0.65}>
              {ind.name}
            </TextReveal>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-[1.2rem] text-white/90 max-w-[780px] leading-relaxed mb-9">
              {ind.tagline}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.35}>
            <a href="#contact-cta" className="btn btn-primary btn-lg inline-flex items-center gap-2 no-underline">
              Request Industry Consultation <ArrowUpRight size={18} />
            </a>
          </ScrollReveal>
        </Container>
      </section>

      {/* Main Content */}
      <section className="section-pad bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[4.5rem] items-center mb-20">
            {/* Left Scope */}
            <ScrollReveal direction="left" delay={0.1}>
              <div>
                <div className="tag-badge badge-red mb-4">
                  DOMAIN OVERVIEW
                </div>
                <h2 className="section-title">
                  <TextReveal tag="span" duration={0.65}>
                    Targeted Engineering &amp;
                  </TextReveal>
                  <br />
                  <span className="gradient-text-navy">
                    <TextReveal tag="span" delay={0.2} duration={0.65}>
                      Sourcing Competency
                    </TextReveal>
                  </span>
                </h2>
                <p className="text-[1.05rem] text-ofs-gray-700 leading-relaxed mb-8">
                  {ind.summary}
                </p>

                {/* Key Solutions List */}
                <div className="flex flex-col gap-3.5">
                  {ind.keySolutions.map((sol, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-3 p-4 bg-ofs-navy-50/60 rounded-md border border-ofs-navy-100">
                      <CheckCircle2 size={18} className="text-ofs-red-600 shrink-0" />
                      <span className="text-[0.95rem] font-bold text-ofs-navy-950">{sol}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right Image */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-ofs-gray-200 h-[320px] sm:h-[420px] lg:h-[460px] relative">
                <img 
                  src={ind.heroImage} 
                  alt={`${ind.name} — OFS Group India industrial solutions`}
                  width={960}
                  height={460}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ofs-navy-950/50 via-ofs-navy-950/10 to-transparent" />
              </div>
            </ScrollReveal>
          </div>

          {/* Related OFS services for internal linking */}
          <div className="mt-16">
            <h2 className="section-title mb-6">
              OFS Services for {ind.shortName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {servicesData.slice(0, 3).map((svc) => (
                <Link
                  key={svc.id}
                  href={serviceHref(svc.slug)}
                  className="p-5 bg-ofs-navy-50/60 border border-ofs-navy-100 rounded text-ofs-navy-950 font-bold text-[0.95rem] hover:border-ofs-red-300 hover:bg-ofs-red-50/30 transition-colors"
                >
                  {svc.shortTitle}
                </Link>
              ))}
            </div>
            <p className="mt-5 text-[0.95rem] text-ofs-gray-600">
              Need sector-specific procurement or EPC support?{' '}
              <Link href="/contact" className="text-ofs-red-600 font-bold hover:underline">
                Contact OFS Group India for a consultation
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <div id="contact-cta">
        <ContactCTA />
      </div>
    </>
  );
}
