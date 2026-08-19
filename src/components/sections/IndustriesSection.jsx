'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import industriesData from '@/data/industries.json';

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

export default function IndustriesSection() {
  const [activeTab, setActiveTab] = useState(industriesData[0].id);
  const currentIndustry = industriesData.find((ind) => ind.id === activeTab) || industriesData[0];
  const IconComp = iconMap[currentIndustry.icon] || Flame;

  return (
    <section className="section-pad" style={{ background: 'var(--ofs-white)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <ScrollReveal direction="up">
            <div className="tag-badge badge-red" style={{ marginBottom: '1rem' }}>
              SECTOR EXPERTISE
            </div>
          </ScrollReveal>

          <h2 className="section-title">
            <TextReveal tag="span" duration={0.65}>
              Tailored Solutions Across
            </TextReveal>
            <br />
            <span className="gradient-text-navy">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                Critical Global Industries
              </TextReveal>
            </span>
          </h2>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              From deepwater hydrocarbons and heavy civil EPC complexes to high-purity pharma cleanrooms and utility solar parks.
            </p>
          </ScrollReveal>
        </div>

        {/* Horizontal Industry Tab Selector */}
        <ScrollReveal direction="up" delay={0.3}>
          <div style={{
            display: 'flex',
            gap: '0.65rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '2.5rem',
            scrollbarWidth: 'none'
          }}>
            {industriesData.map((ind) => {
              const TabIcon = iconMap[ind.icon] || Flame;
              const isActive = ind.id === activeTab;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '0.8rem 1.35rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: isActive ? 'var(--ofs-navy-950)' : 'var(--ofs-gray-100)',
                    color: isActive ? 'var(--ofs-white)' : 'var(--ofs-gray-700)',
                    border: isActive ? '1px solid var(--ofs-navy-950)' : '1px solid var(--ofs-gray-200)',
                    boxShadow: isActive ? '0 4px 14px rgba(12, 30, 78, 0.2)' : 'none'
                  }}
                >
                  <TabIcon size={16} style={{ color: isActive ? 'var(--ofs-red-400)' : 'var(--ofs-gray-500)' }} />
                  {ind.shortName}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Selected Industry Detail Bento Console with Animated Crossfade */}
        <ScrollReveal direction="up" delay={0.4}>
          <div style={{
            background: 'var(--ofs-navy-50)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--ofs-navy-100)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndustry.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))'
                }}
              >
                {/* Left: Content */}
                <div style={{ padding: 'clamp(2rem, 4vw, 3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-xs)',
                        background: 'var(--ofs-navy-950)',
                        color: 'var(--ofs-red-400)',
                        display: 'grid',
                        placeContent: 'center'
                      }}>
                        <IconComp size={22} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--ofs-navy-900)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Industry Focus &amp; Compliance
                      </span>
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.6rem, 2.6vw, 2.15rem)',
                      fontWeight: 800,
                      color: 'var(--ofs-navy-950)',
                      marginBottom: '1rem',
                      lineHeight: 1.2
                    }}>
                      {currentIndustry.name}
                    </h3>

                    <p style={{
                      fontSize: '1.025rem',
                      color: 'var(--ofs-gray-600)',
                      lineHeight: 1.6,
                      marginBottom: '1.75rem'
                    }}>
                      {currentIndustry.summary || currentIndustry.description}
                    </p>

                    {/* Key Capabilities List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                      {(currentIndustry.keySolutions || currentIndustry.capabilities || []).map((cap, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.925rem', color: 'var(--ofs-gray-800)' }}>
                          <CheckCircle2 size={18} style={{ color: 'var(--ofs-red-600)', flexShrink: 0 }} />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Link href={`/industries/${currentIndustry.slug}`} className="btn btn-primary">
                      Explore Sector Scope <ArrowUpRight size={16} />
                    </Link>
                    <Link href="/contact" className="btn btn-outline">
                      Request Consultation
                    </Link>
                  </div>
                </div>

                {/* Right: Graphic / Visual with Ambient Badge */}
                <div style={{
                  position: 'relative',
                  minHeight: '380px',
                  background: 'var(--ofs-navy-950)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem'
                }}>
                  <div className="bg-grid-pattern-dark" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

                  {/* Real Downloaded Live Industry Sector Graphic */}
                  <motion.img 
                    src={currentIndustry.heroImage || currentIndustry.image} 
                    alt={currentIndustry.name}
                    style={{
                      width: '85%',
                      maxHeight: '300px',
                      objectFit: 'contain',
                      position: 'relative',
                      zIndex: 2,
                      filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))'
                    }}
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Floating Spec Chip */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    background: 'rgba(6, 14, 36, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '0.65rem 1rem',
                    color: '#fff',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <ShieldCheck size={16} style={{ color: 'var(--ofs-gold-400)' }} />
                    <span>ISO 9001 &amp; OEM Standards Certified</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
