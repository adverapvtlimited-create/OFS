import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Briefcase, Clock, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import jobsData from '@/data/jobs.json';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import JobApplicationForm from '@/components/careers/JobApplicationForm';
import Breadcrumbs from '@/components/SEO/Breadcrumbs';
import JsonLd from '@/components/SEO/JsonLd';
import { buildPageMetadata } from '@/lib/seo';
import { buildJobPostingSchema, buildWebPageSchema } from '@/lib/schema';

export async function generateStaticParams() {
  return jobsData.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }) {
  const job = jobsData.find((j) => j.slug === params.slug);
  if (!job) {
    return buildPageMetadata({
      title: 'Job Not Found | OFS Group India Careers',
      description: 'The requested career opportunity could not be found.',
      path: '/careers',
      noindex: true,
    });
  }

  return buildPageMetadata({
    title: `${job.title} | Careers at OFS Group India`,
    description: `${job.description} Location: ${job.location}. ${job.type}, ${job.experience} experience required.`,
    path: `/careers/${job.slug}`,
    keywords: [job.title, job.department, 'OFS careers', job.location],
  });
}

export default function SingleJobPage({ params }) {
  const job = jobsData.find((j) => j.slug === params.slug);

  if (!job) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Careers', href: '/careers' },
    { name: job.title, href: `/careers/${job.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          buildJobPostingSchema(job),
          buildWebPageSchema({
            title: `${job.title} | Careers at OFS Group India`,
            description: job.description,
            path: `/careers/${job.slug}`,
          }),
        ]}
      />

      <section
        style={{
          background: 'linear-gradient(135deg, var(--ofs-navy-950) 0%, var(--ofs-navy-900) 100%)',
          color: 'var(--ofs-white)',
          paddingTop: '5.5rem',
          paddingBottom: '5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="bg-grid-pattern-dark"
          style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }}
        />

        <div className="container" style={{ maxWidth: '1000px', position: 'relative', zIndex: 2 }}>
          <ScrollReveal direction="down" duration={0.5}>
            <Breadcrumbs items={breadcrumbItems} variant="dark" />
          </ScrollReveal>

          <ScrollReveal direction="down" duration={0.5}>
            <Link
              href="/careers"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--ofs-red-400)',
                marginBottom: '1.5rem',
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={14} /> Back to all open roles
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="tag-badge badge-red">{job.department}</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-mono)' }}>
                Posted: {job.postedDate}
              </span>
            </div>
          </ScrollReveal>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              color: 'var(--ofs-white)',
              marginBottom: '1.5rem',
            }}
          >
            <TextReveal tag="span" duration={0.65}>
              {job.title}
            </TextReveal>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={16} style={{ color: 'var(--ofs-red-400)' }} aria-hidden="true" /> {job.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Briefcase size={16} style={{ color: 'var(--ofs-red-400)' }} aria-hidden="true" /> {job.type}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} style={{ color: 'var(--ofs-red-400)' }} aria-hidden="true" /> {job.experience}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--ofs-white)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
              gap: '4rem',
            }}
          >
            <ScrollReveal direction="left" delay={0.1}>
              <div>
                <div style={{ marginBottom: '2.5rem' }}>
                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: 'var(--ofs-navy-950)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Role Overview
                  </h2>
                  <p style={{ fontSize: '0.98rem', color: 'var(--ofs-gray-700)', lineHeight: 1.7 }}>{job.description}</p>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: 'var(--ofs-navy-950)',
                      marginBottom: '1rem',
                    }}
                  >
                    Key Responsibilities
                  </h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: 0, listStyle: 'none' }}>
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.925rem', color: 'var(--ofs-gray-800)' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--ofs-red-600)', flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: 'var(--ofs-navy-950)',
                      marginBottom: '1rem',
                    }}
                  >
                    Required Qualifications &amp; Experience
                  </h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: 0, listStyle: 'none' }}>
                    {job.requirements.map((req, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.925rem', color: 'var(--ofs-gray-800)' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--ofs-navy-900)', flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: 'var(--ofs-navy-950)',
                      marginBottom: '1rem',
                    }}
                  >
                    What We Offer
                  </h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: 0, listStyle: 'none' }}>
                    {job.benefits.map((ben, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.925rem', color: 'var(--ofs-gray-800)' }}>
                        <ShieldCheck size={16} style={{ color: 'var(--ofs-green-600)', flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <JobApplicationForm job={job} />
          </div>
        </div>
      </section>
    </>
  );
}
