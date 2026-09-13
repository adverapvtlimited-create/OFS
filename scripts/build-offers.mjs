import { readFileSync, writeFileSync } from 'node:fs';

const raw = JSON.parse(readFileSync('src/data/fetched-offers.json', 'utf8'));

const NAV_JUNK = [
  /^What We Offer/i,
  /^SERVICES /i,
  /^SOLUTIONS /i,
  /^EXPERTISE /i,
  /^DISCIPLINES /i,
  /^MANUFACTURING /i,
  /^Plant Maintenance & MRO Spare Parts Management$/,
  /^Strategic Sourcing & MRO Data Enrichment$/,
  /leading Indian multinational delivering specialized support services/,
];

const HERO = {
  'indirect-procurement': '/images/live/Procurement-and-shippings.jpg',
  'outsource-procurement': '/images/live/Procurement-Shipping.png',
  'engineering-epc-support-services': '/images/live/Engg-e1751278356951.jpg',
  'hospitality-catering-services': '/images/live/IFM-Business.jpg',
  'ifm-business': '/images/live/IFM-Business.jpg',
  'logistics-shipping': '/images/live/Logistics-and-shippings.jpg',
  'procurement-shipping': '/images/live/Procurement-and-shippings.jpg',
  'quality-control': '/images/live/Spare-Parts-Procurement.jpg',
  'spare-parts-procurement': '/images/live/Spare-Parts-Procurement.jpg',
  'supply-chain-management': '/images/live/Logistics-and-shippings.jpg',
  warehouse: '/images/live/Procurement-Shipping.png',
  'global-mro-procurement-excellence': '/images/live/Spare-Parts-Procurement.png',
  'inventory-planning-optimisation': '/images/live/Key-Features-768x307.jpg',
  'master-data-management': '/images/live/Procurement-Shipping.png',
  'mro-supply': '/images/live/Spare-Parts-Procurement.jpg',
  'plant-maintenance-mro-spare-parts-management': '/images/live/Spare-Parts-Procurement.jpg',
  'spare-parts-availability': '/images/live/Spare-Parts-Procurement.png',
  'strategic-sourcing-mro-data-enrichment': '/images/live/Procurement-and-shippings.jpg',
  'supply-chain-financing': '/images/live/Banner3.jpg',
  'procurement-services': '/images/live/Procurement-and-shippings.jpg',
  'project-supply': '/images/live/Engineering-EP-Support-Services.png',
  'outsource-manufacturing': '/images/live/Heavy-Engineering-2.png',
};

const META = {
  'indirect-procurement': { title: 'Indirect Procurement', category: 'expertise', categoryLabel: 'Expertise' },
  'outsource-procurement': { title: 'Outsource Procurement', category: 'expertise', categoryLabel: 'Expertise' },
  'engineering-epc-support-services': { title: 'Engineering & EPC Support Services', category: 'services', categoryLabel: 'Services' },
  'hospitality-catering-services': { title: 'Hospitality & Catering Services', category: 'services', categoryLabel: 'Services' },
  'ifm-business': { title: 'IFM Business', category: 'services', categoryLabel: 'Services' },
  'logistics-shipping': { title: 'Logistics & Shipping', category: 'services', categoryLabel: 'Services' },
  'procurement-shipping': { title: 'Procurement & Shipping', category: 'services', categoryLabel: 'Services' },
  'quality-control': { title: 'Quality Control', category: 'services', categoryLabel: 'Services' },
  'spare-parts-procurement': { title: 'Spare Parts Procurement', category: 'services', categoryLabel: 'Services' },
  'supply-chain-management': { title: 'Supply Chain Management', category: 'services', categoryLabel: 'Services' },
  warehouse: { title: 'Warehouse', category: 'services', categoryLabel: 'Services' },
  'global-mro-procurement-excellence': { title: 'Global MRO Procurement Excellence', category: 'solutions', categoryLabel: 'Solutions' },
  'inventory-planning-optimisation': { title: 'Inventory Planning & Optimisation', category: 'solutions', categoryLabel: 'Solutions' },
  'master-data-management': { title: 'Master Data Management', category: 'solutions', categoryLabel: 'Solutions' },
  'mro-supply': { title: 'MRO Supply', category: 'solutions', categoryLabel: 'Solutions' },
  'plant-maintenance-mro-spare-parts-management': { title: 'Plant Maintenance & MRO Spare Parts Management', category: 'solutions', categoryLabel: 'Solutions' },
  'spare-parts-availability': { title: 'Spare Parts Availability', category: 'solutions', categoryLabel: 'Solutions' },
  'strategic-sourcing-mro-data-enrichment': { title: 'Strategic Sourcing & MRO Data Enrichment', category: 'solutions', categoryLabel: 'Solutions' },
  'supply-chain-financing': { title: 'Supply Chain Financing', category: 'solutions', categoryLabel: 'Solutions' },
  'procurement-services': { title: 'Procurement Services', category: 'disciplines', categoryLabel: 'Disciplines' },
  'project-supply': { title: 'Project Supply', category: 'disciplines', categoryLabel: 'Disciplines' },
  'outsource-manufacturing': { title: 'Outsource Manufacturing', category: 'manufacturing', categoryLabel: 'Manufacturing' },
};

