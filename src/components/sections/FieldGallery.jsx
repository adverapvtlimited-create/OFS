'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Eye, X, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Badge from '@/components/ui/Badge';
import Container from '@/components/ui/Container';
import SectionPad from '@/components/ui/SectionPad';

// Randomized / non-sequential list of real project & field operation photos from public/ofsImages
const galleryPhotos = [
  {
    id: 1,
    src: '/ofsImages/marine.jpeg',
    title: 'Offshore Mooring Operations',
    category: 'Marine & Offshore',
    tag: 'Offshore Logistics',
    location: 'Offshore Basin',
  },
  {
    id: 2,
    src: '/ofsImages/WhatsApp%20Image%202026-08-21%20at%209.07.24%20PM.jpeg',
    title: 'Offshore Marine Operations',
    category: 'Heavy Engineering',
    tag: 'Fabrication Yard',
    location: 'Operations Hub',
  },
  {
    id: 3,
    src: '/ofsImages/site.jpeg',
    title: 'Civil Works & Site Preparation',
    category: 'Civil Engineering',
    tag: 'Groundworks',
    location: 'Project Site',
  },
  {
    id: 4,
    src: '/ofsImages/WhatsApp%20Image%202026-08-21%20at%209.07.49%20PM.jpeg',
    title: 'Equipment Setup & Power Generation',
    category: 'Equipment Operations',
    tag: 'Generator Setup',
    location: 'Project Staging Area',
  },
  {
    id: 5,
    src: '/ofsImages/mariness.jpeg',
    title: 'Vessel Mooring Operations',
    category: 'Marine Logistics',
    tag: 'Emergency Freight',
    location: 'Coastal Deepwater Port',
  },
  {
    id: 6,
    src: '/ofsImages/WhatsApp%20Image%202026-08-21%20at%209.07.22%20PM.jpeg',
    title: 'Offshore Maintenance & Field Services',
    category: 'Quality Control',
    tag: 'EN 10204 3.1 Verification',
    location: 'QA Testing Bay',
  },
  {
    id: 7,
    src: '/ofsImages/WhatsApp%20Image%202026-08-21%20at%209.07.54%20PM.jpeg',
    title: 'Skid Integration & Field Assembly',
    category: 'EPC Support',
    tag: 'Skid Refurbishment',
    location: 'Field Integration Site',
  },
  {
    id: 8,
    src: '/ofsImages/WhatsApp%20Image%202026-08-21%20at%209.07.25%20PM.jpeg',
    title: 'Supply Chain Staging & Warehousing',
    category: 'Warehouse & SCM',
    tag: 'Inventory Staging',
    location: 'Central Depot',
  },
  {
    id: 9,
    src: '/ofsImages/WhatsApp%20Image%202026-08-21%20at%209.07.50%20PM.jpeg',
    title: 'Pipeline Installation & Construction Support',
    category: 'Field Logistics',
    tag: 'Track Operations',
    location: 'Field Site',
  },
  {
    id: 10,
    src: '/ofsImages/WhatsApp%20Image%202026-08-21%20at%209.07.23%20PM.jpeg',
    title: 'Marine Spill Response & Containment',
    category: 'Offshore Operations',
    tag: 'Marine Booms',
    location: 'Offshore Facility',
  },
  {
    id: 11,
    src: '/ofsImages/WhatsApp%20Image%202026-08-21%20at%209.07.53%20PM.jpeg',
    title: 'Pipeline Inspection & Field Survey',
    category: 'Instrumentation',
    tag: 'Control Valves',
    location: 'Process Unit',
  },
  {
    id: 12,
    src: '/ofsImages/WhatsApp%20Image%202026-08-21%20at%209.07.26%20PM.jpeg',
    title: 'Mechanical Maintenance & Flange Services',
    category: 'Mechanical Engineering',
    tag: 'Pipe Fitting',
    location: 'Deck Operations',
  },
];

