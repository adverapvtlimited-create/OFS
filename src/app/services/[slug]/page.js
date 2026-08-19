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
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ContactCTA from '@/components/sections/ContactCTA';

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
  if (!service) return { title: 'Service Not Found | OFS Group India' };

  return {
    title: `${service.title} — OFS Group India`,
    description: service.description
  };
}

export default function SingleServicePage({ params }) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const IconComp = iconMap[service.icon] || Package;

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
              <Link href="/services" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Services</Link>
              <span>/</span>
              <span style={{ color: 'var(--ofs-red-400)' }}>{service.shortTitle}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div className="tag-badge badge-red">
                {service.badge}
              </div>
              <div className="tag-pill" style={{ color: '#fff', borderColor: 'rgba(255, 255, 255, 0.22)' }}>
                ISO 9001:2015 Assured
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
              {service.title}
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
              {service.tagline}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.35}>
            <a href="#service-inquiry" className="btn btn-primary btn-lg">
              Request Quotation / RFQ <ArrowUpRight size={18} />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Service Content */}
      <section className="section-pad" style={{ background: 'var(--ofs-white)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '4.5rem',
            marginBottom: '5rem',
            alignItems: 'center'
          }}>
            {/* Overview & Key Highlights */}
            <ScrollReveal direction="left" delay={0.1}>
              <div>
                <div className="tag-badge badge-red" style={{ marginBottom: '1rem' }}>
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
                <p style={{ fontSize: '1.05rem', color: 'var(--ofs-gray-700)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {service.description}
                </p>

                {/* Core Features Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {service.features.map((feat, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.95rem 1.35rem',
                      background: 'var(--ofs-navy-50)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--ofs-navy-100)'
                    }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--ofs-red-600)', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ofs-navy-950)' }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Featured Image Banner */}
            <ScrollReveal direction="right" delay={0.2}>
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-2xl)',
                border: '2px solid var(--ofs-gray-200)',
                height: '480px',
                position: 'relative'
              }}>
                <img 
                  src={service.heroImage} 
                  alt={service.title}
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

          {/* Capabilities Grid */}
          {service.capabilities && (
            <div style={{ marginBottom: '5rem' }}>
              <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
                <ScrollReveal direction="up">
                  <div className="tag-badge badge-red" style={{ marginBottom: '0.85rem' }}>
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

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
                gap: '2rem'
              }}>
                {service.capabilities.map((cap, cIdx) => (
                  <ScrollReveal key={cIdx} direction="up" delay={cIdx * 0.1}>
                    <div className="card-modern" style={{ padding: '2.25rem', height: '100%' }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--ofs-red-600)',
                        marginBottom: '0.5rem'
                      }}>
                        FEATURE 0{cIdx + 1}
                      </div>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        color: 'var(--ofs-navy-950)',
                        marginBottom: '0.75rem'
                      }}>
                        {cap.title}
                      </h3>
                      <p style={{ fontSize: '0.925rem', color: 'var(--ofs-gray-600)', lineHeight: 1.6, margin: 0 }}>
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
            <div style={{
              background: 'var(--ofs-navy-950)',
              color: 'var(--ofs-white)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'clamp(2.5rem, 5vw, 4.5rem)',
              marginBottom: '5rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div className="bg-grid-pattern-dark" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ maxWidth: '680px', marginBottom: '3.5rem' }}>
                  <div className="tag-badge badge-red" style={{ marginBottom: '1rem' }}>
                    EXECUTION METHODOLOGY
                  </div>
                  <h2 className="section-title" style={{ color: 'var(--ofs-white)' }}>
                    Standard Operating Procedure
                  </h2>
                  <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                    Our proven 5-stage workflow ensures transparent milestones, risk mitigation, and strict QA/QC sign-offs.
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
                  gap: '1.5rem'
                }}>
                  {service.process.map((p, pIdx) => (
                    <div key={pIdx} style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1.75rem 1.5rem'
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.85rem',
                        fontWeight: 900,
                        color: 'var(--ofs-red-400)',
                        marginBottom: '0.85rem'
                      }}>
                        {p.step}
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                        {p.title}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.55, margin: 0 }}>
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
            <div style={{ maxWidth: '820px', margin: '0 auto 4rem auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div className="tag-badge badge-red" style={{ marginBottom: '0.85rem' }}>
                  FREQUENTLY ASKED QUESTIONS
                </div>
                <h2 className="section-title">Technical & Commercial FAQs</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {service.faqs.map((faq, fIdx) => (
                  <div key={fIdx} style={{
                    background: 'var(--ofs-gray-50)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--ofs-gray-200)',
                    padding: '1.85rem'
                  }}>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: 'var(--ofs-navy-950)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      marginBottom: '0.85rem'
                    }}>
                      <HelpCircle size={20} style={{ color: 'var(--ofs-red-600)', flexShrink: 0 }} />
                      {faq.question}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--ofs-gray-600)', lineHeight: 1.65, margin: 0, paddingLeft: '2rem' }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Inquiry Form */}
      <div id="service-inquiry">
        <ContactCTA />
      </div>
    </>
  );
}
