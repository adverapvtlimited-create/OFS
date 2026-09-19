'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Package,
  Wrench,
  ShieldCheck,
  Anchor,
  Building2,
  Settings,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Flame,
  Ship,
  Sun
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { serviceHref } from '@/lib/offers';

const iconMap = {
  Package,
  Wrench,
  ShieldCheck,
  Anchor,
  Building2,
  Settings,
  Flame,
  Ship,
  Sun,
};

export default function ServicesView({ services = [] }) {
  return (
    <>
      {/* Hero Banner with Cinematic Text Reveal */}
      <section className="bg-gradient-to-br from-ofs-navy-950 via-[#071330] to-ofs-navy-900 text-white py-14 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

        <div className="container relative z-10">
          <ScrollReveal direction="down" duration={0.5}>
            <div className="flex items-center gap-2 font-mono text-xs text-white/60 mb-6 uppercase">
              <Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-ofs-red-400">Services</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="tag-badge badge-red mb-5">
              PORTFOLIO OF CAPABILITIES
            </div>
          </ScrollReveal>

          <h1 className="font-heading text-[clamp(1.95rem,4.5vw,4.25rem)] font-extrabold leading-[1.12] text-white mb-6 max-w-[920px]">
            <TextReveal tag="span" duration={0.65}>
              End-to-End Solutions for
            </TextReveal>
            <br />
            <span className="gradient-text-red">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                Mission-Critical Industries
              </TextReveal>
            </span>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-sm sm:text-base text-white/85 max-w-[780px] leading-relaxed">
              From offshore hydrocarbon terminals to massive onshore EPC builds and clean energy projects, OFS delivers synchronized procurement, certified engineering supervision, and proactive asset integrity.
            </p>
          </ScrollReveal>

          {/* Quick Capability Jump Chips */}
          <ScrollReveal direction="up" delay={0.35}>
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-8 pt-1">
              {services.map((s) => (
                <a
                  key={s.id || s.slug}
                  href={`#${s.slug}`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 py-1.5 px-3 sm:py-2 sm:px-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[0.72rem] sm:text-xs font-mono text-white/90 transition-all duration-200 backdrop-blur-md no-underline hover:-translate-y-0.5"
                >
                  <span>{s.shortTitle || s.title}</span>
                  <span className="text-ofs-red-400">↓</span>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services List / Staggered Bento Console */}
      <section className="section-pad bg-ofs-gray-50">
        <div className="container">
          <div className="flex flex-col gap-10 sm:gap-14">
            {services.map((service, index) => {
              const IconComp = iconMap[service.icon] || Package;
              const isEven = index % 2 === 0;

              return (
                <ScrollReveal key={service.id || service.slug} direction={isEven ? 'left' : 'right'} delay={0.1}>
                  <div id={service.slug} className="bg-white rounded-2xl border border-ofs-gray-200 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2 group hover:border-ofs-navy-200 transition-all duration-300 scroll-mt-24">
                    {/* Content Column */}
                    <div className={`p-5 sm:p-8 lg:p-14 flex flex-col justify-between ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                      <div>
                        <div className="flex justify-between items-center mb-6">
                          <div className="w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] rounded bg-ofs-navy-950 text-ofs-red-400 grid place-content-center shadow-[0_4px_12px_rgba(12,30,78,0.2)] group-hover:scale-105 group-hover:bg-ofs-red-600 group-hover:text-white transition-all duration-300">
                            <IconComp size={24} />
                          </div>

                          <span className="font-mono text-[0.72rem] sm:text-[0.78rem] font-bold text-ofs-navy-900 bg-ofs-navy-50 py-1.5 px-3 sm:px-3.5 rounded-full border border-ofs-navy-100">
                            {service.badge}
                          </span>
                        </div>

                        <h2 className="font-heading text-[clamp(1.4rem,2.5vw,2.15rem)] font-extrabold text-ofs-navy-950 mb-3.5 leading-tight">
                          {service.title}
                        </h2>

                        <p className="text-sm sm:text-[1.025rem] text-ofs-gray-600 leading-relaxed mb-6 sm:mb-7">
                          {service.description}
                        </p>

                        {/* Feature Highlights Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 sm:mb-10">
                          {(service.features || []).map((feat, fIndex) => (
                            <div key={fIndex} className="flex items-start gap-2.5 text-[0.85rem] sm:text-[0.88rem] text-ofs-gray-800">
                              <CheckCircle2 size={16} className="text-ofs-red-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                        <Link href={serviceHref(service.slug)} className="btn btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center">
                          Detailed Division Scope <ArrowUpRight size={16} />
                        </Link>
                        <Link href="/contact" className="btn btn-outline inline-flex items-center justify-center w-full sm:w-auto text-center">
                          Request Quotation
                        </Link>
                      </div>
                    </div>

                    {/* Image Visual Column */}
                    <div className={`relative min-h-[260px] sm:min-h-[380px] overflow-hidden ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                      <motion.img
                        src={service.heroImage || service.image || '/images/live/Excellence-tools-official.png'}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ofs-navy-950/60 via-ofs-navy-950/20 to-transparent" />

                      {/* Number Overlay */}
                      <div className="absolute bottom-6 right-6 font-heading text-4xl sm:text-5xl font-black text-white/80 leading-none">
                        0{index + 1}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
