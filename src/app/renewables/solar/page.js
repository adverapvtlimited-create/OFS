'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sun,
  ArrowRight,
  ArrowLeft,
  Phone,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Wrench,
  MessageSquare,
  MapPin,
  PenTool,
  Send,
  Award,
  HardHat,
  Calendar,
  Settings,
  Layers,
  Building2,
  Maximize2,
  X,
  ChevronRight,
  ChevronsRight,
  Clock,
  Leaf,
  Info
} from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import siteConfig from '@/data/site-config.json';

/* ──────────────────────────────────────────────────
   Roadmap Steps Data (Exact match to reference image)
   ────────────────────────────────────────────────── */
const roadmapSteps = [
  {
    step: '01',
    title: 'Initial Consultation & Project Brief',
    icon: MessageSquare,
    headerBg: 'bg-[#15803d]',
    cardBg: 'bg-[#F0FDF4]',
    border: 'border-[#bbf7d0]',
    accentColor: '#15803d',
    chevronColor: '#15803d',
    bullets: [
      'Understand your site & energy needs',
      'Review site location, utility interconnection & load profile',
      'Discuss project goals, budget and scope',
    ],
    duration: '1–2 weeks',
    isReady: false,
  },
  {
    step: '02',
    title: 'Site Analysis & Feasibility Study',
    icon: MapPin,
    headerBg: 'bg-[#0284c7]',
    cardBg: 'bg-[#F0F9FF]',
    border: 'border-[#bae6fd]',
    accentColor: '#0284c7',
    chevronColor: '#0284c7',
    bullets: [
      'Site assessment (solar irradiance, shading, orientation)',
      'Evaluate site constraints (roof/ground, setbacks, access)',
      'Preliminary system sizing and layout options',
      'Financial & technical feasibility',
    ],
    duration: '2–4 weeks',
    isReady: false,
  },
  {
    step: '03',
    title: 'Permit Design & RMIT Design',
    icon: PenTool,
    headerBg: 'bg-[#1d4ed8]',
    cardBg: 'bg-[#EFF6FF]',
    border: 'border-[#bfdbfe]',
    accentColor: '#1d4ed8',
    chevronColor: '#1d4ed8',
    bullets: [
      'Prepare complete permit design package as per jurisdiction requirements',
      'Develop detailed drawings and calculations',
      'Coordinate with equipment specifications and compliance standards',
    ],
    duration: '2–6 weeks',
    isReady: false,
  },
  {
    step: '04',
    title: 'Permit Submission & Coordination',
    icon: Send,
    headerBg: 'bg-[#6d28d9]',
    cardBg: 'bg-[#FAF5FF]',
    border: 'border-[#e9d5ff]',
    accentColor: '#6d28d9',
    chevronColor: '#6d28d9',
    bullets: [
      'Submit complete permit package to authorities (as per their requirements)',
      'Respond to plan check comments and revisions',
      'Provide additional documents if required',
    ],
    duration: 'Varies (as per jurisdiction)',
    isReady: false,
  },
  {
    step: '05',
    title: 'Permit Issuance & Final Documentation',
    icon: Award,
    headerBg: 'bg-[#ea580c]',
    cardBg: 'bg-[#FFF7ED]',
    border: 'border-[#fed7aa]',
    accentColor: '#ea580c',
    chevronColor: '#ea580c',
    bullets: [
      'Receive approved permit and stamped drawings',
      'Finalize as-built drawing set',
      'Confirm compliance with all requirements',
      'Prepare construction-ready package',
    ],
    duration: '1–3 weeks (after approval)',
    isReady: false,
  },
  {
    step: '06',
    title: 'Ready for Construction',
    icon: Sun,
    headerBg: 'bg-[#15803d]',
    cardBg: 'bg-[#F0FDF4]',
    border: 'border-[#bbf7d0]',
    accentColor: '#15803d',
    chevronColor: '#15803d',
    bullets: [
      'Permit-ready drawings & documentation',
      'Equipment submittals and specs',
      'Procurement, installation and commissioning support',
    ],
    duration: 'Project ready to build',
    isReady: true,
  },
];

