'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const row1Brands = [
  { name: 'Emerson', category: 'Control Systems & Instrumentation', country: 'USA' },
  { name: 'Fisher Valves', category: 'Severe Service & ESD Valves', country: 'USA' },
  { name: 'Flowserve', category: 'Pumps & Mechanical Seals', country: 'USA' },
  { name: 'Cameron', category: 'Wellhead & Pressure Control', country: 'USA' },
  { name: 'Yokogawa', category: 'DCS & Process Analyzers', country: 'Japan' },
  { name: 'Honeywell', category: 'Process Solutions & Transmitters', country: 'USA' },
  { name: 'Schneider Electric', category: 'Industrial Power & Switchgear', country: 'France' },
  { name: 'ABB', category: 'High-Voltage Motors & Drives', country: 'Switzerland' },
  { name: 'Swagelok', category: 'Fluid Systems & Tube Fittings', country: 'USA' },
  { name: 'Parker Hannifin', category: 'Motion, Hydraulics & Filtration', country: 'USA' },
];

const row2Brands = [
  { name: 'Rockwell Automation', category: 'Allen-Bradley PLC & Drives', country: 'USA' },
  { name: 'Siemens Energy', category: 'Turbomachinery & Power Transmission', country: 'Germany' },
  { name: 'WIKA', category: 'Pressure & Temperature Gauges', country: 'Germany' },
  { name: 'Sulzer', category: 'Centrifugal Pumps & Agitators', country: 'Switzerland' },
  { name: 'KSB Pumps', category: 'High-Pressure Industrial Pumps', country: 'Germany' },
  { name: 'Alfa Laval', category: 'Plate Heat Exchangers & Decanters', country: 'Sweden' },
  { name: 'Endress+Hauser', category: 'Flow, Level & Optical Telemetry', country: 'Switzerland' },
  { name: 'Danfoss', category: 'Variable Frequency Inverters', country: 'Denmark' },
  { name: 'Atlas Copco', category: 'Industrial Air & Nitrogen Skids', country: 'Sweden' },
  { name: 'Spirax Sarco', category: 'Steam Management & Trapping', country: 'UK' },
];

export default function BrandMarquee() {
  return (
    <section 
      style={{
        background: 'linear-gradient(180deg, var(--ofs-navy-950) 0%, #060e24 100%)',
        color: 'var(--ofs-white)',
        paddingTop: '3.5rem',
        paddingBottom: '3.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-label="Approved Global Manufacturers & Brands"
    >
      {/* Background glow ambiance */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '250px',
          background: 'radial-gradient(ellipse at center, rgba(224, 42, 48, 0.08) 0%, rgba(12, 30, 78, 0.0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, marginBottom: '2.25rem' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--ofs-gold-400)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}>
              <Sparkles size={14} />
              <span>Global Sourcing Network</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 800,
              color: 'var(--ofs-white)',
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              3,000+ Internationally Approved Brands
            </h2>
            <p style={{
              fontSize: '0.925rem',
              color: 'rgba(255, 255, 255, 0.65)',
              marginTop: '0.35rem',
              maxWidth: '620px'
            }}>
              Direct authorized sourcing channels across premier US, European, and Japanese original equipment manufacturers with 100% verifiable mill test certificates.
            </p>
          </div>

          <Link
            href="/services/procurement-shipping"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--ofs-red-400)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid rgba(224, 42, 48, 0.3)',
              background: 'rgba(224, 42, 48, 0.05)',
              transition: 'all 0.25s ease'
            }}
            className="hover-white"
          >
            Explore Sourcing Standards <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Marquee Track 1 (Right to Left) */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          marginBottom: '1rem'
        }}
      >
        <div className="marquee-content-rtl">
          {[...row1Brands, ...row1Brands].map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0.85rem 1.4rem',
                minWidth: '220px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-sm)',
                backdropFilter: 'blur(8px)',
                marginRight: '1rem',
                flexShrink: 0,
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              className="brand-chip"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: 'var(--ofs-white)',
                  letterSpacing: '-0.01em'
                }}>
                  {b.name}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  padding: '0.15rem 0.4rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(217, 119, 6, 0.18)',
                  color: 'var(--ofs-gold-400)',
                  fontWeight: 700
                }}>
                  {b.country}
                </span>
              </div>
              <span style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.6)',
                whiteSpace: 'nowrap'
              }}>
                {b.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Track 2 (Right to Left - Slower/Offset) */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <div className="marquee-content-rtl-slow">
          {[...row2Brands, ...row2Brands].map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0.85rem 1.4rem',
                minWidth: '220px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-sm)',
                backdropFilter: 'blur(8px)',
                marginRight: '1rem',
                flexShrink: 0,
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              className="brand-chip"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: 'var(--ofs-white)',
                  letterSpacing: '-0.01em'
                }}>
                  {b.name}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  padding: '0.15rem 0.4rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(16, 185, 129, 0.18)',
                  color: 'var(--ofs-green-400)',
                  fontWeight: 700
                }}>
                  {b.country}
                </span>
              </div>
              <span style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.6)',
                whiteSpace: 'nowrap'
              }}>
                {b.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-content-rtl {
          display: flex;
          width: max-content;
          animation: marqueeRTL 38s linear infinite;
        }
        .marquee-content-rtl-slow {
          display: flex;
          width: max-content;
          animation: marqueeRTL 45s linear infinite;
        }
        .marquee-content-rtl:hover,
        .marquee-content-rtl-slow:hover {
          animation-play-state: paused;
        }
        .brand-chip:hover {
          background: rgba(255, 255, 255, 0.09) !important;
          border-color: var(--ofs-red-500) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        @keyframes marqueeRTL {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
