'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  GraduationCap, 
  Plane 
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import jobsData from '@/data/jobs.json';
import ContactCTA from '@/components/sections/ContactCTA';

const perks = [
  {
    icon: ShieldCheck,
    title: 'Comprehensive Health & Life Insurance',
    desc: 'Medical coverage for employees and dependents, including offshore specialized accident protection.'
  },
  {
    icon: Plane,
    title: 'Offshore & Travel Allowances',
    desc: 'Competitive per diem and deployment allowances for marine vessel operations and remote industrial sites.'
  },
  {
    icon: GraduationCap,
    title: 'Continuous Certifications & Training',
    desc: 'Full sponsorship for NDT Level III, CSWIP, API codes, and executive leadership development programs.'
  },
  {
    icon: Heart,
    title: 'Meritocracy & Performance Bonuses',
    desc: 'Annual profit-sharing bonuses, milestone rewards, and clear fast-track promotion paths.'
  }
];

export default function CareersPage() {
  return (
    <>
      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--ofs-navy-950) 0%, var(--ofs-navy-900) 100%)',
        color: 'var(--ofs-white)',
        paddingTop: '5.5rem',
        paddingBottom: '5.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="bg-grid-pattern-dark" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal direction="down" duration={0.5}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}>
              <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--ofs-red-400)' }}>Careers</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="tag-badge badge-red" style={{ marginBottom: '1.25rem' }}>
              CAREERS AT OFS GROUP INDIA
            </div>
          </ScrollReveal>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--ofs-white)',
            marginBottom: '1.5rem',
            maxWidth: '920px'
          }}>
            <TextReveal tag="span" duration={0.65}>
              Shape the Future of
            </TextReveal>
            <br />
            <span className="gradient-text-red">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                Global Energy &amp; Marine Infrastructure
              </TextReveal>
            </span>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <p style={{
              fontSize: '1.18rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '780px',
              lineHeight: 1.6
            }}>
              We hire visionary engineers, meticulous procurement strategists, and bold project leaders who thrive in high-precision, mission-critical industrial environments.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Perks & Benefits Section */}
      <section className="section-pad" style={{ background: 'var(--ofs-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
            <ScrollReveal direction="up">
              <div className="tag-badge badge-red" style={{ marginBottom: '0.85rem' }}>
                WHY JOIN US
              </div>
            </ScrollReveal>
            <h2 className="section-title">
              <TextReveal tag="span" duration={0.65}>
                Exceptional Benefits for
              </TextReveal>
              <br />
              <span className="gradient-text-navy">
                <TextReveal tag="span" delay={0.2} duration={0.65}>
                  Exceptional Professionals
                </TextReveal>
              </span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '2rem',
            marginBottom: '5rem'
          }}>
            {perks.map((p, idx) => {
              const Icon = p.icon;
              return (
                <ScrollReveal key={idx} direction="up" delay={idx * 0.1}>
                  <div className="card-modern" style={{ padding: '2.25rem', height: '100%' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-xs)',
                      background: 'var(--ofs-navy-50)',
                      color: 'var(--ofs-red-600)',
                      display: 'grid',
                      placeContent: 'center',
                      marginBottom: '1.5rem'
                    }}>
                      <Icon size={24} />
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--ofs-navy-950)',
                      marginBottom: '0.65rem',
                      lineHeight: 1.3
                    }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.925rem', color: 'var(--ofs-gray-600)', lineHeight: 1.6, margin: 0 }}>
                      {p.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Open Positions List */}
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <ScrollReveal direction="up">
                <div className="tag-badge badge-red" style={{ marginBottom: '0.75rem' }}>
                  ACTIVE VACANCIES
                </div>
              </ScrollReveal>
              <h2 className="section-title">
                <TextReveal tag="span" duration={0.65}>
                  Open Career Roles ({jobsData.length})
                </TextReveal>
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {jobsData.map((job, idx) => (
                <ScrollReveal key={job.id} direction="up" delay={idx * 0.08}>
                  <Link
                    href={`/careers/${job.slug}`}
                    className="card-modern job-row-card"
                    style={{
                      padding: '2rem 2.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1.5rem',
                      textDecoration: 'none'
                    }}
                  >
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem'
                      }}>
                        <span style={{
                          background: 'var(--ofs-navy-50)',
                          color: 'var(--ofs-navy-900)',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-full)',
                          fontWeight: 700
                        }}>
                          {job.department}
                        </span>
                        <span style={{ color: 'var(--ofs-gray-500)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <MapPin size={12} /> {job.location}
                        </span>
                      </div>

                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: 'var(--ofs-navy-950)',
                        marginBottom: '0.5rem',
                        lineHeight: 1.25
                      }}>
                        {job.title}
                      </h3>

                      <p style={{ fontSize: '0.9rem', color: 'var(--ofs-gray-600)', margin: 0, lineHeight: 1.5 }}>
                        {(job.description || '').slice(0, 140)}...
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--ofs-red-600)', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                      Apply Now <ArrowUpRight size={16} />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </>
  );
}
