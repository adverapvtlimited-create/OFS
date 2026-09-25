import { notFound } from 'next/navigation';
import OfferDetail from '@/components/sections/OfferDetail';
import { getAllOfferSlugs, getOfferBySlug } from '@/lib/offers';
import { buildPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  const slugs = await getAllOfferSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const page = await getOfferBySlug(params.slug);
  if (!page) {
    return buildPageMetadata({
      title: 'Page Not Found | OFS Group India',
      description: 'The requested OFS page could not be found.',
      path: '/',
      noindex: true,
    });
  }

  return buildPageMetadata({
    title: `${page.title} | OFS Group India`,
    description: page.description,
    path: page.href,
    keywords: [page.title, page.categoryLabel, 'OFS Group India', 'What We Offer'],
    ogImage: page.heroImage,
  });
}

export default async function OfferSlugPage({ params }) {
  const page = await getOfferBySlug(params.slug);
  if (!page) notFound();
  return <OfferDetail page={page} />;
}
