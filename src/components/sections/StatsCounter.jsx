'use client';

import React from 'react';
import Counter from '@/components/animations/Counter';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import GlowCard from '@/components/animations/GlowCard';
import Badge from '@/components/ui/Badge';
import SectionPad from '@/components/ui/SectionPad';
import Container from '@/components/ui/Container';

const statsData = [
  {
    numeric: 3000,
    suffix: '+',
    label: 'US & European Approved Brands',
    desc: 'Direct OEM access to pre-vetted international manufacturers with full EN 10204 3.1 MTC certification.',
    featured: true,
  },
  {
    numeric: 8,
    suffix: '+',
    label: 'Years of Field Experience',
    desc: 'Specialized procurement, MRO sourcing, and technical support across high-stakes offshore and industrial sectors.',
  },
  {
    numeric: 99.8,
    suffix: '%',
    decimals: 1,
    label: 'On-Time Fulfillment SLA',
    desc: 'Zero-delay critical path expediting, proactive scheduling, and multimodal logistics integrity.',
  },
  {
    numeric: 48,
    suffix: '+',
    label: 'EPC & Turnkey Projects',
    desc: 'Successfully executed across India, Middle East, North America, and major offshore basins.',
  },
  {
    numeric: 20,
    suffix: '+',
    label: 'Tier-1 Enterprise Clients',
    desc: 'Trusted by major offshore operators, refineries, EPC conglomerates, and power utilities.',
  },
  {
    numeric: 100,
    suffix: '%',
    label: 'ISO 9001:2015 Compliant',
    desc: 'Rigorous standardized quality systems, third-party inspection, and certified audit dossiers.',
  },
];

export default function StatsCounter() {
  return (
    <SectionPad className="bg-ofs-navy-950 text-white relative overflow-hidden">
      {/* Radial Ambient Glow Effects */}
      <div className="absolute -top-[150px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,rgba(224,42,48,0.22)_0%,transparent_70%)] pointer-events-none" />

      <div className="bg-grid-pattern-dark absolute inset-0 opacity-40 pointer-events-none" />

      <Container className="relative z-[2]">
        {/* Section Header */}
        <div className="text-center max-w-[750px] mx-auto mb-16">
          <ScrollReveal direction="up">
            <div className="mb-4">
              <Badge variant="red">PROVEN PERFORMANCE METRICS</Badge>
            </div>
          </ScrollReveal>

          <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-heading font-extrabold tracking-[-0.03em] mt-4 mb-4 text-white leading-[1.15]">
            <TextReveal tag="span" duration={0.65}>
              Numbers That Define Our
            </TextReveal>
            <br />
            <span className="gradient-text-red">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                Operational Excellence &amp; Scale
              </TextReveal>
            </span>
          </h2>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-lg text-white/80 mx-auto leading-relaxed">
              Every statistic represents real-world mission critical uptime, transparent supply chain execution, and trusted enterprise partnerships.
            </p>
          </ScrollReveal>
        </div>

        {/* 6 Metric Bento Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {statsData.map((stat, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.08} scale={0.95}>
              <GlowCard
                glowColor={stat.featured ? 'rgba(245, 158, 11, 0.35)' : 'rgba(224, 42, 48, 0.22)'}
                borderColor={stat.featured ? 'rgba(245, 158, 11, 0.55)' : 'rgba(255, 255, 255, 0.12)'}
                data-cursor-text="METRIC"
                className={`rounded-lg p-6 sm:p-7 flex flex-col justify-between h-full backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                  stat.featured
                    ? 'bg-gradient-to-br from-amber-500/10 via-white/[0.04] to-white/[0.01] border border-amber-500/40 shadow-[0_12px_32px_rgba(245,158,11,0.12)] hover:border-amber-400 hover:shadow-[0_16px_36px_rgba(245,158,11,0.25)]'
                    : 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/25 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)]'
                }`}
              >
                <div>
                  <div className="mb-2">
                    <div className="font-heading text-[clamp(1.65rem,2.5vw,2.35rem)] font-black text-ofs-gold-400 leading-tight">
                      {stat.numeric !== undefined && stat.numeric !== null ? (
                        <Counter end={stat.numeric} suffix={stat.suffix} decimals={stat.decimals || 0} />
                      ) : (
                        <span>{stat.value}</span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-heading text-base sm:text-[1.05rem] font-bold text-white mb-2 leading-snug">
                    {stat.label}
                  </h3>
                </div>

                <p className="text-xs sm:text-[0.85rem] text-white/75 leading-relaxed m-0 pt-3 border-t border-white/[0.08]">
                  {stat.desc}
                </p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </SectionPad>
  );
}
