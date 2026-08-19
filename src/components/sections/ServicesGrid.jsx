'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Package, 
  Wrench, 
  ShieldCheck, 
  Anchor, 
  Building2, 
  Settings, 
  ArrowUpRight, 
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import servicesData from '@/data/services.json';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Package: Package,
  Wrench: Wrench,
  ShieldCheck: ShieldCheck,
  Anchor: Anchor,
  Building2: Building2,
  Settings: Settings
};

export default function ServicesGrid() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop || !sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const scrollLength = track.scrollWidth - window.innerWidth + 120;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollLength,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top+=80',
          end: () => `+=${scrollLength * 1.15}`,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section 
      ref={sectionRef}
      className="section-pad" 
      style={{ 
        background: 'linear-gradient(180deg, var(--ofs-gray-50) 0%, #FFFFFF 100%)', 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <ScrollReveal direction="up">
              <div className="tag-badge badge-red" style={{ marginBottom: '0.85rem' }}>
                OUR 6 CORE DIVISIONS
              </div>
            </ScrollReveal>

            <h2 className="section-title">
              <TextReveal tag="span" duration={0.65}>
                Engineered for Precision.
              </TextReveal>
              <br />
              <span className="gradient-text-navy">
                <TextReveal tag="span" delay={0.2} duration={0.65}>
                  Built for High-Stakes Operations.
                </TextReveal>
              </span>
            </h2>

            <ScrollReveal direction="up" delay={0.25}>
              <p className="section-desc">
                Comprehensive operational support tailored for offshore basins, refineries, petrochemical complexes, and renewable energy parks.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.35}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {isDesktop && (
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--ofs-gray-500)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.85rem',
                  background: 'var(--ofs-navy-50)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--ofs-navy-100)'
                }}>
                  <span className="sonar-wave" style={{ width: '6px', height: '6px', background: 'var(--ofs-red-600)' }} />
                  SCROLL HORIZONTALLY <ArrowRight size={13} />
                </div>
              )}

              <Link href="/services" className="btn btn-navy">
                View All Divisions <ArrowUpRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Desktop Pinned Horizontal Track vs Mobile Vertical Grid */}
        {isDesktop ? (
          <div style={{ overflow: 'visible', paddingTop: '1rem', paddingBottom: '2rem' }}>
            <div 
              ref={trackRef}
              style={{
                display: 'flex',
                gap: '2rem',
                width: 'max-content',
                willChange: 'transform'
              }}
            >
              {servicesData.map((service, index) => {
                const IconComp = iconMap[service.icon] || Package;
                return (
                  <div 
                    key={service.id}
                    className="card-modern service-card-modern"
                    style={{
                      width: '420px',
                      flexShrink: 0,
                      padding: '2.5rem 2.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: 'var(--ofs-white)',
                      boxShadow: 'var(--shadow-lg)',
                      border: '1.5px solid var(--ofs-gray-200)',
                      borderRadius: 'var(--radius-lg)'
                    }}
                  >
                    <div>
                      {/* Top Service Image Preview */}
                      <div style={{
                        height: '170px',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        marginBottom: '1.5rem',
                        position: 'relative'
                      }}>
                        <img 
                          src={service.image || '/images/live/Procurement-and-shippings.jpg'} 
                          alt={service.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.1) 0%, rgba(6, 14, 36, 0.6) 100%)'
                        }} />
                        <span style={{
                          position: 'absolute',
                          bottom: '0.85rem',
                          left: '0.85rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: '#fff',
                          background: 'rgba(6, 14, 36, 0.85)',
                          padding: '0.3rem 0.75rem',
                          borderRadius: 'var(--radius-full)',
                          backdropFilter: 'blur(6px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                          {service.badge}
                        </span>
                      </div>

                      {/* Service Icon and Title */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.85rem' }}>
                        <div 
                          className="service-icon-box"
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: 'var(--radius-xs)',
                            background: 'var(--ofs-navy-950)',
                            color: 'var(--ofs-red-400)',
                            display: 'grid',
                            placeContent: 'center',
                            boxShadow: '0 4px 12px rgba(12, 30, 78, 0.2)',
                            flexShrink: 0
                          }}
                        >
                          <IconComp size={22} />
                        </div>
                        <h3 style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: 'var(--ofs-navy-950)',
                          margin: 0,
                          lineHeight: 1.25
                        }}>
                          {service.title}
                        </h3>
                      </div>

                      <p style={{
                        fontSize: '0.9rem',
                        color: 'var(--ofs-gray-600)',
                        lineHeight: 1.6,
                        marginBottom: '1.5rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {service.description}
                      </p>

                      {/* Feature Bullets */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.75rem' }}>
                        {service.features.slice(0, 3).map((feat, fIndex) => (
                          <div key={fIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--ofs-gray-700)' }}>
                            <CheckCircle2 size={15} style={{ color: 'var(--ofs-red-600)', flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Link */}
                    <div style={{
                      paddingTop: '1.25rem',
                      borderTop: '1px solid var(--ofs-gray-200)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Link 
                        href={`/services/${service.slug}`}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--ofs-red-600)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                        className="service-link"
                      >
                        Explore Service <ArrowUpRight size={15} />
                      </Link>

                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--ofs-gray-400)', fontWeight: 700 }}>
                        0{index + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Mobile / Tablet Vertical Bento Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2rem'
          }}>
            {servicesData.map((service, index) => {
              const IconComp = iconMap[service.icon] || Package;
              return (
                <ScrollReveal key={service.id} direction="up" delay={index * 0.1}>
                  <div 
                    className="card-modern service-card-modern"
                    style={{
                      padding: '2rem 1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: 'var(--ofs-white)',
                      height: '100%'
                    }}
                  >
                    <div>
                      {/* Mobile Top Badge & Icon */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <div 
                          className="service-icon-box"
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-xs)',
                            background: 'var(--ofs-navy-950)',
                            color: 'var(--ofs-red-400)',
                            display: 'grid',
                            placeContent: 'center'
                          }}
                        >
                          <IconComp size={22} />
                        </div>

                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: 'var(--ofs-navy-900)',
                          background: 'var(--ofs-navy-50)',
                          padding: '0.3rem 0.75rem',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid var(--ofs-navy-100)'
                        }}>
                          {service.badge}
                        </span>
                      </div>

                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: 'var(--ofs-navy-950)',
                        marginBottom: '0.65rem',
                        lineHeight: 1.25
                      }}>
                        {service.title}
                      </h3>

                      <p style={{
                        fontSize: '0.9rem',
                        color: 'var(--ofs-gray-600)',
                        lineHeight: 1.6,
                        marginBottom: '1.25rem'
                      }}>
                        {service.description}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        {service.features.slice(0, 3).map((feat, fIndex) => (
                          <div key={fIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--ofs-gray-700)' }}>
                            <CheckCircle2 size={15} style={{ color: 'var(--ofs-red-600)', flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--ofs-gray-200)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Link 
                        href={`/services/${service.slug}`}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--ofs-red-600)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                        className="service-link"
                      >
                        Explore Service <ArrowUpRight size={15} />
                      </Link>

                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--ofs-gray-400)', fontWeight: 700 }}>
                        0{index + 1}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
