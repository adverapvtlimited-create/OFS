import json

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

slugs = [
    'inventory-planning-optimisation',
    'master-data-management',
    'mro-supply',
    'plant-maintenance-mro-spare-parts-management',
    'spare-parts-availability',
    'strategic-sourcing-mro-data-enrichment',
    'supply-chain-financing',
    'global-mro-procurement-excellence',
    'procurement-services',
    'quality-control',
    'supply-chain-management',
    'warehouse-2'
]

for s in slugs:
    p = raw[s]
    print(f"\n=======================================================")
    print(f"PAGE: {s}")
    print(f"TITLE: {p.get('title')}")
    print(f"HEADINGS: {p.get('headings')}")
    print("PARAGRAPHS WITH INDEX:")
    for i, pa in enumerate(p.get('paragraphs', [])):
        print(f"[{i:2d}] {pa}")
