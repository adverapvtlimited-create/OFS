import offersData from '@/data/offers.json';
import { whatWeOffer, whatWeOfferColumns, findOfferMatch } from '@/data/navigation';

export function getOfferBySlug(slug) {
  return offersData[slug] || null;
}

export function getAllOfferSlugs() {
  return Object.keys(offersData);
}

export function getRelatedOffers(page, limit = 4) {
  if (!page) return [];
  const column = whatWeOffer[page.category];
  if (!column) return [];
  return column.items
    .filter((item) => item.href !== page.href)
    .slice(0, limit);
}

export const legacyServiceHrefs = {
  'procurement-shipping': '/procurement-shipping',
  'engineering-epc-support': '/engineering-epc-support-services',
  'spare-parts-procurement': '/spare-parts-procurement',
  'logistics-shipping': '/logistics-shipping',
};

export function serviceHref(slug) {
  return legacyServiceHrefs[slug] || `/${slug}`;
}

export function getOfferCategoryLabel(pathname) {
  return findOfferMatch(pathname)?.column.title || null;
}

export { whatWeOffer, whatWeOfferColumns };
