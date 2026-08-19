import React from 'react';
import Link from 'next/link';
import { 
  Package, 
  Wrench, 
  ShieldCheck, 
  Anchor, 
  Building2, 
  Settings, 
  ArrowUpRight, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import servicesData from '@/data/services.json';
import ContactCTA from '@/components/sections/ContactCTA';

export const metadata = {
  title: 'Our Business & Services — OFS Group India',
  description: 'Explore OFS Group India core capabilities: Global Procurement, EPC Support, QA/QC Inspection, Marine Logistics, Plant Facility Management, and AMCs.'
};

const iconMap = {
  Package: Package,
  Wrench: Wrench,
  ShieldCheck: ShieldCheck,
  Anchor: Anchor,
  Building2: Building2,
  Settings: Settings
};

export default function ServicesPage() {
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
            <span style={{ color: 'var(--ofs-red-400)' }}>Services</span>
          </div>

          <div className="tag-badge badge-red" style={{ marginBottom: '1.25rem' }}>
            PORTFOLIO OF CAPABILITIES
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--ofs-white)',
            marginBottom: '1.5rem',
            maxWidth: '920px'
          }}>
            End-to-End Solutions for <br />
            <span className="gradient-text-red">Mission-Critical Industries</span>
          </h1>

          <p style={{
            fontSize: '1.18rem',
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '780px',
            lineHeight: 1.6
          }}>
            From offshore hydrocarbon terminals to massive onshore EPC builds and clean energy projects, OFS delivers synchronized procurement, certified engineering supervision, and proactive asset integrity.
          </p>
        </div>
      </section>

      {/* Services List / Grid */}
      <section className="section-pad" style={{ background: 'var(--ofs-gray-50)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3.5rem'
          }}>
            {servicesData.map((service, index) => {
              const IconComp = iconMap[service.icon] || Package;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  style={{
                    background: 'var(--ofs-white)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--ofs-gray-200)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-xl)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))'
                  }}
                  className="service-card-modern"
                >
                  {/* Content Column */}
                  <div style={{
                    padding: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    order: isEven ? 1 : 2
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div 
                          className="service-icon-box"
                          style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: 'var(--radius-xs)',
                            background: 'var(--ofs-navy-950)',
                            color: 'var(--ofs-red-400)',
                            display: 'grid',
                            placeContent: 'center',
                            boxShadow: '0 4px 12px rgba(12, 30, 78, 0.2)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <IconComp size={26} />
                        </div>
                        <span className="tag-pill">
                          {service.badge}
                        </span>
                      </div>

                      <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.6rem, 2.6vw, 2rem)',
                        fontWeight: 800,
                        color: 'var(--ofs-navy-950)',
                        marginBottom: '0.85rem',
                        lineHeight: 1.25
                      }}>
                        {service.title}
                      </h2>

                      <p style={{
                        fontSize: '1.025rem',
                        color: 'var(--ofs-gray-600)',
                        lineHeight: 1.6,
                        marginBottom: '1.75rem'
                      }}>
                        {service.description}
                      </p>

                      {/* Capabilities Bullets */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.25rem' }}>
                        {service.features.map((feat, fIdx) => (
                          <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.925rem', color: 'var(--ofs-gray-800)' }}>
                            <CheckCircle2 size={16} style={{ color: 'var(--ofs-red-600)', flexShrink: 0, marginTop: '3px' }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Link 
                        href={`/services/${service.slug}`} 
                        className="btn btn-navy"
                      >
                        Explore Full Specifications <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div style={{
                    position: 'relative',
                    minHeight: '360px',
                    order: isEven ? 2 : 1
                  }}>
                    <img 
                      src={service.heroImage} 
                      alt={service.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.15) 0%, rgba(6, 14, 36, 0.65) 100%)'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </>
  );
}
