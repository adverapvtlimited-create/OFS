'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Package,
  Wrench,
  Anchor,
  Building2,
  Settings,
  Flame,
  Ship,
  Sun,
  Globe2,
  Zap,
  CheckCircle2,
  BadgeCheck,
  Lock,
  Award,
  ExternalLink
} from 'lucide-react';
import siteConfig from '@/data/site-config.json';
import servicesData from '@/data/services.json';
import MagneticButton from '@/components/animations/MagneticButton';

const iconMap = {
  Package: Package,
  Wrench: Wrench,
  ShieldCheck: ShieldCheck,
  Anchor: Anchor,
  Building2: Building2,
  Settings: Settings,
  Flame: Flame,
  Ship: Ship,
  Sun: Sun
};

const topBarCertifications = [
  {
    id: 'iso9001',
    code: 'ISO 9001:2015',
    tag: 'QMS QUALITY',
    title: 'Quality Management System',
    detail: 'Cert: 3050260502115Q',
    color: '#f59e0b',
    icon: ShieldCheck
  },
  {
    id: 'iso14001',
    code: 'ISO 14001:2015',
    tag: 'EMS ENVIRONMENT',
    title: 'Environmental Management',
    detail: 'Cert: 3050260502116E',
    color: '#10b981',
    icon: CheckCircle2
  },
  {
    id: 'iso45001',
    code: 'ISO 45001:2018',
    tag: 'OH&S SAFETY',
    title: 'Occupational Health & Safety',
    detail: 'Cert: 3050260502117HS',
    color: '#38bdf8',
    icon: BadgeCheck
  },
  {
    id: 'iso37001',
    code: 'ISO 37001:2016',
    tag: 'ANTI-BRIBERY',
    title: 'Anti-Bribery Management',
    detail: 'Cert: UK-02-VS-03088',
    color: '#a78bfa',
    icon: Lock
  },
  {
    id: 'impa',
    code: 'IMPA Member',
    tag: 'MARITIME SUPPLY',
    title: 'Intl Marine Purchasing Association',
    detail: 'Verified Directory Profile',
    color: '#60a5fa',
    icon: Anchor,
    link: 'https://impa.net/members/oriented-facility-solution-pvt-ltd'
  },
  {
    id: 'dpiit',
    code: 'DPIIT Recognized',
    tag: 'GOVT OF INDIA',
    title: 'Ministry of Commerce & Industry',
    detail: 'Cert: DIPP253153',
    color: '#fb923c',
    icon: Award
  }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [certsDropdownOpen, setCertsDropdownOpen] = useState(false);
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const pathname = usePathname();

  // Auto-cycle through certificates in top bar
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCertIndex((prev) => (prev + 1) % topBarCertifications.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setCertsDropdownOpen(false);
  }, [pathname]);

  const activeCert = topBarCertifications[activeCertIndex];
  const ActiveCertIcon = activeCert.icon;

  return (
    <>
      {/* Enterprise Multi-Certification Top Bar */}
      <div style={{
        background: 'var(--ofs-navy-950)',
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: 'var(--text-xs)',
        fontFamily: 'var(--font-mono)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.45rem 0',
        zIndex: 501,
        position: 'relative'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.65rem'
        }}>

          {/* Left: Interactive Multi-Certification Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', position: 'relative' }}>
            {/* Active Cycling Badge */}
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.45rem', 
                color: activeCert.color, 
                fontWeight: 700,
                background: 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${activeCert.color}44`,
                padding: '0.2rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                transition: 'all 0.35s ease',
                cursor: 'pointer'
              }}
              onClick={() => setCertsDropdownOpen(!certsDropdownOpen)}
              title="Click to view all official certifications"
            >
              <ActiveCertIcon size={14} style={{ flexShrink: 0 }} />
              <span style={{ color: '#fff', fontWeight: 800 }}>{activeCert.code}</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)', display: 'none', md: 'inline' }} className="hidden-mobile">
                • {activeCert.title}
              </span>
              <ChevronDown size={12} style={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                transform: certsDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.2s ease'
              }} />
            </div>

            {/* Quick Micro-Pills for all certifications */}
            <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
              {topBarCertifications.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCertIndex(i);
                    setCertsDropdownOpen(true);
                  }}
                  style={{
                    background: i === activeCertIndex ? `${c.color}22` : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${i === activeCertIndex ? c.color : 'rgba(255, 255, 255, 0.08)'}`,
                    color: i === activeCertIndex ? c.color : 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    padding: '0.15rem 0.45rem',
                    borderRadius: 'var(--radius-xs)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {c.id.toUpperCase()}
                </button>
              ))}
            </div>

            {/* All Certifications Dropdown Popover */}
            {certsDropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  width: 'min(420px, 92vw)',
                  background: 'var(--ofs-navy-950)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)',
                  padding: '1.25rem',
                  zIndex: 700,
                  animation: 'fadeInMenu 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseLeave={() => setCertsDropdownOpen(false)}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '0.75rem',
                  marginBottom: '0.75rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    color: '#fff'
                  }}>
                    Official Enterprise Accreditations (6)
                  </div>
                  <button
                    onClick={() => setCertsDropdownOpen(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255, 255, 255, 0.5)',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {topBarCertifications.map((cert, idx) => {
                    const ItemIcon = cert.icon;
                    return (
                      <div
                        key={cert.id}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: `1px solid ${cert.color}33`,
                          borderRadius: 'var(--radius-xs)',
                          padding: '0.65rem 0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.75rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '4px',
                            background: `${cert.color}18`,
                            display: 'grid',
                            placeContent: 'center',
                            color: cert.color,
                            flexShrink: 0
                          }}>
                            <ItemIcon size={15} />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.8rem', lineHeight: 1.2 }}>
                              {cert.code}
                            </div>
                            <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.7rem' }}>
                              {cert.detail}
                            </div>
                          </div>
                        </div>

                        {cert.link ? (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: cert.color,
                              fontSize: '0.7rem',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              padding: '0.2rem 0.5rem',
                              background: 'rgba(96, 165, 250, 0.15)',
                              borderRadius: 'var(--radius-xs)',
                              flexShrink: 0
                            }}
                          >
                            Verify ↗
                          </a>
                        ) : (
                          <span style={{
                            fontSize: '0.65rem',
                            color: 'rgba(255, 255, 255, 0.4)',
                            fontFamily: 'var(--font-mono)'
                          }}>
                            Active
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{
                  marginTop: '0.85rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <a
                    href="#certifications"
                    onClick={() => setCertsDropdownOpen(false)}
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--ofs-gold-400)',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    View Complete Footer Audit ↘
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right: Contact details */}
          <div className="top-bar-right" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#fff' }}
              className="hover-opacity"
            >
              <Phone size={12} style={{ color: 'var(--ofs-red-500)' }} />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>|</span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#fff' }}
              className="hover-opacity"
            >
              <Mail size={12} style={{ color: 'var(--ofs-red-500)' }} />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
        </div>
      </div>


      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 500,
        background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'var(--ofs-white)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        boxShadow: isScrolled ? '0 10px 30px rgba(12, 30, 78, 0.08)' : '0 1px 0 rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease',
        borderBottom: isScrolled ? '1px solid rgba(12, 30, 78, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.85rem',
          paddingBottom: '0.85rem'
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
            <img
              src="/images/ofs-logo.png"
              alt="OFS - Driven by Quality, Defined by Trust"
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.65rem' }} className="desktop-nav">
            <Link
              href="/about"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: pathname === '/about' ? 'var(--ofs-red-600)' : 'var(--ofs-navy-950)',
                padding: '0.5rem 0',
                position: 'relative'
              }}
            >
              Our Story
              {pathname === '/about' && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--ofs-red-600)',
                  borderRadius: 'var(--radius-full)'
                }} />
              )}
            </Link>

            {/* Services Dropdown Trigger */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: pathname.startsWith('/services') ? 'var(--ofs-red-600)' : 'var(--ofs-navy-950)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.5rem 0'
                }}
              >
                Services
                <ChevronDown size={14} style={{
                  transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s ease'
                }} />
              </Link>

              {/* Enhanced Mega Menu */}
              {servicesDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-40%)',
                  width: '760px',
                  background: 'var(--ofs-white)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--ofs-gray-200)',
                  boxShadow: 'var(--shadow-2xl)',
                  padding: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                  zIndex: 600,
                  animation: 'fadeInMenu 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                  {servicesData.map((service) => {
                    const IconComp = iconMap[service.icon] || Package;
                    return (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        style={{
                          display: 'flex',
                          gap: '0.85rem',
                          padding: '0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid transparent',
                          transition: 'all 0.2s ease',
                          textDecoration: 'none'
                        }}
                        className="mega-menu-item"
                      >
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: 'var(--radius-xs)',
                          background: 'var(--ofs-navy-50)',
                          border: '1px solid var(--ofs-navy-100)',
                          display: 'grid',
                          placeContent: 'center',
                          color: 'var(--ofs-navy-900)',
                          flexShrink: 0
                        }}>
                          <IconComp size={20} />
                        </div>
                        <div>
                          <div style={{
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            color: 'var(--ofs-navy-950)',
                            marginBottom: '0.2rem',
                            lineHeight: 1.2
                          }}>
                            {service.shortTitle}
                          </div>
                          <div style={{
                            fontSize: '0.8rem',
                            color: 'var(--ofs-gray-500)',
                            lineHeight: 1.3
                          }}>
                            {service.tagline.slice(0, 75)}...
                          </div>
                        </div>
                      </Link>
                    );
                  })}

                  {/* Mega Menu Footer Banner */}
                  <div style={{
                    gridColumn: '1 / -1',
                    background: 'var(--ofs-navy-50)',
                    padding: '0.85rem 1.25rem',
                    borderRadius: 'var(--radius-xs)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid var(--ofs-navy-100)'
                  }}>
                    <span style={{ fontSize: '0.825rem', color: 'var(--ofs-navy-900)', fontWeight: 600 }}>
                      Looking for customized marine logistics or EPC materials?
                    </span>
                    <Link
                      href="/contact"
                      style={{
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        color: 'var(--ofs-red-600)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      Request Consultation <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/industries"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: pathname.startsWith('/industries') ? 'var(--ofs-red-600)' : 'var(--ofs-navy-950)',
                padding: '0.5rem 0',
                position: 'relative'
              }}
            >
              Industries
              {pathname.startsWith('/industries') && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--ofs-red-600)',
                  borderRadius: 'var(--radius-full)'
                }} />
              )}
            </Link>

            {/* Strategic Renewables Portal Link */}
            <Link
              href="/renewables"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: pathname.startsWith('/renewables') ? 'var(--ofs-green-600)' : 'var(--ofs-green-700)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.38rem 0.85rem',
                background: 'rgba(16, 185, 129, 0.09)',
                border: '1px solid rgba(16, 185, 129, 0.28)',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <span className="sonar-wave" style={{ background: 'var(--ofs-green-500)' }} />
              Renewables
            </Link>

            <Link
              href="/blog"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: pathname.startsWith('/blog') ? 'var(--ofs-red-600)' : 'var(--ofs-navy-950)',
                padding: '0.5rem 0',
                position: 'relative'
              }}
            >
              Insights
              {pathname.startsWith('/blog') && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--ofs-red-600)',
                  borderRadius: 'var(--radius-full)'
                }} />
              )}
            </Link>

            <Link
              href="/careers"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: pathname.startsWith('/careers') ? 'var(--ofs-red-600)' : 'var(--ofs-navy-950)',
                padding: '0.5rem 0',
                position: 'relative'
              }}
            >
              Careers
              {pathname.startsWith('/careers') && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--ofs-red-600)',
                  borderRadius: 'var(--radius-full)'
                }} />
              )}
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <MagneticButton strength={0.3} radius={70}>
              <Link
                href="/contact"
                className="btn btn-primary btn-sm desktop-btn"
                style={{ textDecoration: 'none' }}
                data-cursor-text="CONTACT"
              >
                Get in Touch <ArrowUpRight size={15} />
              </Link>
            </MagneticButton>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                color: 'var(--ofs-navy-950)',
                padding: '0.4rem',
                display: 'none',
                cursor: 'pointer'
              }}
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--ofs-white)',
          zIndex: 499,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          animation: 'slideDown 0.25s ease-out'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--ofs-navy-950)',
                borderBottom: '1px solid var(--ofs-gray-200)',
                paddingBottom: '0.75rem'
              }}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--ofs-navy-950)',
                borderBottom: '1px solid var(--ofs-gray-200)',
                paddingBottom: '0.75rem'
              }}
            >
              About OFS Group
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--ofs-navy-950)',
                borderBottom: '1px solid var(--ofs-gray-200)',
                paddingBottom: '0.75rem'
              }}
            >
              All Services
            </Link>
            <Link
              href="/renewables"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--ofs-green-700)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderBottom: '1px solid var(--ofs-gray-200)',
                paddingBottom: '0.75rem'
              }}
            >
              <span className="sonar-wave" style={{ background: 'var(--ofs-green-500)' }} />
              Renewables Portal
            </Link>
            <Link
              href="/industries"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--ofs-navy-950)',
                borderBottom: '1px solid var(--ofs-gray-200)',
                paddingBottom: '0.75rem'
              }}
            >
              Industries Served
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--ofs-navy-950)',
                borderBottom: '1px solid var(--ofs-gray-200)',
                paddingBottom: '0.75rem'
              }}
            >
              Insights & Articles
            </Link>
            <Link
              href="/careers"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--ofs-navy-950)',
                borderBottom: '1px solid var(--ofs-gray-200)',
                paddingBottom: '0.75rem'
              }}
            >
              Careers & Opportunities
            </Link>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', textDecoration: 'none' }}
            >
              Contact Us & Request Quote
            </Link>
            <div style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--ofs-gray-500)', fontFamily: 'var(--font-mono)' }}>
              Call: {siteConfig.contact.phone} | {siteConfig.contact.email}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
