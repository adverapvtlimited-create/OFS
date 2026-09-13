import industriesData from '@/data/industries.json';
import productsData from '@/data/products.json';

export const whatWeOffer = {
  expertise: {
    id: 'expertise',
    title: 'EXPERTISE',
    items: [
      {
        title: 'Indirect Procurement',
        href: '/indirect-procurement',
      },
      {
        title: 'Outsource Procurement',
        href: '/outsource-procurement',
      },
    ],
  },
  services: {
    id: 'services',
    title: 'SERVICES',
    items: [
      {
        title: 'Procurement & Sourcing',
        href: '/procurement-shipping',
        image: '/images/live/Excellence-tools-official.png',
      },
      {
        title: 'Engineering & EPC',
        href: '/engineering-epc-support-services',
        image: '/images/live/Engg-e1751278356951.jpg',
      },
      {
        title: 'Spare Parts Procurement',
        href: '/spare-parts-procurement',
        image: '/images/live/Spare-Parts-Procurement.jpg',
      },
      {
        title: 'Logistics & Shipping Coordination',
        href: '/logistics-shipping',
        image: '/images/live/Logistics-and-shippings.jpg',
      },
      {
        title: 'Quality Control',
        href: '/quality-control',
        image: '/images/live/facilities-offered.png',
      },
      {
        title: 'Supply Chain Management',
        href: '/supply-chain-management',
        image: '/images/live/key-practices.png',
      },
      {
        title: 'Warehouse',
        href: '/warehouse',
        image: '/images/live/Procurement-and-shippings.jpg',
      },
    ],
  },
  solutions: {
    id: 'solutions',
    title: 'SOLUTIONS',
    items: [
      { title: 'Global MRO Procurement Excellence', href: '/global-mro-procurement-excellence' },
      { title: 'Inventory Planning & Optimisation', href: '/inventory-planning-optimisation' },
      { title: 'Master Data Management', href: '/master-data-management' },
      { title: 'MRO Supply', href: '/mro-supply' },
      { title: 'Plant Maintenance & MRO Spare Parts Management', href: '/plant-maintenance-mro-spare-parts-management' },
      { title: 'Spare Parts Availability', href: '/spare-parts-availability' },
      { title: 'Strategic Sourcing & MRO Data Enrichment', href: '/strategic-sourcing-mro-data-enrichment' },
    ],
  },
  disciplines: {
    id: 'disciplines',
    title: 'DISCIPLINES',
    items: [
      {
        title: 'Procurement Services',
        href: '/procurement-services',
      },
      {
        title: 'Project Supply',
        href: '/project-supply',
      },
    ],
  },
  manufacturing: {
    id: 'manufacturing',
    title: 'MANUFACTURING',
    items: [
      {
        title: 'Outsource Manufacturing',
        href: '/outsource-manufacturing',
      },
    ],
  },
};

export const whatWeOfferColumns = [
  'expertise',
  'services',
  'solutions',
  'disciplines',
  'manufacturing',
];

export const aboutNav = [
  { title: 'Company Profile', href: '/about' },
  { title: 'Mission & Vision', href: '/about#mission-vision' },
];

export const industriesNav = industriesData.map((ind) => ({
  title: ind.shortName,
  href: `/industries/${ind.slug}`,
}));

export const productsNav = Array.isArray(productsData)
  ? productsData.map((p) => ({
      title: p.shortName || p.name,
      href: `/products/${p.slug}`,
    }))
  : Object.values(productsData).map((p) => ({
      title: p.title || p.shortName || p.name,
      href: p.href || `/products/${p.slug}`,
    }));

export function getAllOfferHrefs() {
  return whatWeOfferColumns.flatMap((key) => whatWeOffer[key].items.map((item) => item.href));
}

export function isWhatWeOfferPath(pathname) {
  if (!pathname) return false;
  return getAllOfferHrefs().includes(pathname);
}

export function findOfferMatch(pathname) {
  if (!pathname) return null;
  for (const key of whatWeOfferColumns) {
    const column = whatWeOffer[key];
    const item = column.items.find((entry) => entry.href === pathname);
    if (item) return { column, item };
  }
  return null;
}
