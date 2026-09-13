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
  Mail,
  ChevronRight,
  Target
} from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import renewablesData from '@/data/renewables.json';

// Icon Map helper
const iconMap = {
  Sun: Sun,
  BatteryCharging: BatteryCharging,
  Wind: Wind,
  Link: LinkIcon,
  Globe: Globe,
  Leaf: Leaf,
  ShieldCheck: ShieldCheck,
  RotateCw: RotateCw,
  Handshake: Handshake,
  FileText: FileText,
  Settings: Settings,
  Users: Users,
  Scale: Scale,
  ShoppingCart: ShoppingCart,
  HardHat: HardHat,
  Factory: Factory,
  Lightbulb: Lightbulb,
  Target: Target
};

export default function RenewablesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[690px] flex items-center py-16 sm:py-20 lg:py-24 overflow-hidden bg-slate-900 border-b border-slate-200/80">

        {/* Full-bleed Panoramic Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${renewablesData.heroBgImage}')` }}
        />

        {/* Soft Left Daylight Gradient Overlay for perfect text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 sm:via-white/75 to-transparent lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />

        <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">

            {/* Tag Badge */}
            <ScrollReveal direction="down" duration={0.4}>
              <div className="text-[#059669] font-mono text-xs sm:text-[0.825rem] font-bold uppercase tracking-[0.14em] mb-3">
                {renewablesData.title}
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal direction="up" delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-extrabold text-[#0c1e4e] leading-[1.12] mb-4 tracking-[-0.025em]">
                Building the Supply Chain <br className="hidden sm:inline" />
                for a <span className="text-[#059669]">Cleaner Energy</span> Future
              </h1>
            </ScrollReveal>

            {/* Subtitle */}
            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 max-w-lg font-normal">
                {renewablesData.heroDescription}
              </p>
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex flex-wrap items-center gap-3.5 mb-5">
                <Link
                  href="/contact?service=Renewables"
                  className="px-6 sm:px-7 py-3 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-emerald-600/30 inline-flex items-center gap-2 group no-underline"
                >
                  Discuss Your Requirement
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#solutions"
                  className="px-6 sm:px-7 py-3 rounded-full bg-white/95 hover:bg-white text-slate-800 font-semibold text-xs sm:text-sm transition-all duration-200 shadow-xs border border-slate-300 hover:border-slate-400 inline-flex items-center gap-2 no-underline"
                >
                  Explore Our Solutions
                </a>
              </div>
            </ScrollReveal>

            {/* Sub-caption */}
            <ScrollReveal direction="up" delay={0.35}>
              <p className="text-xs text-slate-600 font-mono italic flex items-center gap-2">
                <span className="w-5 h-[1px] bg-slate-400"></span>
                {renewablesData.heroBacking}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OUR SOLUTIONS                                                          */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80" id="solutions">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 5-Column Grid: 1 Col Left Info + 4 Solution Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 items-stretch">

            {/* Left Info Column */}
            <div className="sm:col-span-2 lg:col-span-1 flex flex-col justify-between py-2 pr-2">
              <div>
                <div className="flex items-center gap-2 text-[#059669] font-mono font-bold text-xs uppercase tracking-[0.12em] mb-2.5">
                  <span className="w-5 h-[2px] bg-[#059669]"></span>
                  <span>{renewablesData.solutionsTag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0c1e4e] tracking-tight leading-[1.2] mb-4">
                  End-to-End Renewable <br className="hidden lg:inline" />
                  Energy Solutions
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                  {renewablesData.solutionsDesc}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="#solutions"
                  className="text-[#059669] hover:text-[#047857] text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 group no-underline transition-colors"
                >
                  Explore all solutions
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* 4 Solution Cards */}
            {renewablesData.solutions.map((sol, idx) => {
              const IconComponent = iconMap[sol.icon] || Sun;
              return (
                <ScrollReveal key={sol.id} direction="up" delay={idx * 0.08} className="h-full">
                  <Link
                    href={`/contact?service=${encodeURIComponent(sol.title)}`}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer block no-underline text-inherit"
                  >
                    <div>
                      {/* Top Image */}
                      <div className="h-36 sm:h-40 overflow-hidden relative bg-slate-100">
                        <img
                          src={sol.image}
                          alt={sol.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Overlapping Circular Green Icon Badge */}
                      <div className="w-11 h-11 rounded-full bg-white border border-emerald-400 text-[#059669] flex items-center justify-center -mt-5.5 ml-4 relative z-10 shadow-sm group-hover:bg-[#059669] group-hover:text-white group-hover:border-[#059669] transition-colors">
                        <IconComponent size={20} />
                      </div>

                      {/* Content Area */}
                      <div className="px-4.5 pt-2 pb-4">
                        {/* Title */}
                        <h3 className="text-[0.95rem] font-bold text-[#0c1e4e] mb-2 group-hover:text-[#059669] transition-colors leading-snug">
                          {sol.title}
                        </h3>

                        {/* Bullets */}
                        <ul className="space-y-1.5 pl-0 list-none mb-0">
                          {sol.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="text-[0.75rem] text-slate-500 flex items-start gap-1.5 leading-normal">
                              <span className="text-slate-400 font-bold">&bull;</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Left Arrow */}
                    <div className="px-4.5 pb-4 pt-1">
                      <div className="text-[#059669] group-hover:translate-x-1 transition-transform inline-flex items-center text-sm font-bold">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>




      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Image */}
            <div className="lg:col-span-5">
              <ScrollReveal direction="right">
                <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100">
                  <img
                    src={renewablesData.whyImage}
                    alt="Why OFS Renewables"
                    className="w-full h-[270px] sm:h-[330px] lg:h-[350px] object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Right Text & 4-Item Horizontal Feature Bar */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="left">
                <div className="flex items-center gap-2 text-[#059669] font-mono font-bold text-xs uppercase tracking-[0.12em] mb-2.5">
                  <span className="w-5 h-[2px] bg-[#059669]"></span>
                  <span>{renewablesData.whyTag}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#0c1e4e] tracking-tight mb-3 leading-tight">
                  {renewablesData.whyTitle}
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-7 max-w-2xl">
                  {renewablesData.whyDesc}
                </p>

                {/* 4 Feature Items in a Single Horizontal Row with subtle vertical dividers */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2 items-center pt-2">
                  {renewablesData.whyPills.map((pill, idx) => {
                    const IconComponent = iconMap[pill.icon] || Leaf;
                    const isLast = idx === renewablesData.whyPills.length - 1;
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-2.5 ${!isLast ? 'sm:border-r sm:border-slate-200 sm:pr-3' : ''}`}
                      >
                        <div className="w-10 h-10 rounded-full bg-[#e6f7f0] text-[#059669] flex items-center justify-center shrink-0 border border-[#bbf0da] shadow-xs">
                          <IconComponent size={18} />
                        </div>
                        <div className="text-[0.74rem] sm:text-[0.78rem] font-semibold text-slate-800 leading-tight">
                          {pill.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. OUR APPROACH SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="mb-10 sm:mb-12">
            <div className="flex items-center gap-2 text-[#059669] font-mono font-bold text-xs uppercase tracking-[0.12em] mb-2">
              <span className="w-5 h-[2px] bg-[#059669]"></span>
              <span>{renewablesData.approachTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#0c1e4e] tracking-tight mb-2">
              {renewablesData.approachTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {renewablesData.approachSubtitle}
            </p>
          </div>

          {/* 6 Steps Row with connecting arrows */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
            {renewablesData.approachSteps.map((stepItem, idx) => {
              const IconComponent = iconMap[stepItem.icon] || FileText;
              const isLast = idx === renewablesData.approachSteps.length - 1;
              return (
                <ScrollReveal key={stepItem.step} direction="up" delay={idx * 0.07}>
                  <div className="flex flex-col items-start relative h-full">
                    {/* Circle Icon and Desktop Arrow Connector */}
                    <div className="flex items-center w-full mb-3.5 relative">
                      <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#e6f7f0] border border-[#bbf0da] text-[#059669] flex items-center justify-center relative z-10 shadow-xs shrink-0">
                        <IconComponent size={21} />
                      </div>

                      {!isLast && (
                        <div className="hidden lg:flex items-center justify-center flex-1 text-[#059669]/70 pl-2">
                          <ArrowRight size={15} />
                        </div>
                      )}
                    </div>

                    {/* Step Title */}
                    <h3 className="text-xs sm:text-sm font-bold text-[#0c1e4e] mb-1 leading-snug">
                      {stepItem.step}. {stepItem.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-[0.74rem] text-slate-500 leading-snug">
                      {stepItem.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. PARTNER WITH US SECTION                                                */}
      {/* ========================================================================= */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden text-white bg-slate-900 border-b border-slate-200/80">
        {/* Scenic Background Landscape */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url('${renewablesData.partnerBgImage}')` }}
        />
        {/* Soft Dark Vignette / Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06122c]/90 via-[#0a1b3f]/75 to-[#06122c]/60 pointer-events-none" />

        <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-5">
              <ScrollReveal direction="right">
                <div className="flex items-center gap-2 text-[#10b981] font-mono font-bold text-xs uppercase tracking-[0.12em] mb-2.5">
                  <span className="w-5 h-[2px] bg-[#10b981]"></span>
                  <span>{renewablesData.partnerTag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold text-white tracking-tight mb-3.5 leading-tight drop-shadow-sm">
                  {renewablesData.partnerTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-100/90 leading-relaxed max-w-lg drop-shadow-xs">
                  {renewablesData.partnerDesc}
                </p>
              </ScrollReveal>
            </div>

            {/* Right Column: 4 White Floating Cards & Partner Button */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
                {renewablesData.partnerCards.map((card, idx) => {
                  const IconComponent = iconMap[card.icon] || HardHat;
                  return (
                    <ScrollReveal key={idx} direction="up" delay={idx * 0.08}>
                      <Link
                        href={`/contact?partner=${encodeURIComponent(card.title)}`}
                        className="bg-white rounded-2xl p-5 shadow-xl text-center h-full flex flex-col justify-start items-center hover:translate-y-[-3px] transition-all duration-300 block no-underline text-slate-800 cursor-pointer border border-white"
                      >
                        {/* Green Icon */}
                        <div className="text-[#059669] mb-3 flex items-center justify-center">
                          <IconComponent size={28} strokeWidth={1.75} />
                        </div>

                        {/* Title */}
                        <h3 className="text-xs sm:text-[0.82rem] font-bold text-[#0c1e4e] mb-2 leading-snug">
                          {card.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-[0.72rem] sm:text-[0.74rem] text-slate-500 leading-normal mb-0">
                          {card.desc}
                        </p>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>

              {/* Centered Button Under Cards */}
              <div className="text-center">
                <Link
                  href="/contact?service=Renewables%20Partnership"
                  className="px-7 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs sm:text-sm transition-all shadow-lg hover:shadow-emerald-600/30 inline-flex items-center gap-2 group no-underline border border-emerald-400/30"
                >
                  Partner With OFS Renewables
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BOTTOM CTA BANNER                                                      */}
      {/* ========================================================================= */}
      <section className="relative py-12 sm:py-14 text-white overflow-hidden bg-[#07132e] border-t border-white/10">
        {/* Background Solar Landscape */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 pointer-events-none"
          style={{ backgroundImage: `url('${renewablesData.ctaBgImage || renewablesData.partnerBgImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07132e]/95 via-[#091b3e]/90 to-[#07132e]/85 pointer-events-none" />

        <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-[#10b981] font-mono text-xs uppercase tracking-wider mb-2 font-bold">
                <span className="w-5 h-[2px] bg-[#10b981]"></span>
                <span>{renewablesData.ctaTag}</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-[1.85rem] font-extrabold text-white tracking-tight mb-2 leading-snug">
                {renewablesData.ctaTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl mb-0">
                {renewablesData.ctaDesc}
              </p>
            </div>

            {/* Right Action */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0">
              <Link
                href="/contact?service=Renewables"
                className="px-7 py-2.5 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-emerald-500/20 inline-flex items-center gap-2 group no-underline"
              >
                Start a Conversation
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={`mailto:${renewablesData.contactEmail}`}
                className="text-xs text-slate-200 hover:text-white flex items-center gap-2 font-sans transition-colors no-underline pt-0.5"
              >
                <Mail size={14} className="text-[#10b981]" />
                <span>{renewablesData.contactEmail}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