function cleanText(t) {
  return t
    .replace(/Refteck Solutions/gi, 'OFS')
    .replace(/Here’s what you gain with Refteck Solutions:/gi, 'Here’s what you gain with OFS:')
    .replace(/Why Choose Refteck Solutions\?/gi, 'Why Choose OFS?')
    .replace(/\s+/g, ' ')
    .replace(/At OFS ,/g, 'At OFS,')
    .replace(/WOur /g, 'Our ')
    .replace(/^OHospitality /, 'Hospitality ')
    .replace(/^SOffshore /, 'Offshore ')
    .trim();
}

function isJunk(t) {
  return NAV_JUNK.some((re) => re.test(t));
}

function splitFeature(t) {
  const idx = t.indexOf(' : ');
  if (idx > 0 && idx < 80) {
    return { title: t.slice(0, idx).trim(), description: t.slice(idx + 3).trim() };
  }
  const colon = t.match(/^(.{3,70}?):\s+(.+)$/);
  if (colon) return { title: colon[1].trim(), description: colon[2].trim() };
  return null;
}

const pages = {};

for (const [rawSlug, data] of Object.entries(raw)) {
  const slug = rawSlug === 'warehouse-2' ? 'warehouse' : rawSlug;
  const meta = META[slug];
  if (!meta) continue;

  const paras = (data.paragraphs || [])
    .map(cleanText)
    .filter((t) => t.length >= 40 && !isJunk(t));

  const headings = (data.headings || [])
    .map(cleanText)
    .filter((h) => h && !/Global Brand Assurance|Ready to partner|Connect with us|Subscribe/i.test(h));

  const intro = paras[0] || '';
  const rest = paras.slice(1);
  const features = [];
  const body = [];

  for (const p of rest) {
    const feat = splitFeature(p);
    if (feat && feat.description.length > 20) features.push(feat);
    else body.push(p);
  }

  const sections = [];
  if (body.length) {
    const chunkSize = Math.max(1, Math.ceil(body.length / Math.max(headings.length, 1)));
    let cursor = 0;
    headings.forEach((heading, i) => {
      const slice = body.slice(cursor, i === headings.length - 1 ? body.length : cursor + Math.max(1, Math.min(3, chunkSize)));
      if (slice.length) {
        sections.push({ title: heading, paragraphs: slice });
        cursor += slice.length;
      }
    });
    if (cursor < body.length) {
      if (sections.length) sections[sections.length - 1].paragraphs.push(...body.slice(cursor));
      else sections.push({ title: headings[0] || meta.title, paragraphs: body.slice(cursor) });
    }
  }

  if (!sections.length) {
    sections.push({
      title: headings[0] || meta.title,
      paragraphs: [intro],
    });
  }

  pages[slug] = {
    slug,
    href: `/${slug}`,
    title: meta.title,
    category: meta.category,
    categoryLabel: meta.categoryLabel,
    heroImage: HERO[slug],
    tagline: headings[0] || meta.title,
    description: intro,
    sections,
    features: features.slice(0, 10),
  };
}

writeFileSync('src/data/offers.json', JSON.stringify(pages, null, 2));
console.log('pages', Object.keys(pages).length);
