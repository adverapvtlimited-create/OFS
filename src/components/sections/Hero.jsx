'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Sparkles,
} from 'lucide-react';
import TextRotator from '@/components/animations/TextRotator';
import Counter from '@/components/animations/Counter';
import Badge from '@/components/ui/Badge';
import Pill from '@/components/ui/Pill';
import Button from '@/components/ui/Button';
import SonarDot from '@/components/ui/SonarDot';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import siteConfig from '@/data/site-config.json';

export default function Hero() {
  const containerRef = useRef(null);
  const { smoothPos } = useMouseParallax({ damping: 0.06 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const headlineY = useTransform(smoothProgress, [0, 0.7], [0, -55]);
  const headlineOpacity = useTransform(smoothProgress, [0, 0.65], [1, 0.35]);
  const bgGridY = useTransform(smoothProgress, [0, 1], [0, 80]);
  const imageScale = useTransform(smoothProgress, [0, 0.8], [1, 1.06]);
  const imageY = useTransform(smoothProgress, [0, 1], [0, 45]);
  const cardFloatLeft = useTransform(smoothProgress, [0, 0.7], [0, -35]);
  const cardFloatRight = useTransform(smoothProgress, [0, 0.7], [0, 35]);
  const statsStripY = useTransform(smoothProgress, [0, 0.8], [0, -25]);

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-ofs-navy-50 to-white pt-12 sm:pt-16 lg:pt-[clamp(3rem,6vw,4.5rem)] pb-14 sm:pb-20 lg:pb-[clamp(3.5rem,7vw,5rem)] overflow-hidden"
    >
      {/* Background Architectural Grid Accent with Parallax */}
      <motion.div
        className="bg-grid-pattern absolute inset-0 opacity-70 pointer-events-none"
        style={{
          y: bgGridY,
          x: smoothPos.x * 12,
        }}
      />

      {/* Subtle Radial Mouse Reactive Glow */}
      <motion.div
        className="absolute -top-[10%] left-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle,rgba(14,33,87,0.12)_0%,transparent_70%)] pointer-events-none"
        style={{
          x: `calc(-50% + ${smoothPos.x * 30}px)`,
          y: smoothPos.y * 20,
        }}
      />

      <div className="w-full max-w-container mx-auto px-5 sm:px-8 lg:px-11 relative z-[2]">
        {/* Top Tag Pills & Status Radar with Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-7 flex-wrap"
        >
          <Badge variant="red" withSonar={true}>
            OFS GROUP INDIA
          </Badge>
          <Pill icon={<Sparkles size={14} className="text-ofs-gold-600" />}>
            3,000+ US &amp; European Approved Brands
          </Pill>
          <Pill icon={<ShieldCheck size={14} className="text-ofs-navy-900" />}>
            ISO 9001:2015 Certified
          </Pill>
          <Pill variant="green" icon={<Zap size={14} />}>
            Global Marine, Offshore &amp; Industrial Operations
          </Pill>
        </motion.div>

        {/* Main Headline & Subtitle with Scroll-Linked Upward Motion */}
        <motion.div
          className="grid grid-cols-1 gap-10 items-center mb-14"
          style={{
            y: headlineY,
            opacity: headlineOpacity,
          }}
        >
          <div>
            <h1 className="text-[clamp(2.6rem,5.2vw,4.85rem)] font-heading font-extrabold leading-[1.1] tracking-[-0.03em] text-ofs-navy-950 mb-6">
              Strategic Support for <br />
              <TextRotator
                words={[
                  'Marine & Offshore',
                  'Procurement & Shipping',
                  'Engineering & EPC',
                  'Integrated Facilities',
                  'Spare Parts & MRO',
                ]}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(1.1rem,1.55vw,1.35rem)] text-ofs-gray-600 max-w-[860px] leading-relaxed mb-9"
            >
              {siteConfig.description}
            </motion.p>

            {/* CTA Action Buttons with Magnetic Springs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button href="/services" variant="primary" size="lg" className="!w-auto" data-cursor-text="EXPLORE">
                Explore Capabilities <ArrowUpRight size={18} />
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="!w-auto" data-cursor-text="RFQ">
                Request RFQ
              </Button>
              <Button href="/renewables" variant="green" size="lg" className="!w-auto" data-cursor-text="SOLAR">
                Renewables Portal <Zap size={18} />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero Visual Telemetry Showcase with Scroll-Driven Zoom & Parallax */}
        <motion.div
          className="relative rounded-xl overflow-hidden shadow-2xl border border-ofs-navy-900/12 mb-14"
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="h-[460px] relative bg-[url('/images/live/Banner3.jpg')] bg-center bg-cover bg-no-repeat"
            style={{ scale: imageScale }}
          >
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#060E24]/25 to-[#060E24]/85" />

            {/* Telemetry Floating Chips with Diagonal Scroll Parallax & Mouse Depth */}
            <motion.div
              className="absolute top-6 left-6 flex gap-3 flex-wrap z-[3]"
              style={{ x: cardFloatLeft }}
              animate={{
                x: smoothPos.x * -18,
                y: smoothPos.y * -12,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 25 }}
            >
              <div className="bg-[#060E24]/85 backdrop-blur-md border border-white/20 rounded-full py-1.5 px-4 text-white text-xs font-mono flex items-center gap-2 font-semibold">
                <SonarDot color="green" />
                OPERATIONAL DISPATCH: 24/7 ACTIVE
              </div>

              <div className="bg-[#060E24]/85 backdrop-blur-md border border-white/20 rounded-full py-1.5 px-4 text-white text-xs font-mono flex items-center gap-2 font-semibold">
                <ShieldCheck size={14} className="text-ofs-gold-400" />
                ISO 9001:2015 ASSURED
              </div>
            </motion.div>

            {/* Bottom Overlay Info Banner */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 lg:p-10 flex justify-between items-end flex-wrap gap-6 z-[3]">
              <div className="max-w-[600px]">
                <div className="text-ofs-gold-400 font-mono text-xs font-bold uppercase tracking-[0.05em] mb-1.5">
                  Global Procurement &amp; SCM Cloud
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white m-0 leading-tight">
                  3,000+ Approved International Brands Across US, Europe &amp; Asia
                </h3>
              </div>

              <motion.div className="flex gap-3 items-center" style={{ x: cardFloatRight }}>
                <div className="py-3 px-5 bg-white/10 backdrop-blur-md rounded-xs border border-white/20 text-white text-right">
                  <div className="text-[0.7rem] font-mono text-white/70">
                    GLOBAL SLA
                  </div>
                  <div className="text-lg font-heading font-extrabold text-emerald-400">
                    99.8% On-Time
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Stats Counter Strip with Upward Parallax Transition */}
        <motion.div
          className="bg-ofs-navy-950 rounded-xl p-8 sm:p-10 lg:p-12 border border-white/10 shadow-xl relative overflow-hidden"
          style={{ y: statsStripY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-[2]">
            {siteConfig.stats.map((stat, idx) => (
              <div
                key={idx}
                className={idx !== 0 ? 'lg:border-l lg:border-white/12 lg:pl-6' : ''}
              >
                <div className="font-heading font-black text-ofs-gold-400 leading-tight mb-1 text-2xl sm:text-3xl lg:text-4xl">
                  {stat.numeric !== undefined && stat.numeric !== null ? (
                    <Counter
                      end={stat.numeric}
                      suffix={stat.suffix}
                      decimals={stat.numeric % 1 !== 0 ? 1 : 0}
                    />
                  ) : (
                    <span>{stat.value}</span>
                  )}
                </div>
                <div className="font-mono text-xs text-white/80 uppercase tracking-[0.04em] font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
