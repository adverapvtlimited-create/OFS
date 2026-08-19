'use client';

import React from 'react';
import Counter from '@/components/animations/Counter';
import { Award, ShieldCheck, TrendingUp, Globe2, CheckCircle } from 'lucide-react';

const statsData = [
  { numeric: 7, suffix: "+", label: "Years of Industry Excellence", desc: "Proven track record in high-stakes operational environments" },
  { numeric: 48, suffix: "+", label: "EPC & Turnkey Projects", desc: "Successfully delivered across India, Gulf & global basins" },
  { numeric: 20, suffix: "+", label: "Tier-1 Enterprise Clients", desc: "Trusted by major offshore, refinery & energy leaders" },
  { numeric: 10, suffix: "+", label: "Operating Countries & Basins", desc: "Active logistics across India, Middle East & SE Asia" },
  { numeric: 99.8, suffix: "%", decimals: 1, label: "On-Time Fulfillment SLA", desc: "Zero-delay critical path expediting & supply chain integrity" },
  { numeric: 100, suffix: "%", label: "ISO 9001:2015 Compliant", desc: "Rigorous quality systems & NDT Level III certified audits" }
];

export default function StatsCounter() {
  return (
    <section className="section-pad" style={{
      background: 'var(--ofs-navy-950)',
      color: 'var(--ofs-white)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Radial Ambient Glow Effects */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '700px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(224, 42, 48, 0.22) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="bg-grid-pattern-dark" style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.4,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="tag-badge badge-red" style={{ marginBottom: '1rem' }}>
            BY THE NUMBERS
          </div>
          <h2 className="section-title" style={{ color: 'var(--ofs-white)' }}>
            Proven Track Record. <br />
            <span className="gradient-text-red">Measurable Impact.</span>
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '1.08rem', lineHeight: 1.6 }}>
            Our performance metrics reflect our unwavering commitment to technical precision, timely delivery, and enterprise client trust.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '2rem'
        }}>
          {statsData.map((st, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-md)',
                padding: '2.5rem 2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              className="stat-card"
            >
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.75rem, 4.5vw, 3.75rem)',
                fontWeight: 900,
                color: 'var(--ofs-gold-400)',
                lineHeight: 1,
                marginBottom: '0.85rem'
              }}>
                <Counter end={st.numeric} suffix={st.suffix} decimals={st.decimals || 0} />
              </div>

              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--ofs-white)',
                marginBottom: '0.6rem'
              }}>
                {st.label}
              </div>

              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.68)',
                lineHeight: 1.5,
                margin: 0
              }}>
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
