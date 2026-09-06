'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Ship,
  Sun,
  Hammer,
  Zap,
  FlaskConical,
  Mountain,
  Plane,
  Anchor,
  Compass,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SectionPad from '@/components/ui/SectionPad';
import Container from '@/components/ui/Container';
import industriesData from '@/data/industries.json';
import { cn } from '@/lib/cn';

const iconMap = {
  Flame: Flame,
  Ship: Ship,
  Sun: Sun,
  Hammer: Hammer,
  Zap: Zap,
  FlaskConical: FlaskConical,
  Mountain: Mountain,
  Plane: Plane,
  Anchor: Anchor,
  Compass: Compass,
};

export default function IndustriesSection() {
  const [activeTab, setActiveTab] = useState(industriesData[0].id);
  const currentIndustry = industriesData.find((ind) => ind.id === activeTab) || industriesData[0];
  const IconComp = iconMap[currentIndustry.icon] || Flame;

  return (
    <SectionPad className="bg-white relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-[750px] mx-auto mb-14">
          <ScrollReveal direction="up">
            <div className="mb-4">
              <Badge variant="red">SECTOR EXPERTISE</Badge>
            </div>
          </ScrollReveal>

          <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-heading font-extrabold tracking-[-0.03em] mt-4 mb-4 text-ofs-navy-950 leading-[1.15]">
            <TextReveal tag="span" duration={0.65}>
              Tailored Solutions Across
            </TextReveal>
            <br />
            <span className="gradient-text-navy">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                Critical Global Industries
              </TextReveal>
            </span>
          </h2>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-[clamp(1.025rem,1.35vw,1.18rem)] text-ofs-gray-600 max-w-[680px] leading-relaxed mx-auto">
              From deepwater hydrocarbons and heavy civil EPC complexes to power infrastructure, mining operations, and utility solar parks.
            </p>
          </ScrollReveal>
        </div>

        {/* Responsive Industry Tab Selector with Clean Multi-Row Wrap & Spring Pill */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-[1050px] mx-auto mb-10">
            {industriesData.map((ind) => {
              const TabIcon = iconMap[ind.icon] || Flame;
              const isActive = ind.id === activeTab;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className={cn(
                    'relative inline-flex items-center gap-2 py-2.5 px-4.5 rounded-full text-[0.825rem] font-mono font-bold whitespace-nowrap cursor-pointer transition-all duration-200',
                    isActive
                      ? 'bg-ofs-navy-950 text-white border border-ofs-navy-950 shadow-[0_4px_14px_rgba(12,30,78,0.2)]'
                      : 'bg-ofs-gray-100 text-ofs-gray-700 border border-ofs-gray-200 hover:border-ofs-navy-300'
                  )}
                  data-cursor-text="SECTOR"
                >
                  <TabIcon
                    size={15}
                    className={cn('relative z-[2]', isActive ? 'text-ofs-red-400' : 'text-ofs-gray-500')}
                  />
                  <span className="relative z-[2]">{ind.shortName}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Selected Industry Detail Bento Console with Animated Crossfade */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="bg-ofs-navy-50 rounded-xl border border-ofs-navy-100 overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndustry.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2"
              >
                {/* Left: Content */}
                <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xs bg-ofs-navy-950 text-ofs-red-400 grid place-content-center">
                        <IconComp size={22} />
                      </div>
                      <span className="font-mono text-xs font-bold text-ofs-navy-900 uppercase tracking-[0.05em]">
                        Industry Focus &amp; Compliance
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-ofs-navy-950 mb-4 leading-tight">
                      {currentIndustry.name}
                    </h3>

                    <p className="text-base text-ofs-gray-600 leading-relaxed mb-7">
                      {currentIndustry.summary || currentIndustry.description}
                    </p>

                    {/* Key Capabilities List */}
                    <div className="flex flex-col gap-3 mb-10">
                      {(currentIndustry.keySolutions || currentIndustry.capabilities || []).map((cap, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 text-[0.925rem] text-ofs-gray-800"
                        >
                          <CheckCircle2 size={18} className="text-ofs-red-600 shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 items-center flex-wrap">
                    <Button href={`/industries/${currentIndustry.slug}`} variant="primary" data-cursor-text="SECTOR">
                      Explore Sector Scope <ArrowUpRight size={16} />
                    </Button>
                    {currentIndustry.relatedService && (
                      <Button
                        href={`/services/${currentIndustry.relatedService.slug}`}
                        variant="outline"
                      >
                        {currentIndustry.relatedService.label}
                      </Button>
                    )}
                    {currentIndustry.relatedPortal && (
                      <Button href={currentIndustry.relatedPortal.href} variant="green">
                        {currentIndustry.relatedPortal.label}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right: Graphic / Visual with Ambient Badge */}
                <div className="relative min-h-[320px] lg:min-h-full bg-ofs-navy-950 overflow-hidden">
                  <div className="bg-grid-pattern-dark absolute inset-0 opacity-30" />

                  <motion.img
                    src={currentIndustry.heroImage || currentIndustry.image}
                    alt={currentIndustry.name}
                    className="absolute inset-0 w-full h-full object-cover z-[1]"
                    initial={{ scale: 1.04, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060E24]/80 via-[#060E24]/20 to-transparent z-[2]" />

                  {/* Floating Spec Chip */}
                  <div className="absolute bottom-6 left-6 bg-[#060E24]/90 backdrop-blur-md border border-white/20 rounded-xs py-2.5 px-4 text-white z-[3] flex items-center gap-2 text-xs font-mono">
                    <ShieldCheck size={16} className="text-ofs-gold-400" />
                    <span>ISO 9001 &amp; OEM Standards Certified</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </Container>
    </SectionPad>
  );
}
