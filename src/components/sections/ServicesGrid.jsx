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
import MagneticButton from '@/components/animations/MagneticButton';
import GlowCard from '@/components/animations/GlowCard';
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
    // Calculate total horizontal scroll distance
    const scrollLength = track.scrollWidth - window.innerWidth + 80;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollLength,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${scrollLength * 1.1}`,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section 
      ref={sectionRef}
      style={{ 
        background: 'linear-gradient(180deg, var(--ofs-gray-50) 0%, #FFFFFF 100%)', 
        position: 'relative',
        overflow: 'hidden',
        minHeight: isDesktop ? '100vh' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isDesktop ? 'center' : 'flex-start',
        paddingTop: isDesktop ? '4.5rem' : 'var(--section-pad-y)',
        paddingBottom: isDesktop ? '2rem' : 'var(--section-pad-y)'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        {/* Compact, High-Impact Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: isDesktop ? '1.5rem' : '2.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
              <span className="tag-badge badge-red" style={{ fontSize: '0.7rem', padding: '0.3rem 0.75rem' }}>
                CORE CAPABILITIES
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ofs-navy-900)', fontWeight: 700 }}>
                6 STRATEGIC DIVISIONS
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.65rem, 2.75vw, 2.35rem)',
              fontWeight: 800,
              color: 'var(--ofs-navy-950)',
              margin: 0,
              lineHeight: 1.2
            }}>
              Engineered for Precision. <span className="gradient-text-navy">Built for High-Stakes Operations.</span>
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {isDesktop && (
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--ofs-navy-900)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.85rem',
                background: 'var(--ofs-navy-50)',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--ofs-navy-100)',
                fontWeight: 600
              }}>
                <span className="sonar-wave" style={{ width: '6px', height: '6px', background: 'var(--ofs-red-600)' }} />
                SCROLL TO EXPLORE ALL 6 <ArrowRight size={12} />
              </div>
            )}

            <MagneticButton strength={0.3} radius={70}>
              <Link href="/services" className="btn btn-navy btn-sm" data-cursor-text="ALL">
                All Divisions <ArrowUpRight size={14} />
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* Desktop Viewport-Fitted Horizontal Track */}
        {isDesktop ? (
          <div style={{ overflow: 'visible', paddingTop: '0.5rem', paddingBottom: '1rem' }}>
            <div 
              ref={trackRef}
              style={{
                display: 'flex',
                gap: '1.5rem',
                width: 'max-content',
                willChange: 'transform'
              }}
            >
              {servicesData.map((service, index) => {
                const IconComp = iconMap[service.icon] || Package;
                return (
                  <GlowCard 
                    key={service.id}
                    className="service-card-modern"
                    data-cursor-text="VIEW"
                    style={{
                      width: '380px',
                      flexShrink: 0,
                      padding: '1.4rem 1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      {/* Image Thumbnail with Overlay Badge */}
                      <div style={{
                        height: '135px',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        marginBottom: '1rem',
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
                          background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.1) 0%, rgba(6, 14, 36, 0.65) 100%)'
                        }} />
                        <span style={{
                          position: 'absolute',
                          bottom: '0.65rem',
                          left: '0.65rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          color: '#fff',
                          background: 'rgba(6, 14, 36, 0.85)',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-full)',
                          backdropFilter: 'blur(6px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                          {service.badge}
                        </span>
                      </div>

                      {/* Header with Icon and Title */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                        <div 
                          className="service-icon-box"
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: 'var(--radius-xs)',
                            background: 'var(--ofs-navy-950)',
                            color: 'var(--ofs-red-400)',
                            display: 'grid',
                            placeContent: 'center',
                            boxShadow: '0 3px 10px rgba(12, 30, 78, 0.2)',
                            flexShrink: 0
                          }}
                        >
                          <IconComp size={18} />
                        </div>
                        <h3 style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.15rem',
                          fontWeight: 800,
                          color: 'var(--ofs-navy-950)',
                          margin: 0,
                          lineHeight: 1.2
                        }}>
                          {service.title}
                        </h3>
                      </div>

                      <p style={{
                        fontSize: '0.85rem',
                        color: 'var(--ofs-gray-600)',
                        lineHeight: 1.5,
                        marginBottom: '0.9rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {service.description}
                      </p>

                      {/* Feature Bullets (2 highlights to fit any screen height) */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                        {service.features.slice(0, 2).map((feat, fIndex) => (
                          <div key={fIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--ofs-gray-700)', lineHeight: 1.35 }}>
                            <CheckCircle2 size={14} style={{ color: 'var(--ofs-red-600)', flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Link */}
                    <div style={{
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--ofs-gray-200)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Link 
                        href={`/services/${service.slug}`}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--ofs-red-600)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                        className="service-link"
                      >
                        Explore Details <ArrowUpRight size={14} />
                      </Link>

                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--ofs-gray-400)', fontWeight: 700 }}>
                        0{index + 1}
                      </span>
                    </div>
                  </GlowCard>
                );
              })}
            </div>
          </div>
        ) : (
          /* Mobile / Tablet Vertical Bento Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '1.5rem'
          }}>
            {servicesData.map((service, index) => {
              const IconComp = iconMap[service.icon] || Package;
              return (
                <ScrollReveal key={service.id} direction="up" delay={index * 0.08}>
                  <div 
                    className="card-modern service-card-modern"
                    style={{
                      padding: '1.65rem 1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: 'var(--ofs-white)',
                      height: '100%',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div>
                      {/* Mobile Top Badge & Icon */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div 
                          className="service-icon-box"
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: 'var(--radius-xs)',
                            background: 'var(--ofs-navy-950)',
                            color: 'var(--ofs-red-400)',
                            display: 'grid',
                            placeContent: 'center'
                          }}
                        >
                          <IconComp size={20} />
                        </div>

                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: 'var(--ofs-navy-900)',
                          background: 'var(--ofs-navy-50)',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid var(--ofs-navy-100)'
                        }}>
                          {service.badge}
                        </span>
                      </div>

                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.18rem',
                        fontWeight: 800,
                        color: 'var(--ofs-navy-950)',
                        marginBottom: '0.5rem',
                        lineHeight: 1.25
                      }}>
                        {service.title}
                      </h3>

                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--ofs-gray-600)',
                        lineHeight: 1.5,
                        marginBottom: '1rem'
                      }}>
                        {service.description}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
                        {service.features.slice(0, 3).map((feat, fIndex) => (
                          <div key={fIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--ofs-gray-700)' }}>
                            <CheckCircle2 size={14} style={{ color: 'var(--ofs-red-600)', flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--ofs-gray-200)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Link 
                        href={`/services/${service.slug}`}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--ofs-red-600)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                        className="service-link"
                      >
                        Explore Service <ArrowUpRight size={14} />
                      </Link>

                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ofs-gray-400)', fontWeight: 700 }}>
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
