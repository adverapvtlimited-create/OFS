'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Zap, 
  ChevronRight, 
  Play, 
  Globe2, 
  Anchor, 
  Activity, 
  Layers,
  Sparkles
} from 'lucide-react';
import TextRotator from '@/components/animations/TextRotator';
import Counter from '@/components/animations/Counter';
import siteConfig from '@/data/site-config.json';

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(180deg, var(--ofs-navy-50) 0%, #FFFFFF 100%)',
      paddingTop: 'clamp(3rem, 6vw, 4.5rem)',
      paddingBottom: 'clamp(3.5rem, 7vw, 5rem)',
      overflow: 'hidden'
    }}>
      {/* Background Architectural Grid Accent */}
      <div className="bg-grid-pattern" style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.7,
        pointerEvents: 'none'
      }} />

      {/* Subtle Radial Glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(14, 33, 87, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Top Tag Pills & Status Radar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          <div className="tag-badge badge-red">
            <span className="sonar-wave" style={{ background: '#fff' }} />
            OFS GROUP INDIA
          </div>
          <div className="tag-pill">
            <Sparkles size={14} style={{ color: 'var(--ofs-gold-600)' }} />
            3,000+ US & European Approved Brands
          </div>
          <div className="tag-pill">
            <ShieldCheck size={14} style={{ color: 'var(--ofs-navy-900)' }} />
            ISO 9001:2015 Certified
          </div>
          <div className="tag-pill pill-green">
            <Zap size={14} />
            Global Marine, Offshore & Industrial Operations
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          alignItems: 'center',
          marginBottom: '3.5rem'
        }}>
          <div>
            <h1 style={{
              fontSize: 'var(--text-hero)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--ofs-navy-950)',
              marginBottom: '1.5rem'
            }}>
              Strategic Support for <br />
              <TextRotator words={[
                "Marine & Offshore", 
                "Procurement & Shipping", 
                "Engineering & EPC", 
                "Integrated Facilities", 
                "Spare Parts & MRO"
              ]} />
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 1.55vw, 1.35rem)',
              color: 'var(--ofs-gray-600)',
              maxWidth: '860px',
              lineHeight: 1.6,
              marginBottom: '2.25rem'
            }}>
              {siteConfig.description}
            </p>

            {/* CTA Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/services" className="btn btn-primary btn-lg">
                Explore Capabilities <ArrowUpRight size={18} />
              </Link>
              
              <Link href="/contact" className="btn btn-outline btn-lg">
                Request RFQ / Consultation
              </Link>

              <Link href="/renewables" className="btn btn-green btn-lg">
                Renewables Portal <Zap size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Visual Telemetry Showcase with Live Image */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-2xl)',
          border: '1px solid rgba(12, 30, 78, 0.12)',
          marginBottom: '3.5rem'
        }}>
          <div style={{
            height: '460px',
            position: 'relative',
            background: 'url(/images/live/Banner3.jpg) center/cover no-repeat'
          }}>
            {/* Cinematic Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.25) 0%, rgba(6, 14, 36, 0.85) 100%)'
            }} />

            {/* Telemetry Floating Chips */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              left: '1.5rem',
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              zIndex: 3
            }}>
              <div style={{
                background: 'rgba(6, 14, 36, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 'var(--radius-full)',
                padding: '0.4rem 1rem',
                color: '#fff',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600
              }}>
                <span className="sonar-wave" style={{ background: 'var(--ofs-green-400)' }} />
                OPERATIONAL DISPATCH: 24/7 ACTIVE
              </div>

              <div style={{
                background: 'rgba(6, 14, 36, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 'var(--radius-full)',
                padding: '0.4rem 1rem',
                color: '#fff',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600
              }}>
                <ShieldCheck size={14} style={{ color: 'var(--ofs-gold-400)' }} />
                ISO 9001:2015 ASSURED
              </div>
            </div>

            {/* Bottom Overlay Info Banner */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1.5rem',
              zIndex: 3
            }}>
              <div style={{ maxWidth: '600px' }}>
                <div style={{
                  color: 'var(--ofs-gold-400)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.35rem'
                }}>
                  Global Procurement & SCM Cloud
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.65rem)',
                  fontWeight: 800,
                  color: 'var(--ofs-white)',
                  margin: 0,
                  lineHeight: 1.25
                }}>
                  3,000+ Approved International Brands Across US, Europe & Asia
                </h3>
              </div>

              <div style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center'
              }}>
                <div style={{
                  padding: '0.75rem 1.25rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  textAlign: 'right'
                }}>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.7)' }}>
                    GLOBAL SLA
                  </div>
                  <div style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--ofs-green-400)' }}>
                    99.8% On-Time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Stats Counter Strip */}
        <div style={{
          background: 'var(--ofs-navy-950)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(2rem, 3.5vw, 3rem)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="bg-grid-pattern-dark" style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.5,
            pointerEvents: 'none'
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 45%), 1fr))',
            gap: '2rem',
            position: 'relative',
            zIndex: 2
          }}>
            {siteConfig.stats.map((stat, idx) => (
              <div key={idx} style={{
                borderLeft: idx !== 0 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
                paddingLeft: idx !== 0 ? '1.5rem' : 0
              }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 3.5vw, 3.25rem)',
                  fontWeight: 900,
                  color: 'var(--ofs-gold-400)',
                  lineHeight: 1,
                  marginBottom: '0.35rem'
                }}>
                  <Counter 
                    end={stat.numeric} 
                    suffix={stat.suffix} 
                    decimals={stat.numeric % 1 !== 0 ? 1 : 0} 
                  />
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  fontWeight: 600
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
