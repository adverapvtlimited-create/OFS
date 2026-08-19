'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, ArrowUpRight, CheckCircle2, Sparkles, Globe2, HeartHandshake } from 'lucide-react';
import siteConfig from '@/data/site-config.json';

export default function AboutPreview() {
  return (
    <section className="section-pad" style={{ background: 'var(--ofs-white)', position: 'relative' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: '4.5rem',
          alignItems: 'center'
        }}>
          {/* Left: Image Composition with Floating Badge */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-2xl)',
              border: '2px solid var(--ofs-gray-200)'
            }}>
              <img 
                src="/images/live/Abourt-Our-Company.jpg" 
                alt="Oriented Facility Solution Pvt Ltd - About Our Company"
                style={{ width: '100%', height: '460px', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.1) 0%, rgba(6, 14, 36, 0.45) 100%)'
              }} />
            </div>

            {/* Overlapping Floating Experience Badge */}
            <div style={{
              position: 'absolute',
              bottom: '-25px',
              right: '-15px',
              background: 'var(--ofs-navy-950)',
              color: 'var(--ofs-white)',
              padding: '1.6rem 1.75rem',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--ofs-gold-400)',
              boxShadow: 'var(--shadow-2xl)',
              maxWidth: '250px'
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'var(--ofs-gold-400)',
                lineHeight: 1
              }}>
                15+ Years
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginTop: '0.4rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 700
              }}>
                Global Procurement & Technical Support
              </div>
            </div>
          </div>

          {/* Right: Company Story & Differentiators */}
          <div>
            <div className="tag-badge badge-red" style={{ marginBottom: '1rem' }}>
              ABOUT OUR COMPANY
            </div>
            
            <h2 className="section-title">
              Driven by Quality. <br />
              <span className="gradient-text-navy">Defined by Trust.</span>
            </h2>

            <p className="section-desc" style={{ marginBottom: '1.75rem' }}>
              {siteConfig.longDesc}
            </p>

            {/* Key Differentiator Pillars */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                padding: '1.15rem',
                background: 'var(--ofs-navy-50)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--ofs-navy-100)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Sparkles size={20} style={{ color: 'var(--ofs-gold-600)' }} />
                  <strong style={{ fontSize: '0.95rem', color: 'var(--ofs-navy-950)' }}>3,000+ Approved Brands</strong>
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--ofs-gray-600)', margin: 0, lineHeight: 1.5 }}>
                  Internationally approved OEM manufacturers across the US and Europe.
                </p>
              </div>

              <div style={{
                padding: '1.15rem',
                background: 'var(--ofs-navy-50)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--ofs-navy-100)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--ofs-navy-900)' }} />
                  <strong style={{ fontSize: '0.95rem', color: 'var(--ofs-navy-950)' }}>ISO 9001:2015 Assured</strong>
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--ofs-gray-600)', margin: 0, lineHeight: 1.5 }}>
                  Standardized quality management systems and strict QA/QC audit dossiers.
                </p>
              </div>
            </div>

            {/* Bullets List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.95rem', color: 'var(--ofs-gray-800)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--ofs-red-600)', flexShrink: 0 }} />
                <span>Specialized Support: Trading, O&M, Troubleshooting, Procurement & Engineering</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.95rem', color: 'var(--ofs-gray-800)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--ofs-red-600)', flexShrink: 0 }} />
                <span>Global Presence: India Headquarters (Mumbai) & USA Office (Florida)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.95rem', color: 'var(--ofs-gray-800)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--ofs-red-600)', flexShrink: 0 }} />
                <span>Turnkey Offshore & Onshore Catering Solutions with HACCP Safety</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/about" className="btn btn-navy">
                Read Company Profile <ArrowUpRight size={16} />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Contact Global Offices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
