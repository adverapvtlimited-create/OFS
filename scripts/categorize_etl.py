import json
import csv

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw_pages = json.load(f)

with open('src/data/industries.json', 'r', encoding='utf-8') as f:
    industries = json.load(f)
ind_slugs = {ind['slug'] for ind in industries}

with open('src/data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)
prod_slugs = set(products.keys())

discontinued = {
    'ifm-business',
    'pharmaceuticals-chemicals',
    'hospitality-catering-services',
    'aviation',
    'industrial-oil-chemicals-lubricants'
}

about_and_utility = {
    'home', 'company-profile', 'mission-vision', 'contact-us', 'ofsworld.com', 'ofsgroupindia.com'
}

print(f"Total raw pages in ETL: {len(raw_pages)}")
print("\nCategorizing all ETL pages:")

offers_candidates = []
industries_found = []
products_found = []
numeric_pages = []
discontinued_found = []
other_found = []

for slug, p in raw_pages.items():
    title = p.get('title', '')
    url = p.get('url', '')
    
    if slug in discontinued:
        discontinued_found.append((slug, title, url))
    elif slug in about_and_utility:
        other_found.append((slug, title, url))
    elif slug.isdigit():
        numeric_pages.append((slug, title, url))
    elif slug in ind_slugs:
        industries_found.append((slug, title, url))
    elif slug in prod_slugs:
        products_found.append((slug, title, url))
    else:
        offers_candidates.append((slug, title, url, len(p.get('headings', [])), len(p.get('paragraphs', [])), len(p.get('images', []))))

print(f"\n--- Discontinued ({len(discontinued_found)}) ---")
for x in discontinued_found:
    print(x)

print(f"\n--- Industries ({len(industries_found)}) ---")
for x in industries_found:
    print(x)

print(f"\n--- Products ({len(products_found)}) ---")
for x in products_found:
    print(x)

print(f"\n--- What We Offer / Solutions Candidates ({len(offers_candidates)}) ---")
for x in offers_candidates:
    print(f"Slug: {x[0]} | Title: {x[1]} | Headings: {x[3]} | Paras: {x[4]} | Images: {x[5]}")

print(f"\n--- Numeric Pages ({len(numeric_pages)}) ---")
for x in numeric_pages:
    print(x)
