'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import industriesData from '@/data/industries.json';
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

export default function IndustriesPage() {
  return (
    <>
      {/* Hero Banner with TextReveal */}
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
              <span style={{ color: 'var(--ofs-red-400)' }}>Industries</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="tag-badge badge-red" style={{ marginBottom: '1.25rem' }}>
              CROSS-INDUSTRY DOMAIN EXPERTISE
            </div>
          </ScrollReveal>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--ofs-white)',
            marginBottom: '1.5rem',
            maxWidth: '920px'
          }}>
            <TextReveal tag="span" duration={0.65}>
              Engineered Support for
            </TextReveal>
            <br />
            <span className="gradient-text-red">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                High-Value Industrial Sectors
              </TextReveal>
            </span>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <p style={{
              fontSize: '1.18rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '780px',
              lineHeight: 1.6
            }}>
              From offshore drilling rigs and refinery turnarounds to clean energy utility parks and pharmaceutical complexes, OFS delivers tailored logistics, precision sourcing, and technical supervision.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section-pad" style={{ background: 'var(--ofs-gray-50)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2.5rem'
          }}>
            {industriesData.map((ind, idx) => {
              const IconComp = iconMap[ind.icon] || Flame;
              return (
                <ScrollReveal key={ind.id} direction="up" delay={idx * 0.08}>
                  <div 
                    className="card-modern"
                    style={{
                      padding: 0,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-md)',
                      height: '100%'
                    }}
                  >
                    <div>
                      {/* Hero Image with Zoom Hover */}
                      <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                        <motion.img 
                          src={ind.heroImage} 
                          alt={ind.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          whileHover={{ scale: 1.06 }}
                          transition={{ duration: 0.6 }}
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
                          boxShadow: '0 4px 12px rgba(12, 30, 78, 0.3)'
                        }}>
                          <IconComp size={22} />
                        </div>
                      </div>

                      {/* Content */}
                      <div style={{ padding: '2rem 2rem 1.5rem 2rem' }}>
                        <h2 style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.35rem',
                          fontWeight: 800,
                          color: 'var(--ofs-navy-950)',
                          marginBottom: '0.75rem',
                          lineHeight: 1.25
                        }}>
                          {ind.name}
                        </h2>

                        <p style={{
                          fontSize: '0.925rem',
                          color: 'var(--ofs-gray-600)',
                          lineHeight: 1.6,
                          marginBottom: '1.5rem'
                        }}>
                          {ind.summary.slice(0, 160)}...
                        </p>

                        {/* Solutions bullets */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                          {ind.keySolutions.slice(0, 3).map((sol, sIndex) => (
                            <div key={sIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--ofs-gray-700)' }}>
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
                      background: 'var(--ofs-navy-50)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Link 
                        href={`/industries/${ind.slug}`}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.825rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--ofs-navy-950)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        Sector Overview <ArrowUpRight size={15} />
                      </Link>

                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ofs-gray-400)', fontWeight: 700 }}>
                        ISO 9001
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
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
