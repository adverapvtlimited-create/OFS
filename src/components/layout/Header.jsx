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
  CheckCircle2,
  BadgeCheck,
  Lock,
  Award,
  Anchor,
} from 'lucide-react';
import siteConfig from '@/data/site-config.json';
import MagneticButton from '@/components/animations/MagneticButton';
import DesktopNav from '@/components/layout/DesktopNav';
import SonarDot from '../ui/SonarDot';
import { cn } from '@/lib/cn';
import {
  aboutNav,
  industriesNav,
  productsNav,
  whatWeOffer,
  whatWeOfferColumns,
  isWhatWeOfferPath,
  findOfferMatch,
} from '@/data/navigation';

const topBarCertifications = [
  {
    id: 'iso9001',
    label: 'IS09001',
    code: 'ISO 9001:2015',
    tag: 'QMS QUALITY',
    title: 'Quality Management System',
    detail: 'Cert: 305026052968Q',
    color: '#f59e0b',
    icon: ShieldCheck,
    link: '/certificates/iso-9001-2015-quality-management.pdf',
    actionText: 'View Cert ↗',
  },
  {
    id: 'iso14001',
    label: 'IS014001',
    code: 'ISO 14001:2015',
    tag: 'EMS ENVIRONMENT',
    title: 'Environmental Management',
    detail: 'Cert: 305026052969E',
    color: '#10b981',
    icon: CheckCircle2,
    link: '/certificates/iso-14001-2015-environmental-management.pdf',
    actionText: 'View Cert ↗',
  },
  {
    id: 'iso45001',
    label: 'IS045001',
    code: 'ISO 45001:2018',
    tag: 'OH&S SAFETY',
    title: 'Occupational Health & Safety',
    detail: 'Cert: 305026052970HS',
    color: '#38bdf8',
    icon: BadgeCheck,
    link: '/certificates/iso-45001-2018-occupational-health-safety.pdf',
    actionText: 'View Cert ↗',
  },
  {
    id: 'iso37001',
    label: 'IS037001',
    code: 'ISO 37001:2016',
    tag: 'ANTI-BRIBERY',
    title: 'Anti-Bribery Management',
    detail: 'Cert: UK-02-VS-03089',
    color: '#a78bfa',
    icon: Lock,
    link: '/certificates/iso-37001-2016-anti-bribery-management.pdf',
    actionText: 'View Cert ↗',
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
    actionText: 'Verify ↗',
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
    link: 'https://www.startupindia.gov.in/',
    actionText: 'Verify ↗',
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [mobileOfferCategory, setMobileOfferCategory] = useState(null);
  const [certsDropdownOpen, setCertsDropdownOpen] = useState(false);
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const pathname = usePathname();
  const offerActive = isWhatWeOfferPath(pathname);
  const offerMatch = findOfferMatch(pathname);

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
    setMobileAccordion(null);
    setMobileOfferCategory(null);
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
                            className="text-[0.7rem] font-mono font-bold no-underline inline-flex items-center gap-1 py-1 px-2.5 rounded-xs shrink-0 transition-all duration-200 hover:brightness-125"
                            style={{
                              background: `${cert.color}15`,
                              color: cert.color,
                              border: `1px solid ${cert.color}40`,
                            }}
                          >
                            {cert.actionText || 'View Cert ↗'}
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
          'sticky top-0 z-header relative overflow-visible transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(12,30,78,0.08)] border-b border-ofs-navy-900/10'
            : 'bg-white border-b border-black/[0.06]'
        )}
      >
        <div className="w-full max-w-container mx-auto px-5 sm:px-8 lg:px-11 flex items-center justify-between py-3.5">
          <Link href="/" className="flex items-center gap-3.5 no-underline shrink-0">
            <img
              src="/images/ofs-logo.png"
              alt="OFS - Driven by Quality, Defined by Trust"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav pathname={pathname} />

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3.5 shrink-0">
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
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed top-[74px] inset-x-0 bottom-0 bg-white z-[499] overflow-y-auto p-6 flex flex-col justify-between animate-slide-down nav:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading text-lg font-bold text-ofs-navy-950 border-b border-ofs-gray-200 py-3 no-underline"
            >
              Home
            </Link>

            <button
              type="button"
              className="w-full flex items-center justify-between font-heading text-lg font-bold text-ofs-navy-950 border-b border-ofs-gray-200 py-3 bg-transparent cursor-pointer"
              aria-expanded={mobileAccordion === 'about'}
              onClick={() => setMobileAccordion(mobileAccordion === 'about' ? null : 'about')}
            >
              About Us
              <ChevronDown size={18} className={cn('transition-transform', mobileAccordion === 'about' && 'rotate-180')} />
            </button>
            {mobileAccordion === 'about' && (
              <div className="pl-3 pb-3 flex flex-col gap-2 border-b border-ofs-gray-100">
                {aboutNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-ofs-gray-700 py-1.5 no-underline"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}

            <button
              type="button"
              className="w-full flex items-center justify-between font-heading text-lg font-bold text-ofs-navy-950 border-b border-ofs-gray-200 py-3 bg-transparent cursor-pointer"
              aria-expanded={mobileAccordion === 'industries'}
              onClick={() => setMobileAccordion(mobileAccordion === 'industries' ? null : 'industries')}
            >
              Industries
              <ChevronDown size={18} className={cn('transition-transform', mobileAccordion === 'industries' && 'rotate-180')} />
            </button>
            {mobileAccordion === 'industries' && (
              <div className="pl-3 pb-3 flex flex-col gap-2 border-b border-ofs-gray-100">
                <Link href="/industries" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-ofs-navy-950 py-1.5 no-underline">
                  All Industries
                </Link>
                {industriesNav.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-sm text-ofs-gray-700 py-1.5 no-underline">
                    {item.title}
                  </Link>
                ))}
              </div>
            )}

            <button
              type="button"
              className="w-full flex items-center justify-between font-heading text-lg font-bold text-ofs-navy-950 border-b border-ofs-gray-200 py-3 bg-transparent cursor-pointer"
              aria-expanded={mobileAccordion === 'products'}
              onClick={() => setMobileAccordion(mobileAccordion === 'products' ? null : 'products')}
            >
              Products
              <ChevronDown size={18} className={cn('transition-transform', mobileAccordion === 'products' && 'rotate-180')} />
            </button>
            {mobileAccordion === 'products' && (
              <div className="pl-3 pb-3 flex flex-col gap-2 border-b border-ofs-gray-100">
                <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-ofs-navy-950 py-1.5 no-underline">
                  All Products
                </Link>
                {productsNav.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-sm text-ofs-gray-700 py-1.5 no-underline">
                    {item.title}
                  </Link>
                ))}
              </div>
            )}

            <button
              type="button"
              className={cn(
                "w-full flex items-center justify-between font-heading text-lg font-bold border-b border-ofs-gray-200 py-3 bg-transparent cursor-pointer transition-colors",
                offerActive ? "text-ofs-navy-900 font-extrabold" : "text-ofs-navy-950"
              )}
              aria-expanded={mobileAccordion === 'offer'}
              onClick={() => {
                const nextState = mobileAccordion === 'offer' ? null : 'offer';
                setMobileAccordion(nextState);
                if (nextState === 'offer' && offerMatch?.column.id) {
                  setMobileOfferCategory(offerMatch.column.id);
                }
              }}
            >
              <span className="flex items-center gap-2">
                What We Offer
                {offerActive && (
                  <span className="w-2 h-2 rounded-full bg-ofs-navy-600 inline-block" />
                )}
              </span>
              <ChevronDown size={18} className={cn('transition-transform duration-200', mobileAccordion === 'offer' && 'rotate-180')} />
            </button>
            {mobileAccordion === 'offer' && (
              <div className="pl-2 pb-3 border-b border-ofs-gray-100">
                {whatWeOfferColumns.map((key) => {
                  const column = whatWeOffer[key];
                  const isCategoryActive = offerMatch?.column.id === column.id;
                  const open = mobileOfferCategory === column.id;
                  return (
                    <div key={column.id} className="border-b border-ofs-gray-100/80 last:border-b-0">
                      <button
                        type="button"
                        className={cn(
                          "w-full flex items-center justify-between text-left font-mono text-xs font-bold tracking-[0.08em] py-2.5 px-1 bg-transparent cursor-pointer min-h-[44px] transition-colors",
                          isCategoryActive ? "text-ofs-navy-900 font-extrabold" : "text-ofs-gray-600 hover:text-ofs-navy-900"
                        )}
                        aria-expanded={open}
                        onClick={() => setMobileOfferCategory(open ? null : column.id)}
                      >
                        <span className="flex items-center gap-2">
                          {column.title}
                          {isCategoryActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-ofs-navy-700 inline-block" />
                          )}
                        </span>
                        <ChevronDown size={14} className={cn('transition-transform duration-200', open && 'rotate-180')} />
                      </button>
                      {open && (
                        <div className="pl-3 pb-3 flex flex-col gap-1">
                          {column.items.map((item) => {
                            const isItemActive = pathname === item.href;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                  className={cn(
                                  "text-sm py-2 px-2.5 rounded min-h-[40px] flex items-center gap-2.5 leading-snug no-underline transition-colors",
                                  isItemActive
                                    ? "text-ofs-navy-900 font-bold bg-ofs-navy-50/90 border-l-2 border-ofs-navy-800 pl-2"
                                    : "text-ofs-gray-700 hover:text-ofs-navy-950 hover:bg-ofs-navy-50/50"
                                )}
                              >
                                {column.id === 'services' && item.image && (
                                  <img
                                    src={item.image}
                                    alt=""
                                    aria-hidden="true"
                                    className="h-9 w-12 shrink-0 rounded object-cover border border-ofs-gray-200"
                                  />
                                )}
                                <span>{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading text-lg font-bold text-ofs-navy-950 border-b border-ofs-gray-200 py-3 no-underline"
            >
              Contact Us
            </Link>
            <Link
              href="/renewables"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-ofs-green-700 border-b border-ofs-gray-200 py-3 no-underline flex items-center gap-2"
            >
              <span className="relative flex items-center justify-center w-3.5 h-3.5 shrink-0">
                <span className="w-3.5 h-3.5 rounded-full border border-ofs-red-500 flex items-center justify-center bg-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-ofs-green-600" />
                </span>
                <span className="absolute -inset-0.5 rounded-full border border-ofs-red-500 animate-sonar pointer-events-none" />
              </span>
              Renewables
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-ofs-navy-950 border-b border-ofs-gray-200 py-3 no-underline"
            >
              Insights
            </Link>
            <Link
              href="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-ofs-navy-950 border-b border-ofs-gray-200 py-3 no-underline"
            >
              Careers
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
