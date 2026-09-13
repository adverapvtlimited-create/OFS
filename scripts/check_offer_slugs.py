import json

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw_pages = json.load(f)

offer_slugs = [
    'indirect-procurement',
    'outsource-procurement',
    'procurement-shipping',
    'engineering-epc-support-services',
    'engineering-epc',
    'spare-parts-procurement',
    'logistics-shipping',
    'global-mro-procurement-excellence',
    'global-mro',
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
    'quality-control',
    'supply-chain-management',
    'warehouse-2',
    'warehouse'
]

print(f"=== CHECKING {len(offer_slugs)} CANDIDATE SLUGS IN RAW EXTRACTED PAGES ===")
for slug in offer_slugs:
    p = raw_pages.get(slug)
    if not p:
        print(f"NOT FOUND: {slug}")
        continue
    title = p.get('title')
    headings = p.get('headings', [])
    paras = p.get('paragraphs', [])
    lists = p.get('list_items', [])
    tables = p.get('table_specs', [])
    images = p.get('images', [])
    print(f"[{slug}] title: '{title}' | headings: {len(headings)} | paras: {len(paras)} | lists: {len(lists)} | tables: {len(tables)} | images: {len(images)}")
