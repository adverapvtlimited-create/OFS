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
  Lock,
  Anchor,
  ExternalLink
} from 'lucide-react';
import siteConfig from '@/data/site-config.json';
import servicesData from '@/data/services.json';
import industriesData from '@/data/industries.json';

const credentialsList = [
  {
    id: 'iso-9001',
    icon: ShieldCheck,
    tag: 'QUALITY MANAGEMENT',
    title: 'ISO 9001:2015 Certified',
    subtitle: 'Quality Management System (QMS)',
    detail: 'Certificate No: 3050260502115Q',
    authority: 'QRO • IAF • EGAC Accredited',
    accentColor: '#f59e0b'
  },
  {
    id: 'iso-14001',
    icon: CheckCircle2,
    tag: 'ENVIRONMENTAL',
    title: 'ISO 14001:2015 Certified',
    subtitle: 'Environmental Management System (EMS)',
    detail: 'Certificate No: 3050260502116E',
    authority: 'QRO • IAF • EGAC Accredited',
    accentColor: '#10b981'
  },
  {
    id: 'iso-45001',
    icon: BadgeCheck,
    tag: 'HEALTH & SAFETY',
    title: 'ISO 45001:2018 Certified',
    subtitle: 'Occupational Health & Safety (OH&S)',
    detail: 'Certificate No: 3050260502117HS',
    authority: 'QRO • IAF • EGAC Accredited',
    accentColor: '#38bdf8'
  },
  {
    id: 'iso-37001',
    icon: Lock,
    tag: 'ANTI-BRIBERY',
    title: 'ISO 37001:2016 Certified',
    subtitle: 'Anti-Bribery Management System (ABMS)',
    detail: 'Certificate No: UK-02-VS-03088',
    authority: 'UKAF CERT (United Kingdom)',
    accentColor: '#a78bfa'
  },
  {
    id: 'impa-membership',
    icon: Anchor,
    tag: 'MARITIME NETWORK',
    title: 'IMPA Certified Member',
    subtitle: 'International Marine Purchasing Association',
    detail: 'Verified Member Directory Profile',
    authority: 'Global Marine & Maritime Supply Chain',
    accentColor: '#60a5fa',
    link: 'https://impa.net/members/oriented-facility-solution-pvt-ltd',
    actionText: 'Verify on IMPA.net ↗'
  },
  {
    id: 'dpiit-startup',
    icon: Award,
    tag: 'GOVT OF INDIA',
    title: 'DPIIT #StartupIndia Recognized',
    subtitle: 'Ministry of Commerce & Industry (Govt of India)',
    detail: 'Certificate No: DIPP253153',
    authority: 'Non-Renewable Energy & Oil Sector',
    accentColor: '#fb923c'
  },
  {
    id: 'mill-test',
    icon: FileCheck,
    tag: 'MILL QUALITY',
    title: 'EN 10204 3.1 Traceability',
    subtitle: '100% Traceable Mill Test Certificates',
    detail: 'Complete Heat No. Audit Trail',
    authority: 'Independent Metallurgical Inspection',
    accentColor: '#34d399'
  },
  {
    id: 'asme-api',
    icon: Sparkles,
    tag: 'ENGINEERING',
    title: 'ASME & API Compliant',
    subtitle: 'Boiler, Pressure Vessel & API 6D/6A',
    detail: 'Strict OEM Sourcing Protocol',
    authority: '3,000+ Approved AVL Network',
    accentColor: '#f87171'
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
        paddingBottom: '3.5rem'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.25rem',
            marginBottom: '2.25rem'
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
                <span>Enterprise Trust &amp; Global Accreditations</span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.3rem, 2.5vw, 1.85rem)',
                fontWeight: 800,
                color: 'var(--ofs-white)',
                margin: 0,
                letterSpacing: '-0.02em'
              }}>
                Official Certifications, Accreditations &amp; Quality Audits
              </h3>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'rgba(255, 255, 255, 0.7)',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
              Active ISO 9001 • ISO 14001 • ISO 45001 • ISO 37001 • IMPA • DPIIT
            </div>
          </div>

          {/* Credentials Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))',
            gap: '1.25rem'
          }}>
            {credentialsList.map((cred, idx) => {
              const IconComp = cred.icon;
              const isClickable = Boolean(cred.link);

              const CardInner = (
                <>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.85rem'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${cred.accentColor}44`,
                      color: cred.accentColor
                    }}>
                      {cred.tag}
                    </span>
                    {isClickable && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: cred.accentColor,
                        fontWeight: 700,
                        background: 'rgba(96, 165, 250, 0.12)',
                        padding: '0.18rem 0.5rem',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid rgba(96, 165, 250, 0.3)'
                      }}>
                        Verify ↗
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div 
                      className="cred-icon-wrap"
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: 'var(--radius-xs)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${cred.accentColor}44`,
                        display: 'grid',
                        placeContent: 'center',
                        color: cred.accentColor,
                        flexShrink: 0,
                        marginTop: '2px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <IconComp size={22} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.98rem',
                        fontWeight: 800,
                        color: 'var(--ofs-white)',
                        marginBottom: '0.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}>
                        <span>{cred.title}</span>
                        {isClickable && (
                          <ArrowUpRight size={14} style={{ color: cred.accentColor, flexShrink: 0 }} />
                        )}
                      </div>
                      <div style={{
                        fontSize: '0.78rem',
                        color: 'rgba(255, 255, 255, 0.75)',
                        lineHeight: 1.35,
                        marginBottom: '0.45rem'
                      }}>
                        {cred.subtitle}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: cred.accentColor,
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        marginBottom: '0.2rem'
                      }}>
                        {cred.detail}
                      </div>
                      <div style={{
                        fontSize: '0.68rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontFamily: 'var(--font-sans)',
                        letterSpacing: '0.01em'
                      }}>
                        {cred.authority}
                      </div>
                    </div>
                  </div>
                </>
              );

              if (isClickable) {
                return (
                  <a
                    key={cred.id || idx}
                    href={cred.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(255, 255, 255, 0.035)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1.25rem 1.35rem',
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(8px)',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                    className="credential-card credential-card-clickable"
                    title={`Click to verify ${cred.title} on official directory`}
                  >
                    {CardInner}
                  </a>
                );
              }

              return (
                <div
                  key={cred.id || idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.035)',
                    border: '1px solid rgba(255, 255, 255, 0.09)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem 1.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.25s ease',
                    backdropFilter: 'blur(8px)',
                    position: 'relative'
                  }}
                  className="credential-card"
                >
                  {CardInner}
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
        .credential-card {
          transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .credential-card:hover {
          background: rgba(255, 255, 255, 0.07) !important;
          border-color: rgba(255, 255, 255, 0.22) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }
        .credential-card-clickable {
          cursor: pointer;
        }
        .credential-card-clickable:hover {
          background: rgba(96, 165, 250, 0.08) !important;
          border-color: rgba(96, 165, 250, 0.45) !important;
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(96, 165, 250, 0.18);
        }
        .credential-card-clickable:hover .cred-icon-wrap {
          background: rgba(96, 165, 250, 0.2) !important;
          border-color: #60a5fa !important;
          transform: scale(1.08) rotate(-4deg);
        }
      `}</style>
    </footer>
  );
}
