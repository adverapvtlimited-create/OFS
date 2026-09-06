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
  BadgeCheck,
  Sparkles,
  Lock,
  Anchor,
} from 'lucide-react';
import siteConfig from '@/data/site-config.json';
import servicesData from '@/data/services.json';
import industriesData from '@/data/industries.json';
import { cn } from '@/lib/cn';

const credentialsList = [
  {
    id: 'iso-9001',
    icon: ShieldCheck,
    tag: 'QUALITY MANAGEMENT',
    title: 'ISO 9001:2015 Certified',
    subtitle: 'Quality Management System (QMS)',
    detail: 'Certificate No: 3050260502115Q',
    authority: 'QRO • IAF • EGAC Accredited',
    accentColor: '#f59e0b',
  },
  {
    id: 'iso-14001',
    icon: CheckCircle2,
    tag: 'ENVIRONMENTAL',
    title: 'ISO 14001:2015 Certified',
    subtitle: 'Environmental Management System (EMS)',
    detail: 'Certificate No: 3050260502116E',
    authority: 'QRO • IAF • EGAC Accredited',
    accentColor: '#f59e0b',
  },
  {
    id: 'iso-45001',
    icon: BadgeCheck,
    tag: 'HEALTH & SAFETY',
    title: 'ISO 45001:2018 Certified',
    subtitle: 'Occupational Health & Safety (OH&S)',
    detail: 'Certificate No: 3050260502117HS',
    authority: 'QRO • IAF • EGAC Accredited',
    accentColor: '#f59e0b',
  },
  {
    id: 'iso-37001',
    icon: Lock,
    tag: 'ANTI-BRIBERY',
    title: 'ISO 37001:2016 Certified',
    subtitle: 'Anti-Bribery Management System (ABMS)',
    detail: 'Certificate No: UK-02-VS-03088',
    authority: 'UKAF CERT (United Kingdom)',
    accentColor: '#f59e0b',
  },
  {
    id: 'impa-membership',
    icon: Anchor,
    tag: 'MARITIME NETWORK',
    title: 'IMPA Certified Member',
    subtitle: 'International Marine Purchasing Association',
    detail: 'Verified Member Directory Profile',
    authority: 'Global Marine & Maritime Supply Chain',
    accentColor: '#f59e0b',
    link: 'https://impa.net/members/oriented-facility-solution-pvt-ltd',
    actionText: 'Verify on IMPA.net ↗',
  },
  {
    id: 'dpiit-startup',
    icon: Award,
    tag: 'GOVT OF INDIA',
    title: 'DPIIT #StartupIndia Recognized',
    subtitle: 'Ministry of Commerce & Industry (Govt of India)',
    detail: 'Certificate No: DIPP253153',
    authority: 'Non-Renewable Energy & Oil Sector',
    accentColor: '#f59e0b',
  },
  {
    id: 'mill-test',
    icon: FileCheck,
    tag: 'MILL QUALITY',
    title: 'EN 10204 3.1 Traceability',
    subtitle: '100% Traceable Mill Test Certificates',
    detail: 'Complete Heat No. Audit Trail',
    authority: 'Independent Metallurgical Inspection',
    accentColor: '#f59e0b',
  },
  {
    id: 'asme-api',
    icon: Sparkles,
    tag: 'ENGINEERING',
    title: 'ASME & API Compliant',
    subtitle: 'Boiler, Pressure Vessel & API 6D/6A',
    detail: 'Strict OEM Sourcing Protocol',
    authority: '3,000+ Approved AVL Network',
    accentColor: '#f59e0b',
  },
];