export default function FieldGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <SectionPad
      className="bg-ofs-navy-950 text-white relative overflow-hidden py-16 sm:py-20 border-b border-white/[0.08]"
      id="field-gallery"
      aria-label="Field Operations & Execution Gallery"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(224,42,48,0.12)_0%,transparent_70%)] blur-[70px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(12,30,78,0.35)_0%,transparent_70%)] blur-[80px] pointer-events-none" />

      <Container className="relative z-10 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-[760px]">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-ofs-gold-400 tracking-[0.08em] uppercase mb-3 bg-amber-500/10 py-1 px-3 rounded-full border border-amber-500/20">
                <Camera size={14} className="text-ofs-gold-400" />
                <span>Field Operations &amp; Project Footprint</span>
              </div>
            </ScrollReveal>

            <h2 className="text-[clamp(2rem,3.8vw,3.25rem)] font-heading font-extrabold tracking-[-0.03em] text-white leading-[1.15] mb-3">
              <TextReveal tag="span" duration={0.6}>
                Operational Excellence
              </TextReveal>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ofs-red-400 via-rose-300 to-amber-300">
                <TextReveal tag="span" delay={0.15} duration={0.6}>
                  Captured in the Field
                </TextReveal>
              </span>
            </h2>

            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-[660px]">
                Real-world operational records from our marine support vessels, high-pressure fabrication yards, refinery turnaround staging, and global procurement deployments.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.25} className="shrink-0">
           
          </ScrollReveal>
        </div>
      </Container>

      {/* Row 1: Continuous RTL Auto-Scrolling Photo Marquee (Set A - 6 Distinct Photos) */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] mb-8 sm:mb-10">
        <div className="flex w-max animate-marquee-rtl hover:[animation-play-state:paused] will-change-transform gap-6 sm:gap-8 px-4">
          {[...galleryPhotos.slice(0, 6), ...galleryPhotos.slice(0, 6), ...galleryPhotos.slice(0, 6)].map((photo, index) => (
            <div
              key={`row1-${photo.id}-${index}`}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative w-[310px] sm:w-[370px] h-[220px] sm:h-[250px] rounded-2xl overflow-hidden bg-ofs-navy-900 border border-white/15 cursor-pointer transition-all duration-300 hover:border-ofs-red-500 hover:shadow-[0_20px_40px_rgba(224,42,48,0.3)] hover:-translate-y-1.5 shrink-0"
            >
              {/* Image */}
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ofs-navy-950 via-ofs-navy-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Top Category Badge */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                <span className="font-mono text-[0.68rem] font-bold uppercase py-1 px-2.5 rounded-full bg-ofs-navy-950/90 text-ofs-gold-400 border border-amber-500/30 backdrop-blur-md shadow-md">
                  {photo.category}
                </span>
              </div>

              {/* Quick View Hover Icon */}
              <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white grid place-content-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                <Eye size={15} />
              </div>

              {/* Bottom Metadata */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 transform transition-transform duration-300">
                <div className="font-mono text-[0.7rem] text-white/60 mb-1 flex items-center gap-2">
                  <span>{photo.tag}</span>
                  <span>&bull;</span>
                  <span>{photo.location}</span>
                </div>
                <h4 className="font-heading text-sm sm:text-base font-bold text-white tracking-tight leading-snug group-hover:text-ofs-gold-300 transition-colors line-clamp-1">
                  {photo.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse/Slow Auto-Scrolling Photo Marquee (Set B - 6 Completely Different Photos) */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max animate-marquee-rtl-slow hover:[animation-play-state:paused] will-change-transform gap-6 sm:gap-8 px-4">
          {[...galleryPhotos.slice(6), ...galleryPhotos.slice(6), ...galleryPhotos.slice(6)].map((photo, index) => (
            <div
              key={`row2-${photo.id}-${index}`}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative w-[310px] sm:w-[370px] h-[220px] sm:h-[250px] rounded-2xl overflow-hidden bg-ofs-navy-900 border border-white/15 cursor-pointer transition-all duration-300 hover:border-emerald-400 hover:shadow-[0_20px_40px_rgba(16,185,129,0.25)] hover:-translate-y-1.5 shrink-0"
            >
              {/* Image */}
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ofs-navy-950 via-ofs-navy-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Top Category Badge */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                <span className="font-mono text-[0.68rem] font-bold uppercase py-1 px-2.5 rounded-full bg-ofs-navy-950/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow-md">
                  {photo.category}
                </span>
              </div>

              {/* Quick View Hover Icon */}
              <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white grid place-content-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                <Eye size={15} />
              </div>

              {/* Bottom Metadata */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 transform transition-transform duration-300">
                <div className="font-mono text-[0.7rem] text-white/60 mb-1 flex items-center gap-2">
                  <span>{photo.tag}</span>
                  <span>&bull;</span>
                  <span>{photo.location}</span>
                </div>
                <h4 className="font-heading text-sm sm:text-base font-bold text-white tracking-tight leading-snug group-hover:text-emerald-300 transition-colors line-clamp-1">
                  {photo.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[1100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative bg-ofs-navy-900 border border-white/20 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-ofs-navy-950">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase py-1 px-2.5 rounded-full bg-ofs-red-600/20 text-ofs-red-400 border border-ofs-red-500/30">
                  {selectedPhoto.category}
                </span>
                <span className="text-white/60 text-xs font-mono">
                  {selectedPhoto.location}
                </span>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-content-center transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative w-full h-[260px] sm:h-[400px] md:h-[480px] max-h-[55vh] bg-black grid place-content-center overflow-hidden">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-6 bg-ofs-navy-950 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-heading text-base sm:text-xl font-bold text-white mb-1">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-mono m-0">
                  Verified field documentation record &bull; OFS Operations
                </p>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="btn btn-primary w-full sm:w-auto py-2.5 px-5 text-xs font-mono uppercase tracking-wider text-center"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </SectionPad>
  );
}
