'use client';

import React, { useState } from 'react';
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
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
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
          <div className="tag-badge badge-red" style={{ marginBottom: '1rem' }}>
            SECTOR EXPERTISE
          </div>
          <h2 className="section-title">
            Tailored Solutions Across <br />
            <span className="gradient-text-navy">Critical Global Industries</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            From deepwater hydrocarbons and heavy civil EPC complexes to high-purity pharma cleanrooms and utility solar parks.
          </p>
        </div>

        {/* Horizontal Industry Tab Selector */}
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

        {/* Selected Industry Detail Bento Console */}
        <div style={{
          background: 'var(--ofs-navy-50)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--ofs-navy-100)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          boxShadow: 'var(--shadow-xl)'
        }}>
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
                  Industry Focus & Compliance
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
                {currentIndustry.tagline}
              </p>

              {/* Key Solutions Delivered */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--ofs-navy-900)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Key Capabilities Delivered:
                </div>
                {currentIndustry.keySolutions.map((sol, sIdx) => (
                  <div key={sIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.925rem', color: 'var(--ofs-gray-800)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--ofs-red-600)', flexShrink: 0, marginTop: '3px' }} />
                    <span>{sol}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Link 
                href={`/industries/${currentIndustry.slug}`} 
                className="btn btn-primary"
              >
                Explore {currentIndustry.shortName} Solutions <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right: Featured Hero Visual */}
          <div style={{
            position: 'relative',
            minHeight: '380px'
          }}>
            <img 
              src={currentIndustry.heroImage} 
              alt={currentIndustry.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.2) 0%, rgba(6, 14, 36, 0.8) 100%)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              right: '1.5rem',
              color: '#fff',
              background: 'rgba(12, 30, 78, 0.88)',
              backdropFilter: 'blur(12px)',
              padding: '1.15rem 1.35rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ofs-gold-400)', textTransform: 'uppercase', marginBottom: '0.25rem', fontWeight: 700 }}>
                Operational Scope
              </div>
              <div style={{ fontSize: '0.875rem', color: '#fff', lineHeight: 1.45 }}>
                {currentIndustry.summary}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
