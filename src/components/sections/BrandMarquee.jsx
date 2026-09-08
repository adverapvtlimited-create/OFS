'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

const row1Brands = [
  { name: 'Emerson', category: 'Control Systems & Instrumentation', country: 'USA' },
  { name: 'Fisher Valves', category: 'Severe Service & ESD Valves', country: 'USA' },
  { name: 'Flowserve', category: 'Pumps & Mechanical Seals', country: 'USA' },
  { name: 'Cameron', category: 'Wellhead & Pressure Control', country: 'USA' },
  { name: 'Yokogawa', category: 'DCS & Process Analyzers', country: 'Japan' },
  { name: 'Honeywell', category: 'Process Solutions & Transmitters', country: 'USA' },
  { name: 'Schneider Electric', category: 'Industrial Power & Switchgear', country: 'France' },
  { name: 'ABB', category: 'High-Voltage Motors & Drives', country: 'Switzerland' },
  { name: 'Swagelok', category: 'Fluid Systems & Tube Fittings', country: 'USA' },
  { name: 'Parker Hannifin', category: 'Motion, Hydraulics & Filtration', country: 'USA' },
];

const row2Brands = [
  { name: 'Rockwell Automation', category: 'Allen-Bradley PLC & Drives', country: 'USA' },
  { name: 'Siemens Energy', category: 'Turbomachinery & Power Transmission', country: 'Germany' },
  { name: 'WIKA', category: 'Pressure & Temperature Gauges', country: 'Germany' },
  { name: 'Sulzer', category: 'Centrifugal Pumps & Agitators', country: 'Switzerland' },
  { name: 'KSB Pumps', category: 'High-Pressure Industrial Pumps', country: 'Germany' },
  { name: 'Alfa Laval', category: 'Plate Heat Exchangers & Decanters', country: 'Sweden' },
  { name: 'Endress+Hauser', category: 'Flow, Level & Optical Telemetry', country: 'Switzerland' },
  { name: 'Danfoss', category: 'Variable Frequency Inverters', country: 'Denmark' },
  { name: 'Atlas Copco', category: 'Industrial Air & Nitrogen Skids', country: 'Sweden' },
  { name: 'Spirax Sarco', category: 'Steam Management & Trapping', country: 'UK' },
];

export default function BrandMarquee() {

  function brandInitials(name) {
    return name
      .split(/[\s+]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  }

  function BrandChip({ brand, countryTone = 'gold' }) {
    return (
      <div className="inline-flex items-center gap-3.5 py-3 px-4 min-w-[260px] bg-white/[0.035] border border-white/10 rounded-md backdrop-blur-md mr-4 shrink-0 transition-all duration-300 cursor-default hover:bg-white/[0.08] hover:border-ofs-red-500/60 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.4)] group">
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-white/15 to-white/5 border border-white/20 text-white grid place-content-center font-heading font-black text-xs tracking-wider shrink-0 shadow-inner group-hover:border-ofs-gold-400/60 group-hover:text-ofs-gold-300 transition-colors">
          {brandInitials(brand.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className="font-heading text-[0.95rem] font-bold text-white tracking-tight truncate group-hover:text-white">
              {brand.name}
            </span>
            <span
              className={
                countryTone === 'green'
                  ? 'font-mono text-[0.62rem] py-0.5 px-2 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold shrink-0'
                  : 'font-mono text-[0.62rem] py-0.5 px-2 rounded-full bg-amber-500/15 text-ofs-gold-400 border border-amber-500/30 font-bold shrink-0'
              }
            >
              {brand.country}
            </span>
          </div>
          <span className="text-[0.72rem] text-white/55 block truncate">{brand.category}</span>
        </div>
      </div>
    );
  }

  return (
    <section
      className="bg-gradient-to-b from-ofs-navy-950 to-[#060e24] text-white py-14 border-y border-white/[0.08] relative overflow-hidden"
      aria-label="Approved Global Manufacturers & Brands"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-[radial-gradient(ellipse_at_center,rgba(224,42,48,0.08)_0%,transparent_70%)] blur-[60px] pointer-events-none" />

      <div className="w-full max-w-container mx-auto px-5 sm:px-8 lg:px-11 relative z-[2] mb-9">
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-ofs-gold-400 tracking-[0.08em] uppercase mb-2">
              <Sparkles size={14} />
              <span>Global Sourcing Network</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white m-0 tracking-tight">
              3,000+ Internationally Approved Brands
            </h2>
            <p className="text-sm text-white/65 mt-1.5 max-w-[620px] leading-relaxed">
              Direct authorized sourcing channels across premier US, European, and Japanese original equipment manufacturers with 100% verifiable mill test certificates.
            </p>
          </div>

          <Link
            href="/procurement-shipping"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-ofs-red-400 uppercase tracking-[0.05em] py-2 px-4 rounded-xs border border-ofs-red-600/30 bg-ofs-red-600/5 hover:text-white hover:bg-ofs-red-600 hover:border-ofs-red-600 transition-all duration-200 no-underline"
          >
            Explore Sourcing Standards <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mb-4">
        <div className="flex w-max animate-marquee-rtl hover:[animation-play-state:paused] will-change-transform">
          {[...row1Brands, ...row1Brands].map((b, i) => (
            <BrandChip key={`${b.name}-${i}`} brand={b} />
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee-rtl-slow hover:[animation-play-state:paused] will-change-transform">
          {[...row2Brands, ...row2Brands].map((b, i) => (
            <BrandChip key={`${b.name}-${i}`} brand={b} countryTone="green" />
          ))}
        </div>
      </div>
    </section>
  );
}
