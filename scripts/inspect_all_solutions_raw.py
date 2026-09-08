import json

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

solutions_slugs = [
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
    'indirect-procurement',
    'outsource-procurement',
    'procurement-shipping',
    'engineering-epc-support-services',
    'spare-parts-procurement',
    'logistics-shipping',
    'quality-control',
    'supply-chain-management',
    'warehouse-2',
    'outsource-manufacturing'
]

for s in solutions_slugs:
    p = raw.get(s, {})
    print(f"\n=======================================================")
    print(f"SLUG: {s}")
    print(f"TITLE: {p.get('title')}")
    print(f"HEADINGS ({len(p.get('headings', []))}):")
    for h in p.get('headings', []):
        print(f"   - {h}")
    print(f"TOTAL PARAS: {len(p.get('paragraphs', []))}")
    print(f"TOTAL LIST ITEMS: {len(p.get('list_items', []))}")
    print(f"IMAGES ({len(p.get('images', []))}):")
    for img in p.get('images', []):
        src = img.get('src') if isinstance(img, dict) else img
        print(f"   * {src}")
