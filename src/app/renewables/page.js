'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sun,
  BatteryCharging,
  Wind,
  Link as LinkIcon,
  Globe,
  Leaf,
  ShieldCheck,
  RotateCw,
  Handshake,
  FileText,
  Settings,
  Users,
  Scale,
  ShoppingCart,
  HardHat,
  Factory,
  Lightbulb,
  ArrowRight,
  ArrowUpRight,
  Mail,
  ChevronRight,
  Target,
  CheckCircle2,
} from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import renewablesData from '@/data/renewables.json';


const iconMap = {
  Sun, BatteryCharging, Wind, Link: LinkIcon, Globe, Leaf,
  ShieldCheck, RotateCw, Handshake, FileText, Settings, Users,
  Scale, ShoppingCart, HardHat, Factory, Lightbulb, Target,
};

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */
export default function RenewablesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-emerald-500 selection:text-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════
          1 · HERO
          Dark cinematic bottom-aligned hero with proper mobile
          sizing & accessible focus states
          ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative flex items-end overflow-hidden bg-[#0a1628]
                   min-h-[480px] sm:min-h-[560px] md:min-h-[640px] lg:min-h-[700px]"
        aria-label="Hero"
      >
        {/* BG Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{ backgroundImage: `url('${renewablesData.heroBgImage}')` }}
          role="img"
          aria-label="Renewable energy landscape"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/65 to-[#0a1628]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/70 via-transparent to-transparent" />

        <div className="container relative z-10 max-w-7xl mx-auto
                        px-5 sm:px-6 lg:px-8
                        pb-12 sm:pb-16 md:pb-20 lg:pb-24
                        pt-28 sm:pt-32 md:pt-36">
          <div className="max-w-2xl lg:max-w-3xl">

            {/* Eyebrow */}
            <ScrollReveal direction="up" duration={0.5}>
              <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
                <span className="w-6 sm:w-8 h-[2px] bg-emerald-400 rounded-full" />
                <span className="text-emerald-400 font-mono text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.18em]">
                  {renewablesData.title}
                </span>
              </div>
            </ScrollReveal>

            {/* Headline */}
            <ScrollReveal direction="up" delay={0.1} duration={0.6}>
              <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-6 tracking-[-0.025em]">
                <TextReveal tag="span" delay={0.15} duration={0.5}>
                  {renewablesData.tagline}
                </TextReveal>
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal direction="up" delay={0.22} duration={0.6}>
              <p className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed mb-6 sm:mb-8 max-w-lg">
                {renewablesData.heroDescription}
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal direction="up" delay={0.32} duration={0.5}>
              <div className="flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link
                  href="/contact?service=Renewables"
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full
                             bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628]
                             text-white font-semibold text-[0.8rem] sm:text-sm
                             transition-all duration-200
                             shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30
                             inline-flex items-center gap-2 group no-underline"
                >
                  Discuss Your Requirement
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <a
                  href="#solutions"
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full
                             bg-white/10 hover:bg-white/[0.14] active:bg-white/[0.18]
                             backdrop-blur-sm text-white font-semibold text-[0.8rem] sm:text-sm
                             transition-all duration-200
                             border border-white/20 hover:border-white/30
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                             inline-flex items-center gap-2 no-underline"
                >
                  Explore Solutions
                </a>
              </div>
            </ScrollReveal>

            {/* Backing */}
            <ScrollReveal direction="up" delay={0.4} duration={0.5}>
              <p className="text-[0.65rem] sm:text-xs text-white/40 font-mono tracking-wide flex items-center gap-2">
                <Leaf size={12} className="text-emerald-400/50" />
                {renewablesData.heroBacking}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          2 · SOLUTIONS
          Centered header  ➜  4-card responsive grid
          ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 md:py-24 lg:py-28 bg-[#f8fafb]"
        id="solutions"
        aria-label="Our Solutions"
      >
        <div className="container max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="max-w-xl lg:max-w-2xl mx-auto text-center mb-10 sm:mb-14 lg:mb-16">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-5 sm:w-6 h-[2px] bg-emerald-500 rounded-full" />
                <span className="text-emerald-600 font-mono text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.16em]">
                  {renewablesData.solutionsTag}
                </span>
                <span className="w-5 sm:w-6 h-[2px] bg-emerald-500 rounded-full" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.06}>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.15rem] font-extrabold text-[#0c1e4e] tracking-tight leading-tight mb-3 sm:mb-4">
                {renewablesData.solutionsTitle}
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <p className="text-[0.8rem] sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
                {renewablesData.solutionsDesc}
              </p>
            </ScrollReveal>
          </div>

          {/* 4 Solution Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {renewablesData.solutions.map((sol, idx) => {
              const IconComponent = iconMap[sol.icon] || Sun;
              const isSolar = sol.id === 'solar-engineering' || sol.title?.toLowerCase().includes('solar');
              const destinationHref = sol.href || (isSolar ? '/renewables/solar' : '/contact');
              return (
                <ScrollReveal key={sol.id} direction="up" delay={idx * 0.07} className="h-full">
                  <Link
                    href={destinationHref}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden
                               hover:shadow-lg hover:shadow-slate-200/60 hover:border-emerald-200
                               active:shadow-md
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2
                               transition-all duration-300 ease-out
                               flex flex-col h-full group cursor-pointer block no-underline text-inherit"
                  >
                    {/* Image */}
                    <div className="h-44 sm:h-48 lg:h-52 overflow-hidden relative bg-slate-100">
                      <img
                        src={sol.image}
                        alt={sol.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      {/* Icon badge */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl
                                      bg-emerald-50 text-emerald-600
                                      flex items-center justify-center mb-3.5 sm:mb-4
                                      border border-emerald-100
                                      group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500
                                      transition-colors duration-300">
                        <IconComponent size={19} strokeWidth={1.8} />
                      </div>

                      {/* Title */}
                      <h3 className="text-[0.95rem] sm:text-[1.02rem] font-bold text-[#0c1e4e] mb-2.5 sm:mb-3 group-hover:text-emerald-600 transition-colors duration-200 leading-snug">
                        {sol.title}
                      </h3>

                      {/* Bullets */}
                      <ul className="space-y-1.5 sm:space-y-2 pl-0 list-none mb-0 flex-1">
                        {sol.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-[0.76rem] sm:text-[0.8rem] text-slate-500 flex items-center gap-2 leading-normal">
                            <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Bottom link */}
                      <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-slate-100">
                        <span className="text-emerald-600 text-[0.75rem] sm:text-[0.8rem] font-semibold
                                         inline-flex items-center gap-1.5
                                         group-hover:gap-2.5 transition-all duration-200">
                          {isSolar ? 'Learn more' : 'Get in touch'}
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          3 · WHY OFS RENEWABLES
          Asymmetric 2-column editorial layout
          ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white"
        aria-label="Why OFS Renewables"
      >
        <div className="container max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">

            {/* Left – Image with decorative accents (hidden on mobile for cleanliness) */}
            <ScrollReveal direction="right" duration={0.7}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-lg sm:shadow-xl">
                  <img
                    src={renewablesData.whyImage}
                    alt="Renewable energy infrastructure showing solar panels and wind turbines"
                    className="w-full h-[260px] sm:h-[340px] md:h-[380px] lg:h-[420px] object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Decorative blocks — desktop only */}
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-20 h-20 sm:w-28 sm:h-28 bg-emerald-50 rounded-2xl -z-10 border border-emerald-100 hidden md:block" />
                <div className="absolute -top-2.5 -left-2.5 sm:-top-3 sm:-left-3 w-14 h-14 sm:w-18 sm:h-18 border-2 border-emerald-200/40 rounded-xl -z-10 hidden md:block" />
              </div>
            </ScrollReveal>

            {/* Right – Content */}
            <div>
              <ScrollReveal direction="left" duration={0.6}>
                <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
                  <span className="w-6 h-[2px] bg-emerald-500 rounded-full" />
                  <span className="text-emerald-600 font-mono text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.16em]">
                    {renewablesData.whyTag}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] font-extrabold text-[#0c1e4e] tracking-tight leading-[1.15] mb-4 sm:mb-5">
                  {renewablesData.whyTitle}
                </h2>

                <p className="text-[0.8rem] sm:text-sm text-slate-500 leading-relaxed mb-8 sm:mb-10 max-w-lg">
                  {renewablesData.whyDesc}
                </p>
              </ScrollReveal>

              {/* 2×2 Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {renewablesData.whyPills.map((pill, idx) => {
                  const IconComponent = iconMap[pill.icon] || Leaf;
                  return (
                    <ScrollReveal key={idx} direction="up" delay={idx * 0.05}>
                      <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl
                                      bg-slate-50/80 border border-slate-100
                                      hover:border-emerald-200/60 hover:bg-slate-50
                                      transition-colors duration-200">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg
                                        bg-emerald-50 text-emerald-600
                                        flex items-center justify-center shrink-0
                                        border border-emerald-100">
                          <IconComponent size={17} strokeWidth={1.8} />
                        </div>
                        <span className="text-[0.78rem] sm:text-[0.82rem] font-semibold text-[#0c1e4e] leading-snug pt-1.5 sm:pt-2">
                          {pill.title}
                        </span>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          4 · OUR APPROACH
          Dark navy section with numbered process timeline
          ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 md:py-24 lg:py-28 bg-[#0c1e4e] text-white relative overflow-hidden"
        aria-label="Our Approach"
      >
        {/* Subtle decorative dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          aria-hidden="true"
        />

        <div className="container relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-5 sm:w-6 h-[2px] bg-emerald-400 rounded-full" />
                <span className="text-emerald-400 font-mono text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.16em]">
                  {renewablesData.approachTag}
                </span>
                <span className="w-5 sm:w-6 h-[2px] bg-emerald-400 rounded-full" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.05}>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.15rem] font-extrabold text-white tracking-tight leading-tight mb-2 sm:mb-3">
                {renewablesData.approachTitle}
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <p className="text-[0.78rem] sm:text-sm text-white/50 max-w-md mx-auto leading-relaxed">
                {renewablesData.approachSubtitle}
              </p>
            </ScrollReveal>
          </div>

          {/* 6 Steps – responsive grid: 2-col mobile, 3-col tablet, 6-col desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 sm:gap-x-5 gap-y-8 sm:gap-y-10">
            {renewablesData.approachSteps.map((stepItem, idx) => {
              const IconComponent = iconMap[stepItem.icon] || FileText;
              const isLast = idx === renewablesData.approachSteps.length - 1;
              return (
                <ScrollReveal key={stepItem.step} direction="up" delay={idx * 0.05}>
                  <div className="relative text-center lg:text-left group">
                    {/* Icon with step badge */}
                    <div className="flex flex-col items-center lg:items-start mb-3 sm:mb-4">
                      <div className="relative">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                                        bg-white/[0.06] border border-white/[0.1]
                                        text-emerald-400
                                        flex items-center justify-center
                                        group-hover:bg-white/[0.1] group-hover:border-white/[0.18]
                                        transition-colors duration-200">
                          <IconComponent size={20} strokeWidth={1.6} />
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2
                                         w-5 h-5 sm:w-6 sm:h-6 rounded-full
                                         bg-emerald-500 text-white
                                         text-[0.6rem] sm:text-[0.65rem] font-bold
                                         flex items-center justify-center
                                         shadow-md shadow-emerald-500/30">
                          {stepItem.step}
                        </span>
                      </div>

                      {/* Desktop connector chevron */}
                      {!isLast && (
                        <div className="hidden lg:block absolute top-6 sm:top-7 -right-2.5 text-white/15" aria-hidden="true">
                          <ChevronRight size={15} />
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-[0.8rem] sm:text-sm font-bold text-white mb-1 leading-snug">
                      {stepItem.title}
                    </h3>
                    {/* Description */}
                    <p className="text-[0.68rem] sm:text-[0.75rem] text-white/40 leading-relaxed">
                      {stepItem.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          5 · PARTNER WITH US
          Cards  +  scenic image with CTA overlay
          ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white"
        aria-label="Partner With Us"
      >
        <div className="container max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-xl lg:max-w-2xl mb-10 sm:mb-12 lg:mb-14">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2.5 mb-3 sm:mb-4">
                <span className="w-6 h-[2px] bg-emerald-500 rounded-full" />
                <span className="text-emerald-600 font-mono text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.16em]">
                  {renewablesData.partnerTag}
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.05}>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.15rem] font-extrabold text-[#0c1e4e] tracking-tight leading-tight mb-3 sm:mb-4">
                {renewablesData.partnerTitle}
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.08}>
              <p className="text-[0.8rem] sm:text-sm text-slate-500 leading-relaxed">
                {renewablesData.partnerDesc}
              </p>
            </ScrollReveal>
          </div>

          {/* Cards + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch">

            {/* 4 Partner Cards — 2×2 */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
              {renewablesData.partnerCards.map((card, idx) => {
                const IconComponent = iconMap[card.icon] || HardHat;
                return (
                  <ScrollReveal key={idx} direction="up" delay={idx * 0.06}>
                    <Link
                      href={`/contact?partner=${encodeURIComponent(card.title)}`}
                      className="bg-white rounded-xl p-4 sm:p-5 lg:p-6
                                 border border-slate-200/80
                                 hover:border-emerald-200 hover:shadow-md hover:shadow-slate-100
                                 active:shadow-sm
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2
                                 transition-all duration-300 ease-out
                                 flex items-start gap-3 sm:gap-4 h-full
                                 block no-underline text-inherit cursor-pointer group"
                    >
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl
                                      bg-emerald-50 text-emerald-600
                                      flex items-center justify-center shrink-0
                                      border border-emerald-100
                                      group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500
                                      transition-colors duration-300">
                        <IconComponent size={19} strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[0.85rem] sm:text-[0.92rem] font-bold text-[#0c1e4e] mb-1 sm:mb-1.5 leading-snug
                                       group-hover:text-emerald-600 transition-colors duration-200">
                          {card.title}
                        </h3>
                        <p className="text-[0.72rem] sm:text-[0.78rem] text-slate-500 leading-relaxed mb-0">
                          {card.desc}
                        </p>
                      </div>
                      <ArrowUpRight size={15} className="text-slate-300 group-hover:text-emerald-500 shrink-0 mt-0.5 transition-colors duration-200" aria-hidden="true" />
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Right – scenic image with CTA overlay */}
            <div className="lg:col-span-5">
              <ScrollReveal direction="left" duration={0.7}>
                <div className="relative rounded-2xl overflow-hidden h-full min-h-[260px] sm:min-h-[320px] lg:min-h-[380px]">
                  <img
                    src={renewablesData.partnerBgImage}
                    alt="Green hills and renewable energy landscape"
                    className="w-full h-full object-cover absolute inset-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1e4e]/90 via-[#0c1e4e]/35 to-transparent" />

                  {/* Floating CTA */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 lg:p-8">
                    <p className="text-white/75 text-[0.72rem] sm:text-[0.8rem] mb-3 sm:mb-4 leading-relaxed">
                      Ready to explore partnership opportunities?
                    </p>
                    <Link
                      href="/contact?service=Renewables%20Partnership"
                      className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full
                                 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1e4e]
                                 text-white font-semibold text-[0.78rem] sm:text-sm
                                 transition-all duration-200
                                 shadow-lg shadow-emerald-500/25
                                 inline-flex items-center gap-2 group no-underline"
                    >
                      Partner With Us
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          6 · BOTTOM CTA
          Full-width cinematic closing section
          ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative py-16 sm:py-20 md:py-24 text-white overflow-hidden"
        aria-label="Contact CTA"
      >
        {/* BG */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${renewablesData.ctaBgImage || renewablesData.partnerBgImage}')` }}
          role="img"
          aria-label="Solar energy landscape"
        />
        <div className="absolute inset-0 bg-[#0a1628]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-transparent to-[#0a1628]/90" />

        <div className="container relative z-10 max-w-3xl lg:max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-5">
              <span className="w-5 sm:w-6 h-[2px] bg-emerald-400 rounded-full" />
              <span className="text-emerald-400 font-mono text-[0.63rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.16em]">
                {renewablesData.ctaTag}
              </span>
              <span className="w-5 sm:w-6 h-[2px] bg-emerald-400 rounded-full" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.06}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4 sm:mb-5">
              {renewablesData.ctaTitle}
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-[0.8rem] sm:text-sm lg:text-base text-white/60 leading-relaxed max-w-lg mx-auto mb-8 sm:mb-10">
              {renewablesData.ctaDesc}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/contact?service=Renewables"
                className="px-7 sm:px-8 py-3 sm:py-3.5 rounded-full
                           bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628]
                           text-white font-semibold text-[0.8rem] sm:text-sm
                           transition-all duration-200
                           shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30
                           inline-flex items-center gap-2 group no-underline"
              >
                Start a Conversation
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>

              <a
                href={`mailto:${renewablesData.contactEmail}`}
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full
                           bg-white/[0.07] hover:bg-white/[0.11] active:bg-white/[0.15]
                           backdrop-blur-sm text-white/80 hover:text-white
                           font-medium text-[0.78rem] sm:text-sm
                           transition-all duration-200
                           border border-white/12 hover:border-white/22
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                           inline-flex items-center gap-2 no-underline"
              >
                <Mail size={14} className="text-emerald-400" />
                {renewablesData.contactEmail}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
