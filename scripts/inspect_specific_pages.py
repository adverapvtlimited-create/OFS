import json

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

for slug in ['quality-control', 'supply-chain-management', 'warehouse-2', 'global-mro-procurement-excellence', 'inventory-planning-optimisation', 'master-data-management', 'mro-supply', 'plant-maintenance-mro-spare-parts-management', 'spare-parts-availability', 'strategic-sourcing-mro-data-enrichment', 'supply-chain-financing']:
    p = raw.get(slug, {})
    print(f"\n==================================================")
    print(f"SLUG: {slug}")
    print(f"TITLE: {p.get('title')}")
    print(f"HEADINGS: {p.get('headings')}")
    print("PARAGRAPHS:")
    for i, pa in enumerate(p.get('paragraphs', [])):
        print(f"  [{i}] {pa}")
    print("LIST ITEMS:")
    for i, li in enumerate(p.get('list_items', [])):
        print(f"  [{i}] {li}")
