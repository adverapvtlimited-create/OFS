'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileCheck2,
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SectionPad from '@/components/ui/SectionPad';
import Container from '@/components/ui/Container';
import caseStudiesData from '@/data/case-studies.json';
import { cn } from '@/lib/cn';

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState(0);
  const activeStudy = caseStudiesData[activeTab] || caseStudiesData[0];

  return (
    <SectionPad
      className="bg-white relative overflow-hidden"
      id="case-studies"
      aria-label="Verified Case Studies & Project Execution Logs"
    >
      <Container>
        <div className="max-w-[780px] mb-10">
          <ScrollReveal direction="up" delay={0.05}>
            <div className="mb-5">
              <Badge variant="red">PROVEN FIELD TRACK RECORD</Badge>
            </div>
          </ScrollReveal>

          <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-heading font-extrabold tracking-[-0.03em] mt-4 mb-4 text-ofs-navy-950 leading-[1.15]">
            <TextReveal tag="span" duration={0.6}>
              High-Stakes Execution Logs &amp;
            </TextReveal>
            <br />
            <span className="gradient-text-navy">
              <TextReveal tag="span" delay={0.15} duration={0.6}>
                Industrial Case Studies
              </TextReveal>
            </span>
          </h2>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-[clamp(1.025rem,1.35vw,1.18rem)] text-ofs-gray-600 max-w-[680px] leading-relaxed">
              Discover how OFS delivers precision sourcing, rapid emergency logistics, and certified engineering execution for offshore platforms, refineries, and renewable power installations across India and international waters.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {caseStudiesData.map((cs, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={cs.id}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  'text-left p-5 rounded-sm cursor-pointer transition-all duration-250 flex flex-col justify-between gap-3',
                  isActive
                    ? 'border-[1.5px] border-ofs-red-600 bg-ofs-navy-950 text-white shadow-[0_8px_24px_rgba(12,30,78,0.2)]'
                    : 'border border-ofs-gray-200 bg-ofs-gray-50 text-ofs-navy-950 hover:border-ofs-navy-300'
                )}
              >
                <div>
                  <div
                    className={cn(
                      'text-[0.7rem] font-mono font-bold uppercase tracking-[0.05em] mb-1.5',
                      isActive ? 'text-ofs-gold-400' : 'text-ofs-red-600'
                    )}
                  >
                    {cs.badge}
                  </div>
                  <div
                    className={cn(
                      'font-heading text-[0.95rem] font-extrabold leading-snug',
                      isActive ? 'text-white' : 'text-ofs-navy-950'
                    )}
                  >
                    {cs.title}
                  </div>
                </div>

                <div
                  className={cn(
                    'flex items-center gap-1.5 text-xs font-mono',
                    isActive ? 'text-white/70' : 'text-ofs-gray-500'
                  )}
                >
                  <MapPin
                    size={12}
                    className={isActive ? 'text-ofs-red-400' : 'text-ofs-red-600'}
                  />
                  <span>{cs.location.split(',')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStudy.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-ofs-navy-950 rounded-md text-white overflow-hidden shadow-xl border border-white/10 relative"
          >
            <div className="bg-grid-pattern-dark absolute inset-0 opacity-35 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 relative z-[2]">
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-3 items-center mb-4">
                    <Badge variant="red" className="text-[0.7rem]">
                      {activeStudy.clientIndustry}
                    </Badge>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ofs-gold-400 bg-amber-600/15 py-1 px-2.5 rounded-xs border border-amber-600/30">
                      <Clock size={13} /> {activeStudy.duration}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight text-white mb-4">
                    {activeStudy.title}
                  </h3>

                  <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-5">
                    {activeStudy.summary}
                  </p>

                  {/* Challenge & Solution Blocks */}
                  <div className="grid grid-cols-1 gap-3 mb-5">
                    <div className="bg-white/[0.04] border border-white/[0.08] rounded-sm p-4">
                      <div className="font-mono text-xs font-bold text-ofs-red-400 uppercase tracking-[0.06em] mb-1.5 flex items-center gap-1.5">
                        <span>[!]</span> The Engineering Challenge
                      </div>
                      <p className="text-[0.88rem] text-white/70 leading-relaxed m-0">
                        {activeStudy.challenge}
                      </p>
                    </div>

                    <div className="bg-emerald-500/[0.06] border border-emerald-500/20 rounded-sm p-4">
                      <div className="font-mono text-xs font-bold text-ofs-green-400 uppercase tracking-[0.06em] mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 size={14} /> The OFS Technical Solution
                      </div>
                      <p className="text-[0.88rem] text-white/80 leading-relaxed m-0">
                        {activeStudy.solution}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeStudy.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono py-1 px-3 bg-white/[0.07] text-white rounded-full border border-white/12"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10 flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-xs text-white/60 font-mono">
                    <MapPin size={14} className="text-ofs-red-400" />
                    <span>{activeStudy.location}</span>
                  </div>

                  <Button href="/contact" variant="primary" size="sm">
                    Request Similar Execution <ArrowRight size={14} />
                  </Button>
                </div>
              </div>

              <div className="bg-black/25 lg:border-l border-white/[0.08] flex flex-col justify-between">
                <div className="h-[180px] sm:h-[200px] relative overflow-hidden">
                  <img
                    src={activeStudy.heroImage}
                    alt={activeStudy.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#060E24]/20 to-[#060E24]/80" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-2 text-xs font-mono text-white bg-[#060E24]/85 py-1.5 px-3 rounded-xs border border-white/15 backdrop-blur-md">
                    <FileCheck2 size={14} className="text-ofs-gold-400" />
                    <span>Field Verified Log Ref: #{activeStudy.id}</span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 lg:p-8 flex flex-col gap-4">
                  <div className="font-mono text-xs font-bold text-ofs-gold-400 uppercase tracking-[0.08em]">
                    Verifiable Project Outcomes
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {activeStudy.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="bg-white/[0.05] border border-white/10 rounded-sm p-4 sm:p-5 flex flex-col gap-1.5"
                      >
                        <div className="font-heading text-2xl sm:text-3xl font-extrabold text-ofs-red-400 leading-none">
                          {m.value}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          {m.label}
                        </div>
                        <div className="text-[0.7rem] text-white/55 leading-tight">
                          {m.subtext}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 p-3.5 px-4 bg-amber-600/[0.08] border border-amber-600/25 rounded-xs mt-2">
                    <ShieldCheck size={20} className="text-ofs-gold-400 shrink-0" />
                    <div className="text-xs text-white/80 leading-normal">
                      <strong className="text-white block">ISO 9001:2015 Quality &amp; MTC Audit Trail:</strong>
                      Full material test certification and traceability reports supplied with every field delivery.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </SectionPad>
  );
}
