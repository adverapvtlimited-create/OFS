'use client';

import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Facebook,
  Youtube,
  Twitter,
  Globe2,
  ChevronRight,
  Sun,
} from 'lucide-react';
import siteConfig from '@/data/site-config.json';
import { whatWeOffer } from '@/data/navigation';
import industriesData from '@/data/industries.json';

export default function Footer() {
  return (
    <footer className="bg-ofs-navy-950 text-white border-t border-white/10 relative overflow-hidden">
      <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

      <div className="w-full max-w-container mx-auto px-5 sm:px-8 lg:px-11 relative z-[2] pt-16 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
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

            <div className="p-3.5 bg-white/[0.04] border border-white/10 rounded-xs text-xs text-white/70 font-mono leading-relaxed">
              <div>
                <strong className="text-white">USA Entity:</strong> {siteConfig.usEntityName}
              </div>
              <div className="mt-1">
                <strong className="text-white">India Entity:</strong> {siteConfig.legalName}
              </div>
            </div>

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

          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-ofs-gold-400 mb-5">
              Core Capabilities
            </div>
            <ul className="flex flex-col gap-3">
              {whatWeOffer.services.items.slice(0, 6).map((svc) => (
                <li key={svc.href}>
                  <Link
                    href={svc.href}
                    className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 text-sm no-underline"
                  >
                    <ChevronRight size={13} className="text-ofs-red-500 shrink-0" />
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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

          <div className="flex flex-col gap-5">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-ofs-gold-400">
              Corporate Offices
            </div>

            <div className="flex gap-3 items-start">
              <Globe2 size={18} className="text-ofs-navy-400 shrink-0 mt-0.5" />
              <div className="text-[0.85rem] text-white/80 leading-relaxed">
                <strong className="text-white block">USA Global Office:</strong>
                {siteConfig.contact.addressUSA.line1}, {siteConfig.contact.addressUSA.city},{' '}
                {siteConfig.contact.addressUSA.state}, {siteConfig.contact.addressUSA.pincode}, USA
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <MapPin size={18} className="text-ofs-red-500 shrink-0 mt-0.5" />
              <div className="text-[0.85rem] text-white/80 leading-relaxed">
                <strong className="text-white block">India Operations Hub:</strong>
                {siteConfig.contact.addressIndia.line1}, {siteConfig.contact.addressIndia.line2},{' '}
                {siteConfig.contact.addressIndia.city}, {siteConfig.contact.addressIndia.state} –{' '}
                {siteConfig.contact.addressIndia.pincode}
              </div>
            </div>

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
                <Mail size={14} className=" text-ofs-red-500" />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

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
