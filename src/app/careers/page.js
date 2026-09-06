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
      <section className="bg-gradient-to-br from-ofs-navy-950 via-[#071330] to-ofs-navy-900 text-white py-14 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

        <div className="container relative z-10">
          <ScrollReveal direction="down" duration={0.5}>
            <div className="flex items-center gap-2 font-mono text-xs text-white/60 mb-6 uppercase">
              <Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-ofs-red-400">Careers</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="tag-badge badge-red mb-5">
              CAREERS AT OFS GROUP INDIA
            </div>
          </ScrollReveal>

          <h1 className="font-heading text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold leading-[1.1] text-white mb-6 max-w-[920px]">
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
            <p className="text-[1.18rem] text-white/85 max-w-[780px] leading-relaxed mb-8">
              We hire visionary engineers, meticulous procurement strategists, and bold project leaders who thrive in high-precision, mission-critical industrial environments.
            </p>
          </ScrollReveal>

          {/* Above-the-fold Quick Actions & Telemetry */}
          <ScrollReveal direction="up" delay={0.35}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#open-positions"
                className="btn btn-primary inline-flex items-center gap-2 shadow-[0_4px_18px_rgba(224,42,48,0.4)]"
              >
                <Briefcase size={16} /> Explore {jobsData.length} Open Positions ↓
              </a>
              <div className="inline-flex items-center gap-3 py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono text-white/90">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Immediate Hiring • Mumbai HQ &amp; Global Projects</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container">
          <div className="text-center max-w-[720px] mx-auto mb-14">
            <ScrollReveal direction="up">
              <div className="tag-badge badge-red mb-3.5">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16">
            {perks.map((p, idx) => {
              const Icon = p.icon;
              return (
                <ScrollReveal key={idx} direction="up" delay={idx * 0.1}>
                  <div className="card-modern p-5 sm:p-6 h-full flex flex-col">
                    <div className="w-10 h-10 rounded bg-ofs-navy-50 text-ofs-red-600 grid place-content-center mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-ofs-navy-950 mb-2 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-[0.875rem] text-ofs-gray-600 leading-relaxed m-0 flex-1">
                      {p.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div id="open-positions" className="max-w-[820px] mx-auto pt-4 scroll-mt-24">
            <div className="text-center mb-10">
              <ScrollReveal direction="up">
                <div className="tag-badge badge-red mb-3">
                  ACTIVE VACANCIES
                </div>
              </ScrollReveal>
              <h2 className="section-title">
                <TextReveal tag="span" duration={0.65}>
                  Open Career Roles ({jobsData.length})
                </TextReveal>
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {jobsData.map((job, idx) => (
                <ScrollReveal key={job.id} direction="up" delay={idx * 0.08}>
                  <Link
                    href={`/careers/${job.slug}`}
                    className="card-modern p-5 sm:p-6 flex justify-between items-center flex-wrap gap-4 hover:border-ofs-red-300 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1.5 font-mono text-xs">
                        <span className="bg-ofs-navy-50 text-ofs-navy-900 py-0.5 px-2.5 rounded-full font-bold">
                          {job.department}
                        </span>
                        <span className="text-ofs-gray-500 flex items-center gap-1">
                          <MapPin size={12} /> {job.location}
                        </span>
                      </div>

                      <h3 className="font-heading text-base sm:text-lg font-bold text-ofs-navy-950 mb-1.5 leading-snug group-hover:text-ofs-red-600 transition-colors">
                        {job.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-ofs-gray-600 m-0 leading-relaxed">
                        {(job.description || '').slice(0, 130)}...
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-ofs-red-600 font-bold font-mono text-xs sm:text-sm group-hover:translate-x-1 transition-transform">
                      Apply Now <ArrowUpRight size={15} />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
