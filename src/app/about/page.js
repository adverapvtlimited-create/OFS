'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  HeartHandshake, 
  Award, 
  CheckCircle2, 
  ArrowUpRight, 
  Globe2, 
  Building,
  Users,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ContactCTA from '@/components/sections/ContactCTA';
import siteConfig from '@/data/site-config.json';

const values = [
  {
    image: "/images/live/Integrity.jpg",
    title: "Integrity",
    desc: "We uphold the highest ethical standards in every aspect of our business. Integrity means being transparent, and honest, in our interactions, ensuring trust and long-lasting relationships with our clients, partners, and employees."
  },
  {
    image: "/images/live/Excellence-1.jpg",
    title: "Excellence",
    desc: "We are committed to delivering the highest quality in every project we undertake. Our pursuit of excellence drives us to continuously improve, innovate, and exceed expectations, ensuring superior service and value for our clients."
  },
  {
    image: "/images/live/Collaboration-1.jpg",
    title: "Collaboration",
    desc: "We believe in the power of teamwork—both within our company and with our clients and partners. By fostering a collaborative environment, we combine diverse skills, ideas, and perspectives to drive the best possible outcomes for all stakeholders."
  }
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero Banner with Scroll Entrance */}
      <section style={{
        background: 'linear-gradient(135deg, var(--ofs-navy-950) 0%, var(--ofs-navy-900) 100%)',
        color: 'var(--ofs-white)',
        paddingTop: '5.5rem',
        paddingBottom: '5.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="bg-grid-pattern-dark" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb */}
          <ScrollReveal direction="down" duration={0.5}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}>
              <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--ofs-red-400)' }}>Company Profile</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="tag-badge badge-red" style={{ marginBottom: '1.25rem' }}>
              ABOUT OUR COMPANY
            </div>
          </ScrollReveal>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--ofs-white)',
            marginBottom: '1.5rem',
            maxWidth: '920px'
          }}>
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
            <p style={{
              fontSize: '1.18rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '780px',
              lineHeight: 1.6
            }}>
              {siteConfig.longDesc}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision Bento */}
      <section className="section-pad" style={{ background: 'var(--ofs-white)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2.5rem',
            marginBottom: '5rem'
          }}>
            {/* Mission Card with Live Image Accent */}
            <ScrollReveal direction="up" delay={0.1}>
              <div style={{
                background: 'var(--ofs-navy-50)',
                border: '1px solid var(--ofs-navy-100)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <motion.img 
                    src="/images/live/Mission-5.jpg" 
                    alt="Our Mission" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.2) 0%, rgba(6, 14, 36, 0.7) 100%)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.5rem',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem'
                  }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-xs)',
                      background: 'var(--ofs-red-600)',
                      display: 'grid',
                      placeContent: 'center'
                    }}>
                      <Target size={20} />
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                      Our Mission
                    </h2>
                  </div>
                </div>

                <div style={{ padding: '2.25rem' }}>
                  <p style={{ fontSize: '1.025rem', color: 'var(--ofs-gray-700)', lineHeight: 1.7, margin: 0 }}>
                    To provide world-class, customized solutions in Marine &amp; Offshore Services, Engineering Procurement, Maintenance, AMC, and Facility Management. We aim to empower clients globally by integrating cutting-edge technology, efficient systems, and expert manpower — while ensuring top-tier Catering and Hospitality solutions that elevate workforce well-being and performance.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Vision Card with Live Image Accent */}
            <ScrollReveal direction="up" delay={0.2}>
              <div style={{
                background: 'var(--ofs-navy-50)',
                border: '1px solid var(--ofs-navy-100)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <motion.img 
                    src="/images/live/Visioin-2.jpg" 
                    alt="Our Vision" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.2) 0%, rgba(6, 14, 36, 0.7) 100%)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.5rem',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem'
                  }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-xs)',
                      background: 'var(--ofs-navy-900)',
                      display: 'grid',
                      placeContent: 'center'
                    }}>
                      <Eye size={20} style={{ color: 'var(--ofs-gold-400)' }} />
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                      Our Vision
                    </h2>
                  </div>
                </div>

                <div style={{ padding: '2.25rem' }}>
                  <p style={{ fontSize: '1.025rem', color: 'var(--ofs-gray-700)', lineHeight: 1.7, margin: 0 }}>
                    To be a globally recognized leader in delivering end-to-end engineering, procurement, facility, and project support solutions — driven by innovation, reliability, and a strong commitment to customer satisfaction and operational excellence across India, the Middle East, North America, and premier international energy hubs.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Core Values Section with Live Images */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
            <ScrollReveal direction="up">
              <div className="tag-badge badge-red" style={{ marginBottom: '0.85rem' }}>
                OUR FOUNDATION
              </div>
            </ScrollReveal>
            <h2 className="section-title">
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

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '2rem'
          }}>
            {values.map((v, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.12}>
                <div className="card-modern" style={{ padding: 0, overflow: 'hidden', height: '100%' }}>
                  <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                    <motion.img 
                      src={v.image} 
                      alt={v.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.1) 0%, rgba(6, 14, 36, 0.6) 100%)'
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '1.5rem',
                      color: '#fff',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      fontWeight: 800
                    }}>
                      {v.title}
                    </div>
                  </div>

                  <div style={{ padding: '1.75rem' }}>
                    <p style={{ fontSize: '0.925rem', color: 'var(--ofs-gray-600)', lineHeight: 1.65, margin: 0 }}>
                      {v.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Global Brand Network Highlight */}
      <section className="section-pad" style={{ background: 'var(--ofs-navy-950)', color: '#fff', position: 'relative' }}>
        <div className="bg-grid-pattern-dark" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '840px' }}>
          <ScrollReveal direction="up">
            <div className="tag-badge badge-red" style={{ marginBottom: '1.25rem' }}>
              GLOBAL BRAND ASSURANCE
            </div>
          </ScrollReveal>
          <h2 className="section-title" style={{ color: '#fff' }}>
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
            <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              With a network of over 3,000+ internationally approved brands from the US and Europe, OFS ensures exceptional quality, reliability, and compliance with global industry standards in every solution we deliver.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.35}>
            <div style={{ display: 'inline-flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/services" className="btn btn-primary btn-lg">
                Explore Our Services <ArrowUpRight size={18} />
              </Link>
              <Link href="/contact" className="btn btn-outline-white btn-lg">
                Contact Commercial Desk
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Global Leadership & Offices Grid */}
      <section className="section-pad" style={{ background: 'var(--ofs-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
            <ScrollReveal direction="up">
              <div className="tag-badge badge-red" style={{ marginBottom: '1rem' }}>
                GLOBAL FOOTPRINT
              </div>
            </ScrollReveal>
            <h2 className="section-title">
              <TextReveal tag="span" duration={0.65}>
                India Headquarters &amp;
              </TextReveal>
              <br />
              <span className="gradient-text-navy">
                <TextReveal tag="span" delay={0.2} duration={0.65}>
                  USA International Liaison
                </TextReveal>
              </span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2.5rem'
          }}>
            {/* India HQ */}
            <ScrollReveal direction="left" delay={0.1}>
              <div style={{
                background: 'var(--ofs-navy-50)',
                border: '1px solid var(--ofs-navy-100)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.75rem 2.5rem',
                boxShadow: 'var(--shadow-md)',
                height: '100%'
              }}>
                <div className="tag-badge badge-red" style={{ marginBottom: '1.25rem' }}>
                  INDIA HEADQUARTERS
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.75rem' }}>
                  Oriented Facility Solution Pvt Ltd
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--ofs-gray-600)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {siteConfig.contact.addressIndia.line1}, {siteConfig.contact.addressIndia.line2}, {siteConfig.contact.addressIndia.city}, {siteConfig.contact.addressIndia.state} – {siteConfig.contact.addressIndia.pincode}, {siteConfig.contact.addressIndia.country}
                </p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--ofs-navy-900)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div><strong>Phone:</strong> {siteConfig.contact.phone}</div>
                  <div><strong>Email:</strong> {siteConfig.contact.email}</div>
                </div>
              </div>
            </ScrollReveal>

            {/* US Office */}
            <ScrollReveal direction="right" delay={0.2}>
              <div style={{
                background: 'var(--ofs-navy-50)',
                border: '1px solid var(--ofs-navy-100)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.75rem 2.5rem',
                boxShadow: 'var(--shadow-md)',
                height: '100%'
              }}>
                <div className="tag-badge" style={{ marginBottom: '1.25rem', background: 'var(--ofs-navy-900)' }}>
                  USA ENTITY
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.75rem' }}>
                  Oriented Facility Solution LLC
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--ofs-gray-600)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {siteConfig.contact.addressUSA.line1}, {siteConfig.contact.addressUSA.city}, {siteConfig.contact.addressUSA.state}, {siteConfig.contact.addressUSA.pincode}, {siteConfig.contact.addressUSA.country}
                </p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--ofs-navy-900)' }}>
                  Global Sourcing Coordination &amp; International AVL Desk
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </>
  );
}
