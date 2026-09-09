'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  ArrowUpRight,
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SectionPad from '@/components/ui/SectionPad';
import Container from '@/components/ui/Container';
import siteConfig from '@/data/site-config.json';

const values = [
  {
    image: '/images/live/Integrity.jpg',
    title: 'Integrity',
    desc: 'We uphold the highest ethical standards in every aspect of our business. Integrity means being transparent, and honest, in our interactions, ensuring trust and long-lasting relationships with our clients, partners, and employees.',
  },
  {
    image: '/images/live/Excellence-1.jpg',
    title: 'Excellence',
    desc: 'We are committed to delivering the highest quality in every project we undertake. Our pursuit of excellence drives us to continuously improve, innovate, and exceed expectations, ensuring superior service and value for our clients.',
  },
  {
    image: '/images/live/Collaboration-1.jpg',
    title: 'Collaboration',
    desc: 'We believe in the power of teamwork—both within our company and with our clients and partners. By fostering a collaborative environment, we combine diverse skills, ideas, and perspectives to drive the best possible outcomes for all stakeholders.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-ofs-navy-950 via-[#081330] to-ofs-navy-900 text-white py-14 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

        <Container className="relative z-[2]">
          <ScrollReveal direction="down" duration={0.5}>
            <div className="flex items-center gap-2 font-mono text-xs text-white/60 mb-6 uppercase">
              <Link href="/" className="text-white/70 hover:text-white no-underline">
                Home
              </Link>
              <span>/</span>
              <span className="text-ofs-red-400">Company Profile</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-5">
              <Badge variant="red">ABOUT OUR COMPANY</Badge>
            </div>
          </ScrollReveal>

          <h1 className="text-[clamp(2.5rem,5vw,4.25rem)] font-heading font-extrabold leading-[1.1] text-white mb-6 max-w-[920px]">
            <TextReveal tag="span" duration={0.65}>
              Driven by Quality.
            </TextReveal>
            <br />
            <span className="gradient-text-red">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                Defined by Trust.
              </TextReveal>
            </span>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-lg text-white/85 max-w-[780px] leading-relaxed mb-8">
              {siteConfig.longDesc}
            </p>
          </ScrollReveal>

          {/* Executive Pillars Strip */}
          <ScrollReveal direction="up" delay={0.35}>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-white/90">
              <span className="py-1.5 px-3 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                🏛️ Founded on ISO 9001 Certified Governance
              </span>
              <span className="py-1.5 px-3 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                ⚓ IMPA Verified Maritime Supplier
              </span>
              <span className="py-1.5 px-3 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                🌐 Mumbai HQ &amp; USA Liaison Presence
              </span>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <SectionPad id="mission-vision" className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="bg-ofs-navy-50 border border-ofs-navy-100 rounded-lg overflow-hidden shadow-md flex flex-col h-full">
                <div className="h-[160px] relative overflow-hidden">
                  <motion.img
                    src="/images/live/Mission-5.jpg"
                    alt="Our Mission"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#060E24]/20 to-[#060E24]/70" />
                  <div className="absolute bottom-4 left-5 text-white flex items-center gap-2.5">
                    <div className="w-[34px] h-[34px] rounded-xs bg-ofs-red-600 grid place-content-center">
                      <Target size={18} />
                    </div>
                    <h2 className="font-heading text-xl font-extrabold m-0 text-white">
                      Our Mission
                    </h2>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-sm sm:text-[0.925rem] text-ofs-gray-700 leading-relaxed m-0">
                    To provide world-class, customized solutions in Marine &amp; Offshore Services, Strategic Sourcing &amp; Engineering Procurement, Maintenance, and Industrial Logistics. We aim to empower clients globally by integrating cutting-edge technology, efficient systems, and expert manpower — while ensuring top-tier operational reliability and safety that elevate performance.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-ofs-navy-50 border border-ofs-navy-100 rounded-lg overflow-hidden shadow-md flex flex-col h-full">
                <div className="h-[160px] relative overflow-hidden">
                  <motion.img
                    src="/images/live/Visioin-2.jpg"
                    alt="Our Vision"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#060E24]/20 to-[#060E24]/70" />
                  <div className="absolute bottom-4 left-5 text-white flex items-center gap-2.5">
                    <div className="w-[34px] h-[34px] rounded-xs bg-ofs-navy-900 grid place-content-center">
                      <Eye size={18} className="text-ofs-gold-400" />
                    </div>
                    <h2 className="font-heading text-xl font-extrabold m-0 text-white">
                      Our Vision
                    </h2>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-sm sm:text-[0.925rem] text-ofs-gray-700 leading-relaxed m-0">
                    To be a globally recognized leader in delivering end-to-end engineering, procurement, facility, and project support solutions — driven by innovation, reliability, and a strong commitment to customer satisfaction and operational excellence across India, the Middle East, North America, and premier international energy hubs.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Core Values Section */}
          <div className="text-center max-w-[720px] mx-auto mb-12">
            <ScrollReveal direction="up">
              <div className="mb-3.5">
                <Badge variant="red">OUR FOUNDATION</Badge>
              </div>
            </ScrollReveal>
            <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-heading font-extrabold tracking-[-0.03em] mt-4 mb-4 text-ofs-navy-950 leading-[1.15]">
              <TextReveal tag="span" duration={0.65}>
                Our Core Values:
              </TextReveal>
              <br />
              <span className="gradient-text-navy">
                <TextReveal tag="span" delay={0.2} duration={0.65}>
                  Integrity, Excellence &amp; Collaboration
                </TextReveal>
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.12}>
                <div className="p-0 overflow-hidden h-full bg-white border border-ofs-gray-200 rounded-md shadow-sm transition-all duration-250 hover:border-ofs-navy-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="h-[150px] relative overflow-hidden">
                    <motion.img
                      src={v.image}
                      alt={v.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#060E24]/10 to-[#060E24]/60" />
                    <div className="absolute bottom-3.5 left-5 text-white font-heading text-lg font-extrabold">
                      {v.title}
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs sm:text-[0.875rem] text-ofs-gray-600 leading-relaxed m-0">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </SectionPad>

      {/* Global Brand Assurance Banner */}
      <SectionPad className="bg-ofs-navy-950 text-white relative">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-40 pointer-events-none" />
        <Container className="relative z-[2] text-center max-w-[840px]">
          <ScrollReveal direction="up">
            <div className="mb-5">
              <Badge variant="red">GLOBAL BRAND ASSURANCE</Badge>
            </div>
          </ScrollReveal>
          <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-heading font-extrabold tracking-[-0.03em] text-white mb-4 leading-[1.15]">
            <TextReveal tag="span" duration={0.65}>
              Over 3,000+ Internationally Approved Brands
            </TextReveal>
            <br />
            <span className="gradient-text-red">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                From the US &amp; Europe
              </TextReveal>
            </span>
          </h2>
          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-lg text-white/85 leading-relaxed mb-10">
              With a network of over 3,000+ internationally approved brands from the US and Europe, OFS ensures exceptional quality, reliability, and compliance with global industry standards in every solution we deliver.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.35}>
            <div className="inline-flex gap-4 flex-wrap justify-center">
              <Button href="/engineering-epc-support-services" variant="primary" size="lg">
                Explore What We Offer <ArrowUpRight size={18} />
              </Button>
              <Button href="/contact" variant="outline-white" size="lg">
                Contact Commercial Desk
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </SectionPad>

      {/* Global Footprint Section */}
      <SectionPad className="bg-white">
        <Container>
          <div className="text-center max-w-[720px] mx-auto mb-14">
            <ScrollReveal direction="up">
              <div className="mb-4">
                <Badge variant="red">GLOBAL FOOTPRINT</Badge>
              </div>
            </ScrollReveal>
            <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-heading font-extrabold tracking-[-0.03em] mt-4 mb-4 text-ofs-navy-950 leading-[1.15]">
              <TextReveal tag="span" duration={0.65}>
                USA Global Office &amp;
              </TextReveal>
              <br />
              <span className="gradient-text-navy">
                <TextReveal tag="span" delay={0.2} duration={0.65}>
                  India Operations Hub
                </TextReveal>
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <ScrollReveal direction="left" delay={0.1}>
              <div className="bg-ofs-navy-50 border border-ofs-navy-100 rounded-lg p-6 sm:p-7 shadow-md h-full">
                <div className="mb-4">
                  <Badge variant="navy">USA ENTITY</Badge>
                </div>
                <h3 className="font-heading text-xl font-extrabold text-ofs-navy-950 mb-2.5">
                  Oriented Facility Solution LLC
                </h3>
                <p className="text-xs sm:text-sm text-ofs-gray-600 leading-relaxed mb-5">
                  {siteConfig.contact.addressUSA.line1}, {siteConfig.contact.addressUSA.city},{' '}
                  {siteConfig.contact.addressUSA.state}, {siteConfig.contact.addressUSA.pincode},{' '}
                  {siteConfig.contact.addressUSA.country}
                </p>
                <div className="font-mono text-xs sm:text-sm text-ofs-navy-900">
                  Global Sourcing Coordination &amp; International AVL Desk
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-ofs-navy-50 border border-ofs-navy-100 rounded-lg p-6 sm:p-7 shadow-md h-full">
                <div className="mb-4">
                  <Badge variant="red">INDIA OPERATIONS HUB</Badge>
                </div>
                <h3 className="font-heading text-xl font-extrabold text-ofs-navy-950 mb-2.5">
                  Oriented Facility Solution Pvt Ltd
                </h3>
                <p className="text-xs sm:text-sm text-ofs-gray-600 leading-relaxed mb-5">
                  {siteConfig.contact.addressIndia.line1}, {siteConfig.contact.addressIndia.line2},{' '}
                  {siteConfig.contact.addressIndia.city}, {siteConfig.contact.addressIndia.state} –{' '}
                  {siteConfig.contact.addressIndia.pincode}, {siteConfig.contact.addressIndia.country}
                </p>
                <div className="font-mono text-xs sm:text-sm text-ofs-navy-900 flex flex-col gap-1.5">
                  <div>
                    <strong>Phone:</strong> {siteConfig.contact.phone}
                  </div>
                  <div>
                    <strong>Email:</strong> {siteConfig.contact.email}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </SectionPad>
    </>
  );
}
