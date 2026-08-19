'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Globe2, 
  Clock, 
  Cpu, 
  CheckCircle, 
  Award, 
  ArrowUpRight,
  HardHat,
  Anchor,
  Zap,
  Sparkles,
  Users
} from 'lucide-react';

const pillars = [
  {
    icon: Sparkles,
    title: "3,000+ Global Approved Brands",
    desc: "Direct access to over 3,000+ internationally approved manufacturers across the US and Europe ensuring genuine OEM components."
  },
  {
    icon: ShieldCheck,
    title: "Integrity & Quality Assurance",
    desc: "Uncompromising ethical standards and ISO 9001:2015 certified quality systems with 100% traceable mill test certificates."
  },
  {
    icon: Clock,
    title: "15+ Years Proven Experience",
    desc: "Over a decade and a half of specialized procurement, MRO sourcing, and technical support across high-stakes industrial sectors."
  },
  {
    icon: Users,
    title: "Collaborative Partnerships",
    desc: "We work as an integrated extension of your engineering and procurement teams to optimize budgets and eliminate delays."
  },
  {
    icon: Cpu,
    title: "Cloud-Powered SCM Solutions",
    desc: "Custom-built supply chain management software powered by Microsoft technologies for real-time tracking and transparency."
  },
  {
    icon: Globe2,
    title: "Global Footprint (India & USA)",
    desc: "Mumbai India Corporate Headquarters and Florida USA liaison office coordinating international AVL procurement and shipping."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="section-pad" style={{
      background: 'var(--ofs-navy-950)',
      color: 'var(--ofs-white)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Grid Pattern */}
      <div className="bg-grid-pattern-dark" style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.5,
        pointerEvents: 'none'
      }} />

      {/* Radial Red Glow Accent */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(224, 42, 48, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '750px', marginBottom: '3.5rem' }}>
          <div className="tag-badge badge-red" style={{ marginBottom: '1rem' }}>
            WHY CHOOSE US
          </div>
          <h2 className="section-title" style={{ color: 'var(--ofs-white)' }}>
            Empowering Industries to Operate <br />
            <span className="gradient-text-red">Smarter, Faster & Stronger</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
            Our core strength lies in combining deep technical expertise with strategic sourcing capabilities, offering end-to-end customized solutions that are both cost-efficient and operationally impactful.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: '2rem',
          marginBottom: '3.5rem'
        }}>
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2.25rem 2rem',
                  transition: 'all 0.3s ease'
                }}
                className="pillar-card"
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'rgba(224, 42, 48, 0.16)',
                  border: '1px solid rgba(224, 42, 48, 0.35)',
                  display: 'grid',
                  placeContent: 'center',
                  color: 'var(--ofs-red-400)',
                  marginBottom: '1.5rem'
                }}>
                  <Icon size={24} />
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--ofs-white)',
                  marginBottom: '0.75rem',
                  lineHeight: 1.25
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: '0.925rem',
                  color: 'rgba(255, 255, 255, 0.72)',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Mobilization Callout Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(224, 42, 48, 0.18) 0%, rgba(12, 30, 78, 0.7) 100%)',
          border: '1px solid rgba(224, 42, 48, 0.35)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.25rem 2.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '0.35rem' }}>
              Ready to streamline your procurement or industrial operations?
            </div>
            <div style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.85)' }}>
              Our 24/7 technical desk is standing by to evaluate your spare parts, engineering, or logistics requirements.
            </div>
          </div>

          <Link href="/contact" className="btn btn-primary">
            Request Consultation <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
