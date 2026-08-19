'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Briefcase, Sparkles, ArrowUpRight, CheckCircle2, MapPin } from 'lucide-react';
import jobsData from '@/data/jobs.json';

export default function CareersPreview() {
  return (
    <section className="section-pad" style={{ background: 'var(--ofs-gray-50)', position: 'relative' }}>
      <div className="container">
        <div style={{
          background: 'var(--ofs-white)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--ofs-gray-200)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
        }}>
          {/* Left: Culture & Value Proposition */}
          <div style={{ padding: 'clamp(2.25rem, 4.5vw, 4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="tag-badge badge-red" style={{ marginBottom: '1rem' }}>
                CAREERS AT OFS GROUP
              </div>

              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--ofs-navy-950)',
                marginBottom: '1rem',
                lineHeight: 1.2
              }}>
                Build High-Impact Infrastructure With Us
              </h2>

              <p style={{
                fontSize: '1.025rem',
                color: 'var(--ofs-gray-600)',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}>
                Join a dynamic team of marine engineers, procurement strategists, NDT Level III specialists, and clean energy pioneers driving high-stakes industrial projects.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.925rem', color: 'var(--ofs-gray-800)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--ofs-red-600)' }} />
                  <span>Work on premier offshore rigs, EPC terminals & solar mega-parks</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.925rem', color: 'var(--ofs-gray-800)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--ofs-red-600)' }} />
                  <span>Comprehensive health insurance, offshore per diem & safety certification</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.925rem', color: 'var(--ofs-gray-800)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--ofs-red-600)' }} />
                  <span>Merit-based fast-track leadership and global mobility opportunities</span>
                </div>
              </div>
            </div>

            <Link href="/careers" className="btn btn-navy btn-lg" style={{ width: 'fit-content' }}>
              Explore Open Positions ({jobsData.length}) <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Right: Active Open Roles Preview */}
          <div style={{
            background: 'var(--ofs-navy-950)',
            color: 'var(--ofs-white)',
            padding: 'clamp(2.25rem, 4.5vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderLeft: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--ofs-gold-400)',
                textTransform: 'uppercase',
                fontWeight: 700,
                letterSpacing: '0.06em',
                marginBottom: '1.5rem'
              }}>
                Current Featured Openings
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {jobsData.slice(0, 3).map((job) => (
                  <Link
                    key={job.id}
                    href={`/careers/${job.slug}`}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1.25rem 1.35rem',
                      display: 'block',
                      textDecoration: 'none'
                    }}
                    className="job-preview-item"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>
                        {job.title}
                      </div>
                      <ArrowUpRight size={16} style={{ color: 'var(--ofs-red-400)', flexShrink: 0 }} />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-mono)' }}>
                      <span>{job.department}</span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={12} /> {job.location.split('(')[0]}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div style={{
              marginTop: '2rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.65)'
            }}>
              Don't see your exact role? Send your CV directly to <a href="mailto:careers@ofsgroupindia.com" style={{ color: 'var(--ofs-gold-400)', fontWeight: 600 }}>careers@ofsgroupindia.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
