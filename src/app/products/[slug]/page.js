import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/SEO/Breadcrumbs';
import ContactCTA from '@/components/sections/ContactCTA';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/SEO/JsonLd';
import { buildPageMetadata } from '@/lib/seo';
import { buildWebPageSchema } from '@/lib/schema';
import { ArrowUpRight } from 'lucide-react';

export async function generateStaticParams() {
  return Object.keys(productsData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const product = productsData[params.slug];
  if (!product) {
    return buildPageMetadata({
      title: 'Product Not Found | OFS Group India',
      description: 'The requested OFS product page could not be found.',
      path: '/products',
      noindex: true,
    });
  }

  return buildPageMetadata({
    title: `${product.title} | OFS Group India`,
    description: product.description,
    path: product.href,
    keywords: [product.title, 'OFS products', 'industrial procurement'],
  });
}

export default function ProductPage({ params }) {
  const product = productsData[params.slug];
  if (!product) notFound();

  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          title: `${product.title} | OFS Group India`,
          description: product.description,
          path: product.href,
        })}
      />
      <section className="bg-gradient-to-br from-ofs-navy-950 to-ofs-navy-900 text-white py-14 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products' },
              { name: product.title, href: product.href },
            ]}
          />
          <div className="tag-badge badge-red mb-5">PRODUCTS</div>
          <h1 className="font-heading text-[clamp(2.2rem,4.6vw,3.85rem)] font-extrabold leading-[1.1] mb-5 max-w-[900px]">
            {product.title}
          </h1>
          <p className="text-[1.1rem] text-white/90 max-w-[760px] leading-relaxed mb-8">
            {product.tagline}
          </p>
          <Button href="/contact" variant="primary" size="lg" className="!w-auto">
            Request Quotation <ArrowUpRight size={18} />
          </Button>
        </Container>
      </section>

      <section className="section-pad bg-white">
        <Container className="max-w-[860px]">
          {product.paragraphs.map((para) => (
            <p key={para.slice(0, 48)} className="text-[1.05rem] text-ofs-gray-700 leading-relaxed mb-5">
              {para}
            </p>
          ))}
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}
