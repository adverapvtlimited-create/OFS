import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync(process.env.TEMP + '/ofs-home.html', 'utf8');
const productsBlock = html.match(/data-title="Products"[\s\S]*?data-title="What We Offer"/);
if (!productsBlock) {
  console.log('block not found');
  process.exit(1);
}
const links = [...productsBlock[0].matchAll(/href="https:\/\/ofsgroupindia\.com\/([^"/]+)\/"[^>]*data-title="([^"]+)"/g)];
const items = links.map(([, slug, title]) => ({ slug, title: title.replace(/&amp;/g, '&') }));
console.log(JSON.stringify(items, null, 2));
