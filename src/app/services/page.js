'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import servicesData from '@/data/services.json';
import ContactCTA from '@/components/sections/ContactCTA';

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
      {/* Hero Banner with Cinematic Text Reveal */}
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
              <span style={{ color: 'var(--ofs-red-400)' }}>Services</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="tag-badge badge-red" style={{ marginBottom: '1.25rem' }}>
              PORTFOLIO OF CAPABILITIES
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
              End-to-End Solutions for
            </TextReveal>
            <br />
            <span className="gradient-text-red">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                Mission-Critical Industries
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
              From offshore hydrocarbon terminals to massive onshore EPC builds and clean energy projects, OFS delivers synchronized procurement, certified engineering supervision, and proactive asset integrity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services List / Staggered Bento Console */}
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
                <ScrollReveal key={service.id} direction={isEven ? 'left' : 'right'} delay={0.1}>
                  <div
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

                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: 'var(--ofs-navy-900)',
                            background: 'var(--ofs-navy-50)',
                            padding: '0.35rem 0.85rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--ofs-navy-100)'
                          }}>
                            {service.badge}
                          </span>
                        </div>

                        <h2 style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(1.6rem, 2.5vw, 2.15rem)',
                          fontWeight: 800,
                          color: 'var(--ofs-navy-950)',
                          marginBottom: '1rem',
                          lineHeight: 1.2
                        }}>
                          {service.title}
                        </h2>

                        <p style={{
                          fontSize: '1.025rem',
                          color: 'var(--ofs-gray-600)',
                          lineHeight: 1.65,
                          marginBottom: '1.75rem'
                        }}>
                          {service.description}
                        </p>

                        {/* Feature Highlights Grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
                          gap: '0.85rem',
                          marginBottom: '2.5rem'
                        }}>
                          {service.features.map((feat, fIndex) => (
                            <div key={fIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.88rem', color: 'var(--ofs-gray-800)' }}>
                              <CheckCircle2 size={16} style={{ color: 'var(--ofs-red-600)', flexShrink: 0, marginTop: '3px' }} />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Link href={`/services/${service.slug}`} className="btn btn-primary">
                          Detailed Division Scope <ArrowUpRight size={16} />
                        </Link>
                        <Link href="/contact" className="btn btn-outline">
                          Request Quotation
                        </Link>
                      </div>
                    </div>

                    {/* Image Visual Column */}
                    <div style={{
                      position: 'relative',
                      minHeight: '380px',
                      order: isEven ? 2 : 1,
                      overflow: 'hidden'
                    }}>
                      <motion.img 
                        src={service.heroImage || service.image || '/images/live/Procurement-and-shippings.jpg'} 
                        alt={service.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.15) 0%, rgba(6, 14, 36, 0.55) 100%)'
                      }} />

                      {/* Number Overlay */}
                      <div style={{
                        position: 'absolute',
                        bottom: '1.5rem',
                        right: '1.5rem',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '3rem',
                        fontWeight: 900,
                        color: 'rgba(255, 255, 255, 0.8)',
                        lineHeight: 1
                      }}>
                        0{index + 1}
                      </div>
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
