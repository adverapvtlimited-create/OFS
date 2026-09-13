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

      <section className="bg-gradient-to-br from-ofs-navy-950 to-ofs-navy-900 text-white pt-[5.5rem] pb-20 relative overflow-hidden">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

        <div className="container max-w-[1000px] relative z-10">
          <ScrollReveal direction="down" duration={0.5}>
            <Breadcrumbs items={breadcrumbItems} variant="dark" />
          </ScrollReveal>

          <ScrollReveal direction="down" duration={0.5}>
            <Link
              href="/careers"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-ofs-red-400 mb-6 hover:text-ofs-red-300 transition-colors"
            >
              <ArrowLeft size={14} /> Back to all open roles
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex gap-3 items-center mb-4 flex-wrap">
              <span className="tag-badge badge-red">
                {job.department}
              </span>
              <span className="text-xs text-white/70 font-mono">
                Posted: {job.postedDate}
              </span>
            </div>
          </ScrollReveal>

          <h1 className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-tight text-white mb-6">
            <TextReveal tag="span" duration={0.65}>
              {job.title}
            </TextReveal>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <div className="flex gap-6 flex-wrap text-sm text-white/85 font-mono">
              <span className="flex items-center gap-1.5">
                <MapPin size={16} className="text-ofs-red-400" aria-hidden="true" /> {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={16} className="text-ofs-red-400" aria-hidden="true" /> {job.type}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} className="text-ofs-red-400" aria-hidden="true" /> {job.experience}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container max-w-[1000px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal direction="left" delay={0.1}>
              <div>
                <div className="mb-10">
                  <h2 className="font-heading text-[1.35rem] font-extrabold text-ofs-navy-950 mb-3">
                    Role Overview
                  </h2>
                  <p className="text-[0.98rem] text-ofs-gray-700 leading-relaxed">{job.description}</p>
                </div>

                <div className="mb-10">
                  <h3 className="font-heading text-[1.35rem] font-extrabold text-ofs-navy-950 mb-4">
                    Key Responsibilities
                  </h3>
                  <ul className="flex flex-col gap-3 p-0 list-none">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[0.925rem] text-ofs-gray-800">
                        <CheckCircle2 size={16} className="text-ofs-red-600 shrink-0 mt-1" aria-hidden="true" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-10">
                  <h3 className="font-heading text-[1.35rem] font-extrabold text-ofs-navy-950 mb-4">
                    Required Qualifications &amp; Experience
                  </h3>
                  <ul className="flex flex-col gap-3 p-0 list-none">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[0.925rem] text-ofs-gray-800">
                        <CheckCircle2 size={16} className="text-ofs-navy-900 shrink-0 mt-1" aria-hidden="true" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading text-[1.35rem] font-extrabold text-ofs-navy-950 mb-4">
                    What We Offer
                  </h3>
                  <ul className="flex flex-col gap-3 p-0 list-none">
                    {job.benefits.map((ben, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[0.925rem] text-ofs-gray-800">
                        <ShieldCheck size={16} className="text-ofs-green-600 shrink-0 mt-1" aria-hidden="true" />
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