/* ──────────────────────────────────────────────────
   Permit Design Package 7 Cards (Coded + PDF Drawings)
   ────────────────────────────────────────────────── */
const permitPackageCards = [
  {
    id: 1,
    sheetCode: 'PV-3.0',
    title: 'Site / Plot Plan',
    image: '/images/live/permit-package/card-1-site-plan.png',
    bullets: [
      'Property boundaries',
      'Array layout & setbacks',
      'Access & equipment location',
      'Utility point of interconnection (POI)',
    ],
    pdfSheetTitle: 'PV-3.0: SITE PLAN (Scale 1/16" = 1\'-0")',
    pdfDetails: [
      'Property boundaries, driveway, fence line & ladder access',
      'Total Roof Area: 2,489.78 sq. ft. | Array Footprint: 175.28 sq. ft. (7.04% coverage)',
      '3\'-0" ridge and 1\'-6" valley fire setbacks per CRC R314 & CFC 2022',
      'Visible, lockable non-fused AC disconnect & PG&E utility meter location',
    ],
  },
  {
    id: 2,
    sheetCode: 'PV-5.0 & 6.0',
    title: 'Racking & Mounting Plan',
    image: '/images/live/permit-package/card-2-racking-mounting.png',
    bullets: [
      'Module layout & stringing',
      'Racking system details',
      'Roof attachment details',
      'Sections & elevations',
      'Structural notes',
    ],
    pdfSheetTitle: 'PV-5.0: ATTACHMENT PLAN & PV-6.0: STANDOFF DETAILS',
    pdfDetails: [
      'IronRidge XR-10 Rails with FlashFoot2 roof attachments (14 connections)',
      '2"x4" truss @ 24" O.C., 2.5" min lag bolt embedment with EPDM washer',
      'Distributed dead load: 2.3551 PSF (412.80 lbs array / 175.28 SF)',
      '24° tilt angle, 190° south-facing azimuth orientation',
    ],
  },
  {
    id: 3,
    sheetCode: 'PV-4.0',
    title: 'Electrical Plan',
    image: '/images/live/permit-package/card-3-electrical-plan.png',
    bullets: [
      'DC string layout',
      'Conduit & wiring routing',
      'Inverter & combiner locations',
      'Equipment schedules',
    ],
    pdfSheetTitle: 'PV-4.0: ELECTRICAL PLAN (Scale 3/32" = 1\'-0")',
    pdfDetails: [
      'Roof stringing layout: 8 modules in branch circuit',
      '3/4" EMT conduit run with temperature derating applied',
      'Conduit elevation: 7/8" min above rooftop or 18" below roof through attic',
      'Enphase IQ Combiner 4/4C with integrated IQ Gateway',
    ],
  },
  {
    id: 4,
    sheetCode: 'PV-7.0',
    title: 'Single-Line Diagram (SLD)',
    image: '/images/live/permit-package/card-4-line-diagram.png',
    bullets: [
      'PV array, inverter, AC combiner',
      'Utility interconnection',
      'Protection & metering',
      'Equipment ratings',
    ],
    pdfSheetTitle: 'PV-7.0: LINE DIAGRAM',
    pdfDetails: [
      '8x Enphase IQ8PLUS-72-2-US microinverters on 240V branch circuit',
      'Bi-directional utility meter combo, 1-phase, 3-wire, 120V/240V',
      'Load-side interconnection at 125A main service panel per NEC 705.12(B)',
      'Dedicated PV 20A/2P backfeed breaker at furthest busbar location',
    ],
  },
  {
    id: 5,
    sheetCode: 'PV-10.0',
    title: 'Equipment Specifications',
    image: '/images/live/permit-package/card-5-equipment-specs.png',
    bullets: [
      'Solar modules',
      'Inverters',
      'Racking system',
      'Balance of system (BOS)',
    ],
    pdfSheetTitle: 'PV-10.0 to PV-13.0: EQUIPMENT SPECIFICATIONS',
    pdfDetails: [
      'Canadian Solar CS3N-395MS (395W HiKu Mono PERC, Voc 44.3V, 19.4% eff)',
      'Enphase IQ8Plus Microinverters (290 VA peak AC output, 97% CEC eff)',
      'IronRidge UFO Universal Module Clamps & Stopper Sleeves',
      'Enphase IQ Combiner 4/4C (125A busbar, 80A continuous PV capacity)',
    ],
  },
  {
    id: 6,
    sheetCode: 'PV-8.0',
    title: 'Structural & Calculations',
    image: '/images/live/permit-package/card-6-structural-calculations.png',
    bullets: [
      'Wind & snow load analysis',
      'Racking structural calcs',
      'Roof load assessment',
      'Compliance with local codes',
    ],
    pdfSheetTitle: 'PV-8.0: ELECTRICAL & STRUCTURAL CALCULATIONS',
    pdfDetails: [
      'Distributed dead load: 2.3551 PSF (412.80 lbs / 175.28 SF)',
      'Conductor ampacity: 13.30A calculated -> #10 AWG THWN-2 selected',
      '120% Busbar rule: 125A MCB + 20A PV = 145A <= 150A (1.2 x 125A) -> PASS',
      'Conforms to ASCE 7-16, CBC 2022 wind exposure & snow load standards',
    ],
  },
  {
    id: 7,
    sheetCode: 'PV-9.0',
    title: 'Compliance Documents',
    image: '/images/live/permit-package/card-7-compliance-documents.png',
    bullets: [
      'Product datasheets',
      'Cut sheets',
      'Labeling & placards',
      'Code compliance notes',
    ],
    pdfSheetTitle: 'PV-9.0: WARNING LABELS & PLACARDS',
    pdfDetails: [
      'NEC 690.12 Rapid Shutdown switch and array warning placard set',
      'UL 1741 & IEEE 1547 Certificate of Compliance for utility parallel operation',
      'UL 2703 Class A fire rated test verification of conformity (Intertek)',
      'CEC 2022, CBC 2022, CRC 2022, CFC 2022 applicable code schedule',
    ],
  },
];

