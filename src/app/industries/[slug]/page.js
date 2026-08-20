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
  Dna, 
  Mountain, 
  Plane,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import industriesData from '@/data/industries.json';
import servicesData from '@/data/services.json';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ContactCTA from '@/components/sections/ContactCTA';
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
  Dna: Dna,
  Mountain: Mountain,
  Plane: Plane
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
      <section style={{
        background: 'linear-gradient(135deg, var(--ofs-navy-950) 0%, var(--ofs-navy-900) 100%)',
        color: 'var(--ofs-white)',
        paddingTop: '5.5rem',
        paddingBottom: '5.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="bg-grid-pattern-dark" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal direction="down" duration={0.5}>
            <Breadcrumbs items={breadcrumbItems} variant="dark" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div className="tag-badge badge-red">
                SECTOR FOCUS
              </div>
              <div className="tag-pill" style={{ color: '#fff', borderColor: 'rgba(255, 255, 255, 0.22)' }}>
                ISO 9001:2015 Assured Supply Chain
              </div>
            </div>
          </ScrollReveal>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--ofs-white)',
            marginBottom: '1.5rem',
            maxWidth: '920px'
          }}>
            <TextReveal tag="span" duration={0.65}>
              {ind.name}
            </TextReveal>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.88)',
              maxWidth: '780px',
              lineHeight: 1.6,
              marginBottom: '2.25rem'
            }}>
              {ind.tagline}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.35}>
            <a href="#contact-cta" className="btn btn-primary btn-lg">
              Request Industry Consultation <ArrowUpRight size={18} />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-pad" style={{ background: 'var(--ofs-white)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '4.5rem',
            alignItems: 'center',
            marginBottom: '5rem'
          }}>
            {/* Left Scope */}
            <ScrollReveal direction="left" delay={0.1}>
              <div>
                <div className="tag-badge badge-red" style={{ marginBottom: '1rem' }}>
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
                <p style={{ fontSize: '1.05rem', color: 'var(--ofs-gray-700)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {ind.summary}
                </p>

                {/* Key Solutions List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {ind.keySolutions.map((sol, sIdx) => (
                    <div key={sIdx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.95rem 1.35rem',
                      background: 'var(--ofs-navy-50)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--ofs-navy-100)'
                    }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--ofs-red-600)', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ofs-navy-950)' }}>{sol}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right Image */}
            <ScrollReveal direction="right" delay={0.2}>
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-2xl)',
                border: '2px solid var(--ofs-gray-200)',
                height: '460px',
                position: 'relative'
              }}>
                <img 
                  src={ind.heroImage} 
                  alt={`${ind.name} — OFS Group India industrial solutions`}
                  width={960}
                  height={460}
                  loading="eager"
                  fetchPriority="high"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.1) 0%, rgba(6, 14, 36, 0.5) 100%)'
                }} />
              </div>
            </ScrollReveal>
          </div>

          {/* Related OFS services for internal linking */}
          <div style={{ marginTop: '4rem' }}>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
              OFS Services for {ind.shortName}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
                gap: '1rem',
              }}
            >
              {servicesData.slice(0, 3).map((svc) => (
                <Link
                  key={svc.id}
                  href={`/services/${svc.slug}`}
                  style={{
                    padding: '1.25rem 1.5rem',
                    background: 'var(--ofs-navy-50)',
                    border: '1px solid var(--ofs-navy-100)',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                    color: 'var(--ofs-navy-950)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                  }}
                >
                  {svc.shortTitle}
                </Link>
              ))}
            </div>
            <p style={{ marginTop: '1.25rem', fontSize: '0.95rem', color: 'var(--ofs-gray-600)' }}>
              Need sector-specific procurement or EPC support?{' '}
              <Link href="/contact" style={{ color: 'var(--ofs-red-600)', fontWeight: 700 }}>
                Contact OFS Group India for a consultation
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </>
  );
}
