import { writeFileSync } from 'node:fs';

const items = [
  'drilling-equipment',
  'electrical-power-equipments',
  'heavy-machinery-equipments',
  'hvac-refrigeration',
  'industrial-oil-chemicals-lubricants',
  'industrial-valves',
  'instrumentation',
  'maintenance-repair-tools',
  'mro-tools',
  'process-equipment',
  'pumps-spare-parts',
  'rotary-equipment',
  'safety-tools-equipments',
];

function decode(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const pages = {};
for (const slug of items) {
  const url = `https://ofsgroupindia.com/${slug}/`;
  const res = await fetch(url);
  const html = await res.text();
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || slug);
  const paras = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => decode(m[1]))
    .filter((t) => t.length > 80 && !/What We Offer|Facebook|Oriented Facility Solution Pvt Ltd\./.test(t));
  const headings = [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)]
    .map((m) => decode(m[1]))
    .filter((t) => t && t.length < 120 && !/Oriented Facility|Contact Us/.test(t));
  pages[slug] = {
    slug,
    href: `/products/${slug}`,
    title: title.replace(' - Oriented Facility Solution Pvt Ltd', '').replace(' – Oriented Facility Solution Pvt Ltd', ''),
    tagline: headings[0] || title,
    description: paras[0] || '',
    paragraphs: paras.slice(0, 8),
  };
  console.log(slug, pages[slug].description.slice(0, 60));
}

writeFileSync('src/data/products.json', JSON.stringify(pages, null, 2));
