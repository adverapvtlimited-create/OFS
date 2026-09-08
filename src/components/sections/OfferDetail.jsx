'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Breadcrumbs from '@/components/SEO/Breadcrumbs';
import JsonLd from '@/components/SEO/JsonLd';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { getRelatedOffers } from '@/lib/offers';
import { whatWeOffer } from '@/data/navigation';
import { buildWebPageSchema } from '@/lib/schema';
import { cn } from '@/lib/cn';

function formatText(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-inherit">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function renderParagraph(para, pIdx) {
  if (para.startsWith('“') || para.startsWith('"') || para.startsWith('”')) {
    return (
      <blockquote
        key={pIdx}
        className="my-3 p-4 pl-5 border-l-4 border-ofs-navy-600 bg-ofs-navy-50/70 rounded-r-lg font-heading italic text-ofs-navy-900 font-semibold text-[1.05rem]"
      >
        {formatText(para)}
      </blockquote>
    );
  }

  const colonMatch = para.match(/^([^:\n]{3,80}):\s*(.+)$/);
  if (colonMatch && !para.startsWith('http')) {
    const lead = colonMatch[1].trim();
    const body = colonMatch[2].trim();
    return (
      <div
        key={pIdx}
        className="flex items-start gap-3 p-4 mb-2.5 rounded-lg bg-ofs-navy-50/60 border border-ofs-navy-100 transition-all duration-150 hover:bg-ofs-navy-50"
      >
        <CheckCircle2 size={18} className="text-ofs-red-600 shrink-0 mt-0.5" />
        <div className="text-[0.98rem] text-ofs-gray-700 leading-relaxed">
          <strong className="text-ofs-navy-950 font-bold mr-1.5">{lead}:</strong>
          <span>{formatText(body)}</span>
        </div>
      </div>
    );
  }

  return (
    <p key={pIdx} className="text-[1.02rem] text-ofs-gray-700 leading-relaxed mb-4">
      {formatText(para)}
    </p>
  );
}

function renderSection(section) {
  return (
    <div key={section.title} className="mb-14 max-w-[900px]">
      <h2 className="font-heading text-2xl sm:text-[1.75rem] font-extrabold text-ofs-navy-950 mb-5">
        {section.title}
      </h2>
      <div className="flex flex-col gap-1">
        {section.paragraphs.map((para, pIdx) => renderParagraph(para, pIdx))}
      </div>
    </div>
  );
}

