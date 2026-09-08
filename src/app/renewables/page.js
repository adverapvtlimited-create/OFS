'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sun, 
  BatteryCharging, 
  Leaf, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Cpu, 
  TrendingUp,
  MapPin,
  Flame
} from 'lucide-react';
import Counter from '@/components/animations/Counter';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import renewablesData from '@/data/renewables.json';

export default function RenewablesPortalPage() {
  return (
    <>
      {/* Renewables Hero Banner */}
      <section className="bg-gradient-to-br from-[#031711] via-[#06382B] to-[#06241C] text-white pt-[5.5rem] pb-24 relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-45 pointer-events-none" />

        {/* Ambient Emerald Glow */}
        <div className="absolute -top-[10%] right-[5%] w-[600px] height-[600px] bg-[radial-gradient(circle,rgba(16,185,129,0.22)_0%,transparent_70%)] pointer-events-none" />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <ScrollReveal direction="down" duration={0.5}>
            <div className="flex items-center gap-2 font-mono text-xs text-white/60 mb-6 uppercase">
              <Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-ofs-green-400">Renewables Portal</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <div className="tag-badge badge-green">
                STRATEGIC CLEAN ENERGY DIVISION
              </div>
              <div className="tag-pill pill-dark">
                <Leaf size={14} className="text-ofs-green-400" />
                Decarbonization Infrastructure
              </div>
            </div>
          </ScrollReveal>

          <h1 className="font-heading text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold leading-[1.1] text-white mb-6 max-w-[920px]">
            <TextReveal tag="span" duration={0.65}>
              Pioneering High-Yield Solar,
            </TextReveal>
            <br />
            <span className="gradient-text-green">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                Storage &amp; Hybrid Grid Systems
              </TextReveal>
            </span>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-[1.2rem] text-white/90 max-w-[800px] leading-relaxed mb-10">
              {renewablesData.heroDescription}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.35}>
            <div className="flex gap-4 items-center flex-wrap">
              <a href="#solutions" className="btn btn-green btn-lg inline-flex items-center gap-2">
                Explore Clean Energy Solutions <ArrowUpRight size={18} />
              </a>
              <a href="#projects" className="btn btn-outline-white btn-lg inline-flex items-center gap-2">
                View Commissioned Projects
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Renewables Metrics Bar */}
      <section className="bg-ofs-navy-950 border-b border-white/10 py-11">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {renewablesData.metrics.map((m, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.08}>
                <div className="text-center">
                  <div className="font-heading text-[clamp(2.25rem,3.8vw,3.25rem)] font-black text-ofs-green-400 leading-none mb-2">
                    <Counter end={m.numeric} suffix={m.suffix} decimals={m.suffix.includes('%') && m.numeric % 1 !== 0 ? 1 : 0} />
                  </div>
                  <div className="font-mono text-[0.8rem] text-white/75 uppercase tracking-wider font-semibold">
                    {m.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Energy Solutions Grid */}
      <section className="section-pad bg-white" id="solutions">
        <div className="container">
          <div className="text-center max-w-[750px] mx-auto mb-16">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase px-3 py-1 rounded bg-ofs-green-50 text-ofs-green-700 border border-ofs-green-200 mb-4">
                CORE SOLAR &amp; STORAGE SOLUTIONS
              </div>
            </ScrollReveal>
            <h2 className="section-title">
              <TextReveal tag="span" duration={0.65}>
                Turnkey Clean Energy Capabilities
              </TextReveal>
              <br />
              <span className="gradient-text-green">
                <TextReveal tag="span" delay={0.2} duration={0.65}>
                  Engineered for Maximum Performance
                </TextReveal>
              </span>
            </h2>
            <ScrollReveal direction="up" delay={0.25}>
              <p className="section-desc mx-auto">
                From multi-hundred-megawatt solar farms to captive C&amp;I microgrids and autonomous waterless robotic cleaning systems.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {renewablesData.solutions.map((sol, idx) => (
              <ScrollReveal key={sol.id} direction="up" delay={idx * 0.1}>
                <div className="card-modern p-0 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  <div>
                    <div className="h-[175px] relative overflow-hidden">
                      <motion.img 
                        src={sol.image} 
                        alt={sol.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#031711]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-heading text-base sm:text-lg font-bold text-white leading-snug">
                          {sol.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 pb-4">
                      <p className="text-xs sm:text-[0.875rem] text-ofs-gray-600 leading-relaxed mb-4">
                        {sol.shortDesc}
                      </p>

                      <div className="flex flex-col gap-2">
                        {sol.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-1.5 text-[0.78rem] text-ofs-gray-800">
                            <CheckCircle2 size={14} className="text-ofs-green-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="py-3 px-5 border-t border-ofs-gray-200 bg-ofs-gray-50/75">
                    <Link
                      href="/contact"
                      className="font-mono text-xs font-bold text-ofs-green-700 flex items-center gap-1 hover:text-ofs-green-800 transition-colors no-underline"
                    >
                      Request Feasibility Study <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="section-pad bg-ofs-gray-50" id="projects">
        <div className="container">
          <div className="max-w-[720px] mb-12">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase px-3 py-1 rounded bg-ofs-green-50 text-ofs-green-700 border border-ofs-green-200 mb-4">
                PROJECT PORTFOLIO
              </div>
            </ScrollReveal>
            <h2 className="section-title">
              <TextReveal tag="span" duration={0.65}>
                Proven Utility &amp;
              </TextReveal>
              <br />
              <span className="gradient-text-green">
                <TextReveal tag="span" delay={0.2} duration={0.65}>
                  Commercial Installations
                </TextReveal>
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {renewablesData.projects.map((proj, idx) => (
              <ScrollReveal key={proj.id} direction="up" delay={idx * 0.1}>
                <div className="card-modern p-0 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  <div className="h-[175px] relative overflow-hidden">
                    <motion.img 
                      src={proj.image} 
                      alt={proj.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute top-3 right-3 bg-[#06382B]/90 text-ofs-green-300 py-1 px-2.5 rounded-full text-[0.68rem] font-mono font-bold backdrop-blur-sm">
                      {proj.type}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-ofs-gray-500 text-xs font-mono mb-1.5">
                        <MapPin size={12} className="text-ofs-red-600 shrink-0" />
                        {proj.location}
                      </div>

                      <h3 className="font-heading text-base sm:text-lg font-bold text-ofs-navy-950 mb-2.5">
                        {proj.title}
                      </h3>

                      <div className="bg-ofs-green-50/70 border border-ofs-green-100 rounded p-3 mb-4">
                        <div className="text-[0.68rem] font-mono text-ofs-green-700 font-bold uppercase mb-0.5">
                          Technical Specifications:
                        </div>
                        <div className="text-xs text-ofs-gray-800 font-semibold">
                          {proj.specs}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-ofs-green-700 font-bold flex items-center gap-1.5">
                      <Leaf size={14} className="shrink-0" />
                      <span>{proj.impact}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
