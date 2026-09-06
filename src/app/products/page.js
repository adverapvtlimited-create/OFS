'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Zap, 
  Hammer, 
  Sun, 
  FlaskConical, 
  Wrench, 
  Settings, 
  Ship, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2 
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Badge from '@/components/ui/Badge';
import Container from '@/components/ui/Container';
import productsData from '@/data/products.json';
import ContactCTA from '@/components/sections/ContactCTA';

const iconMap = {
  Flame: Flame,
  Zap: Zap,
  Hammer: Hammer,
  Sun: Sun,
  FlaskConical: FlaskConical,
  Wrench: Wrench,
  Settings: Settings,
  Ship: Ship,
  ShieldCheck: ShieldCheck,
};

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(productsData.map((p) => p.category))];

  const filteredProducts = selectedCategory === 'All'
    ? productsData
    : productsData.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-ofs-navy-950 to-ofs-navy-900 text-white py-[5.5rem] relative overflow-hidden">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

        <Container className="relative z-10">
          <ScrollReveal direction="down" duration={0.5}>
            <div className="flex items-center gap-2 font-mono text-xs text-white/60 mb-6 uppercase">
              <Link href="/" className="text-white/70 hover:text-white transition-colors no-underline">
                Home
              </Link>
              <span>/</span>
              <span className="text-ofs-red-400">Products</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-5">
              <Badge variant="red">CERTIFIED INDUSTRIAL EQUIPMENT &amp; SUPPLIES</Badge>
            </div>
          </ScrollReveal>

          <h1 className="font-heading text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold leading-[1.1] text-white mb-6 max-w-[920px]">
            <TextReveal tag="span" duration={0.65}>
              Precision Products for
            </TextReveal>
            <br />
            <span className="gradient-text-red">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                Energy &amp; Marine Operations
              </TextReveal>
            </span>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-[1.18rem] text-white/85 max-w-[780px] leading-relaxed">
              Oriented Facility Solution (OFS) supplies certified OEM equipment, API 6D valves, drilling tubulars, turbomachinery spares, marine components, and electrical instrumentation across global industrial sectors.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Products Grid Section */}
      <section className="section-pad bg-ofs-gray-50">
        <Container>
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all shrink-0 cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-ofs-navy-950 text-white border-ofs-navy-950 shadow-md'
                    : 'bg-white text-ofs-navy-900 border-ofs-gray-200 hover:border-ofs-navy-300 hover:bg-ofs-navy-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid - Direct Link Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProducts.map((prod, idx) => {
              const IconComp = iconMap[prod.icon] || Wrench;
              return (
                <ScrollReveal key={prod.id} direction="up" delay={idx * 0.05}>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="card-modern p-0 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 h-full border border-ofs-gray-200 hover:border-ofs-navy-300 hover:-translate-y-1 bg-white rounded-xl group no-underline"
                  >
                    <div>
                      {/* Image Header with Zoom Hover & Floating Badge */}
                      <div className="h-[185px] relative overflow-hidden bg-ofs-navy-950">
                        <motion.img 
                          src={prod.heroImage} 
                          alt={prod.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-ofs-navy-950/20 via-transparent to-ofs-navy-950/60 pointer-events-none" />
                        
                        {/* Top Left Icon Badge */}
                        <div className="absolute top-3 left-3 w-9 h-9 rounded-xs bg-ofs-navy-950 text-ofs-red-400 grid place-content-center shadow-[0_4px_12px_rgba(12,30,78,0.3)] border border-white/10">
                          <IconComp size={18} />
                        </div>

                        {/* Category Pill Tag */}
                        <div className="absolute top-3 right-3 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-ofs-navy-950 shadow-xs border border-white/40">
                          {prod.category}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 pb-4">
                        <h2 className="font-heading text-base sm:text-lg font-bold text-ofs-navy-950 mb-2 leading-snug group-hover:text-ofs-red-600 transition-colors">
                          {prod.name}
                        </h2>

                        <p className="text-xs sm:text-[0.875rem] text-ofs-gray-600 leading-relaxed mb-4 line-clamp-3">
                          {prod.summary}
                        </p>

                        {/* Bullet Points with Red Checkmark Icons */}
                        <div className="flex flex-col gap-1.5 mb-3">
                          {prod.keyPoints.map((point, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-1.5 text-[0.78rem] text-ofs-gray-700">
                              <CheckCircle2 size={13} className="text-ofs-red-600 shrink-0 mt-0.5" />
                              <span className="leading-snug font-medium">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Action */}
                    <div className="py-3 px-5 border-t border-ofs-gray-200 bg-ofs-navy-50/70 flex justify-between items-center group-hover:bg-ofs-navy-100/60 transition-colors">
                      <span className="font-mono text-xs font-bold uppercase text-ofs-navy-950 flex items-center gap-1 group-hover:text-ofs-red-600 transition-colors">
                        Product Details <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </>
  );
}
