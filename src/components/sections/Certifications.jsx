'use client';

import React from 'react';
import {
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
  FileCheck,
  BadgeCheck,
  Sparkles,
  Lock,
  Anchor,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/cn';

const credentialsList = [
  {
    id: 'iso-9001',
    icon: ShieldCheck,
    tag: 'QUALITY MANAGEMENT',
    title: 'ISO 9001:2015 Certified',
    subtitle: 'Quality Management System (QMS)',
    detail: 'Certificate No: 305026052968Q',
    authority: 'QRO • IAF • EGAC Accredited',
    accentColor: '#f59e0b',
    link: '/certificates/iso-9001-2015-quality-management.pdf',
    actionText: 'View Cert ↗',
  },
  {
    id: 'iso-14001',
    icon: CheckCircle2,
    tag: 'ENVIRONMENTAL',
    title: 'ISO 14001:2015 Certified',
    subtitle: 'Environmental Management System (EMS)',
    detail: 'Certificate No: 305026052969E',
    authority: 'QRO • IAF • EGAC Accredited',
    accentColor: '#10b981',
    link: '/certificates/iso-14001-2015-environmental-management.pdf',
    actionText: 'View Cert ↗',
  },
  {
    id: 'iso-45001',
    icon: BadgeCheck,
    tag: 'HEALTH & SAFETY',
    title: 'ISO 45001:2018 Certified',
    subtitle: 'Occupational Health & Safety (OH&S)',
    detail: 'Certificate No: 305026052970HS',
    authority: 'QRO • IAF • EGAC Accredited',
    accentColor: '#38bdf8',
    link: '/certificates/iso-45001-2018-occupational-health-safety.pdf',
    actionText: 'View Cert ↗',
  },
  {
    id: 'iso-37001',
    icon: Lock,
    tag: 'ANTI-BRIBERY',
    title: 'ISO 37001:2016 Certified',
    subtitle: 'Anti-Bribery Management System (ABMS)',
    detail: 'Certificate No: UK-02-VS-03089',
    authority: 'UKAF CERT (United Kingdom)',
    accentColor: '#a78bfa',
    link: '/certificates/iso-37001-2016-anti-bribery-management.pdf',
    actionText: 'View Cert ↗',
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
    actionText: 'Verify ↗',
  },
  {
    id: 'dpiit-startup',
    icon: Award,
    tag: 'GOVT OF INDIA',
    title: 'DPIIT #StartupIndia Recognized',
    subtitle: 'Ministry of Commerce & Industry (Govt of India)',
    detail: 'Certificate No: DIPP253153',
    authority: 'Non-Renewable Energy & Oil Sector',
    accentColor: '#fb923c',
    link: '/certificates/30032026165908322-0c525690-1762-4a29-9a9a-9710a9b25129.pdf',
    actionText: 'View Cert ↗',
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

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="bg-ofs-navy-950 text-white relative overflow-hidden py-16 lg:py-20 border-t border-b border-white/[0.08]"
    >
      <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

      <div className="w-full max-w-container mx-auto px-5 sm:px-8 lg:px-11 relative z-[2]">
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-end gap-5 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-ofs-gold-400 tracking-[0.08em] uppercase mb-2">
              <Lock size={13} />
              <span>Enterprise Trust &amp; Global Accreditations</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight m-0">
              Official Certifications, Accreditations &amp; Quality Audits
            </h2>
          </div>
          <div className="font-mono text-[0.78rem] text-white/70 flex items-center flex-wrap gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_10px_#10b981]" />
            Active ISO 9001 • ISO 14001 • ISO 45001 • ISO 37001 • IMPA • DPIIT
          </div>
        </div>

        {/* Certifications Grid */}
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
                      className="inline-flex items-center gap-1 font-mono text-[0.68rem] font-bold py-0.5 px-2 rounded-xs border transition-all duration-200 group-hover:scale-105"
                      style={{
                        color: cred.accentColor,
                        backgroundColor: `${cred.accentColor}18`,
                        borderColor: `${cred.accentColor}44`,
                      }}
                    >
                      {cred.actionText || 'View Cert ↗'}
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
                        <ArrowUpRight
                          size={14}
                          className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          style={{ color: cred.accentColor }}
                        />
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
                    'group cursor-pointer no-underline hover:bg-white/[0.06]'
                  )}
                  style={{
                    borderColor: `${cred.accentColor}33`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${cred.accentColor}88`;
                    e.currentTarget.style.boxShadow = `0 12px 28px ${cred.accentColor}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${cred.accentColor}33`;
                    e.currentTarget.style.boxShadow = '';
                  }}
                  title={
                    cred.link.endsWith('.pdf')
                      ? `Click to view official ${cred.title} certificate (PDF)`
                      : `Click to verify ${cred.title} on official directory`
                  }
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
    </section>
  );
}