function renderGallery(gallery, title) {
  if (!gallery?.length) return null;

  return (
    <div className="mb-16 max-w-[1100px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {gallery.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-ofs-gray-200 bg-ofs-gray-50 shadow-lg"
          >
            <img
              src={image.src}
              alt={image.alt || `${title} service image ${index + 1}`}
              className={cn(
                'h-full w-full',
                image.fit === 'contain' ? 'object-contain p-5 sm:p-7' : 'object-cover'
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Custom renderer for rich blocks */
function renderCustomBlock(block, index) {
  if (!block) return null;

  // 1. Subscribe form block (e.g. Join the OFS Project Supply Revolution)
  if (block.hasSubscribeForm) {
    const isDark = block.variant === 'dark';
    return (
      <React.Fragment key={block.title || `block-${index}`}>
        <section
          className={cn(
            'py-16 sm:py-20 lg:py-24 relative overflow-hidden',
            isDark ? 'bg-ofs-navy-950 text-white' : 'bg-white text-ofs-navy-950'
          )}
        >
          {isDark && (
            <div className="bg-grid-pattern-dark absolute inset-0 opacity-40 pointer-events-none" />
          )}
          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left: Heading, Underline, Paragraph */}
              <ScrollReveal direction="left" className="lg:col-span-7 flex flex-col items-start">
                <h2
                  className={cn(
                    'font-heading text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold mb-3 tracking-tight',
                    isDark ? 'text-white' : 'text-ofs-navy-950'
                  )}
                >
                  {block.title}
                </h2>
                <div
                  className={cn(
                    'w-16 h-1 rounded-full mb-6',
                    isDark ? 'bg-ofs-navy-400' : 'bg-ofs-navy-300'
                  )}
                />

                <div
                  className={cn(
                    'space-y-4 text-[1.02rem] sm:text-[1.05rem] leading-relaxed',
                    isDark ? 'text-gray-200' : 'text-ofs-gray-700'
                  )}
                >
                  {block.paragraphs?.map((p, i) => (
                    <p key={i}>{formatText(p)}</p>
                  ))}
                </div>
              </ScrollReveal>

              {/* Right: Image */}
              <ScrollReveal direction="right" className="lg:col-span-5 w-full">
                <div
                  className={cn(
                    'rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/3] sm:aspect-[16/11]',
                    isDark
                      ? 'border border-white/10 ring-1 ring-white/5 bg-ofs-navy-900'
                      : 'border border-ofs-gray-200 bg-ofs-gray-100'
                  )}
                >
                  <img
                    src={block.image.src}
                    alt={block.image.alt || block.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* Subscribe newsletter section directly beneath on white background */}
        <section className="bg-white py-12 sm:py-14 border-t border-ofs-gray-100">
          <Container>
            <div className="max-w-3xl mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for your interest in OFS Project Supply!');
                }}
                className="w-full space-y-3"
              >
                <label className="block text-xs font-bold tracking-wider text-ofs-gray-600 uppercase">
                  EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder=""
                  className="w-full px-4 py-3 rounded-md bg-white text-ofs-navy-950 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ofs-navy-600 text-sm shadow-sm"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-ofs-navy-950 text-white font-semibold text-sm hover:bg-ofs-navy-900 transition-colors shadow-md cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </Container>
        </section>
      </React.Fragment>
    );
  }

  // 2. OEM Banner / Large Stat Cards
  if (block.type === 'oem-banner') {
    return (
      <section
        key={`oem-banner-${index}`}
        className="py-16 sm:py-20 bg-ofs-navy-950 text-white relative overflow-hidden border-t border-white/10"
      >
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-40 pointer-events-none" />
        <Container className="relative z-10">
          <ScrollReveal direction="up" className="max-w-4xl mx-auto text-center mb-12">
            {block.eyebrow && (
              <div className="tag-badge badge-red mb-4 inline-block">{block.eyebrow}</div>
            )}
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold text-white mb-4 tracking-tight leading-tight">
              {block.title}
            </h2>
            <div className="w-20 h-1 bg-ofs-navy-400 rounded-full mx-auto" />
          </ScrollReveal>

          {block.stats?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {block.stats.map((st, sIdx) => (
                <ScrollReveal key={sIdx} direction={sIdx === 0 ? 'left' : 'right'}>
                  <div className="group rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 shadow-2xl">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={st.image}
                        alt={st.label}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ofs-navy-950/90 via-ofs-navy-950/20 to-transparent" />
                    </div>
                    <div className="p-6 sm:p-7 text-center">
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-white leading-snug">
                        {st.label}
                      </h3>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    );
  }

  // 3. 6-Card Grid (e.g. Our Offering)
  if (block.type === 'card-grid') {
    return (
      <section
        key={block.title || `block-${index}`}
        className="py-16 sm:py-20 bg-white text-ofs-navy-950 border-t border-ofs-gray-100"
      >
        <Container>
          <ScrollReveal direction="up" className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold text-ofs-navy-950 mb-3 tracking-tight">
              {block.title}
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-ofs-navy-300 rounded-full mx-auto mb-4" />
            {block.subtitle && (
              <p className="text-[1.05rem] text-ofs-gray-600 leading-relaxed m-0">
                {block.subtitle}
              </p>
            )}
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {block.items?.map((item, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.05}>
                <div className="p-6 sm:p-7 rounded-2xl border border-ofs-navy-100 bg-ofs-navy-50/50 hover:bg-ofs-navy-50 hover:border-ofs-navy-300 transition-all duration-200 h-full flex flex-col shadow-sm hover:shadow-md">
                  <div className="w-9 h-9 rounded-xl bg-ofs-navy-950 text-white flex items-center justify-center font-heading font-bold text-sm mb-4 shrink-0 shadow-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-ofs-navy-950 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ofs-gray-700 leading-relaxed m-0 flex-1">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // 4. Hub Section (e.g. India: The Next Manufacturing Hub)
  if (block.type === 'hub-section') {
    return (
      <section
        key={block.title || `block-${index}`}
        className="py-16 sm:py-20 bg-ofs-navy-50/50 text-ofs-navy-950 border-t border-ofs-navy-100"
      >
        <Container>
          <ScrollReveal direction="up" className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold text-ofs-navy-950 mb-3 tracking-tight">
              {block.title}
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-ofs-navy-300 rounded-full mx-auto" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {block.items?.map((item, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.08}>
                <div className="p-6 rounded-2xl border border-ofs-navy-100 bg-white shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                  <CheckCircle2 size={22} className="text-ofs-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-ofs-navy-950 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-[0.95rem] text-ofs-gray-700 leading-relaxed m-0">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // 5. Image Cards (e.g. Why OEMs choose us)
  if (block.type === 'image-cards') {
    return (
      <section
        key={block.title || `block-${index}`}
        className="py-16 sm:py-20 bg-white text-ofs-navy-950 border-t border-ofs-gray-100"
      >
        <Container>
          <ScrollReveal direction="up" className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold text-ofs-navy-950 mb-3 tracking-tight">
              {block.title}
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-ofs-navy-300 rounded-full mx-auto" />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {block.items?.map((item, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.06}>
                <div className="group rounded-2xl overflow-hidden border border-ofs-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  {item.image && (
                    <div className="aspect-[16/10] overflow-hidden bg-ofs-gray-100 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-heading text-lg font-bold text-ofs-navy-950 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ofs-gray-700 leading-relaxed m-0 flex-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // 6. Icon Grid (e.g. Industries)
  if (block.type === 'icon-grid') {
    return (
      <section
        key={block.title || `block-${index}`}
        className="py-16 sm:py-20 bg-ofs-navy-50/40 text-ofs-navy-950 border-t border-ofs-navy-100"
      >
        <Container>
          <ScrollReveal direction="up" className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold text-ofs-navy-950 mb-3 tracking-tight">
              {block.title}
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-ofs-navy-300 rounded-full mx-auto" />
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {block.items?.map((item, idx) => (
              <ScrollReveal key={idx} direction="up" delay={(idx % 4) * 0.05}>
                <div className="p-5 rounded-2xl border border-ofs-navy-100 bg-white text-center flex flex-col items-center justify-center gap-3.5 shadow-sm hover:shadow-lg hover:border-ofs-navy-300 transition-all duration-300 group min-h-[150px]">
                  {item.icon && (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ofs-navy-950 via-ofs-navy-900 to-ofs-navy-800 flex items-center justify-center p-3 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:from-ofs-navy-900 group-hover:to-ofs-red-600 border border-ofs-navy-700/50">
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="w-full h-full object-contain filter brightness-110 drop-shadow-sm"
                      />
                    </div>
                  )}
                  <span className="font-heading text-xs sm:text-sm font-bold text-ofs-navy-950 leading-snug">
                    {item.title}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // 7. Photo Grid (e.g. Manufacturing Capabilities)
  if (block.type === 'photo-grid') {
    return (
      <section
        key={block.title || `block-${index}`}
        className="py-16 sm:py-20 bg-white text-ofs-navy-950 border-t border-ofs-gray-100"
      >
        <Container>
          <ScrollReveal direction="up" className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold text-ofs-navy-950 mb-3 tracking-tight">
              {block.title}
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-ofs-navy-300 rounded-full mx-auto" />
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {block.items?.map((item, idx) => (
              <ScrollReveal key={idx} direction="up" delay={(idx % 4) * 0.05}>
                <div className="group rounded-2xl overflow-hidden border border-ofs-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden bg-ofs-gray-100 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center bg-white border-t border-ofs-gray-100">
                    <h3 className="font-heading text-xs sm:text-sm font-bold text-ofs-navy-950 leading-snug m-0">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // 8. Gateway to the Future (Image Left, Heading & Text & Button Right)
  if (block.title && block.title.includes('Gateway to the Future')) {
    return (
      <section
        key={block.title || `block-${index}`}
        className="py-16 sm:py-20 lg:py-24 bg-ofs-navy-50/50 border-t border-ofs-navy-100/80"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Image */}
            <ScrollReveal direction="left" className="lg:col-span-5 w-full">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-ofs-gray-200 relative aspect-[4/3] sm:aspect-[16/11] bg-ofs-gray-100">
                <img
                  src={block.image?.src || '/images/live/future-procurement.png'}
                  alt={block.image?.alt || block.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </ScrollReveal>

            {/* Right: Title, Underline, Paragraphs, Button */}
            <ScrollReveal direction="right" className="lg:col-span-7 flex flex-col items-start">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.1rem] font-extrabold text-ofs-navy-950 mb-3 tracking-tight">
                {block.title}
              </h2>
              <div className="w-16 h-1 bg-ofs-navy-300 rounded-full mb-6" />

              <div className="space-y-4 text-ofs-gray-700 text-[1.02rem] sm:text-[1.05rem] leading-relaxed mb-8">
                {block.paragraphs?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <Link
                href={block.buttonHref || '/contact'}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ofs-navy-950 text-white font-semibold text-sm hover:bg-ofs-navy-900 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                {block.buttonText || 'Contact Us'} <ArrowUpRight size={17} />
              </Link>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    );
  }

  // 9. Split block with image (Facilities, Advantages, Key Practices, Our Approach)
  if (block.image) {
    const isDark = block.variant === 'dark';
    const isImageLeft = block.imagePosition === 'left';

    return (
      <section
        key={block.title || `block-${index}`}
        className={cn(
          'py-16 sm:py-20 lg:py-24 relative overflow-hidden',
          isDark ? 'bg-ofs-navy-950 text-white' : 'bg-white text-ofs-navy-950'
        )}
      >
        {isDark && (
          <div className="bg-grid-pattern-dark absolute inset-0 opacity-40 pointer-events-none" />
        )}
        <Container className="relative z-10">
          {/* Centered Heading with Accent Underline */}
          <ScrollReveal direction="up">
            <div className="text-center mb-10 sm:mb-14">
              <h2
                className={cn(
                  'font-heading text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold tracking-tight mb-3',
                  isDark ? 'text-white' : 'text-ofs-navy-950'
                )}
              >
                {block.title}
              </h2>
              <div
                className={cn(
                  'w-16 sm:w-20 h-1 rounded-full mx-auto',
                  isDark ? 'bg-ofs-navy-400' : 'bg-ofs-navy-300'
                )}
              />
            </div>
          </ScrollReveal>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Image Column */}
            <ScrollReveal
              direction={isImageLeft ? 'left' : 'right'}
              className={cn('w-full', isImageLeft ? 'order-2 lg:order-1' : 'order-2')}
            >
              <div
                className={cn(
                  'rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/3] sm:aspect-[16/11]',
                  isDark
                    ? 'border border-white/10 ring-1 ring-white/5 bg-ofs-navy-900'
                    : 'border border-ofs-gray-200 bg-ofs-gray-100'
                )}
              >
                <img
                  src={block.image.src}
                  alt={block.image.alt || block.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </ScrollReveal>

            {/* Text Column */}
            <ScrollReveal
              direction={isImageLeft ? 'right' : 'left'}
              className={cn('flex flex-col', isImageLeft ? 'order-1 lg:order-2' : 'order-1')}
            >
              {block.intro && (
                <p
                  className={cn(
                    'text-[1.02rem] sm:text-[1.05rem] leading-relaxed mb-6 font-normal',
                    isDark ? 'text-white/90' : 'text-ofs-gray-700'
                  )}
                >
                  {formatText(block.intro)}
                </p>
              )}

              {block.items?.length > 0 ? (
                block.noBullets ? (
                  <div className="space-y-4">
                    {block.items.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <h3
                          className={cn(
                            'font-heading font-bold text-[1.02rem]',
                            isDark ? 'text-white' : 'text-ofs-navy-950'
                          )}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={cn(
                            'text-[0.98rem] leading-relaxed',
                            isDark ? 'text-gray-200' : 'text-ofs-gray-700'
                          )}
                        >
                          {formatText(item.description)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {block.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span
                          className={cn(
                            'w-2 h-2 rounded-full mt-2.5 shrink-0',
                            isDark ? 'bg-ofs-red-500' : 'bg-ofs-red-600'
                          )}
                        />
                        <div
                          className={cn(
                            'text-[0.98rem] leading-relaxed',
                            isDark ? 'text-gray-200' : 'text-ofs-gray-700'
                          )}
                        >
                          <strong
                            className={cn(
                              'font-bold mr-1.5',
                              isDark ? 'text-white' : 'text-ofs-navy-950'
                            )}
                          >
                            {item.title}:
                          </strong>
                          <span>{formatText(item.description)}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <div className="flex flex-col gap-1">
                  {block.paragraphs?.map((para, pIdx) => renderParagraph(para, pIdx))}
                </div>
              )}
            </ScrollReveal>
          </div>
        </Container>
      </section>
    );
  }

  // 10. Centered text / grid section (e.g. OFS's Expertise, Pricing and Packages, What can be expected, Broad Advantages)
  const isDark = block.variant === 'dark';
  return (
    <section
      key={block.title || `block-${index}`}
      className={cn(
        'py-16 sm:py-20 relative overflow-hidden border-t',
        isDark
          ? 'bg-ofs-navy-950 text-white border-white/10'
          : 'bg-white text-ofs-navy-950 border-ofs-gray-100'
      )}
    >
      {isDark && (
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-40 pointer-events-none" />
      )}
      <Container className="relative z-10">
        <ScrollReveal direction="up" className="max-w-4xl mx-auto text-center">
          {block.title && (
            <>
              <h2
                className={cn(
                  'font-heading text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold mb-3 tracking-tight',
                  isDark ? 'text-white' : 'text-ofs-navy-950'
                )}
              >
                {block.title}
              </h2>
              <div
                className={cn(
                  'w-16 sm:w-20 h-1 rounded-full mx-auto mb-8',
                  isDark ? 'bg-ofs-navy-400' : 'bg-ofs-navy-300'
                )}
              />
            </>
          )}

          {block.intro && (
            <p
              className={cn(
                'text-[1.05rem] sm:text-[1.1rem] leading-relaxed mb-6',
                isDark ? 'text-white/90' : 'text-ofs-gray-700'
              )}
            >
              {formatText(block.intro)}
            </p>
          )}

          {block.items?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left my-8">
              {block.items.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'p-4 rounded-lg border flex items-start gap-3 transition-all',
                    isDark
                      ? 'bg-white/5 border-white/10 text-gray-200'
                      : 'bg-ofs-navy-50/60 border-ofs-navy-100 text-ofs-gray-700'
                  )}
                >
                  <CheckCircle2
                    size={18}
                    className="text-ofs-red-600 shrink-0 mt-0.5"
                  />
                  <div>
                    {item.title && (
                      <strong
                        className={cn(
                          'block font-bold text-sm mb-0.5',
                          isDark ? 'text-white' : 'text-ofs-navy-950'
                        )}
                      >
                        {item.title}
                      </strong>
                    )}
                    <span className="text-sm leading-relaxed">
                      {formatText(item.description || (typeof item === 'string' ? item : ''))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {block.paragraphs?.length > 0 && (
            <div className="space-y-4 text-left sm:text-center text-[1.02rem] sm:text-[1.08rem] leading-relaxed">
              {block.paragraphs.map((para, pIdx) => renderParagraph(para, pIdx))}
            </div>
          )}

          {block.buttonText && (
            <div className="mt-8">
              <Link
                href={block.buttonHref || '/contact'}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-ofs-navy-950 text-white font-semibold text-sm hover:bg-ofs-navy-900 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                {block.buttonText} <ArrowUpRight size={17} />
              </Link>
            </div>
          )}
        </ScrollReveal>
      </Container>
    </section>
  );
}

export default function OfferDetail({ page }) {
  const related = getRelatedOffers(page);
  const blocks = page.blocks || [];
  const overviewTitle =
    page.overviewTitle || (page.tagline && page.tagline !== page.title ? page.tagline : null);
  const schemas = [
    buildWebPageSchema({
      title: `${page.title} | OFS Group India`,
      description: page.description,
      path: page.href,
    }),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-ofs-navy-950 to-ofs-navy-900 text-white py-14 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />
        <Container className="relative z-10">
          <ScrollReveal direction="down" duration={0.5}>
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: page.categoryLabel, href: whatWeOffer[page.category].items[0].href },
                { name: page.title, href: page.href },
              ]}
              variant="dark"
            />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="tag-badge badge-red mb-5">{page.categoryLabel}</div>
          </ScrollReveal>
          <h1 className="font-heading text-[clamp(2.2rem,4.6vw,3.85rem)] font-extrabold leading-[1.1] text-white mb-5 max-w-[920px]">
            <TextReveal tag="span" duration={0.65}>
              {page.title}
            </TextReveal>
          </h1>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-[1.12rem] text-white/90 max-w-[780px] leading-relaxed mb-8">
              {page.tagline}
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <Button href="/contact" variant="primary" size="lg" className="!w-auto">
              Request Advice <ArrowUpRight size={18} />
            </Button>
          </ScrollReveal>
        </Container>
      </section>

      {/* When page has custom blocks (e.g. indirect-procurement, project-supply, outsource-manufacturing) */}
      {blocks.length > 0 ? (
        <>
          {/* Overview Section */}
          <section className="py-14 sm:py-18 bg-white">
            <Container>
              {page.heroImage ? (
                <div className="grid grid-cols-1 gap-10 lg:gap-16 items-center lg:grid-cols-2">
                  <ScrollReveal direction="left">
                    <div className="tag-badge badge-red mb-4">OVERVIEW</div>
                    {overviewTitle && <h2 className="section-title mb-5">{overviewTitle}</h2>}
                    <p className="text-[1.05rem] text-ofs-gray-700 leading-relaxed">
                      {page.description}
                    </p>
                  </ScrollReveal>
                  <ScrollReveal direction="right">
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-ofs-gray-200 h-[280px] sm:h-[380px] relative">
                      <img
                        src={page.heroImage}
                        alt={`${page.title} — OFS Group India`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ofs-navy-950/40 via-transparent to-transparent" />
                    </div>
                  </ScrollReveal>
                </div>
              ) : (
                <ScrollReveal direction="up" className="max-w-4xl mx-auto text-center">
                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold text-ofs-navy-950 mb-3 tracking-tight">
                    {overviewTitle || page.title}
                  </h2>
                  <div className="w-16 sm:w-20 h-1 bg-ofs-navy-300 rounded-full mx-auto mb-8" />
                  <div className="space-y-4 text-ofs-gray-700 text-[1.05rem] sm:text-[1.1rem] leading-relaxed mb-8">
                    {page.overviewParagraphs?.length > 0 ? (
                      page.overviewParagraphs.map((para, pIdx) => (
                        <p key={pIdx}>{formatText(para)}</p>
                      ))
                    ) : (
                      <p>{formatText(page.description)}</p>
                    )}
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-ofs-navy-950 text-white font-semibold text-sm hover:bg-ofs-navy-900 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                  >
                    Request Advice
                  </Link>
                </ScrollReveal>
              )}

              {/* 4 Feature Cards (e.g. What is it?, What can be manufactured?, etc.) if present */}
              {page.features?.length > 0 && (
                <div className="mt-14 max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {page.features.map((feat, fIdx) => (
                      <ScrollReveal key={fIdx} direction="up" delay={fIdx * 0.06}>
                        <div className="p-6 rounded-2xl bg-ofs-navy-50/60 border border-ofs-navy-100 hover:bg-ofs-navy-50 hover:border-ofs-navy-300 transition-all h-full shadow-sm">
                          <h3 className="font-heading text-lg font-bold text-ofs-navy-950 mb-2">
                            {feat.title}
                          </h3>
                          <p className="text-sm text-ofs-gray-700 leading-relaxed m-0">
                            {feat.description}
                          </p>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}

              {renderGallery(page.gallery, page.title)}
            </Container>
          </section>

          {/* Structured Block Sections */}
          {blocks.map((block, index) => renderCustomBlock(block, index))}

          {/* Related Offers Section */}
          {related.length > 0 && (
            <section className="py-12 bg-ofs-navy-50/50 border-t border-ofs-gray-200">
              <Container>
                <h2 className="font-heading text-xl font-extrabold text-ofs-navy-950 mb-4">
                  More in {page.categoryLabel}
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {related.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-2 px-3.5 rounded-full border border-ofs-navy-100 bg-white text-sm font-semibold text-ofs-navy-950 no-underline hover:border-ofs-navy-300 hover:bg-ofs-navy-50 shadow-sm"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </Container>
            </section>
          )}
        </>
      ) : (
        /* Standard offer page layout */
        <section className="section-pad bg-white">
          <Container>
            <div
              className={`grid grid-cols-1 gap-10 lg:gap-16 mb-16 items-center ${page.heroImage ? 'lg:grid-cols-2' : ''
                }`}
            >
              <ScrollReveal direction="left">
                <div className="tag-badge badge-red mb-4">OVERVIEW</div>
                {overviewTitle && <h2 className="section-title mb-5">{overviewTitle}</h2>}
                <p className="text-[1.05rem] text-ofs-gray-700 leading-relaxed">
                  {page.description}
                </p>
              </ScrollReveal>
              {page.heroImage && (
                <ScrollReveal direction="right">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-ofs-gray-200 h-[280px] sm:h-[380px] relative">
                    <img
                      src={page.heroImage}
                      alt={`${page.title} — OFS Group India`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ofs-navy-950/40 via-transparent to-transparent" />
                  </div>
                </ScrollReveal>
              )}
            </div>

            {renderGallery(page.gallery, page.title)}

            {page.features?.length > 0 && (
              <div className="mb-16">
                <div className="mb-8">
                  <div className="tag-badge badge-red mb-3">KEY CAPABILITIES</div>
                  <h2 className="section-title">What this offering covers</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {page.features.map((feat) => (
                    <div
                      key={feat.title}
                      className="flex items-start gap-3 p-5 bg-ofs-navy-50/70 rounded-md border border-ofs-navy-100"
                    >
                      <CheckCircle2 size={18} className="text-ofs-red-600 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-heading text-base font-bold text-ofs-navy-950 mb-1">
                          {feat.title}
                        </h3>
                        <p className="text-sm text-ofs-gray-600 leading-relaxed m-0">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {page.sections?.map((section) => renderSection(section))}

            {related.length > 0 && (
              <div className="pt-8 border-t border-ofs-gray-200">
                <h2 className="font-heading text-xl font-extrabold text-ofs-navy-950 mb-4">
                  More in {page.categoryLabel}
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {related.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-2 px-3.5 rounded-full border border-ofs-navy-100 bg-ofs-navy-50 text-sm font-semibold text-ofs-navy-950 no-underline hover:border-ofs-navy-300 hover:bg-white"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
