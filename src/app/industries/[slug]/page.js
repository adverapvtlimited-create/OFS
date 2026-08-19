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
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ContactCTA from '@/components/sections/ContactCTA';

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
  if (!ind) return { title: 'Industry Not Found | OFS Group India' };

  return {
    title: `${ind.name} Solutions — OFS Group India`,
    description: ind.summary
  };
}

export default function SingleIndustryPage({ params }) {
  const ind = industriesData.find((i) => i.slug === params.slug);

  if (!ind) {
    notFound();
  }

  const IconComp = iconMap[ind.icon] || Flame;

  return (
    <>
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
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}>
              <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Home</Link>
              <span>/</span>
              <Link href="/industries" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Industries</Link>
              <span>/</span>
              <span style={{ color: 'var(--ofs-red-400)' }}>{ind.shortName}</span>
            </div>
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
                  alt={ind.name}
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
        </div>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </>
  );
}
