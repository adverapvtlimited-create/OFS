import json

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

services_slugs = [
    'procurement-shipping',
    'engineering-epc-support-services',
    'engineering-epc',
    'spare-parts-procurement',
    'logistics-shipping',
    'quality-control',
    'supply-chain-management',
    'warehouse-2'
]

for s in services_slugs:
    p = raw.get(s, {})
    print(f"\n=======================================================")
    print(f"SERVICE: {s}")
    print(f"TITLE: {p.get('title')}")
    print(f"HEADINGS: {p.get('headings')}")
    print(f"PARAS ({len(p.get('paragraphs', []))}):")
    for i, pa in enumerate(p.get('paragraphs', [])):
        print(f"   [{i:2d}] {pa}")
    print(f"LIST ITEMS ({len(p.get('list_items', []))}):")
    for i, li in enumerate(p.get('list_items', [])):
        print(f"   [{i:2d}] {li}")
    print(f"IMAGES: {[img.get('src') if isinstance(img, dict) else img for img in p.get('images', [])]}")
