import React from 'react';
import Link from 'next/link';
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
  CheckCircle2
} from 'lucide-react';
import industriesData from '@/data/industries.json';
import ContactCTA from '@/components/sections/ContactCTA';

export const metadata = {
  title: 'Industries We Serve — OFS Group India',
  description: 'Specialized procurement, engineering, and marine logistics across Oil & Gas, Power, Renewables, Petrochemicals, Pharma, and Heavy EPC sectors.'
};

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

export default function IndustriesPage() {
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
            <span style={{ color: 'var(--ofs-red-400)' }}>Industries</span>
          </div>

          <div className="tag-badge badge-red" style={{ marginBottom: '1.25rem' }}>
            CROSS-INDUSTRY DOMAIN EXPERTISE
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
            Engineered Support for <br />
            <span className="gradient-text-red">High-Value Industrial Sectors</span>
          </h1>

          <p style={{
            fontSize: '1.18rem',
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '780px',
            lineHeight: 1.6
          }}>
            From offshore drilling rigs and refinery turnarounds to clean energy utility parks and pharmaceutical complexes, OFS delivers tailored logistics, precision sourcing, and technical supervision.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section-pad" style={{ background: 'var(--ofs-gray-50)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem'
          }}>
            {industriesData.map((ind) => {
              const IconComp = iconMap[ind.icon] || Flame;
              return (
                <div 
                  key={ind.id}
                  className="card-modern"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  <div>
                    {/* Hero Image */}
                    <div style={{ height: '220px', position: 'relative' }}>
                      <img 
                        src={ind.heroImage} 
                        alt={ind.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.15) 0%, rgba(6, 14, 36, 0.5) 100%)'
                      }} />
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        width: '46px',
                        height: '46px',
                        borderRadius: 'var(--radius-xs)',
                        background: 'var(--ofs-navy-950)',
                        color: 'var(--ofs-red-400)',
                        display: 'grid',
                        placeContent: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)'
                      }}>
                        <IconComp size={22} />
                      </div>
                    </div>

                    <div style={{ padding: '2rem' }}>
                      <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: 'var(--ofs-navy-950)',
                        marginBottom: '0.75rem',
                        lineHeight: 1.3
                      }}>
                        {ind.name}
                      </h2>

                      <p style={{ fontSize: '0.925rem', color: 'var(--ofs-gray-600)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
                        {ind.tagline}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                        {ind.keySolutions.slice(0, 3).map((sol, sIdx) => (
                          <div key={sIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.85rem', color: 'var(--ofs-gray-700)' }}>
                            <CheckCircle2 size={15} style={{ color: 'var(--ofs-red-600)', flexShrink: 0, marginTop: '2px' }} />
                            <span>{sol}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    padding: '1.25rem 2rem',
                    borderTop: '1px solid var(--ofs-gray-200)',
                    background: 'var(--ofs-white)'
                  }}>
                    <Link 
                      href={`/industries/${ind.slug}`} 
                      className="btn btn-navy btn-sm"
                      style={{ width: '100%' }}
                    >
                      View Industry Capabilities <ArrowUpRight size={14} />
                    </Link>
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
