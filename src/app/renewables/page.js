'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sun,
  BatteryCharging,
  Wind,
  Link as LinkIcon,
  Globe,
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
  ChevronRight
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
  Lightbulb: Lightbulb
};

export default function RenewablesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">

      {/* ========================================================================= */}
      {/* HERO SECTION                                                              */}
      {/* ========================================================================= */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center pt-24 pb-16 overflow-hidden bg-slate-900">
        {/* Hero Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85"
          style={{ backgroundImage: `url('${renewablesData.heroBgImage}')` }}
        />

        {/* Soft Left Light Gradient Overlay to make text perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent lg:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Tag Badge */}
            <ScrollReveal direction="down" duration={0.4}>
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
                {renewablesData.title}
              </div>
            </ScrollReveal>

            {/* Main Title */}
            <ScrollReveal direction="up" delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6 tracking-tight">
                Building the Supply Chain <br className="hidden sm:inline" />
                for a <span className="text-emerald-400">Cleaner Energy Future</span>
              </h1>
            </ScrollReveal>

            {/* Subtitle */}
            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-xl">
                {renewablesData.heroDescription}
              </p>
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link
                  href="/contact"
                  className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg hover:shadow-emerald-600/30 inline-flex items-center gap-2 group"
                >
                  Discuss Your Requirement
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#solutions"
                  className="px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-slate-900 font-semibold text-sm transition-all shadow border border-slate-200 inline-flex items-center gap-2"
                >
                  Explore Our Solutions
                </a>
              </div>
            </ScrollReveal>

            {/* Sub-caption */}
            <ScrollReveal direction="up" delay={0.4}>
              <p className="text-xs text-slate-300 font-mono italic flex items-center gap-2">
                <span className="w-6 h-[1px] bg-emerald-400"></span>
                {renewablesData.heroBacking}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: OUR SOLUTIONS                                                 */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50/70 border-b border-slate-100" id="solutions">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-2">
                <span className="w-5 h-[2px] bg-emerald-600"></span>
                {renewablesData.solutionsTag}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                {renewablesData.solutionsTitle}
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {renewablesData.solutionsDesc}
              </p>
              <a
                href="#solutions"
                className="text-emerald-700 hover:text-emerald-800 text-sm font-semibold inline-flex items-center gap-1 group"
              >
                Explore all solutions
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Cards Grid (4 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {renewablesData.solutions.map((sol, idx) => {
              const IconComponent = iconMap[sol.icon] || Sun;
              return (
                <ScrollReveal key={sol.id} direction="up" delay={idx * 0.1}>
                  <Link 
                    href={`/contact?service=${encodeURIComponent(sol.title)}`}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer block no-underline text-inherit"
                  >
                    <div>
                      {/* Top Image */}
                      <div className="h-44 overflow-hidden relative">
                        <img
                          src={sol.image}
                          alt={sol.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content Area */}
                      <div className="p-6">
                        {/* Icon */}
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <IconComponent size={20} />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                          {sol.title}
                        </h3>

                        {/* Bullets */}
                        <ul className="space-y-2 mb-4">
                          {sol.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="text-xs text-slate-600 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Arrow & Action */}
                    <div className="px-6 pb-6 pt-0 flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-700 group-hover:underline">Inquire Solution</span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-emerald-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
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

      {/* ========================================================================= */}
      {/* SECTION 2: WHY OFS RENEWABLES                                            */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="right">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                  <img
                    src={renewablesData.whyImage}
                    alt="Why OFS Renewables"
                    className="w-full h-[380px] sm:h-[440px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </div>
              </ScrollReveal>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="left">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-3">
                  <span className="w-5 h-[2px] bg-emerald-600"></span>
                  {renewablesData.whyTag}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                  {renewablesData.whyTitle}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                  {renewablesData.whyDesc}
                </p>

                {/* 4 Feature Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {renewablesData.whyPills.map((pill, idx) => {
                    const IconComponent = iconMap[pill.icon] || Globe;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-200 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <IconComponent size={18} />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">
                          {pill.title}
                        </span>
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
      {/* SECTION 3: OUR APPROACH                                                  */}
      {/* ========================================================================= */}
      <section className="py-20 bg-emerald-50/30 border-b border-slate-100">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-2">
              <span className="w-5 h-[2px] bg-emerald-600"></span>
              {renewablesData.approachTag}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
              {renewablesData.approachTitle}
            </h2>
            <p className="text-sm text-slate-600">
              {renewablesData.approachSubtitle}
            </p>
          </div>

          {/* 6 Step Process Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
            {renewablesData.approachSteps.map((stepItem, idx) => {
              const IconComponent = iconMap[stepItem.icon] || FileText;
              const isLast = idx === renewablesData.approachSteps.length - 1;
              return (
                <ScrollReveal key={stepItem.step} direction="up" delay={idx * 0.08}>
                  <div className="flex flex-col items-start relative h-full">
                    {/* Circle Icon */}
                    <div className="w-12 h-12 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-4 relative z-10">
                      <IconComponent size={20} />
                    </div>

                    {/* Step Title & Subtext */}
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      {stepItem.step}. {stepItem.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-normal">
                      {stepItem.desc}
                    </p>

                    {/* Direction Arrow (on lg screens between steps) */}
                    {!isLast && (
                      <div className="hidden lg:block absolute top-6 -right-3 text-slate-300 z-0">
                        <ChevronRight size={18} />
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: PARTNER WITH US                                              */}
      {/* ========================================================================= */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        {/* Background Image & Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: `url('${renewablesData.partnerBgImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/80" />

        <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12">
            {/* Left Description */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest mb-3">
                <span className="w-5 h-[2px] bg-emerald-400"></span>
                {renewablesData.partnerTag}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                {renewablesData.partnerTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {renewablesData.partnerDesc}
              </p>
            </div>

            {/* Right Audience Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {renewablesData.partnerCards.map((card, idx) => {
                const IconComponent = iconMap[card.icon] || HardHat;
                return (
                  <ScrollReveal key={idx} direction="up" delay={idx * 0.1}>
                    <Link
                      href={`/contact?partner=${encodeURIComponent(card.title)}`}
                      className="bg-white/95 backdrop-blur rounded-xl p-5 border border-slate-100 shadow-lg text-center h-full flex flex-col justify-between hover:translate-y-[-2px] transition-transform block no-underline text-inherit cursor-pointer"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                          <IconComponent size={20} />
                        </div>
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight mb-2">
                          {card.title}
                        </h3>
                        <p className="text-[0.78rem] text-slate-600 leading-snug">
                          {card.desc}
                        </p>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Centered Partner Button */}
          <div className="text-center pt-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg hover:shadow-emerald-600/30 inline-flex items-center gap-2 group"
            >
              Partner With OFS Renewables
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: BOTTOM CTA BANNER                                             */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-900 text-white py-14">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-2 font-semibold">
                <span className="w-4 h-[2px] bg-emerald-400"></span>
                {renewablesData.ctaTag}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                {renewablesData.ctaTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {renewablesData.ctaDesc}
              </p>
            </div>

            {/* Right Action & Contact Email */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4 shrink-0">
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg hover:shadow-emerald-500/20 inline-flex items-center gap-2 group"
              >
                Start a Conversation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={`mailto:${renewablesData.contactEmail}`}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-2 font-mono transition-colors"
              >
                <Mail size={14} className="text-emerald-400" />
                {renewablesData.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