export default function Footer() {
  return (
    <footer className="bg-ofs-navy-950 text-white border-t border-white/10 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

      {/* CREDENTIALS & ACCREDITATIONS HEADER SECTION */}
      <div
        id="certifications"
        className="border-b border-white/[0.08] bg-[#060E24]/65 relative z-[2] py-14"
      >
        <div className="w-full max-w-container mx-auto px-5 sm:px-8 lg:px-11">
          <div className="flex flex-wrap justify-between items-end gap-5 mb-9">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-ofs-gold-400 tracking-[0.08em] uppercase mb-1.5">
                <Lock size={13} />
                <span>Enterprise Trust &amp; Global Accreditations</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight m-0">
                Official Certifications, Accreditations &amp; Quality Audits
              </h3>
            </div>
            <div className="font-mono text-[0.78rem] text-white/70 flex items-center flex-wrap gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_#10b981]" />
              Active ISO 9001 • ISO 14001 • ISO 45001 • ISO 37001 • IMPA • DPIIT
            </div>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {credentialsList.map((cred, idx) => {
              const IconComp = cred.icon;
              const isClickable = Boolean(cred.link);

              const CardInner = (
                <>
                  <div className="flex justify-between items-center mb-3.5">
                    <span
                      className="font-mono text-[0.65rem] font-bold tracking-[0.06em] uppercase py-1 px-2.5 rounded-full bg-white/[0.05]"
                      style={{ border: `1px solid ${cred.accentColor}44`, color: cred.accentColor }}
                    >
                      {cred.tag}
                    </span>
                    {isClickable && (
                      <span
                        className="inline-flex items-center gap-1 font-mono text-[0.68rem] font-bold py-0.5 px-2 rounded-xs bg-sky-400/12 border border-sky-400/30"
                        style={{ color: cred.accentColor }}
                      >
                        Verify ↗
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'w-11 h-11 rounded-xs bg-white/[0.05] grid place-content-center shrink-0 mt-0.5 transition-all duration-300',
                        isClickable && 'group-hover:scale-105 group-hover:-rotate-3'
                      )}
                      style={{ border: `1px solid ${cred.accentColor}44`, color: cred.accentColor }}
                    >
                      <IconComp size={22} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-heading text-[0.98rem] font-extrabold text-white mb-1 flex items-center gap-1.5">
                        <span>{cred.title}</span>
                        {isClickable && (
                          <ArrowUpRight size={14} className="shrink-0" style={{ color: cred.accentColor }} />
                        )}
                      </div>
                      <div className="text-[0.78rem] text-white/75 leading-snug mb-2">
                        {cred.subtitle}
                      </div>
                      <div
                        className="font-mono text-[0.7rem] font-bold tracking-[0.02em] mb-1"
                        style={{ color: cred.accentColor }}
                      >
                        {cred.detail}
                      </div>
                      <div className="text-[0.68rem] text-white/50 font-sans tracking-[0.01em]">
                        {cred.authority}
                      </div>
                    </div>
                  </div>
                </>
              );

              const cardBaseClasses =
                'bg-white/[0.035] border border-white/10 rounded-sm p-5 flex flex-col backdrop-blur-md relative transition-all duration-250 hover:bg-white/[0.07] hover:border-white/[0.22] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]';

              if (isClickable) {
                return (
                  <a
                    key={cred.id || idx}
                    href={cred.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      cardBaseClasses,
                      'group cursor-pointer hover:bg-sky-400/[0.08] hover:border-sky-400/40 hover:shadow-[0_12px_28px_rgba(96,165,250,0.18)] no-underline'
                    )}
                    title={`Click to verify ${cred.title} on official directory`}
                  >
                    {CardInner}
                  </a>
                );
              }

              return (
                <div key={cred.id || idx} className={cardBaseClasses}>
                  {CardInner}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full max-w-container mx-auto px-5 sm:px-8 lg:px-11 relative z-[2] pt-16 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Identity */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block no-underline">
              <div className="bg-white p-2 px-3.5 rounded-xs inline-flex items-center shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
                <img
                  src="/images/ofs-logo.png"
                  alt="OFS - Driven by Quality, Defined by Trust"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-sm text-white/70 leading-relaxed">
              {siteConfig.longDesc}
            </p>

            {/* Corporate Registration Strip */}
            <div className="p-3.5 bg-white/[0.04] border border-white/10 rounded-xs text-xs text-white/70 font-mono leading-relaxed">
              <div>
                <strong className="text-white">USA Entity:</strong> {siteConfig.usEntityName}
              </div>
              <div className="mt-1">
                <strong className="text-white">India Entity:</strong> {siteConfig.legalName}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex gap-3 mt-1">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xs bg-[#0A66C2] text-white grid place-content-center transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xs bg-[#1877F2] text-white grid place-content-center transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xs bg-[#FF0000] text-white grid place-content-center transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xs bg-ofs-navy-800 text-white grid place-content-center transition-all duration-200 hover:bg-black hover:-translate-y-0.5"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Solutions & Services */}
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-ofs-gold-400 mb-5">
              Core Capabilities
            </div>
            <ul className="flex flex-col gap-3">
              {servicesData.map((svc) => (
                <li key={svc.id}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 text-sm no-underline"
                  >
                    <ChevronRight size={13} className="text-ofs-red-500 shrink-0" />
                    {svc.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industries & Strategic Divisions */}
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-ofs-gold-400 mb-5">
              Industries Served
            </div>
            <ul className="flex flex-col gap-3 mb-8">
              {industriesData.slice(0, 5).map((ind) => (
                <li key={ind.id}>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 text-sm no-underline"
                  >
                    <ChevronRight size={13} className="text-ofs-red-500 shrink-0" />
                    {ind.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/industries"
                  className="text-white/85 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 text-sm font-bold no-underline"
                >
                  <ChevronRight size={13} className="text-ofs-red-500 shrink-0" />
                  View All Industries
                </Link>
              </li>
            </ul>

            <div className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-ofs-gold-400 mb-5">
              Strategic Divisions
            </div>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/renewables"
                  className="text-ofs-green-400 font-semibold hover:text-ofs-green-300 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 text-sm no-underline"
                >
                  <Sun size={14} className="text-ofs-green-400" />
                  OFS Renewables Portal
                  <span className="text-[0.65rem] bg-emerald-500/20 py-0.5 px-2 rounded-full font-mono text-ofs-green-300">
                    Active
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 text-sm no-underline"
                >
                  <ChevronRight size={13} className="text-ofs-red-500 shrink-0" />
                  About OFS Group
                </Link>
              </li>
              <li>
                <a
                  href="#case-studies"
                  className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 text-sm no-underline"
                >
                  <ChevronRight size={13} className="text-ofs-red-500 shrink-0" />
                  Execution Case Studies
                </a>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 text-sm no-underline"
                >
                  <ChevronRight size={13} className="text-ofs-red-500 shrink-0" />
                  Industry Insights &amp; Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 text-sm no-underline"
                >
                  <ChevronRight size={13} className="text-ofs-red-500 shrink-0" />
                  Careers &amp; Culture
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 text-sm no-underline"
                >
                  <ChevronRight size={13} className="text-ofs-red-500 shrink-0" />
                  Request RFQ / Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="flex flex-col gap-5">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-ofs-gold-400">
              Corporate Offices
            </div>

            {/* USA Global Office */}
            <div className="flex gap-3 items-start">
              <Globe2 size={18} className="text-ofs-navy-400 shrink-0 mt-0.5" />
              <div className="text-[0.85rem] text-white/80 leading-relaxed">
                <strong className="text-white block">USA Global Office:</strong>
                {siteConfig.contact.addressUSA.line1}, {siteConfig.contact.addressUSA.city},{' '}
                {siteConfig.contact.addressUSA.state}, {siteConfig.contact.addressUSA.pincode}, USA
              </div>
            </div>

            {/* India HQ */}
            <div className="flex gap-3 items-start">
              <MapPin size={18} className="text-ofs-red-500 shrink-0 mt-0.5" />
              <div className="text-[0.85rem] text-white/80 leading-relaxed">
                <strong className="text-white block">India Headquarters:</strong>
                {siteConfig.contact.addressIndia.line1}, {siteConfig.contact.addressIndia.line2},{' '}
                {siteConfig.contact.addressIndia.city}, {siteConfig.contact.addressIndia.state} –{' '}
                {siteConfig.contact.addressIndia.pincode}
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="flex flex-col gap-2 mt-2">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="flex items-center gap-2 text-[0.85rem] text-white font-mono hover:opacity-85 transition-opacity"
              >
                <Phone size={14} className="text-ofs-red-500" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-[0.85rem] text-white font-mono hover:opacity-85 transition-opacity"
              >
                <Mail size={14} className="text-ofs-red-500" />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 border-t border-white/[0.08] flex justify-between items-center flex-wrap gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} {siteConfig.legalName} All Rights Reserved.
          </div>
          <div className="flex gap-6 items-center">
            <Link href="/privacy" className="hover:text-white transition-colors no-underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors no-underline">
              Terms of Engagement
            </Link>
            <span>•</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors no-underline"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
