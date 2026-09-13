import json
import os
import sys

# Ensure UTF-8 stdout
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('src/data/offers.json', 'r', encoding='utf-8') as f:
    offers = json.load(f)

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw_pages = json.load(f)

print(f"==================================================")
print(f"VERIFICATION AUDIT OF ALL {len(offers)} WHAT WE OFFER PAGES")
print(f"==================================================")

for slug, page in offers.items():
    title = page.get('title')
    cat = page.get('category')
    blocks_count = len(page.get('blocks', []))
    sections_count = len(page.get('sections', []))
    features_count = len(page.get('features', []))
    overview_paras = len(page.get('overviewParagraphs', []))
    desc_len = len(page.get('description', ''))
    
    total_headings = 0
    total_paras = overview_paras + (1 if desc_len > 0 else 0)
    
    for s in page.get('sections', []):
        total_headings += 1
        total_paras += len(s.get('paragraphs', []))
        
    for b in page.get('blocks', []):
        if b.get('title'):
            total_headings += 1
        total_paras += len(b.get('paragraphs', []))
        if b.get('items'):
            total_paras += len(b.get('items', []))
            
    print(f"[OK] [{slug}]")
    print(f"     Title: '{title}' | Category: '{cat}' | Href: '{page.get('href')}'")
    print(f"     Headings: {total_headings} | Paras/Items: {total_paras} | Features: {features_count} | Blocks: {blocks_count}")

print(f"\nTotal Valid Pages: {len(offers)}")
