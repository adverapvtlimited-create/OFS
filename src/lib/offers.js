import offersData from "@/data/offers.json";
import {
  whatWeOffer,
  whatWeOfferColumns,
  findOfferMatch,
} from "@/data/navigation";
import {
  getOfferBySlug as getOfferBySlugFromStrapi,
  getAllOfferSlugs as getAllOfferSlugsFromStrapi,
} from "@/lib/strapi";

export async function getOfferBySlug(slug) {
  try {
    const strapiOffer = await getOfferBySlugFromStrapi(slug);
    if (strapiOffer) return strapiOffer;
  } catch {
    // Fallback to local
  }
  return offersData[slug] || null;
}

export function getOfferBySlugSync(slug) {
  return offersData[slug] || null;
}

export async function getAllOfferSlugs() {
  try {
    const slugs = await getAllOfferSlugsFromStrapi();
    if (slugs && slugs.length > 0) return slugs;
  } catch {
    // Fallback to local
  }
  return Object.keys(offersData);
}

export function getAllOfferSlugsSync() {
  return Object.keys(offersData);
}

export function getRelatedOffers(page, limit = 4) {
  if (!page) return [];
  const column = whatWeOffer[page.category];
  if (!column) return [];
  return column.items.filter((item) => item.href !== page.href).slice(0, limit);
}

export const legacyServiceHrefs = {
  "procurement-shipping": "/procurement-shipping",
  "engineering-epc": "/engineering-epc-support-services",
  "engineering-epc-support": "/engineering-epc-support-services",
  "engineering-epc-support-services": "/engineering-epc-support-services",
  "spare-parts-procurement": "/spare-parts-procurement",
  "logistics-shipping": "/logistics-shipping",
  "quality-control": "/quality-control",
  "supply-chain-management": "/supply-chain-management",
  warehouse: "/warehouse",
  "warehouse-2": "/warehouse",
};

export function serviceHref(slug) {
  return legacyServiceHrefs[slug] || `/${slug}`;
}

export function getOfferCategoryLabel(pathname) {
  return findOfferMatch(pathname)?.column.title || null;
}

export { whatWeOffer, whatWeOfferColumns };
