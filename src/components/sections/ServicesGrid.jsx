'use client';

import React from 'react';
import Link from 'next/link';
import {
  Package,
  Wrench,
  ShieldCheck,
  Anchor,
  Building2,
  Settings,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Clock,
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import GlowCard from '@/components/animations/GlowCard';
import MagneticButton from '@/components/animations/MagneticButton';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import SectionPad from '@/components/ui/SectionPad';
import Container from '@/components/ui/Container';
import SonarDot from '@/components/ui/SonarDot';
import servicesData from '@/data/services.json';

const iconMap = {
  Package: Package,
  Wrench: Wrench,
  ShieldCheck: ShieldCheck,
  Anchor: Anchor,
  Building2: Building2,
  Settings: Settings,
};

export default function ServicesGrid() {
  const flagshipService = servicesData[0]; // Procurement & Shipping
  const otherServices = servicesData.slice(1);

  return (
    <SectionPad className="bg-gradient-to-b from-ofs-gray-50/80 via-white to-ofs-gray-50/40 relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="flex justify-between items-end flex-wrap gap-6 mb-12">
          <div className="max-w-[760px]">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2.5 mb-3">
                <Badge variant="red">CORE CAPABILITIES</Badge>
                <span className="font-mono text-xs text-ofs-navy-900 font-bold uppercase tracking-wider">
                  {servicesData.length} Strategic Divisions
                </span>
              </div>
            </ScrollReveal>

            <h2 className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-heading font-extrabold tracking-[-0.03em] text-ofs-navy-950 m-0 leading-[1.18]">
              <TextReveal tag="span" duration={0.65}>
                Engineered for Precision.
              </TextReveal>{' '}
              <br />
              <span className="gradient-text-navy">
                <TextReveal tag="span" delay={0.2} duration={0.65}>
                  Built for High-Stakes Operations.
                </TextReveal>
              </span>
            </h2>

            <ScrollReveal direction="up" delay={0.25}>
              <p className="text-sm sm:text-base text-ofs-gray-600 leading-relaxed mt-3.5 mb-0 max-w-[660px]">
                Delivering end-to-end industrial solutions, high-grade engineering sourcing, and global logistics execution across high-stakes energy, maritime, and EPC sectors.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.3}>
            <MagneticButton strength={0.3} radius={70}>
              <Button href="/services" variant="navy" size="md" data-cursor-text="ALL">
                All Divisions <ArrowUpRight size={15} />
              </Button>
            </MagneticButton>
          </ScrollReveal>
        </div>

        {/* Bento Grid: Featured Flagship (2 cols) + Division 2 (1 col) + Row 2 (3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Flagship Featured Sourcing Card (Spans 2 Columns on Desktop) */}
          <ScrollReveal direction="up" delay={0.08} className="lg:col-span-2">
            <GlowCard
              glowColor="rgba(224, 42, 48, 0.22)"
              borderColor="rgba(224, 42, 48, 0.45)"
              className="p-0 overflow-hidden h-full bg-gradient-to-br from-white via-white to-ofs-navy-50/50 border-2 border-ofs-navy-200 rounded-lg shadow-md hover:border-ofs-red-500 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
              data-cursor-text="FLAGSHIP"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                {/* Visual Image Column */}
                <div className="sm:col-span-5 relative min-h-[200px] sm:min-h-[280px] overflow-hidden bg-ofs-navy-950">
                  <img
                    src={flagshipService.heroImage || flagshipService.image || '/images/live/Procurement-and-shippings.jpg'}
                    alt={flagshipService.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-spring group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-ofs-navy-950/85 via-ofs-navy-950/30 to-transparent" />
                  
                  {/* Top Left Flagship Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 py-1 px-3 rounded-full bg-ofs-red-600 text-white font-mono text-[0.68rem] font-bold shadow-lg">
                    <Sparkles size={12} />
                    <span>FLAGSHIP DIVISION</span>
                  </div>

                  {/* Bottom Stats Overlay */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 p-2.5 rounded-sm bg-ofs-navy-950/85 backdrop-blur-md border border-white/15 text-white">
                    <div className="text-[0.68rem] font-mono text-ofs-gold-400 font-bold uppercase tracking-wider">
                      AVL Partner Network
                    </div>
                    <div className="text-sm font-heading font-extrabold text-white">
                      3,000+ US &amp; EU Approved Brands
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-9 h-9 rounded-xs bg-ofs-navy-950 text-ofs-red-400 grid place-content-center shrink-0 shadow-sm transition-colors duration-200 group-hover:bg-ofs-red-600 group-hover:text-white">
                        <Package size={18} />
                      </div>
                      <div>
                        <div className="font-mono text-[0.68rem] font-bold text-ofs-red-600 uppercase tracking-wider">
                          DIVISION 01
                        </div>
                        <h3 className="font-heading text-xl sm:text-[1.35rem] font-extrabold text-ofs-navy-950 m-0 leading-tight group-hover:text-ofs-red-600 transition-colors">
                          <Link href={`/services/${flagshipService.slug}`} className="text-inherit no-underline">
                            {flagshipService.title}
                          </Link>
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-ofs-gray-600 leading-relaxed mb-4">
                      {flagshipService.description}
                    </p>

                    {/* Key Capability Highlights */}
                    <div className="grid grid-cols-1 gap-2 pt-3 border-t border-ofs-gray-200 mb-5">
                      {flagshipService.features.slice(0, 3).map((feat, fIndex) => (
                        <div
                          key={fIndex}
                          className="flex items-center gap-2 text-xs text-ofs-gray-800 font-medium"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-ofs-red-600 shrink-0"
                          />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Row */}
                  <div className="pt-3.5 border-t border-ofs-gray-200 flex justify-between items-center">
                    <Link
                      href={`/services/${flagshipService.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-white bg-ofs-navy-950 hover:bg-ofs-red-600 py-2 px-4 rounded-xs transition-all duration-200 no-underline shadow-sm"
                    >
                      Explore Scope <ArrowUpRight size={14} />
                    </Link>

                    <span className="font-mono text-xs font-bold text-ofs-gray-500">
                      ISO 9001:2015 Traceable
                    </span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </ScrollReveal>

          {/* 2. Engineering & EPC Support Card */}
          <ScrollReveal direction="up" delay={0.16} className="lg:col-span-1">
            <GlowCard
              glowColor="rgba(12, 30, 78, 0.15)"
              borderColor="rgba(12, 30, 78, 0.25)"
              className="p-0 overflow-hidden flex flex-col justify-between h-full bg-white border border-ofs-gray-200 rounded-lg shadow-sm transition-all duration-250 hover:border-ofs-navy-300 hover:shadow-xl hover:-translate-y-1 group"
              data-cursor-text="VIEW"
            >
              <div>
                <div className="h-[145px] relative overflow-hidden bg-ofs-navy-950">
                  <img
                    src={otherServices[0].heroImage || otherServices[0].image || '/images/live/Engg-e1751278356951.jpg'}
                    alt={otherServices[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-spring group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ofs-navy-950/75 via-ofs-navy-950/20 to-transparent" />
                  <span className="absolute bottom-2.5 left-3 font-mono text-[0.65rem] font-bold text-white bg-ofs-navy-950/90 py-0.5 px-2.5 rounded-full backdrop-blur-sm border border-white/20 uppercase tracking-wide">
                    {otherServices[0].badge}
                  </span>
                </div>

                <div className="p-5 pb-3">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-xs bg-ofs-navy-950 text-ofs-red-400 grid place-content-center shrink-0 transition-colors duration-200 group-hover:bg-ofs-red-600 group-hover:text-white shadow-xs">
                      <Wrench size={16} />
                    </div>
                    <h3 className="font-heading text-[1.05rem] font-bold text-ofs-navy-950 m-0 leading-tight group-hover:text-ofs-red-600 transition-colors">
                      <Link href={`/services/${otherServices[0].slug}`} className="text-inherit no-underline">
                        {otherServices[0].title}
                      </Link>
                    </h3>
                  </div>

                  <p className="text-xs text-ofs-gray-600 leading-relaxed mb-3.5 line-clamp-3">
                    {otherServices[0].description}
                  </p>

                  <div className="flex flex-col gap-1.5 pt-3 border-t border-ofs-gray-100">
                    {otherServices[0].features.slice(0, 2).map((feat, fIndex) => (
                      <div
                        key={fIndex}
                        className="flex items-start gap-1.5 text-[0.76rem] text-ofs-gray-700 leading-snug"
                      >
                        <CheckCircle2
                          size={13}
                          className="text-ofs-red-600 shrink-0 mt-0.5"
                        />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="py-3 px-5 border-t border-ofs-gray-200 bg-ofs-gray-50 flex justify-between items-center">
                <Link
                  href={`/services/${otherServices[0].slug}`}
                  className="font-mono text-xs font-bold uppercase text-ofs-red-600 flex items-center gap-1 hover:text-ofs-red-700 group-hover:translate-x-0.5 transition-all duration-150 no-underline"
                >
                  Explore Scope <ArrowUpRight size={13} />
                </Link>

                <span className="font-mono text-xs font-bold text-ofs-gray-400">
                  02
                </span>
              </div>
            </GlowCard>
          </ScrollReveal>

          {/* 3. Spare Parts Procurement & MRO Card */}
          <ScrollReveal direction="up" delay={0.22}>
            <GlowCard
              glowColor="rgba(12, 30, 78, 0.15)"
              borderColor="rgba(12, 30, 78, 0.25)"
              className="p-0 overflow-hidden flex flex-col justify-between h-full bg-white border border-ofs-gray-200 rounded-lg shadow-sm transition-all duration-250 hover:border-ofs-navy-300 hover:shadow-xl hover:-translate-y-1 group"
              data-cursor-text="VIEW"
            >
              <div>
                <div className="h-[145px] relative overflow-hidden bg-ofs-navy-950">
                  <img
                    src={otherServices[1].heroImage || otherServices[1].image || '/images/live/Spare-Parts-Procurement.jpg'}
                    alt={otherServices[1].title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-spring group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ofs-navy-950/75 via-ofs-navy-950/20 to-transparent" />
                  <span className="absolute bottom-2.5 left-3 font-mono text-[0.65rem] font-bold text-white bg-ofs-navy-950/90 py-0.5 px-2.5 rounded-full backdrop-blur-sm border border-white/20 uppercase tracking-wide">
                    {otherServices[1].badge}
                  </span>
                </div>

                <div className="p-5 pb-3">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-xs bg-ofs-navy-950 text-ofs-red-400 grid place-content-center shrink-0 transition-colors duration-200 group-hover:bg-ofs-red-600 group-hover:text-white shadow-xs">
                      <Settings size={16} />
                    </div>
                    <h3 className="font-heading text-[1.05rem] font-bold text-ofs-navy-950 m-0 leading-tight group-hover:text-ofs-red-600 transition-colors">
                      <Link href={`/services/${otherServices[1].slug}`} className="text-inherit no-underline">
                        {otherServices[1].title}
                      </Link>
                    </h3>
                  </div>

                  <p className="text-xs text-ofs-gray-600 leading-relaxed mb-3.5 line-clamp-3">
                    {otherServices[1].description}
                  </p>

                  <div className="flex flex-col gap-1.5 pt-3 border-t border-ofs-gray-100">
                    {otherServices[1].features.slice(0, 2).map((feat, fIndex) => (
                      <div
                        key={fIndex}
                        className="flex items-start gap-1.5 text-[0.76rem] text-ofs-gray-700 leading-snug"
                      >
                        <CheckCircle2
                          size={13}
                          className="text-ofs-red-600 shrink-0 mt-0.5"
                        />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="py-3 px-5 border-t border-ofs-gray-200 bg-ofs-gray-50 flex justify-between items-center">
                <Link
                  href={`/services/${otherServices[1].slug}`}
                  className="font-mono text-xs font-bold uppercase text-ofs-red-600 flex items-center gap-1 hover:text-ofs-red-700 group-hover:translate-x-0.5 transition-all duration-150 no-underline"
                >
                  Explore Scope <ArrowUpRight size={13} />
                </Link>

                <span className="font-mono text-xs font-bold text-ofs-gray-400">
                  03
                </span>
              </div>
            </GlowCard>
          </ScrollReveal>

          {/* 4. Industrial Logistics & Shipping Card */}
          <ScrollReveal direction="up" delay={0.28}>
            <GlowCard
              glowColor="rgba(12, 30, 78, 0.15)"
              borderColor="rgba(12, 30, 78, 0.25)"
              className="p-0 overflow-hidden flex flex-col justify-between h-full bg-white border border-ofs-gray-200 rounded-lg shadow-sm transition-all duration-250 hover:border-ofs-navy-300 hover:shadow-xl hover:-translate-y-1 group"
              data-cursor-text="VIEW"
            >
              <div>
                <div className="h-[145px] relative overflow-hidden bg-ofs-navy-950">
                  <img
                    src={otherServices[2].heroImage || otherServices[2].image || '/images/live/Logistics-and-shippings.jpg'}
                    alt={otherServices[2].title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-spring group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ofs-navy-950/75 via-ofs-navy-950/20 to-transparent" />
                  <span className="absolute bottom-2.5 left-3 font-mono text-[0.65rem] font-bold text-white bg-ofs-navy-950/90 py-0.5 px-2.5 rounded-full backdrop-blur-sm border border-white/20 uppercase tracking-wide">
                    {otherServices[2].badge}
                  </span>
                </div>

                <div className="p-5 pb-3">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-xs bg-ofs-navy-950 text-ofs-red-400 grid place-content-center shrink-0 transition-colors duration-200 group-hover:bg-ofs-red-600 group-hover:text-white shadow-xs">
                      <Anchor size={16} />
                    </div>
                    <h3 className="font-heading text-[1.05rem] font-bold text-ofs-navy-950 m-0 leading-tight group-hover:text-ofs-red-600 transition-colors">
                      <Link href={`/services/${otherServices[2].slug}`} className="text-inherit no-underline">
                        {otherServices[2].title}
                      </Link>
                    </h3>
                  </div>

                  <p className="text-xs text-ofs-gray-600 leading-relaxed mb-3.5 line-clamp-3">
                    {otherServices[2].description}
                  </p>

                  <div className="flex flex-col gap-1.5 pt-3 border-t border-ofs-gray-100">
                    {otherServices[2].features.slice(0, 2).map((feat, fIndex) => (
                      <div
                        key={fIndex}
                        className="flex items-start gap-1.5 text-[0.76rem] text-ofs-gray-700 leading-snug"
                      >
                        <CheckCircle2
                          size={13}
                          className="text-ofs-red-600 shrink-0 mt-0.5"
                        />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="py-3 px-5 border-t border-ofs-gray-200 bg-ofs-gray-50 flex justify-between items-center">
                <Link
                  href={`/services/${otherServices[2].slug}`}
                  className="font-mono text-xs font-bold uppercase text-ofs-red-600 flex items-center gap-1 hover:text-ofs-red-700 group-hover:translate-x-0.5 transition-all duration-150 no-underline"
                >
                  Explore Scope <ArrowUpRight size={13} />
                </Link>

                <span className="font-mono text-xs font-bold text-ofs-gray-400">
                  04
                </span>
              </div>
            </GlowCard>
          </ScrollReveal>

          {/* 5. Direct Sourcing Inquiry & Commercial Desk Bento Box */}
          <ScrollReveal direction="up" delay={0.34}>
            <div className="bg-gradient-to-br from-ofs-navy-950 via-ofs-navy-900 to-[#0A183E] text-white rounded-lg p-6 border border-ofs-red-500/40 shadow-xl flex flex-col justify-between h-full relative overflow-hidden group">
              <div className="bg-grid-pattern-dark absolute inset-0 opacity-30 pointer-events-none" />
              
              <div className="relative z-[2]">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[0.68rem] font-bold text-ofs-gold-400 bg-amber-500/15 py-1 px-2.5 rounded-full border border-amber-500/30 uppercase tracking-wider flex items-center gap-1.5">
                    <SonarDot color="green" />
                    24/7 TECHNICAL DESK
                  </span>
                  <Clock size={15} className="text-white/40" />
                </div>

                <h3 className="font-heading text-[1.15rem] font-extrabold text-white mb-2 leading-snug">
                  Need a Custom Tender or Emergency AVL Sourcing?
                </h3>

                <p className="text-xs text-white/75 leading-relaxed mb-4">
                  Our technical commercial desk handles tender specifications, manufacturer quotes, and expediting across US &amp; European approved vendors.
                </p>
              </div>

              <div className="relative z-[2] pt-3.5 border-t border-white/10 flex flex-col gap-2.5">
                <Button
                  href="/contact"
                  variant="primary"
                  size="sm"
                  className="w-full justify-center text-xs"
                >
                  Request Technical Quotation <ArrowUpRight size={14} />
                </Button>
                <div className="text-[0.72rem] font-mono text-center text-white/60">
                  Average RFQ Turnaround: &lt; 24 Hours
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </SectionPad>
  );
}
