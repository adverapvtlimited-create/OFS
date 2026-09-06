'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import MagneticButton from '@/components/animations/MagneticButton';
import Badge from '@/components/ui/Badge';
import Pill from '@/components/ui/Pill';
import Button from '@/components/ui/Button';
import SectionPad from '@/components/ui/SectionPad';
import Container from '@/components/ui/Container';
import renewablesData from '@/data/renewables.json';

export default function RenewablesCTA() {
  return (
    <SectionPad className="bg-gradient-to-b from-ofs-gray-50 to-white relative">
      <Container>
        <ScrollReveal direction="up" duration={0.8}>
          <div className="bg-gradient-to-br from-[#051A14] via-[#06382B] to-[#08241C] rounded-2xl border border-emerald-500/35 overflow-hidden shadow-2xl text-white relative">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(16,185,129,0.28)_0%,transparent_70%)] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 relative z-[2]">
              {/* Left Content */}
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-5 flex-wrap">
                    <Badge variant="green">STRATEGIC DIVISION</Badge>
                    <Pill
                      variant="green"
                      className="text-white border-white/20"
                      icon={<Leaf size={14} className="text-emerald-400" />}
                    >
                      Clean Energy &amp; Decarbonization
                    </Pill>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-5 leading-tight">
                    <TextReveal tag="span" duration={0.65}>
                      OFS Renewables:
                    </TextReveal>
                    <br />
                    <span className="gradient-text-green">
                      <TextReveal tag="span" delay={0.2} duration={0.65}>
                        Powering the Energy Transition
                      </TextReveal>
                    </span>
                  </h2>

                  <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-8">
                    {renewablesData.heroDescription}
                  </p>

                  {/* Key Solutions List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {[
                      'Utility & C&I Solar EPC',
                      'Containerized BESS Storage',
                      'Floating Solar (FPV) Arrays',
                      'Robotic O&M & SCADA Systems',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-white">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 items-center flex-wrap">
                  <MagneticButton strength={0.32} radius={80}>
                    <Button href="/renewables" variant="green" size="lg" data-cursor-text="SOLAR">
                      Explore Renewables Portal <ArrowUpRight size={18} />
                    </Button>
                  </MagneticButton>
                  <MagneticButton strength={0.25} radius={70}>
                    <Button
                      href="/renewables#projects"
                      variant="outline-white"
                      size="lg"
                      data-cursor-text="PROJECTS"
                    >
                      View Clean Energy Projects
                    </Button>
                  </MagneticButton>
                </div>
              </div>

              {/* Right: Visual Showcase with Live Metrics */}
              <div className="relative min-h-[380px] lg:border-l border-emerald-500/25">
                <img
                  src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80"
                  alt="Solar Farm Infrastructure"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#051a14]/25 to-[#051a14]/90" />

                {/* Float Box with Metrics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-6 inset-x-6 sm:inset-x-8 bg-[#051a14]/90 backdrop-blur-md border border-emerald-500/40 rounded-md p-6 grid grid-cols-2 gap-5"
                >
                  <div>
                    <div className="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-400 leading-none mb-1.5">
                      450+ MW
                    </div>
                    <div className="text-xs font-mono text-white/80 uppercase font-semibold">
                      Solar &amp; Storage Supported
                    </div>
                  </div>
                  <div>
                    <div className="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-400 leading-none mb-1.5">
                      120K+ Tons
                    </div>
                    <div className="text-xs font-mono text-white/80 uppercase font-semibold">
                      CO2 Mitigated Annually
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </SectionPad>
  );
}
