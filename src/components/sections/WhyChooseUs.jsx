'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Globe2,
  Clock,
  Cpu,
  ArrowUpRight,
  Sparkles,
  Users,
  CheckCircle2,
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import GlowCard from '@/components/animations/GlowCard';
import MagneticButton from '@/components/animations/MagneticButton';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SectionPad from '@/components/ui/SectionPad';
import Container from '@/components/ui/Container';

export default function WhyChooseUs() {
  return (
    <SectionPad className="bg-ofs-navy-950 text-white relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

      {/* Radial Red Glow Accent */}
      <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(224,42,48,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[10%] -left-[10%] w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(14,33,87,0.4)_0%,transparent_70%)] pointer-events-none" />

      <Container className="relative z-[2]">
        <div className="max-w-[760px] mb-14">
          <ScrollReveal direction="up">
            <div className="mb-4">
              <Badge variant="red">WHY CHOOSE US</Badge>
            </div>
          </ScrollReveal>

          <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-heading font-extrabold tracking-[-0.03em] mt-4 mb-4 text-white leading-[1.15]">
            <TextReveal tag="span" duration={0.65}>
              Empowering Industries to Operate
            </TextReveal>
            <br />
            <span className="gradient-text-red">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                Smarter, Faster &amp; Stronger
              </TextReveal>
            </span>
          </h2>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-0">
              Our core strength lies in combining deep technical expertise with strategic sourcing capabilities, offering end-to-end customized solutions that are both cost-efficient and operationally impactful.
            </p>
          </ScrollReveal>
        </div>

        {/* Bento Grid: Featured 3,000+ Brands Card (2 Cols) + Complementary Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {/* 1. Featured Key Card: 3,000+ Global Approved Brands (Spans 2 Columns) */}
          <ScrollReveal direction="up" delay={0.08} className="lg:col-span-2">
            <GlowCard
              glowColor="rgba(224, 42, 48, 0.35)"
              borderColor="rgba(224, 42, 48, 0.6)"
              className="bg-gradient-to-br from-ofs-red-950/45 via-white/[0.06] to-white/[0.02] border border-ofs-red-500/50 rounded-lg p-6 sm:p-8 h-full backdrop-blur-md transition-all duration-300 hover:border-ofs-red-400 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(224,42,48,0.22)] flex flex-col justify-between"
              data-cursor-text="PRIMARY"
            >
              <div>
                <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xs bg-ofs-red-600/25 border border-ofs-red-500/50 grid place-content-center text-ofs-red-400 shadow-md">
                      <Sparkles size={22} />
                    </div>
                    <div>
                      <span className="font-mono text-[0.68rem] font-bold text-ofs-gold-400 uppercase tracking-wider bg-amber-500/15 py-1 px-2.5 rounded-full border border-amber-500/30">
                        ★ CORE COMPETITIVE ADVANTAGE
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-white/60">
                    US &amp; Europe Direct
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white mb-2.5 leading-snug">
                  3,000+ Internationally Approved Brands
                </h3>

                <p className="text-sm sm:text-[0.95rem] text-white/85 leading-relaxed mb-5">
                  Direct access to over 3,000+ internationally approved manufacturers across the US and Europe ensuring 100% genuine OEM components, EN 10204 3.1 Mill Test Certificates, and rigorous international quality standards.
                </p>
              </div>

              {/* Highlighted Feature Pills */}
              <div className="flex flex-wrap gap-2.5 pt-4 border-t border-white/10">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold py-1 px-3 rounded-full bg-white/[0.06] border border-white/15 text-white/90">
                  <CheckCircle2 size={13} className="text-ofs-red-400" /> Direct OEM Procurement
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold py-1 px-3 rounded-full bg-white/[0.06] border border-white/15 text-white/90">
                  <CheckCircle2 size={13} className="text-ofs-red-400" /> US &amp; EU AVL Network
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold py-1 px-3 rounded-full bg-white/[0.06] border border-white/15 text-white/90">
                  <CheckCircle2 size={13} className="text-ofs-red-400" /> Traceable Mill Test Certs
                </span>
              </div>
            </GlowCard>
          </ScrollReveal>

          {/* 2. Integrity & Quality Assurance (ISO 9001:2015) */}
          <ScrollReveal direction="up" delay={0.16} className="lg:col-span-1">
            <GlowCard
              glowColor="rgba(245, 158, 11, 0.25)"
              borderColor="rgba(245, 158, 11, 0.5)"
              className="bg-white/[0.04] border border-ofs-gold-500/35 rounded-lg p-6 sm:p-7 h-full backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:border-ofs-gold-400 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(245,158,11,0.15)] flex flex-col justify-between"
              data-cursor-text="QUALITY"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="w-10 h-10 rounded-xs bg-amber-500/20 border border-amber-500/40 grid place-content-center text-ofs-gold-400">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="font-mono text-[0.68rem] font-bold text-ofs-gold-400 bg-amber-500/15 py-0.5 px-2 rounded-full border border-amber-500/30 uppercase">
                    ISO 9001:2015
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-2 leading-snug">
                  Integrity &amp; Quality Assurance
                </h3>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed m-0">
                  Uncompromising ethical standards and ISO 9001:2015 certified quality systems with 100% traceable mill test certificates and full compliance dossiers.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 mt-4 text-xs font-mono text-ofs-gold-400 flex items-center gap-1.5">
                <CheckCircle2 size={13} /> Strict QA/QC Mill Verification
              </div>
            </GlowCard>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.22}>
            <GlowCard
              glowColor="rgba(224, 42, 48, 0.2)"
              borderColor="rgba(224, 42, 48, 0.4)"
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg p-6 sm:p-7 h-full backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:border-ofs-red-500 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)] flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xs bg-ofs-red-600/15 border border-ofs-red-600/35 grid place-content-center text-ofs-red-400 mb-4">
                  <Clock size={20} />
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-2 leading-snug">
                  8+ Years of Field Experience
                </h3>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed m-0">
                  Specialized procurement, MRO sourcing, and technical support across high-stakes offshore and industrial sectors.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 mt-4 text-xs font-mono text-white/60">
                Proven Track Record
              </div>
            </GlowCard>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.28}>
            <GlowCard
              glowColor="rgba(224, 42, 48, 0.2)"
              borderColor="rgba(224, 42, 48, 0.4)"
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg p-6 sm:p-7 h-full backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:border-ofs-red-500 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)] flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xs bg-ofs-red-600/15 border border-ofs-red-600/35 grid place-content-center text-ofs-red-400 mb-4">
                  <Users size={20} />
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-2 leading-snug">
                  Collaborative Partnerships
                </h3>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed m-0">
                  We work as an integrated extension of your engineering and procurement teams to optimize budgets and eliminate project delays.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 mt-4 text-xs font-mono text-white/60">
                End-to-End SLA Alignment
              </div>
            </GlowCard>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.34}>
            <GlowCard
              glowColor="rgba(56, 189, 248, 0.2)"
              borderColor="rgba(56, 189, 248, 0.4)"
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg p-6 sm:p-7 h-full backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:border-sky-400 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(56,189,248,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="w-10 h-10 rounded-xs bg-sky-500/20 border border-sky-500/40 grid place-content-center text-sky-400">
                    <Globe2 size={20} />
                  </div>
                  <span className="font-mono text-[0.68rem] font-bold text-sky-400 bg-sky-500/15 py-0.5 px-2 rounded-full border border-sky-500/30 uppercase">
                    INDIA &amp; USA
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-2 leading-snug">
                  Global Footprint &amp; Cloud SCM
                </h3>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed m-0">
                  USA Global Office &amp; India Operations Hub coordinating international AVL procurement backed by Microsoft-powered tracking software.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 mt-4 text-xs font-mono text-sky-400 flex items-center gap-1.5">
                <Cpu size={13} /> Real-Time Tracking &amp; Transparency
              </div>
            </GlowCard>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={0.4}>
          <div className="bg-gradient-to-r from-ofs-navy-900 via-[#0a183d] to-ofs-navy-950 border border-ofs-red-600/40 rounded-lg p-8 sm:p-11 flex justify-between items-center flex-wrap gap-6 shadow-[0_20px_40px_rgba(6,14,36,0.4)]">
            <div>
              <div className="font-heading text-xl sm:text-2xl font-extrabold text-white mb-1.5">
                Ready to streamline your procurement or industrial operations?
              </div>
              <div className="text-sm sm:text-base text-white/85">
                Our 24/7 technical desk is standing by to evaluate your spare parts, engineering, or logistics requirements.
              </div>
            </div>

            <MagneticButton strength={0.3} radius={80}>
              <Button href="/contact" variant="primary" data-cursor-text="CONTACT">
                Request Consultation <ArrowUpRight size={16} />
              </Button>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </Container>
    </SectionPad>
  );
}
