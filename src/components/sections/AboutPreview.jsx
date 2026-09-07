'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SectionPad from '@/components/ui/SectionPad';
import Container from '@/components/ui/Container';
import siteConfig from '@/data/site-config.json';

export default function AboutPreview() {
  return (
    <SectionPad className="bg-white relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image Composition with Floating Badge */}
          <ScrollReveal direction="right" duration={0.85}>
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-ofs-gray-200">
                <motion.img
                  src="/images/live/Abourt-Our-Company.jpg"
                  alt="Oriented Facility Solution Pvt Ltd - About Our Company"
                  className="w-full h-[460px] object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#060E24]/10 to-[#060E24]/45" />
              </div>

              {/* Overlapping Floating Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-6 -right-4 bg-ofs-navy-950 text-white p-5 sm:px-6 rounded-md border-2 border-ofs-gold-400 shadow-2xl max-w-[240px]"
              >
                <div className="font-heading text-xl sm:text-2xl font-black text-ofs-gold-400 leading-tight">
                  8+ Years
                </div>
                <div className="font-mono text-[0.72rem] uppercase tracking-[0.05em] mt-1.5 text-white/90 font-bold leading-snug">
                  Global Procurement &amp; Technical Support
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right: Company Story & Differentiators */}
          <div>
            <ScrollReveal direction="up" delay={0.1}>
              <div className="mb-4">
                <Badge variant="red">ABOUT OUR COMPANY</Badge>
              </div>
            </ScrollReveal>

            <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-heading font-extrabold tracking-[-0.03em] mt-4 mb-4 text-ofs-navy-950 leading-[1.15]">
              <TextReveal tag="span" duration={0.6}>
                Driven by Quality.
              </TextReveal>
              <br />
              <span className="gradient-text-navy">
                <TextReveal tag="span" delay={0.2} duration={0.6}>
                  Defined by Trust.
                </TextReveal>
              </span>
            </h2>

            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-[clamp(1.025rem,1.35vw,1.18rem)] text-ofs-gray-600 max-w-[680px] leading-relaxed mb-7">
                {siteConfig.longDesc}
              </p>
            </ScrollReveal>

            {/* Key Differentiator Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <ScrollReveal direction="up" delay={0.25}>
                <div className="p-4.5 bg-ofs-navy-50 rounded-sm border border-ofs-navy-100 h-full">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles size={20} className="text-ofs-gold-600 shrink-0" />
                    <strong className="text-[0.95rem] text-ofs-navy-950">
                      3,000+ Approved Brands
                    </strong>
                  </div>
                  <p className="text-xs text-ofs-gray-600 m-0 leading-relaxed">
                    Internationally approved OEM manufacturers across the US and Europe.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.35}>
                <div className="p-4.5 bg-ofs-navy-50 rounded-sm border border-ofs-navy-100 h-full">
                  <div className="flex items-center gap-2 mb-1.5">
                    <ShieldCheck size={20} className="text-ofs-navy-900 shrink-0" />
                    <strong className="text-[0.95rem] text-ofs-navy-950">
                      ISO 9001:2015 Assured
                    </strong>
                  </div>
                  <p className="text-xs text-ofs-gray-600 m-0 leading-relaxed">
                    Standardized quality management systems and strict QA/QC audit dossiers.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Bullets List with Staggered Slide In */}
            <div className="flex flex-col gap-3.5 mb-9">
              {[
                'Specialized Support: Trading, O&M, Troubleshooting, Procurement & Engineering',
                'Global Presence: USA Global Office (Florida) & India Operations Hub (Mumbai)',
                'End-to-End Multimodal Logistics & Global Supply Chain Execution',
              ].map((bullet, idx) => (
                <ScrollReveal key={idx} direction="left" delay={0.4 + idx * 0.1}>
                  <div className="flex items-center gap-2.5 text-[0.95rem] text-ofs-gray-800">
                    <CheckCircle2 size={18} className="text-ofs-red-600 shrink-0" />
                    <span>{bullet}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="up" delay={0.7}>
              <div className="flex gap-4 items-center flex-wrap">
                <Button href="/about" variant="navy">
                  Read Company Profile <ArrowUpRight size={16} />
                </Button>
                <Button href="/contact" variant="outline">
                  Contact Global Offices
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </SectionPad>
  );
}
