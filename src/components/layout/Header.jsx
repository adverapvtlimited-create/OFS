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
  CheckCircle2
} from 'lucide-react';
import siteConfig from '@/data/site-config.json';
import servicesData from '@/data/services.json';

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

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Notification & Fast Contact Bar */}
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
          gap: '0.5rem'
        }}>
          {/* Left: Certification & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--ofs-gold-400)', fontWeight: 700 }}>
              <ShieldCheck size={14} />
              <span>ISO 9001:2015 CERTIFIED</span>
            </div>
            <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              <span className="sonar-wave" style={{ width: '6px', height: '6px', background: 'var(--ofs-green-400)' }} />
              <span>Marine, Offshore & EPC Global Support</span>
            </div>
          </div>

          {/* Right: Quick Phone & Email */}
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

      {/* Main Sticky Header */}
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
          {/* OFS Official Brand Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
            <img 
              src="/images/ofs-logo.png" 
              alt="OFS - Driven by Quality, Defined by Trust"
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Navigation Links */}
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
            <Link 
              href="/contact" 
              className="btn btn-primary btn-sm desktop-btn"
              style={{ textDecoration: 'none' }}
            >
              Get in Touch <ArrowUpRight size={15} />
            </Link>

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
