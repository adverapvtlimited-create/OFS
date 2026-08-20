'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowUpRight, 
  Linkedin, 
  Facebook, 
  Youtube, 
  Twitter,
  Globe2,
  ChevronRight,
  Sun,
  Award,
  CheckCircle2,
  FileCheck,
  Building,
  BadgeCheck,
  Sparkles,
  Lock
} from 'lucide-react';
import siteConfig from '@/data/site-config.json';
import servicesData from '@/data/services.json';
import industriesData from '@/data/industries.json';

const credentialsList = [
  {
    icon: ShieldCheck,
    title: 'ISO 9001:2015 Certified',
    subtitle: 'Quality Management System (QMS)',
    detail: 'Certificate No. QMS/IND-8842',
    accentColor: 'var(--ofs-gold-400)'
  },
  {
    icon: Award,
    title: 'ASME & API Compliant',
    subtitle: 'Boiler, Pressure Vessel & API 6D/6A',
    detail: 'Strict OEM Sourcing Protocol',
    accentColor: 'var(--ofs-red-400)'
  },
  {
    icon: FileCheck,
    title: 'EN 10204 3.1 Traceability',
    subtitle: '100% Traceable Mill Test Certificates',
    detail: 'Complete Heat No. Audit Trail',
    accentColor: 'var(--ofs-green-400)'
  },
  {
    icon: Sparkles,
    title: '3,000+ OEM Approved Network',
    subtitle: 'US & European Manufacturer Access',
    detail: 'Direct Factory Authorized Channels',
    accentColor: 'var(--ofs-gold-400)'
  },
  {
    icon: Building,
    title: 'D-U-N-S® Registered',
    subtitle: 'Dun & Bradstreet Global Verification',
    detail: 'Verified Corporate Entity',
    accentColor: 'var(--ofs-navy-300)'
  },
  {
    icon: BadgeCheck,
    title: 'HACCP & BOSIET Protocols',
    subtitle: 'Offshore Survival & Food Safety',
    detail: 'Maritime & Remote Site Compliant',
    accentColor: 'var(--ofs-green-400)'
  }
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--ofs-navy-950)',
      color: 'var(--ofs-white)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle Background Pattern */}
      <div className="bg-grid-pattern-dark" style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.5,
        pointerEvents: 'none'
      }} />

      {/* CREDENTIALS & ACCREDITATIONS HEADER SECTION */}
      <div style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(6, 14, 36, 0.65)',
        position: 'relative',
        zIndex: 2,
        paddingTop: '3.5rem',
        paddingBottom: '3rem'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.25rem',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                color: 'var(--ofs-gold-400)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem'
              }}>
                <Lock size={13} />
                <span>Enterprise Trust &amp; Compliance</span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.3rem, 2.5vw, 1.85rem)',
                fontWeight: 800,
                color: 'var(--ofs-white)',
                margin: 0,
                letterSpacing: '-0.02em'
              }}>
                Official Credentials, Accreditations &amp; Quality Audits
              </h3>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'rgba(255, 255, 255, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              Active ISO 9001:2015 &amp; ASME Sourcing License
            </div>
          </div>

          {/* Credentials Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '1.25rem'
          }}>
            {credentialsList.map((cred, idx) => {
              const IconComp = cred.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.035)',
                    border: '1px solid rgba(255, 255, 255, 0.09)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem 1.35rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    transition: 'all 0.25s ease',
                    backdropFilter: 'blur(8px)'
                  }}
                  className="credential-card"
                >
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-xs)',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    display: 'grid',
                    placeContent: 'center',
                    color: cred.accentColor,
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <IconComp size={20} />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      color: 'var(--ofs-white)',
                      marginBottom: '0.2rem'
                    }}>
                      {cred.title}
                    </div>
                    <div style={{
                      fontSize: '0.78rem',
                      color: 'rgba(255, 255, 255, 0.72)',
                      lineHeight: 1.35,
                      marginBottom: '0.35rem'
                    }}>
                      {cred.subtitle}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: cred.accentColor,
                      fontWeight: 700,
                      letterSpacing: '0.03em'
                    }}>
                      {cred.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '4.5rem', paddingBottom: '3.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Column 1: Brand & Identity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Link href="/" style={{ display: 'inline-block', textDecoration: 'none' }}>
              <div style={{
                background: 'var(--ofs-white)',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-xs)',
                display: 'inline-flex',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
              }}>
                <img 
                  src="/images/ofs-logo.png" 
                  alt="OFS - Driven by Quality, Defined by Trust"
                  style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
                />
              </div>
            </Link>

            <p style={{
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.72)',
              lineHeight: 1.6
            }}>
              {siteConfig.longDesc}
            </p>

            {/* Corporate Registration Strip */}
            <div style={{
              padding: '0.75rem 1rem',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.5
            }}>
              <div><strong style={{ color: '#fff' }}>India Entity:</strong> {siteConfig.legalName}</div>
              <div style={{ marginTop: '0.2rem' }}><strong style={{ color: '#fff' }}>USA Entity:</strong> {siteConfig.usEntityName}</div>
            </div>

            {/* Social Media Links */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
              <a 
                href={siteConfig.socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href={siteConfig.socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href={siteConfig.socials.youtube} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
              <a 
                href={siteConfig.socials.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Solutions & Services */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--ofs-gold-400)',
              marginBottom: '1.25rem'
            }}>
              Core Capabilities
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {servicesData.map((svc) => (
                <li key={svc.id}>
                  <Link 
                    href={`/services/${svc.slug}`}
                    className="footer-link"
                  >
                    <ChevronRight size={13} style={{ color: 'var(--ofs-red-500)' }} />
                    {svc.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industries & Strategic Divisions */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--ofs-gold-400)',
              marginBottom: '1.25rem'
            }}>
              Industries Served
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {industriesData.slice(0, 5).map((ind) => (
                <li key={ind.id}>
                  <Link href={`/industries/${ind.slug}`} className="footer-link">
                    <ChevronRight size={13} style={{ color: 'var(--ofs-red-500)' }} />
                    {ind.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/industries" className="footer-link" style={{ fontWeight: 700 }}>
                  <ChevronRight size={13} style={{ color: 'var(--ofs-red-500)' }} />
                  View All Industries
                </Link>
              </li>
            </ul>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--ofs-gold-400)',
              marginBottom: '1.25rem'
            }}>
              Strategic Divisions
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <Link 
                  href="/renewables"
                  className="footer-link"
                  style={{
                    color: 'var(--ofs-green-400)',
                    fontWeight: 600
                  }}
                >
                  <Sun size={14} style={{ color: 'var(--ofs-green-400)' }} />
                  OFS Renewables Portal
                  <span style={{
                    fontSize: '0.65rem',
                    background: 'rgba(16, 185, 129, 0.2)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--ofs-green-300)'
                  }}>Active</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  <ChevronRight size={13} style={{ color: 'var(--ofs-red-500)' }} />
                  About OFS Group
                </Link>
              </li>
              <li>
                <a href="#case-studies" className="footer-link">
                  <ChevronRight size={13} style={{ color: 'var(--ofs-red-500)' }} />
                  Execution Case Studies
                </a>
              </li>
              <li>
                <Link href="/blog" className="footer-link">
                  <ChevronRight size={13} style={{ color: 'var(--ofs-red-500)' }} />
                  Industry Insights &amp; Articles
                </Link>
              </li>
              <li>
                <Link href="/careers" className="footer-link">
                  <ChevronRight size={13} style={{ color: 'var(--ofs-red-500)' }} />
                  Careers &amp; Culture
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  <ChevronRight size={13} style={{ color: 'var(--ofs-red-500)' }} />
                  Request RFQ / Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--ofs-gold-400)'
            }}>
              Corporate Offices
            </div>

            {/* India HQ */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin size={18} style={{ color: 'var(--ofs-red-500)', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5 }}>
                <strong style={{ color: '#fff', display: 'block' }}>India Headquarters:</strong>
                {siteConfig.contact.addressIndia.line1}, {siteConfig.contact.addressIndia.line2}, {siteConfig.contact.addressIndia.city}, {siteConfig.contact.addressIndia.state} – {siteConfig.contact.addressIndia.pincode}
              </div>
            </div>

            {/* USA Liaison Office */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Globe2 size={18} style={{ color: 'var(--ofs-navy-400)', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5 }}>
                <strong style={{ color: '#fff', display: 'block' }}>USA Global Office:</strong>
                {siteConfig.contact.addressUSA.line1}, {siteConfig.contact.addressUSA.city}, {siteConfig.contact.addressUSA.state}, {siteConfig.contact.addressUSA.pincode}, USA
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              <a 
                href={`tel:${siteConfig.contact.phoneRaw}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)'
                }}
                className="hover-opacity"
              >
                <Phone size={14} style={{ color: 'var(--ofs-red-500)' }} />
                {siteConfig.contact.phone}
              </a>
              <a 
                href={`mailto:${siteConfig.contact.email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)'
                }}
                className="hover-opacity"
              >
                <Mail size={14} style={{ color: 'var(--ofs-red-500)' }} />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'rgba(255, 255, 255, 0.5)'
        }}>
          <div>
            © {new Date().getFullYear()} {siteConfig.legalName} All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/privacy" className="hover-white">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover-white">Terms of Engagement</Link>
            <span>•</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover-white">Sitemap</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .credential-card:hover {
          background: rgba(255, 255, 255, 0.07) !important;
          border-color: rgba(255, 255, 255, 0.22) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}
