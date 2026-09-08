import Link from 'next/link';
import productsData from '@/data/products.json';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/SEO/Breadcrumbs';
import ContactCTA from '@/components/sections/ContactCTA';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Industrial Products | OFS Group India',
  description:
    'OFS sources industrial valves, pumps, rotary equipment, MRO tools, drilling equipment, HVAC, instrumentation, and safety products from 3,000+ approved global brands.',
  path: '/products',
  keywords: ['OFS products', 'industrial valves', 'pumps spare parts', 'MRO tools'],
});

export default function ProductsIndexPage() {
  const products = Object.values(productsData);

  return (
    <>
      <section className="bg-gradient-to-br from-ofs-navy-950 to-ofs-navy-900 text-white py-14 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products' },
            ]}
          />
          <div className="tag-badge badge-red mb-5">PRODUCT PORTFOLIO</div>
          <h1 className="font-heading text-[clamp(2.2rem,4.6vw,3.85rem)] font-extrabold leading-[1.1] mb-5 max-w-[860px]">
            Industrial products sourced for critical operations
          </h1>
          <p className="text-[1.1rem] text-white/85 max-w-[740px] leading-relaxed">
            OFS supplies valves, pumps, rotary equipment, MRO tools, drilling systems, HVAC, instrumentation, and safety equipment through a network of 3,000+ approved US and European brands.
          </p>
        </Container>
      </section>

      <section className="section-pad bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={product.href}
                className="p-6 rounded-md border border-ofs-gray-200 bg-white no-underline hover:border-ofs-navy-300 hover:shadow-lg transition-all"
              >
                <h2 className="font-heading text-lg font-extrabold text-ofs-navy-950 mb-2">
                  {product.title}
                </h2>
                <p className="text-sm text-ofs-gray-600 leading-relaxed m-0 line-clamp-4">
                  {product.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}
