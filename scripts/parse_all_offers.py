import json
import re

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

def clean_text(t):
    if not t:
        return ""
    t = t.replace('\u00a0', ' ').replace('', '—').strip()
    return t

def inspect_page_structure(slug, raw_key):
    p = raw.get(raw_key, {})
    headings = [clean_text(h) for h in p.get('headings', []) if clean_text(h)]
    paras = [clean_text(pa) for pa in p.get('paragraphs', []) if clean_text(pa)]
    lists = [clean_text(li) for li in p.get('list_items', []) if clean_text(li)]
    images = p.get('images', [])
    
    # Filter out breadcrumb/nav noise in paras:
    clean_paras = []
    for pa in paras:
        if pa in ['Home ' + headings[0] if headings else '', 'WhatsApp us', '+91 8975585559', 'Request Advice Request Advice']:
            continue
        if pa.startswith('Home ') and len(pa.split()) <= 5:
            continue
        clean_paras.append(pa)
        
    print(f"\n=======================================================")
    print(f"SLUG: {slug} (Key: {raw_key})")
    print(f"TITLE: {clean_text(p.get('title'))}")
    print(f"HEADINGS ({len(headings)}): {headings}")
    print(f"CLEAN PARAS ({len(clean_paras)}):")
    for i, cp in enumerate(clean_paras[:10]):
        print(f"  [{i}] {cp[:100]}...")
    if len(clean_paras) > 10:
        print(f"  ... +{len(clean_paras)-10} more paragraphs")
    print(f"LIST ITEMS ({len(lists)}):")
    for i, li in enumerate(lists[:5]):
        print(f"  [{i}] {li[:100]}...")
    print(f"IMAGES ({len(images)}): {[img.get('src') if isinstance(img, dict) else img for img in images]}")

# Run for all 20 pages
pages = [
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

for slug, rk in pages:
    inspect_page_structure(slug, rk)
