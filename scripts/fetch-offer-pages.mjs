import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const OFFER_PAGES = [
  'indirect-procurement',
  'outsource-procurement',
  'engineering-epc-support-services',
  'hospitality-catering-services',
  'ifm-business',
  'logistics-shipping',
  'procurement-shipping',
  'quality-control',
  'spare-parts-procurement',
  'supply-chain-management',
  'warehouse-2',
  'global-mro-procurement-excellence',
  'inventory-planning-optimisation',
  'master-data-management',
  'mro-supply',
  'plant-maintenance-mro-spare-parts-management',
  'spare-parts-availability',
  'strategic-sourcing-mro-data-enrichment',
  'supply-chain-financing',
  'procurement-services',
  'project-supply',
  'outsource-manufacturing',
];

function decode(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, '&');
}

function strip(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function extractHeadings(html) {
  const matches = [...html.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi)];
  return matches
    .map((m) => strip(m[1]))
    .filter((t) => t && !/Oriented Facility Solution|Contact Us|Subscribe/i.test(t));
}

function extractParagraphs(html) {
  const matches = [...html.matchAll(/<(p|li)[^>]*>([\s\S]*?)<\/\1>/gi)];
  const seen = new Set();
  const out = [];
  for (const m of matches) {
    const text = strip(m[2]);
    if (!text || text.length < 40) continue;
    if (/Oriented Facility Solution|Copyright|WhatsApp|Facebook|Linkedin|Email Us|Call Us/i.test(text)) continue;
    if (seen.has(text)) continue;
    seen.add(text);
    out.push(text);
  }
  return out.slice(0, 24);
}

const results = {};

for (const slug of OFFER_PAGES) {
  const url = `https://ofsgroupindia.com/${slug}/`;
  try {
    const res = await fetch(url);
    const html = await res.text();
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    results[slug] = {
      url,
      status: res.status,
      title: titleMatch ? decode(strip(titleMatch[1])) : slug,
      headings: extractHeadings(html),
      paragraphs: extractParagraphs(html),
    };
    console.log(slug, res.status, results[slug].paragraphs.length, 'paras');
  } catch (err) {
    console.error(slug, err.message);
    results[slug] = { url, error: err.message };
  }
}

writeFileSync(
  join(__dirname, '..', 'src', 'data', 'fetched-offers.json'),
  JSON.stringify(results, null, 2)
);
console.log('wrote fetched-offers.json');
