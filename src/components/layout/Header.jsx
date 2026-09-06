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
  Package,
  Wrench,
  Anchor,
  Building2,
  Settings,
  Flame,
  Ship,
  Sun,
  CheckCircle2,
  BadgeCheck,
  Lock,
  Award,
} from 'lucide-react';
import siteConfig from '@/data/site-config.json';
import servicesData from '@/data/services.json';
import MagneticButton from '@/components/animations/MagneticButton';
import { cn } from '@/lib/cn';

const iconMap = {
  Package: Package,
  Wrench: Wrench,
  ShieldCheck: ShieldCheck,
  Anchor: Anchor,
  Building2: Building2,
  Settings: Settings,
  Flame: Flame,
  Ship: Ship,
  Sun: Sun,
};

const topBarCertifications = [
  {
    id: 'iso9001',
    label: 'IS09001',
    code: 'ISO 9001:2015',
    tag: 'QMS QUALITY',
    title: 'Quality Management System',
    detail: 'Cert: 3050260502115Q',
    color: '#f59e0b',
    icon: ShieldCheck,
  },
  {
    id: 'iso14001',
    label: 'IS014001',
    code: 'ISO 14001:2015',
    tag: 'EMS ENVIRONMENT',
    title: 'Environmental Management',
    detail: 'Cert: 3050260502116E',
    color: '#10b981',
    icon: CheckCircle2,
  },
  {
    id: 'iso45001',
    label: 'IS045001',
    code: 'ISO 45001:2018',
    tag: 'OH&S SAFETY',
    title: 'Occupational Health & Safety',
    detail: 'Cert: 3050260502117HS',
    color: '#38bdf8',
    icon: BadgeCheck,
  },
  {
    id: 'iso37001',
    label: 'IS037001',
    code: 'ISO 37001:2016',
    tag: 'ANTI-BRIBERY',
    title: 'Anti-Bribery Management',
    detail: 'Cert: UK-02-VS-03088',
    color: '#a78bfa',
    icon: Lock,
  },
  {
    id: 'impa',
    label: 'IMPA',
    code: 'IMPA Member',
    tag: 'MARITIME SUPPLY',
    title: '',
    detail: 'Verified Directory Profile',
    color: '#60a5fa',
    icon: Anchor,
    link: 'https://impa.net/members/oriented-facility-solution-pvt-ltd',
  },
  {
    id: 'dpiit',
    label: 'DPIIT',
    code: 'DPIIT Recognized',
    tag: 'GOVT OF INDIA',
    title: '',
    detail: 'Cert: DIPP253153',
    color: '#fb923c',
    icon: Award,
  },
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
      <div className="bg-ofs-navy-950 text-white/85 text-xs font-mono border-b border-white/[0.08] py-1.5 z-[501] relative">
        <div className="w-full max-w-container mx-auto px-5 sm:px-8 lg:px-11 flex justify-between items-center flex-wrap gap-2.5">
          {/* Left: Interactive Multi-Certification Strip */}
          <div className="flex items-center gap-3 flex-wrap relative">
            {/* Active Cycling Badge */}
            <div
              className="inline-flex items-center gap-2 font-mono text-xs font-bold bg-white/[0.04] py-1 px-3.5 rounded-full transition-all duration-300 cursor-pointer"
              style={{ borderColor: activeCert.color, borderStyle: 'solid', borderWidth: '1px' }}
              onClick={() => setCertsDropdownOpen(!certsDropdownOpen)}
              title="Click to view all official certifications"
            >
              <ActiveCertIcon size={14} className="shrink-0" style={{ color: activeCert.color }} />
              <span className="text-white font-extrabold">{activeCert.code}</span>
              <ChevronDown
                size={12}
                className={cn(
                  'text-white/70 transition-transform duration-200',
                  certsDropdownOpen && 'rotate-180'
                )}
              />
            </div>

            {/* Quick Micro-Pills for all certifications */}
            <div className="hidden lg:flex items-center gap-1.5 flex-wrap">
              {topBarCertifications.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCertIndex(i);
                    setCertsDropdownOpen(true);
                  }}
                  className="text-[0.65rem] font-mono font-bold py-0.5 px-2 rounded-[4px] cursor-pointer transition-all duration-200"
                  style={{
                    background: i === activeCertIndex ? `${c.color}22` : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${i === activeCertIndex ? c.color : 'rgba(255, 255, 255, 0.08)'}`,
                    color: i === activeCertIndex ? c.color : 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {c.label || c.id.toUpperCase()}
                </button>
              ))}
            </div>

            {/* All Certifications Dropdown Popover */}
            {certsDropdownOpen && (
              <div
                className="absolute top-[calc(100%+8px)] left-0 w-[min(420px,92vw)] bg-ofs-navy-950 border border-white/15 rounded-md shadow-2xl p-5 z-[700] animate-fade-in-menu"
                onMouseLeave={() => setCertsDropdownOpen(false)}
              >
                <div className="flex justify-between items-center pb-3 mb-3 border-b border-white/[0.08]">
                  <div className="font-heading font-extrabold text-sm text-white">
                    Official Enterprise Accreditations (6)
                  </div>
                  <button
                    onClick={() => setCertsDropdownOpen(false)}
                    className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="flex flex-col gap-2.5">
                  {topBarCertifications.map((cert) => {
                    const ItemIcon = cert.icon;
                    return (
                      <div
                        key={cert.id}
                        className="bg-white/[0.03] rounded-xs p-2.5 sm:px-3.5 flex items-center justify-between gap-3"
                        style={{ border: `1px solid ${cert.color}33` }}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-7 h-7 rounded-xs grid place-content-center shrink-0"
                            style={{ background: `${cert.color}18`, color: cert.color }}
                          >
                            <ItemIcon size={15} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-white font-extrabold text-xs leading-tight">
                              {cert.code}
                            </div>
                            <div className="text-white/60 text-[0.7rem] truncate">
                              {cert.detail}
                            </div>
                          </div>
                        </div>

                        {cert.link ? (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[0.7rem] font-mono font-bold no-underline inline-flex items-center gap-1 py-1 px-2 bg-sky-500/15 text-sky-400 rounded-xs shrink-0 hover:bg-sky-500/25"
                          >
                            Verify ↗
                          </a>
                        ) : (
                          <span className="text-[0.65rem] text-white/40 font-mono">
                            Active
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3.5 pt-3 border-t border-white/[0.08] flex justify-between items-center">
                  <a
                    href="#certifications"
                    onClick={() => setCertsDropdownOpen(false)}
                    className="text-xs text-ofs-gold-400 font-mono font-bold no-underline flex items-center gap-1 hover:text-ofs-gold-300"
                  >
                    View Complete Footer Audit ↘
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right: Contact details */}
          <div className="hidden md:flex items-center gap-5 text-white">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="flex items-center gap-1.5 text-white hover:opacity-85 transition-opacity"
            >
              <Phone size={12} className="text-ofs-red-500" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <span className="text-white/25">|</span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-1.5 text-white hover:opacity-85 transition-opacity"
            >
              <Mail size={12} className="text-ofs-red-500" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className={cn(
          'sticky top-0 z-header transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(12,30,78,0.08)] border-b border-ofs-navy-900/10'
            : 'bg-white border-b border-black/[0.06]'
        )}
      >
        <div className="w-full max-w-container mx-auto px-5 sm:px-8 lg:px-11 flex items-center justify-between py-3.5">
          <Link href="/" className="flex items-center gap-3.5 no-underline">
            <img
              src="/images/ofs-logo.png"
              alt="OFS - Driven by Quality, Defined by Trust"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden nav:flex items-center gap-6">
            <Link
              href="/about"
              className={cn(
                'font-mono text-sm font-semibold uppercase tracking-[0.04em] py-2 relative transition-colors',
                pathname === '/about' ? 'text-ofs-red-600' : 'text-ofs-navy-950 hover:text-ofs-red-600'
              )}
            >
              Our Story
              {pathname === '/about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ofs-red-600 rounded-full" />
              )}
            </Link>

            {/* Services Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                className={cn(
                  'font-mono text-sm font-semibold uppercase tracking-[0.04em] py-2 flex items-center gap-1 transition-colors',
                  pathname.startsWith('/services') ? 'text-ofs-red-600' : 'text-ofs-navy-950 hover:text-ofs-red-600'
                )}
              >
                Services
                <ChevronDown
                  size={14}
                  className={cn('transition-transform duration-200', servicesDropdownOpen && 'rotate-180')}
                />
              </Link>

              {/* Enhanced Mega Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-[40%] w-[760px] bg-white rounded-md border border-ofs-gray-200 shadow-2xl p-6 grid grid-cols-2 gap-4 z-[600] animate-fade-in-menu">
                  {servicesData.map((service) => {
                    const IconComp = iconMap[service.icon] || Package;
                    return (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="flex gap-3.5 p-3.5 rounded-sm border border-transparent hover:bg-ofs-navy-50 hover:border-ofs-navy-200 hover:translate-x-1 transition-all duration-200 no-underline"
                      >
                        <div className="w-10 h-10 rounded-xs bg-ofs-navy-50 border border-ofs-navy-100 grid place-content-center text-ofs-navy-900 shrink-0">
                          <IconComp size={20} />
                        </div>
                        <div>
                          <div className="font-heading font-bold text-sm text-ofs-navy-950 mb-1 leading-tight">
                            {service.shortTitle}
                          </div>
                          <div className="text-xs text-ofs-gray-500 leading-snug">
                            {service.tagline.slice(0, 75)}...
                          </div>
                        </div>
                      </Link>
                    );
                  })}

                  {/* Mega Menu Footer Banner */}
                  <div className="col-span-2 bg-ofs-navy-50 p-3.5 px-5 rounded-xs flex justify-between items-center border border-ofs-navy-100">
                    <span className="text-xs font-semibold text-ofs-navy-900">
                      Looking for customized marine logistics or EPC materials?
                    </span>
                    <Link
                      href="/contact"
                      className="text-xs font-mono font-bold text-ofs-red-600 flex items-center gap-1 hover:text-ofs-red-700 no-underline"
                    >
                      Request Consultation <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/industries"
              className={cn(
                'font-mono text-sm font-semibold uppercase tracking-[0.04em] py-2 relative transition-colors',
                pathname.startsWith('/industries') ? 'text-ofs-red-600' : 'text-ofs-navy-950 hover:text-ofs-red-600'
              )}
            >
              Industries
              {pathname.startsWith('/industries') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ofs-red-600 rounded-full" />
              )}
            </Link>

            {/* Strategic Renewables Portal Link */}
            <Link
              href="/renewables"
              className={cn(
                'font-mono text-sm font-semibold uppercase tracking-[0.04em] py-2 relative inline-flex items-center gap-1.5 transition-colors',
                pathname.startsWith('/renewables') ? 'text-ofs-green-700' : 'text-ofs-navy-950 hover:text-ofs-green-700'
              )}
            >
              <Sun size={14} className="text-ofs-green-600" />
              Renewables
              {pathname.startsWith('/renewables') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ofs-green-600 rounded-full" />
              )}
            </Link>

            <Link
              href="/blog"
              className={cn(
                'font-mono text-sm font-semibold uppercase tracking-[0.04em] py-2 relative transition-colors',
                pathname.startsWith('/blog') ? 'text-ofs-red-600' : 'text-ofs-navy-950 hover:text-ofs-red-600'
              )}
            >
              Insights
              {pathname.startsWith('/blog') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ofs-red-600 rounded-full" />
              )}
            </Link>

            <Link
              href="/careers"
              className={cn(
                'font-mono text-sm font-semibold uppercase tracking-[0.04em] py-2 relative transition-colors',
                pathname.startsWith('/careers') ? 'text-ofs-red-600' : 'text-ofs-navy-950 hover:text-ofs-red-600'
              )}
            >
              Careers
              {pathname.startsWith('/careers') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ofs-red-600 rounded-full" />
              )}
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3.5">
            <div className="hidden nav:block">
              <MagneticButton strength={0.3} radius={70}>
                <Link
                  href="/contact"
                  className="btn btn-primary btn-sm no-underline"
                  data-cursor-text="CONTACT"
                >
                  Get in Touch <ArrowUpRight size={15} />
                </Link>
              </MagneticButton>
            </div>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-transparent text-ofs-navy-950 p-1.5 nav:hidden cursor-pointer flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed top-[74px] inset-x-0 bottom-0 bg-white z-[499] overflow-y-auto p-6 flex flex-col justify-between animate-slide-down">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading text-xl font-bold text-ofs-navy-950 border-b border-ofs-gray-200 pb-3 no-underline"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading text-xl font-bold text-ofs-navy-950 border-b border-ofs-gray-200 pb-3 no-underline"
            >
              About OFS Group
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading text-xl font-bold text-ofs-navy-950 border-b border-ofs-gray-200 pb-3 no-underline"
            >
              All Services
            </Link>
            <Link
              href="/renewables"
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading text-xl font-bold text-ofs-green-700 flex items-center gap-2 border-b border-ofs-gray-200 pb-3 no-underline"
            >
              <Sun size={18} className="text-ofs-green-600" />
              Renewables Portal
            </Link>
            <Link
              href="/industries"
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading text-xl font-bold text-ofs-navy-950 border-b border-ofs-gray-200 pb-3 no-underline"
            >
              Industries Served
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading text-xl font-bold text-ofs-navy-950 border-b border-ofs-gray-200 pb-3 no-underline"
            >
              Insights & Articles
            </Link>
            <Link
              href="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading text-xl font-bold text-ofs-navy-950 border-b border-ofs-gray-200 pb-3 no-underline"
            >
              Careers & Opportunities
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary btn-lg w-full no-underline"
            >
              Contact Us & Request Quote
            </Link>
            <div className="text-center text-xs text-ofs-gray-500 font-mono">
              Call: {siteConfig.contact.phone} | {siteConfig.contact.email}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
