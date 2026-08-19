'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Zap, 
  ChevronRight, 
  Globe2, 
  Anchor, 
  Activity, 
  Layers,
  Sparkles,
  TrendingUp,
  Boxes
} from 'lucide-react';
import TextRotator from '@/components/animations/TextRotator';
import Counter from '@/components/animations/Counter';
import TextReveal from '@/components/animations/TextReveal';
import siteConfig from '@/data/site-config.json';

export default function Hero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Smooth springs for buttery scroll interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Multi-layer scroll transforms
  const headlineY = useTransform(smoothProgress, [0, 0.7], [0, -55]);
  const headlineOpacity = useTransform(smoothProgress, [0, 0.65], [1, 0.35]);
  const bgGridY = useTransform(smoothProgress, [0, 1], [0, 80]);
  const imageScale = useTransform(smoothProgress, [0, 0.8], [1, 1.06]);
  const imageY = useTransform(smoothProgress, [0, 1], [0, 45]);
  const cardFloatLeft = useTransform(smoothProgress, [0, 0.7], [0, -35]);
  const cardFloatRight = useTransform(smoothProgress, [0, 0.7], [0, 35]);
  const statsStripY = useTransform(smoothProgress, [0, 0.8], [0, -25]);

  return (
    <section 
      ref={containerRef}
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, var(--ofs-navy-50) 0%, #FFFFFF 100%)',
        paddingTop: 'clamp(3rem, 6vw, 4.5rem)',
        paddingBottom: 'clamp(3.5rem, 7vw, 5rem)',
        overflow: 'hidden'
      }}
    >
      {/* Background Architectural Grid Accent with Parallax */}
      <motion.div 
        className="bg-grid-pattern" 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.7,
          pointerEvents: 'none',
          y: bgGridY
        }} 
      />

      {/* Subtle Radial Glow */}
      <motion.div 
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(14, 33, 87, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          y: bgGridY
        }} 
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Top Tag Pills & Status Radar with Entrance Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}
        >
          <div className="tag-badge badge-red">
            <span className="sonar-wave" style={{ background: '#fff' }} />
            OFS GROUP INDIA
          </div>
          <div className="tag-pill">
            <Sparkles size={14} style={{ color: 'var(--ofs-gold-600)' }} />
            3,000+ US &amp; European Approved Brands
          </div>
          <div className="tag-pill">
            <ShieldCheck size={14} style={{ color: 'var(--ofs-navy-900)' }} />
            ISO 9001:2015 Certified
          </div>
          <div className="tag-pill pill-green">
            <Zap size={14} />
            Global Marine, Offshore &amp; Industrial Operations
          </div>
        </motion.div>

        {/* Main Headline & Subtitle with Scroll-Linked Upward Motion */}
        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'center',
            marginBottom: '3.5rem',
            y: headlineY,
            opacity: headlineOpacity
          }}
        >
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

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(1.1rem, 1.55vw, 1.35rem)',
                color: 'var(--ofs-gray-600)',
                maxWidth: '860px',
                lineHeight: 1.6,
                marginBottom: '2.25rem'
              }}
            >
              {siteConfig.description}
            </motion.p>

            {/* CTA Action Buttons with Staggered Entrance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <Link href="/services" className="btn btn-primary btn-lg">
                Explore Capabilities <ArrowUpRight size={18} />
              </Link>
              
              <Link href="/contact" className="btn btn-outline btn-lg">
                Request RFQ / Consultation
              </Link>

              <Link href="/renewables" className="btn btn-green btn-lg">
                Renewables Portal <Zap size={18} />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero Visual Telemetry Showcase with Scroll-Driven Zoom & Parallax */}
        <motion.div 
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-2xl)',
            border: '1px solid rgba(12, 30, 78, 0.12)',
            marginBottom: '3.5rem',
            y: imageY
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            style={{
              height: '460px',
              position: 'relative',
              background: 'url(/images/live/Banner3.jpg) center/cover no-repeat',
              scale: imageScale
            }}
          >
            {/* Cinematic Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.25) 0%, rgba(6, 14, 36, 0.85) 100%)'
            }} />

            {/* Telemetry Floating Chips with Diagonal Scroll Parallax */}
            <motion.div 
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                zIndex: 3,
                x: cardFloatLeft
              }}
            >
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
            </motion.div>

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
                  Global Procurement &amp; SCM Cloud
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.65rem)',
                  fontWeight: 800,
                  color: 'var(--ofs-white)',
                  margin: 0,
                  lineHeight: 1.25
                }}>
                  3,000+ Approved International Brands Across US, Europe &amp; Asia
                </h3>
              </div>

              <motion.div 
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'center',
                  x: cardFloatRight
                }}
              >
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
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Stats Counter Strip with Upward Parallax Transition */}
        <motion.div 
          style={{
            background: 'var(--ofs-navy-950)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(2rem, 3.5vw, 3rem)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'var(--shadow-xl)',
            position: 'relative',
            overflow: 'hidden',
            y: statsStripY
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
