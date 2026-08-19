'use client';

import React from 'react';
import Link from 'next/link';
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
  Sparkles
} from 'lucide-react';
import servicesData from '@/data/services.json';

const iconMap = {
  Package: Package,
  Wrench: Wrench,
  ShieldCheck: ShieldCheck,
  Anchor: Anchor,
  Building2: Building2,
  Settings: Settings
};

export default function ServicesGrid() {
  return (
    <section className="section-pad" style={{ background: 'var(--ofs-gray-50)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
          <div>
            <div className="tag-badge badge-red" style={{ marginBottom: '1rem' }}>
              OUR CAPABILITIES
            </div>
            <h2 className="section-title">
              Engineered for Precision. <br />
              <span className="gradient-text-navy">Built for High-Stakes Operations.</span>
            </h2>
            <p className="section-desc">
              Comprehensive end-to-end operational solutions tailored for offshore basins, refineries, petrochemical complexes, and renewable energy parks.
            </p>
          </div>

          <Link href="/services" className="btn btn-navy">
            View All 6 Divisions <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {servicesData.map((service, index) => {
            const IconComp = iconMap[service.icon] || Package;
            return (
              <div 
                key={service.id}
                className="card-modern service-card-modern"
                style={{
                  padding: '2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: index % 2 === 0 ? 'var(--ofs-white)' : 'linear-gradient(135deg, #FFFFFF 0%, #F6F9FE 100%)'
                }}
              >
                <div>
                  {/* Top Badge & Icon */}
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
                        boxShadow: '0 4px 14px rgba(12, 30, 78, 0.22)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <IconComp size={26} />
                    </div>

                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
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

                  {/* Title & Tagline */}
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: 'var(--ofs-navy-950)',
                    marginBottom: '0.75rem',
                    lineHeight: 1.25
                  }}>
                    {service.title}
                  </h3>

                  <p style={{
                    fontSize: '0.925rem',
                    color: 'var(--ofs-gray-600)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    {service.description}
                  </p>

                  {/* Top Features List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                    {service.features.slice(0, 3).map((feat, fIndex) => (
                      <div key={fIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--ofs-gray-700)' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--ofs-red-600)', flexShrink: 0, marginTop: '2px' }} />
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
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'var(--ofs-red-600)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                    className="service-link"
                  >
                    Explore Service Details <ArrowUpRight size={16} />
                  </Link>

                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--ofs-gray-400)', fontWeight: 700 }}>
                    0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
