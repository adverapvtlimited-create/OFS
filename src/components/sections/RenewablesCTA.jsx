'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sun, BatteryCharging, Leaf, ArrowUpRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import renewablesData from '@/data/renewables.json';

export default function RenewablesCTA() {
  return (
    <section className="section-pad" style={{
      background: 'linear-gradient(180deg, var(--ofs-gray-50) 0%, var(--ofs-white) 100%)',
      position: 'relative'
    }}>
      <div className="container">
        <ScrollReveal direction="up" duration={0.8}>
          <div style={{
            background: 'linear-gradient(135deg, #051A14 0%, #06382B 60%, #08241C 100%)',
            borderRadius: 'var(--radius-2xl)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-2xl)',
            color: 'var(--ofs-white)',
            position: 'relative'
          }}>
            {/* Background Ambient Glow */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
              position: 'relative',
              zIndex: 2
            }}>
              {/* Left Content */}
              <div style={{ padding: 'clamp(2.25rem, 5vw, 4.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                    <div className="tag-badge badge-green">
                      STRATEGIC DIVISION
                    </div>
                    <div className="tag-pill pill-green" style={{ color: '#fff', borderColor: 'rgba(255, 255, 255, 0.22)' }}>
                      <Leaf size={14} style={{ color: 'var(--ofs-green-400)' }} />
                      Clean Energy &amp; Decarbonization
                    </div>
                  </div>

                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2rem, 3.4vw, 2.85rem)',
                    fontWeight: 800,
                    color: 'var(--ofs-white)',
                    marginBottom: '1.25rem',
                    lineHeight: 1.15
                  }}>
                    <TextReveal tag="span" duration={0.65}>
                      OFS Renewables:
                    </TextReveal>
                    <br />
                    <span className="gradient-text-green">
                      <TextReveal tag="span" delay={0.2} duration={0.65}>
                        Powering the Energy Transition
                      </TextReveal>
                    </span>
                  </h2>

                  <p style={{
                    fontSize: '1.08rem',
                    color: 'rgba(255, 255, 255, 0.88)',
                    lineHeight: 1.6,
                    marginBottom: '2rem'
                  }}>
                    {renewablesData.heroDescription}
                  </p>

                  {/* Key Solutions List */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
                    gap: '0.95rem',
                    marginBottom: '2.5rem'
                  }}>
                    {[
                      "Utility & C&I Solar EPC",
                      "Containerized BESS Storage",
                      "Floating Solar (FPV) Arrays",
                      "Robotic O&M & SCADA Systems"
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.925rem' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--ofs-green-400)' }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Link href="/renewables" className="btn btn-green btn-lg">
                    Explore Renewables Portal <ArrowUpRight size={18} />
                  </Link>
                  <Link href="/renewables#projects" className="btn btn-outline-white btn-lg">
                    View Clean Energy Projects
                  </Link>
                </div>
              </div>

              {/* Right: Visual Showcase with Live Metrics */}
              <div style={{
                position: 'relative',
                minHeight: '380px',
                borderLeft: '1px solid rgba(16, 185, 129, 0.25)'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80" 
                  alt="Solar Farm Infrastructure"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(5, 26, 20, 0.25) 0%, rgba(5, 26, 20, 0.88) 100%)'
                }} />

                {/* Float Box with Metrics */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '2rem',
                    right: '2rem',
                    background: 'rgba(5, 26, 20, 0.88)',
                    backdropFilter: 'blur(14px)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.6rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.25rem'
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--ofs-green-400)', lineHeight: 1, marginBottom: '0.35rem' }}>
                      450+ MW
                    </div>
                    <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase', fontWeight: 600 }}>
                      Solar &amp; Storage Supported
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--ofs-green-400)', lineHeight: 1, marginBottom: '0.35rem' }}>
                      120K+ Tons
                    </div>
                    <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase', fontWeight: 600 }}>
                      CO2 Mitigated Annually
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