export default function SolarEngineeringPage() {
  const [activeModalCard, setActiveModalCard] = useState(null);

  // Lock body & html scroll, pause Lenis smooth scroll, and handle escape key when modal is open
  useEffect(() => {
    if (activeModalCard) {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }

      const originalOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setActiveModalCard(null);
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        if (typeof window !== 'undefined' && window.lenis) {
          window.lenis.start();
        }
        document.body.style.overflow = originalOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeModalCard]);

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-emerald-500 selection:text-white overflow-x-hidden">

      {/* Top Breadcrumb & Return Bar */}
      <section className="pt-6 sm:pt-8 pb-3 bg-white border-b border-slate-100">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-slate-500">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors no-underline">
                Home
              </Link>
              <span>/</span>
              <Link href="/renewables" className="text-slate-600 hover:text-emerald-700 transition-colors no-underline">
                Renewables
              </Link>
              <span>/</span>
              <span className="text-emerald-700 font-bold">Solar Engineering</span>
            </nav>

            <Link
              href="/renewables"
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-700 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200 shadow-2xs px-3.5 py-1.5 rounded-full transition-all duration-200 no-underline"
            >
              <ArrowLeft size={13} className="text-slate-500" /> Back to OFS Renewables
            </Link>
          </div>
        </div>
      </section>


      <section className="pt-4 sm:pt-6 pb-6 sm:pb-8 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" duration={0.4}>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-[24px] border border-slate-200/90 bg-[#F6FBFE] shadow-md shadow-slate-900/5 min-h-[140px] sm:min-h-[155px] flex items-center">


                    {/* Background: Solar Rooftop Engineer Installation (Zero Artifacts, Pure CSS Seamless Blend) */}
              <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
                <img
                  src="/images/live/solar-hero-engineer.png"
                  alt="Solar Technical Permitting & Engineering"
                  className="absolute right-0 top-0 bottom-0 h-full w-[70%] sm:w-[60%] md:w-[54%] lg:w-[50%] object-cover object-[center_35%] opacity-40 sm:opacity-100 transition-opacity duration-300"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, transparent 12%, black 60%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 12%, black 60%, black 100%)',
                  }}
                />
              </div>

              {/* Main Content Layer */}
              <div className="relative z-10 w-full px-5 py-4 sm:px-7 sm:py-5 md:px-8 md:py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">

                {/* Left Side: Brand Logo + Green Divider + Text */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 lg:gap-7 max-w-3xl lg:max-w-4xl">

                  {/* Pure Vector & Coded OFS Renewables Logo */}
                  <div className="shrink-0 flex flex-col select-none">
                    <div className="flex items-center">
                      {/* Slashed 'O' Circle */}
                      <div className="relative inline-flex items-center justify-center mr-0.5">
                        <svg
                          viewBox="0 0 32 32"
                          className="w-6 h-6 sm:w-7 sm:h-7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="12.5"
                            stroke="#0C1E4E"
                            strokeWidth="3.5"
                          />
                          <path
                            d="M19 4L9 18H16L13 28L23 14H16L19 4Z"
                            fill="#16a34a"
                            stroke="#F6FBFE"
                            strokeWidth="1"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      {/* FS Letters */}
                      <span className="font-heading text-xl sm:text-2xl font-black text-[#0C1E4E] tracking-tight">
                        FS
                      </span>

                      {/* RENEWABLES Wordmark */}
                      <span className="font-heading text-base sm:text-lg md:text-xl font-bold tracking-[0.22em] text-[#0C1E4E] ml-2">
                        RENEWABLES
                      </span>
                    </div>

                    {/* Subtitle */}
                    <div className="text-[7.5px] sm:text-[8.5px] font-mono tracking-[0.16em] text-slate-500 font-semibold uppercase mt-1">
                      SOLAR <span className="text-slate-300">|</span> WIND <span className="text-slate-300">|</span> BESS <span className="text-slate-300">|</span> EPC <span className="text-slate-300">|</span> SUSTAINABLE SOLUTIONS
                    </div>
                  </div>

                  {/* Vertical Green Divider Bar */}
                  <div className="hidden sm:block h-12 md:h-14 w-[2px] bg-[#16a34a] rounded-full shrink-0" />

                  {/* Typography: Proposal to Permit */}
                  <div className="min-w-0">
                    <h1 className="font-heading text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.25rem] font-extrabold text-[#0C1E4E] tracking-tight leading-[1.08]">
                      Proposal to Permit
                    </h1>
                    <div className="text-sm sm:text-base md:text-lg font-bold text-[#16a34a] mt-0.5 sm:mt-1 leading-snug">
                      Your Solar Project, Our End-to-End Support
                    </div>
                    <p className="text-xs sm:text-[13px] md:text-sm text-slate-600 leading-relaxed mt-1.5 max-w-xl font-normal">
                      From initial concept to permit-ready design, we deliver complete permit drawings and documentation as per your local jurisdiction&apos;s requirements — so you can submit with confidence.
                    </p>
                  </div>

                </div>

                {/* Right Spacer for Desktop layout balance */}
                <div className="hidden xl:block w-48 shrink-0 pointer-events-none" />

              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: THE PERMIT DESIGN ROADMAP (6 STEPS WITH CHEVRONS)
          ═══════════════════════════════════════════════════════ */}
      <section className="py-6 sm:py-8 md:py-10 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header with Green Underline */}
          <div className="mb-6 sm:mb-8">
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0C1E4E] tracking-tight">
              The Permit Design Roadmap
            </h2>
            <div className="h-[3px] w-20 bg-emerald-500 rounded-full mt-1.5" />
          </div>

          {/* 6 Steps Sequential Layout with Chevrons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 relative items-stretch">
            {roadmapSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isLast = idx === roadmapSteps.length - 1;

              return (
                <div key={step.step} className="flex items-stretch relative">

                  {/* The Card */}
                  <div
                    className={`w-full rounded-2xl border ${step.border} ${step.cardBg} flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200`}
                  >
                    {/* Header Pill */}
                    <div
                      className={`${step.headerBg} text-white px-3.5 py-2.5 flex items-center gap-2.5 rounded-t-xl`}
                    >
                      {/* Number circle */}
                      <div className="w-6 h-6 rounded-full bg-white/20 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                        {step.step}
                      </div>

                      {/* Icon */}
                      <StepIcon size={16} className="shrink-0 text-white/95" />

                      {/* Title */}
                      <h3 className="font-heading text-xs font-bold text-white leading-tight">
                        {step.title}
                      </h3>
                    </div>

                    {/* Card Body: Bullets */}
                    <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
                      <ul className="space-y-2 pl-0 list-none mb-4">
                        {step.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="text-[11px] sm:text-xs text-slate-700 flex items-start gap-1.5 leading-snug"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0 mt-1"
                              style={{ background: step.accentColor }}
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Footer Badge */}
                      {step.isReady && (
                        <div className="pt-2 border-t border-slate-200/50 flex items-center gap-1.5 mt-auto">
                          <div className="w-4 h-4 rounded-full bg-[#15803d] text-white flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </div>
                          <span className="text-[11px] font-bold text-[#15803d]">
                            {step.duration}
                          </span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Desktop Right Chevron Arrow (except last card) */}
                  {!isLast && (
                    <div className="hidden xl:flex items-center justify-center -mr-2 z-20 pointer-events-none pl-1">
                      <ChevronsRight size={18} style={{ color: step.chevronColor }} />
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: THE PERMIT DESIGN PACKAGE (7 CARDS + PDF DRAWINGS - VERTICAL FORMAT)
          ═══════════════════════════════════════════════════════ */}
      <section className="py-6 sm:py-8 md:py-10 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Outer Container: Light Sky-Blue Frame */}
          <ScrollReveal direction="up" duration={0.4}>
            <div className="bg-[#F0F7FD] border border-[#DCEBF7] rounded-3xl p-5 sm:p-7 lg:p-8 shadow-xs">

              {/* Section Header & Value Propositions */}
              <div className="border-b border-[#DCEBF7] pb-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0C1E4E] tracking-tight leading-tight">
                      The Permit Design Package
                    </h2>
                    <div className="h-[3px] w-20 bg-emerald-500 rounded-full mt-2" />
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5 max-w-2xl">
                      We prepare a complete set of technical drawings, calculations and documents tailored to your jurisdiction&apos;s permit requirements.
                    </p>
                  </div>

                  {/* Interaction Hint */}
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-full shadow-2xs">
                      <Info size={13} className="text-emerald-600" />
                      Click any card to inspect CAD drawing
                    </span>
                  </div>
                </div>

                {/* 3 Value Propositions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div className="flex items-center gap-3 bg-white border border-[#DCEBF7] rounded-xl p-3 shadow-2xs">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0C1E4E] flex items-center justify-center shrink-0 border border-emerald-100">
                      <FileText size={16} className="text-emerald-700" />
                    </div>
                    <p className="text-xs font-medium text-slate-700 leading-snug mb-0">
                      Compliant with local building, electrical &amp; fire codes
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-white border border-[#DCEBF7] rounded-xl p-3 shadow-2xs">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0C1E4E] flex items-center justify-center shrink-0 border border-emerald-100">
                      <Settings size={16} className="text-emerald-700" />
                    </div>
                    <p className="text-xs font-medium text-slate-700 leading-snug mb-0">
                      Accurate, detailed and ready for submission
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-white border border-[#DCEBF7] rounded-xl p-3 shadow-2xs">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0C1E4E] flex items-center justify-center shrink-0 border border-emerald-100">
                      <ShieldCheck size={16} className="text-emerald-700" />
                    </div>
                    <p className="text-xs font-medium text-slate-700 leading-snug mb-0">
                      Supports faster approvals &amp; smooth installation
                    </p>
                  </div>
                </div>
              </div>

              {/* 7 Cards Arranged Vertically (1 to 7 Stack) */}
              <div className="space-y-3.5">
                {permitPackageCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setActiveModalCard(card)}
                    className="bg-white border border-[#DCEBF7] hover:border-emerald-500 hover:shadow-md rounded-2xl p-4 sm:p-5 transition-all duration-200 cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6"
                  >
                    {/* Left: Number + Title + Sheet Code */}
                    <div className="flex items-center gap-3.5 md:w-64 lg:w-72 shrink-0">
                      <div className="w-9 h-9 rounded-xl bg-[#0C1E4E] group-hover:bg-emerald-600 text-white flex items-center justify-center text-xs font-extrabold shrink-0 transition-colors shadow-2xs">
                        0{card.id}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading text-sm sm:text-base font-bold text-[#0C1E4E] group-hover:text-emerald-700 transition-colors leading-tight">
                          {card.title}
                        </h3>
                        <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 inline-block mt-1">
                          {card.sheetCode}
                        </span>
                      </div>
                    </div>

                    {/* Middle-Left: Drawing Thumbnail Preview with Zoom Overlay */}
                    <div className="w-full sm:w-48 md:w-44 h-24 bg-slate-50 border border-slate-200/80 rounded-xl overflow-hidden flex items-center justify-center relative p-1.5 shrink-0 group-hover:bg-slate-100 transition-colors">
                      <img
                        src={card.image}
                        alt={`${card.title} engineering drawing from permit set`}
                        className="w-full h-full object-contain filter contrast-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#0C1E4E]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[1px]">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-white bg-[#0C1E4E] px-2.5 py-1 rounded-md shadow-xs">
                          <Maximize2 size={11} /> Expand
                        </span>
                      </div>
                    </div>

                    {/* Middle-Right: Scope Bullets */}
                    <div className="flex-1 min-w-0">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pl-0 list-none mb-0">
                        {card.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-xs text-slate-600 flex items-start gap-1.5 leading-snug">
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Inspect Button CTA */}
                    <div className="shrink-0 flex items-center justify-end">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white border border-emerald-200/80 group-hover:border-emerald-600 px-3.5 py-2 rounded-xl transition-all shadow-2xs"
                      >
                        <span>Inspect CAD</span>
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: BOTTOM PANORAMIC FOOTER STRIP (EXACT MATCH TO IMAGE)
          "Smarter Designs. Smoother Permits. A Greener Future."
          ═══════════════════════════════════════════════════════ */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" duration={0.4}>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-[24px] bg-gradient-to-r from-[#071739] via-[#0B2545] to-[#0A1D3D] text-white shadow-xl min-h-[96px] sm:min-h-[110px] flex items-center border border-slate-800">

              {/* Right Side Subtle Solar Panel Atmosphere (100% Clean, Zero Baked-In Text) */}
              <div className="absolute right-0 top-0 bottom-0 w-[45%] pointer-events-none overflow-hidden select-none opacity-20">
                <img
                  src="/images/live/renewables-hero-panorama.jpg"
                  alt=""
                  className="w-full h-full object-cover object-center"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, transparent 10%, black 80%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 10%, black 80%)',
                  }}
                />
              </div>

              {/* Main Content Row */}
              <div className="relative z-10 w-full px-5 py-4 sm:px-8 sm:py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">

                {/* Left: Glowing Leaf Icon + 3-Line Tagline */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Leaf size={22} className="text-[#22c55e]" />
                  </div>
                  <div className="leading-tight">
                    <div className="font-heading text-sm sm:text-base font-bold text-white tracking-tight">
                      Smarter Designs.
                    </div>
                    <div className="font-heading text-sm sm:text-base font-bold text-white tracking-tight">
                      Smoother Permits.
                    </div>
                    <div className="font-heading text-sm sm:text-base font-bold text-[#22c55e] tracking-tight">
                      A Greener Future.
                    </div>
                  </div>
                </div>

                {/* Vertical Divider after Tagline */}
                <div className="hidden lg:block h-10 w-[1px] bg-white/20 shrink-0" />

                {/* Center: 4 Trust Pillars with Dividers */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center flex-1 justify-around">

                  {/* Pillar 1 */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-emerald-400">
                      <Sun size={17} />
                    </div>
                    <span className="text-xs sm:text-[13px] font-medium text-slate-200 leading-snug">
                      Site-Specific Engineering
                    </span>
                  </div>

                  {/* Pillar 2 */}
                  <div className="flex items-center gap-2.5 sm:border-l sm:border-white/15 sm:pl-6 lg:pl-8">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-emerald-400">
                      <ShieldCheck size={17} />
                    </div>
                    <span className="text-xs sm:text-[13px] font-medium text-slate-200 leading-snug">
                      Code Compliant &amp; Accurate
                    </span>
                  </div>

                  {/* Pillar 3 */}
                  <div className="flex items-center gap-2.5 sm:border-l sm:border-white/15 sm:pl-6 lg:pl-8">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-emerald-400">
                      <Clock size={17} />
                    </div>
                    <span className="text-xs sm:text-[13px] font-medium text-slate-200 leading-snug">
                      On-Time Delivery
                    </span>
                  </div>

                  {/* Pillar 4 */}
                  <div className="flex items-center gap-2.5 sm:border-l sm:border-white/15 sm:pl-6 lg:pl-8">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-emerald-400">
                      <Leaf size={17} />
                    </div>
                    <span className="text-xs sm:text-[13px] font-medium text-slate-200 leading-snug">
                      Sustainable Energy Solutions
                    </span>
                  </div>

                </div>

                {/* Vertical Divider before Logo */}
                <div className="hidden lg:block h-10 w-[1px] bg-white/20 shrink-0" />

                {/* Right: OFS RENEWABLES Brand Logo with green accent */}
                <div className="shrink-0 flex items-center justify-end">
                  <div className="flex flex-col items-end">
                    <div className="font-heading font-extrabold text-sm sm:text-base tracking-[0.18em] text-white">
                      OFS <span className="font-semibold text-slate-300">RENEWABLES</span>
                    </div>
                    <div className="h-[2px] w-full bg-[#16a34a] rounded-full mt-0.5" />
                  </div>
                </div>

              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════
          SECTION 6: CTA — CONSULTATION & PROPOSAL
          ═══════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200/60">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-white border border-emerald-200/90 rounded-3xl p-7 sm:p-10 text-center relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#0C1E4E] mb-3">
              Need Immediate Solar Permit Design or Engineering Support?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-6">
              Our engineering team prepares jurisdiction-ready CAD plan sets with licensed PE review across the US.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact?service=Renewables+%26+Solar"
                className="px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm transition-all duration-200 inline-flex items-center gap-2 no-underline shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30"
              >
                Request Permit Plan Set Quote
                <ArrowRight size={15} />
              </Link>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all duration-200 border border-slate-300 shadow-xs inline-flex items-center gap-2 no-underline"
              >
                <Phone size={14} className="text-emerald-600" />
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MODAL / LIGHTBOX: High-Resolution CAD Drawing Inspector
          ═══════════════════════════════════════════════════════ */}
      {activeModalCard && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent="true"
          className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in-menu overscroll-contain"
          onClick={() => setActiveModalCard(null)}
          onWheel={(e) => e.stopPropagation()}
        >
          <div
            data-lenis-prevent="true"
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#0C1E4E] text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                  {activeModalCard.id}
                </div>
                <div>
                  <h3 className="font-heading text-base sm:text-lg font-bold">
                    {activeModalCard.title}
                  </h3>
                  <div className="text-[11px] font-mono text-emerald-400">
                    {activeModalCard.pdfSheetTitle}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveModalCard(null)}
                className="text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div
              data-lenis-prevent="true"
              className="overflow-y-auto p-6 space-y-6 overscroll-contain flex-1"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* High-Res Drawing Image */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-2">
                <img
                  src={activeModalCard.image}
                  alt={activeModalCard.title}
                  className="w-full h-auto max-h-[480px] object-contain mx-auto select-none"
                />
              </div>

              {/* Technical Specifications - Vertical Stack */}
              <div className="flex flex-col gap-4">
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold mb-2.5">
                    Scope of Deliverable
                  </h4>
                  <ul className="space-y-1.5 pl-0 list-none mb-0">
                    {activeModalCard.bullets.map((b, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#0C1E4E] font-bold mb-2.5">
                    Technical PDF Plan Set Notes
                  </h4>
                  <ul className="space-y-1.5 pl-0 list-none mb-0">
                    {activeModalCard.pdfDetails.map((d, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end shrink-0">
              <button
                onClick={() => setActiveModalCard(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
