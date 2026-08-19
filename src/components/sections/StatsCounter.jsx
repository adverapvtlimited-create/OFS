'use client';

import React from 'react';
import Counter from '@/components/animations/Counter';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Award, ShieldCheck, TrendingUp, Globe2, CheckCircle, Sparkles } from 'lucide-react';

const statsData = [
  { numeric: 15, suffix: "+", label: "Years of Industry Excellence", desc: "Proven track record in high-stakes operational environments" },
  { numeric: 3000, suffix: "+", label: "US & European Approved Brands", desc: "Direct access to pre-vetted international manufacturers" },
  { numeric: 48, suffix: "+", label: "EPC & Turnkey Projects", desc: "Successfully delivered across India, Gulf & global basins" },
  { numeric: 20, suffix: "+", label: "Tier-1 Enterprise Clients", desc: "Trusted by major offshore, refinery & energy leaders" },
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
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem auto' }}>
          <ScrollReveal direction="up">
            <div className="tag-badge badge-red" style={{ marginBottom: '1rem' }}>
              PROVEN PERFORMANCE METRICS
            </div>
          </ScrollReveal>

          <h2 className="section-title" style={{ color: 'var(--ofs-white)' }}>
            <TextReveal tag="span" duration={0.65}>
              Numbers That Define Our
            </TextReveal>
            <br />
            <span className="gradient-text-red">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                Operational Excellence &amp; Scale
              </TextReveal>
            </span>
          </h2>

          <ScrollReveal direction="up" delay={0.25}>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.8)', margin: '0 auto', lineHeight: 1.6 }}>
              Every statistic represents real-world mission critical uptime, transparent supply chain execution, and trusted enterprise partnerships.
            </p>
          </ScrollReveal>
        </div>

        {/* 6 Metric Bento Cards Grid with Staggered Scale-In */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '2rem'
        }}>
          {statsData.map((stat, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.08} scale={0.94}>
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
                className="stat-card"
              >
                <div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.75rem, 4.5vw, 3.75rem)',
                    fontWeight: 900,
                    color: 'var(--ofs-gold-400)',
                    lineHeight: 1,
                    marginBottom: '0.85rem'
                  }}>
                    <Counter end={stat.numeric} suffix={stat.suffix} decimals={stat.decimals || 0} />
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: 'var(--ofs-white)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.3
                  }}>
                    {stat.label}
                  </h3>
                </div>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.5,
                  margin: 0,
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  {stat.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
