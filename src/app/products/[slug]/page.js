import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Wrench, 
  Flame, 
  Settings, 
  Ship, 
  Zap, 
  Sun, 
  Anchor, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  Award, 
  Layers, 
  Check, 
  FileText 
} from 'lucide-react';
import productsData from '@/data/products.json';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ContactCTA from '@/components/sections/ContactCTA';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/SEO/Breadcrumbs';
import JsonLd from '@/components/SEO/JsonLd';
import { buildPageMetadata } from '@/lib/seo';
import { buildWebPageSchema } from '@/lib/schema';

const iconMap = {
  Wrench: Wrench,
  Flame: Flame,
  Settings: Settings,
  Ship: Ship,
  Zap: Zap,
  Sun: Sun,
  Anchor: Anchor,
  ShieldCheck: ShieldCheck,
};

export async function generateStaticParams() {
  return productsData.map((prod) => ({
    slug: prod.slug,
  }));
}

export async function generateMetadata({ params }) {
  const prod = productsData.find((p) => p.slug === params.slug);
  if (!prod) {
    return buildPageMetadata({
      title: 'Product Not Found | OFS Group India',
      description: 'The requested product specification page could not be found.',
      path: '/products',
      noindex: true,
    });
  }

  return buildPageMetadata({
    title: `${prod.name} | OFS Equipment & Procurement`,
    description: prod.summary,
    path: `/products/${prod.slug}`,
    keywords: [prod.name, prod.category, 'OFS Group India', 'industrial product sourcing'],
    ogImage: prod.heroImage,
  });
}

export default function SingleProductPage({ params }) {
  const prod = productsData.find((p) => p.slug === params.slug);

  if (!prod) {
    notFound();
  }

  const IconComp = iconMap[prod.icon] || Wrench;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: prod.shortName, href: `/products/${prod.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          title: `${prod.name} | OFS Group India`,
          description: prod.summary,
          path: `/products/${prod.slug}`,
        })}
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-ofs-navy-950 to-ofs-navy-900 text-white py-[5.5rem] relative overflow-hidden">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

        <Container className="relative z-10">
          <ScrollReveal direction="down" duration={0.5}>
            <Breadcrumbs items={breadcrumbItems} variant="dark" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <div className="tag-badge badge-red uppercase">
                {prod.category}
              </div>
              <div className="tag-pill pill-dark">
                ISO 9001:2015 &amp; OEM Certified
              </div>
            </div>
          </ScrollReveal>

          <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.1] text-white mb-6 max-w-[920px]">
            <TextReveal tag="span" duration={0.65}>
              {prod.name}
            </TextReveal>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-[1.2rem] text-white/90 max-w-[780px] leading-relaxed mb-9">
              {prod.summary}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.35}>
            <a href="#contact-cta" className="btn btn-primary btn-lg inline-flex items-center gap-2 no-underline">
              Request Product Inquiry / RFQ <ArrowUpRight size={18} />
            </a>
          </ScrollReveal>
        </Container>
      </section>

      {/* Main Product Content */}
      <section className="section-pad bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[4.5rem] items-center mb-16">
            {/* Left Description */}
            <ScrollReveal direction="left" delay={0.1}>
              <div>
                <div className="tag-badge badge-red mb-4">
                  PRODUCT SPECIFICATIONS
                </div>
                <h2 className="section-title mb-6">
                  <TextReveal tag="span" duration={0.65}>
                    Industrial Sourcing &amp;
                  </TextReveal>
                  <br />
                  <span className="gradient-text-navy">
                    <TextReveal tag="span" delay={0.2} duration={0.65}>
                      Engineering Quality
                    </TextReveal>
                  </span>
                </h2>

                <p className="text-[1.05rem] text-ofs-gray-700 leading-relaxed mb-6">
                  {prod.description}
                </p>

                <div className="flex flex-col gap-3">
                  {prod.keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 bg-ofs-navy-50/80 p-3.5 rounded-xl border border-ofs-navy-100">
                      <CheckCircle2 size={18} className="text-ofs-red-600 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-ofs-navy-950">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right Hero Image Card */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="card-modern p-3 overflow-hidden shadow-2xl border border-ofs-gray-200 bg-white rounded-2xl">
                <div className="h-[360px] sm:h-[420px] relative rounded-xl overflow-hidden">
                  <img 
                    src={prod.heroImage} 
                    alt={prod.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ofs-navy-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="w-10 h-10 rounded-xs bg-ofs-navy-950 text-ofs-red-400 grid place-content-center mb-3 shadow-lg border border-white/10">
                      <IconComp size={22} />
                    </div>
                    <div className="font-mono text-xs text-white/70 uppercase tracking-widest mb-1">
                      Certified Equipment
                    </div>
                    <div className="font-heading text-xl font-bold">
                      {prod.name}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Specifications & Applications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Technical Specifications */}
            {prod.specifications && (
              <ScrollReveal direction="up" delay={0.1}>
                <div className="bg-ofs-gray-50 p-6 sm:p-8 rounded-2xl border border-ofs-gray-200 h-full">
                  <h3 className="font-heading text-xl font-bold text-ofs-navy-950 mb-4 flex items-center gap-2">
                    <Layers className="text-ofs-red-600" size={20} />
                    Technical Specifications
                  </h3>
                  <ul className="space-y-3">
                    {prod.specifications.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-ofs-gray-700">
                        <Check size={16} className="text-ofs-red-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}

            {/* Industry Applications & Standards */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-ofs-navy-950 text-white p-6 sm:p-8 rounded-2xl border border-ofs-navy-800 h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Award className="text-ofs-red-400" size={20} />
                    Industry Applications
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {prod.applications?.map((app, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-white/85">
                        <span className="w-2 h-2 rounded-full bg-ofs-red-500 shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Standards Pills */}
                {prod.certifications && (
                  <div>
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-ofs-gold-400 mb-3">
                      Accreditations &amp; Standards
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {prod.certifications.map((cert, idx) => (
                        <span key={idx} className="font-mono text-xs px-3 py-1 rounded-full bg-white/10 text-white font-semibold border border-white/15">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Product Media Gallery from Official Site */}
          {prod.scrapedImages && prod.scrapedImages.length > 0 && (
            <div className="mb-16">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="tag-badge badge-red mb-4">
                  PRODUCT MEDIA &amp; ASSETS
                </div>
                <h3 className="font-heading text-2xl font-bold text-ofs-navy-950 mb-6">
                  Catalog Images &amp; Technical Diagrams
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {prod.scrapedImages.map((imgUrl, i) => (
                    <div key={i} className="h-44 rounded-xl overflow-hidden border border-ofs-gray-200 shadow-sm hover:shadow-md transition-shadow bg-ofs-navy-950/5 group relative">
                      <img 
                        src={imgUrl} 
                        alt={`${prod.name} ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          )}
        </Container>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </>
  );
}
