'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  Cpu
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Badge from '@/components/ui/Badge';
import Container from '@/components/ui/Container';
import SectionPad from '@/components/ui/SectionPad';
import industriesData from '@/data/industries.json';
import ContactCTA from '@/components/sections/ContactCTA';

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
  Cpu: Cpu,
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero Banner with TextReveal */}
      <section className="bg-gradient-to-br from-ofs-navy-950 to-ofs-navy-900 text-white py-[5.5rem] relative overflow-hidden">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

        <Container className="relative z-10">
          <ScrollReveal direction="down" duration={0.5}>
            <div className="flex items-center gap-2 font-mono text-xs text-white/60 mb-6 uppercase">
              <Link href="/" className="text-white/70 hover:text-white transition-colors no-underline">
                Home
              </Link>
              <span>/</span>
              <span className="text-ofs-red-400">Industries</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-5">
              <Badge variant="red">CROSS-INDUSTRY DOMAIN EXPERTISE</Badge>
            </div>
          </ScrollReveal>

          <h1 className="font-heading text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold leading-[1.1] text-white mb-6 max-w-[920px]">
            <TextReveal tag="span" duration={0.65}>
              Engineered Support for
            </TextReveal>
            <br />
            <span className="gradient-text-red">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                High-Value Industrial Sectors
              </TextReveal>
            </span>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-[1.18rem] text-white/85 max-w-[780px] leading-relaxed">
              From offshore drilling rigs and refinery turnarounds to clean energy utility parks and pharmaceutical complexes, OFS delivers tailored logistics, precision sourcing, and technical supervision.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Industries Grid */}
      <section className="section-pad bg-ofs-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {industriesData.map((ind, idx) => {
              const IconComp = iconMap[ind.icon] || Flame;
              return (
                <ScrollReveal key={ind.id} direction="up" delay={idx * 0.08}>
                  <Link href={`/industries/${ind.slug}`} className="block h-full group no-underline">
                    <div className="card-modern p-0 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 h-full border border-ofs-gray-200 hover:border-ofs-navy-300 group-hover:-translate-y-1 bg-white rounded-xl">
                      <div>
                        {/* Hero Image with Zoom Hover */}
                        <div className="h-[175px] relative overflow-hidden">
                          <motion.img 
                            src={ind.heroImage} 
                            alt={ind.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-ofs-navy-950/15 to-ofs-navy-950/50 pointer-events-none" />
                          <div className="absolute top-3 left-3 w-9 h-9 rounded-xs bg-ofs-navy-950 text-ofs-red-400 grid place-content-center shadow-[0_4px_12px_rgba(12,30,78,0.3)] border border-white/10">
                            <IconComp size={18} />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 pb-4">
                          <h2 className="font-heading text-base sm:text-lg font-bold text-ofs-navy-950 mb-2 leading-snug group-hover:text-ofs-red-600 transition-colors">
                            {ind.name}
                          </h2>

                          <p className="text-xs sm:text-[0.875rem] text-ofs-gray-600 leading-relaxed mb-4">
                            {ind.summary.replace(/\n/g, ' ').slice(0, 140)}...
                          </p>

                          {/* Solutions bullets */}
                          <div className="flex flex-col gap-1.5 mb-3">
                            {ind.keySolutions.slice(0, 3).map((sol, sIndex) => (
                              <div key={sIndex} className="flex items-start gap-1.5 text-[0.78rem] text-ofs-gray-700">
                                <CheckCircle2 size={13} className="text-ofs-red-600 shrink-0 mt-0.5" />
                                <span className="leading-snug">{sol}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="py-3 px-5 border-t border-ofs-gray-200 bg-ofs-navy-50/70 flex justify-between items-center transition-colors group-hover:bg-ofs-navy-50">
                        <span className="font-mono text-xs font-bold uppercase text-ofs-navy-950 flex items-center gap-1 group-hover:text-ofs-red-600 transition-colors">
                          Sector Overview <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </>
  );
}
