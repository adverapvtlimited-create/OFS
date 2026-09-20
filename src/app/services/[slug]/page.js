import { redirect } from 'next/navigation';
import { getAllOfferSlugs, serviceHref } from '@/lib/offers';

export async function generateStaticParams() {
  return getAllOfferSlugs().map((slug) => ({ slug }));
}

export default function SingleServicePage({ params }) {
  redirect(serviceHref(params.slug) || `/${params.slug}`);
}
