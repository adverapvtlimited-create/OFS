import React from 'react';
import Link from 'next/link';
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
import jobsData from '@/data/jobs.json';
import ContactCTA from '@/components/sections/ContactCTA';

export const metadata = {
  title: 'Careers & Opportunities — OFS Group India',
  description: 'Join OFS Group India: explore open positions in procurement, EPC engineering, marine offshore logistics, NDT inspection, and clean energy.'
};

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

          <div className="tag-badge badge-red" style={{ marginBottom: '1.25rem' }}>
            CAREERS AT OFS GROUP INDIA
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--ofs-white)',
            marginBottom: '1.5rem',
            maxWidth: '920px'
          }}>
            Shape the Future of <br />
            <span className="gradient-text-red">Global Energy & Marine Infrastructure</span>
          </h1>

          <p style={{
            fontSize: '1.18rem',
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '780px',
            lineHeight: 1.6
          }}>
            We hire visionary engineers, meticulous procurement strategists, and bold project leaders who thrive in high-precision, mission-critical industrial environments.
          </p>
        </div>
      </section>

      {/* Perks & Benefits Section */}
      <section className="section-pad" style={{ background: 'var(--ofs-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
            <div className="tag-badge badge-red" style={{ marginBottom: '0.85rem' }}>
              WHY JOIN US
            </div>
            <h2 className="section-title">
              Exceptional Benefits for <br />
              <span className="gradient-text-navy">Exceptional Professionals</span>
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
                <div key={idx} className="card-modern" style={{ padding: '2.25rem' }}>
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
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: 'var(--ofs-navy-950)',
                    marginBottom: '0.6rem'
                  }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--ofs-gray-600)', lineHeight: 1.6, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Open Roles Section */}
          <div id="openings">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div>
                <div className="tag-badge badge-red" style={{ marginBottom: '0.85rem' }}>
                  OPEN OPPORTUNITIES
                </div>
                <h2 className="section-title">
                  Current Open Positions ({jobsData.length})
                </h2>
              </div>

              <div style={{ fontSize: '0.925rem', color: 'var(--ofs-gray-600)' }}>
                Showing active openings across Mumbai Headquarters & Offshore Basins
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {jobsData.map((job) => (
                <div
                  key={job.id}
                  style={{
                    background: 'var(--ofs-white)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--ofs-gray-200)',
                    padding: '2.25rem',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    transition: 'all 0.2s ease'
                  }}
                  className="job-row-card"
                >
                  <div style={{ maxWidth: '680px' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--ofs-red-600)',
                        background: 'var(--ofs-red-50)',
                        padding: '0.3rem 0.75rem',
                        borderRadius: 'var(--radius-xs)'
                      }}>
                        {job.department}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--ofs-gray-500)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        {job.type} • Experience: {job.experience}
                      </span>
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: 'var(--ofs-navy-950)',
                      marginBottom: '0.5rem'
                    }}>
                      <Link href={`/careers/${job.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {job.title}
                      </Link>
                    </h3>

                    <p style={{ fontSize: '0.925rem', color: 'var(--ofs-gray-600)', lineHeight: 1.55, marginBottom: '0.85rem' }}>
                      {job.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--ofs-gray-500)', fontFamily: 'var(--font-mono)' }}>
                      <MapPin size={14} style={{ color: 'var(--ofs-red-600)' }} />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <div>
                    <Link
                      href={`/careers/${job.slug}`}
                      className="btn btn-navy btn-sm"
                    >
                      View Role & Apply <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
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
