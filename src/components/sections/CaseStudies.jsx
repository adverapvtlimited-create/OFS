'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight,
  FileCheck2
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import GlowCard from '@/components/animations/GlowCard';
import caseStudiesData from '@/data/case-studies.json';

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState(0);
  const activeStudy = caseStudiesData[activeTab] || caseStudiesData[0];

  return (
    <section 
      className="section-pad" 
      style={{ 
        background: 'var(--ofs-white)',
        position: 'relative',
        overflow: 'hidden'
      }}
      id="case-studies"
      aria-label="Verified Case Studies & Project Execution Logs"
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
          <ScrollReveal direction="up" delay={0.05}>
            <div className="tag-badge badge-red" style={{ marginBottom: '1.25rem' }}>
              PROVEN FIELD TRACK RECORD
            </div>
          </ScrollReveal>

          <h2 className="section-title">
            <TextReveal tag="span" duration={0.6}>
              High-Stakes Execution Logs &amp;
            </TextReveal>
            <br />
            <span className="gradient-text-navy">
              <TextReveal tag="span" delay={0.15} duration={0.6}>
                Industrial Case Studies
              </TextReveal>
            </span>
          </h2>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="section-desc">
              Discover how OFS delivers precision sourcing, rapid emergency logistics, and certified engineering execution for offshore platforms, refineries, and renewable power installations across India and international waters.
            </p>
          </ScrollReveal>
        </div>

        {/* Desktop Case Study Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          {caseStudiesData.map((cs, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={cs.id}
                onClick={() => setActiveTab(idx)}
                style={{
                  textAlign: 'left',
                  padding: '1.25rem 1.4rem',
                  borderRadius: 'var(--radius-sm)',
                  border: isActive ? '1.5px solid var(--ofs-red-600)' : '1px solid var(--ofs-gray-200)',
                  background: isActive ? 'var(--ofs-navy-950)' : 'var(--ofs-gray-50)',
                  color: isActive ? 'var(--ofs-white)' : 'var(--ofs-navy-950)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 8px 24px rgba(12, 30, 78, 0.2)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <div style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: isActive ? 'var(--ofs-gold-400)' : 'var(--ofs-red-600)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.35rem'
                  }}>
                    {cs.badge}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    lineHeight: 1.35,
                    color: isActive ? 'var(--ofs-white)' : 'var(--ofs-navy-950)'
                  }}>
                    {cs.title}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  color: isActive ? 'rgba(255, 255, 255, 0.7)' : 'var(--ofs-gray-500)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  <MapPin size={12} style={{ color: isActive ? 'var(--ofs-red-400)' : 'var(--ofs-red-600)' }} />
                  <span>{cs.location.split(',')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Case Study Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStudy.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--ofs-navy-950)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--ofs-white)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl), 0 20px 40px rgba(6, 14, 36, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative'
            }}
          >
            {/* Grid Pattern */}
            <div className="bg-grid-pattern-dark" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
              position: 'relative',
              zIndex: 2
            }}>
              {/* Left Column: Case Narrative & Problem/Solution */}
              <div style={{ padding: 'clamp(2rem, 4vw, 3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Meta Bar */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span className="tag-badge badge-red" style={{ fontSize: '0.7rem' }}>
                      {activeStudy.clientIndustry}
                    </span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--ofs-gold-400)',
                      background: 'rgba(217, 119, 6, 0.12)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid rgba(217, 119, 6, 0.3)'
                    }}>
                      <Clock size={13} /> {activeStudy.duration}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                    fontWeight: 800,
                    lineHeight: 1.25,
                    color: 'var(--ofs-white)',
                    marginBottom: '1rem'
                  }}>
                    {activeStudy.title}
                  </h3>

                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.85)',
                    lineHeight: 1.6,
                    marginBottom: '2rem'
                  }}>
                    {activeStudy.summary}
                  </p>

                  {/* Challenge & Solution Blocks */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1.25rem'
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--ofs-red-400)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '0.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}>
                        <span>[!]</span> The Engineering Challenge
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.55, margin: 0 }}>
                        {activeStudy.challenge}
                      </p>
                    </div>

                    <div style={{
                      background: 'rgba(16, 185, 129, 0.06)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1.25rem'
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--ofs-green-400)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '0.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}>
                        <CheckCircle2 size={14} /> The OFS Technical Solution
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.55, margin: 0 }}>
                        {activeStudy.solution}
                      </p>
                    </div>
                  </div>

                  {/* Spec Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                    {activeStudy.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.3rem 0.7rem',
                          background: 'rgba(255, 255, 255, 0.07)',
                          color: 'var(--ofs-white)',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid rgba(255, 255, 255, 0.12)'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-mono)' }}>
                    <MapPin size={14} style={{ color: 'var(--ofs-red-400)' }} />
                    <span>{activeStudy.location}</span>
                  </div>

                  <Link
                    href="/contact"
                    className="btn btn-primary btn-sm"
                  >
                    Request Similar Execution <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Visual & Verifiable Metrics */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.25)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {/* Hero Photo with Gradient Overlay */}
                <div style={{ height: '260px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={activeStudy.heroImage}
                    alt={activeStudy.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.2) 0%, rgba(6, 14, 36, 0.8) 100%)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--ofs-white)',
                    background: 'rgba(6, 14, 36, 0.85)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(8px)'
                  }}>
                    <FileCheck2 size={14} style={{ color: 'var(--ofs-gold-400)' }} />
                    <span>Field Verified Log Ref: #{activeStudy.id}</span>
                  </div>
                </div>

                {/* Metrics Stack */}
                <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--ofs-gold-400)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>
                    Verifiable Project Outcomes
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
                    {activeStudy.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '1.25rem 1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.35rem'
                        }}
                      >
                        <div style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)',
                          fontWeight: 800,
                          color: 'var(--ofs-red-400)',
                          lineHeight: 1
                        }}>
                          {m.value}
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--ofs-white)'
                        }}>
                          {m.label}
                        </div>
                        <div style={{
                          fontSize: '0.7rem',
                          color: 'rgba(255, 255, 255, 0.55)',
                          lineHeight: 1.3
                        }}>
                          {m.subtext}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quality Assurance Stamp */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.85rem 1rem',
                    background: 'rgba(217, 119, 6, 0.08)',
                    border: '1px solid rgba(217, 119, 6, 0.25)',
                    borderRadius: 'var(--radius-xs)',
                    marginTop: '0.5rem'
                  }}>
                    <ShieldCheck size={20} style={{ color: 'var(--ofs-gold-400)', flexShrink: 0 }} />
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.4 }}>
                      <strong style={{ color: '#fff', display: 'block' }}>ISO 9001:2015 Quality &amp; MTC Audit Trail:</strong>
                      Full material test certification and traceability reports supplied with every field delivery.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
