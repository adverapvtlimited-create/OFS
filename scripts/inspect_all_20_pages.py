import json

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

# The 20 offer pages
pages_to_check = [
    ('indirect-procurement', 'indirect-procurement'),
    ('outsource-procurement', 'outsource-procurement'),
    ('procurement-shipping', 'procurement-shipping'),
    ('engineering-epc-support-services', 'engineering-epc-support-services'),
    ('spare-parts-procurement', 'spare-parts-procurement'),
    ('logistics-shipping', 'logistics-shipping'),
    ('quality-control', 'quality-control'),
    ('supply-chain-management', 'supply-chain-management'),
    ('warehouse', 'warehouse-2'),
    ('global-mro-procurement-excellence', 'global-mro-procurement-excellence'),
    ('inventory-planning-optimisation', 'inventory-planning-optimisation'),
    ('master-data-management', 'master-data-management'),
    ('mro-supply', 'mro-supply'),
    ('plant-maintenance-mro-spare-parts-management', 'plant-maintenance-mro-spare-parts-management'),
    ('spare-parts-availability', 'spare-parts-availability'),
    ('strategic-sourcing-mro-data-enrichment', 'strategic-sourcing-mro-data-enrichment'),
    ('supply-chain-financing', 'supply-chain-financing'),
    ('procurement-services', 'procurement-services'),
    ('project-supply', 'project-supply'),
    ('outsource-manufacturing', 'outsource-manufacturing')
]

for slug, raw_key in pages_to_check:
    p = raw.get(raw_key, {})
    print(f"\n==================================================")
    print(f"PAGE: {slug} (Source key: {raw_key})")
    print(f"TITLE: {p.get('title')}")
    print(f"HEADINGS ({len(p.get('headings', []))}): {p.get('headings')}")
    print(f"PARAS COUNT: {len(p.get('paragraphs', []))}")
    for i, para in enumerate(p.get('paragraphs', [])[:5]):
        print(f"   [{i}] {para[:120]}...")
    if len(p.get('paragraphs', [])) > 5:
        print(f"   ... ({len(p.get('paragraphs', [])) - 5} more paragraphs)")
    print(f"LIST ITEMS ({len(p.get('list_items', []))}): {p.get('list_items', [])[:4]}")
    print(f"IMAGES: {[img.get('src') if isinstance(img, dict) else img for img in p.get('images', [])]}")
