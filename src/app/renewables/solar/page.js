'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sun,
  Clock,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Wrench,
  Sparkles,
  Layers,
  Compass
} from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import siteConfig from '@/data/site-config.json';

export default function SolarEngineeringUnderProcessPage() {
  const plannedModules = [
    {
      icon: FileText,
      title: 'US Permit Design Plan Sets',
      bullets: [
        'Complete residential & commercial CAD plan sets',
        'Single-line diagrams (SLD) & 3-line electrical schematics',
        'AHJ compliance & local building code verification',
        'Licensed PE structural and electrical review support'
      ]
    },
    {
      icon: Wrench,
      title: 'Technical Engineering Support',
      bullets: [
        'PVsyst yield generation & 8760 hourly production modeling',
        'String sizing, inverter clipping ratio optimization',
        'Shading analysis & 3D topography layout drafting',
        'Civil foundation & racking layout calculations'
      ]
    },
    {
      icon: ShieldCheck,
      title: 'EPC & Sourcing Coordination',
      bullets: [
        'Tier-1 PV module, inverter & tracker supply vetting',
        'BOS (Balance of System) optimization & cable sizing',
        'Vendor technical compliance & QA/QC oversight',
        'Commissioning documentation & FAT/SAT protocols'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* Subtle Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[580px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.09)_0%,rgba(245,158,11,0.06)_32%,transparent_70%)]" />
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.45]" />
      </div>

      <div className="relative z-10">
        {/* Top Breadcrumb & Return Bar */}
        <section className="pt-8 sm:pt-12 pb-4">
          <div className="container max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <ScrollReveal direction="down" duration={0.4}>
              <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-slate-200/80">
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-slate-500">
                  <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors no-underline">
                    Home
                  </Link>
                  <span>/</span>
                  <Link href="/renewables" className="text-slate-600 hover:text-emerald-700 transition-colors no-underline">
                    Renewables
                  </Link>
                  <span>/</span>
                  <span className="text-emerald-700 font-bold">Solar Engineering</span>
                </nav>

                <Link
                  href="/renewables"
                  className="inline-flex items-center gap-2 text-xs font-mono text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs px-3.5 py-1.5 rounded-full transition-all duration-200 no-underline"
                >
                  <ArrowLeft size={13} className="text-slate-500" /> Back to OFS Renewables
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Hero Section: Under Process Notice */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              {/* Status Pill */}
              <ScrollReveal direction="up" duration={0.4}>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-50 border border-amber-300 text-amber-850 font-mono text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                  </span>
                  Page Under Process
                </div>
              </ScrollReveal>

              {/* Icon & Title */}
              <ScrollReveal direction="up" delay={0.08} duration={0.5}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-100/90 via-amber-50 to-emerald-50 border border-amber-200/80 flex items-center justify-center shadow-md shadow-amber-500/10">
                  <Sun size={36} className="text-amber-500" />
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0C1E4E] tracking-tight leading-[1.12] mb-5">
                  <TextReveal tag="span" duration={0.6}>
                    Solar Engineering
                  </TextReveal>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600">
                    Page Under Process
                  </span>
                </h1>
              </ScrollReveal>

              {/* Message */}
              <ScrollReveal direction="up" delay={0.16} duration={0.5}>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                  We are actively building and validating the comprehensive documentation for our{' '}
                  <strong className="text-slate-900 font-semibold">Solar Engineering &amp; US Permit Design</strong> division.
                  Full engineering datasheets, CAD sample packages, and case studies will be live here shortly.
                </p>
              </ScrollReveal>

              {/* Actions */}
              <ScrollReveal direction="up" delay={0.24} duration={0.5}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-12">
                  <Link
                    href="/contact?service=Renewables+%26+Solar"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm transition-all duration-200 shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 inline-flex items-center justify-center gap-2 no-underline"
                  >
                    Get in Touch with Solar Desk
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/renewables"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all duration-200 border border-slate-300 shadow-xs inline-flex items-center justify-center gap-2 no-underline"
                  >
                    <ArrowLeft size={16} /> Return to Renewables
                  </Link>
                </div>
              </ScrollReveal>

              {/* Real-time Notice Box */}
              <ScrollReveal direction="up" delay={0.3} duration={0.5}>
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 max-w-xl mx-auto flex items-center justify-between gap-4 text-left shadow-xs">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-amber-500 shrink-0" />
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold">
                        Engineering Operations Active
                      </div>
                      <div className="text-xs text-slate-600">
                        Our solar engineering and permit design team is currently accepting client requirements.
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="text-xs font-mono font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded shrink-0 no-underline transition-colors"
                  >
                    Enquire ↗
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Modules Under Preparation */}
        <section className="py-12 sm:py-16 border-t border-slate-200/80 bg-white">
          <div className="container max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-700 font-semibold block mb-2">
                WHAT WE ARE PREPARING
              </span>
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#0C1E4E]">
                Upcoming Solar Engineering Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {plannedModules.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <ScrollReveal key={idx} direction="up" delay={idx * 0.1}>
                    <div className="bg-[#F8FAFC] hover:bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-300">
                        <ItemIcon size={20} />
                      </div>

                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-heading text-base sm:text-lg font-bold text-[#0C1E4E]">
                          {item.title}
                        </h3>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-[0.7rem] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full w-fit mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        In Review
                      </div>

                      <ul className="space-y-2.5 pl-0 list-none mb-0 flex-1">
                        {item.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="text-xs sm:text-[0.8rem] text-slate-600 flex items-start gap-2 leading-relaxed">
                            <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Immediate Consultation Callout */}
        <section className="py-14 sm:py-18 bg-[#F8FAFC] border-t border-slate-200/60">
          <div className="container max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-white border border-emerald-200/90 rounded-3xl p-7 sm:p-10 text-center relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#0C1E4E] mb-3">
                Need Immediate Solar Design or EPC Sourcing?
              </h3>
              <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-6">
                Our engineering team in the USA &amp; India can review your single-line diagrams, tender requirements, or equipment specifications today.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact?service=Renewables+%26+Solar"
                  className="px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm transition-all duration-200 inline-flex items-center gap-2 no-underline shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30"
                >
                  Contact Renewable Team
                  <ArrowRight size={15} />
                </Link>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all duration-200 border border-slate-300 shadow-xs inline-flex items-center gap-2 no-underline"
                >
                  <Phone size={14} className="text-emerald-600" />
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
