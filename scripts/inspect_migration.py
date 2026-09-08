import json
import csv
import os

print('=== 1. MIGRATION INVENTORY ===')
inventory = []
with open('etl/output/review/migration-inventory.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        inventory.append(row)
        print(f"{row.get('slug')}: status={row.get('status')}, category={row.get('category')}, title={row.get('title')}")

print(f"\nTotal inventory rows: {len(inventory)}")

print('\n=== 2. RAW EXTRACTED PAGES KEYS ===')
with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw_pages = json.load(f)
print(f"Total raw pages: {len(raw_pages)}")
print(list(raw_pages.keys()))

print('\n=== 3. FLAGGED TERMS ===')
with open('etl/output/review/flagged-terms.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    flagged = list(reader)
print(f"Total flagged terms entries: {len(flagged)}")
for r in flagged[:10]:
    print(r)

print('\n=== 4. CURRENT OFFERS.JSON KEYS ===')
with open('src/data/offers.json', 'r', encoding='utf-8') as f:
    offers = json.load(f)
print(f"Total offers in src/data/offers.json: {len(offers)}")
print(list(offers.keys()))

print('\n=== 5. NAVIGATION WHAT WE OFFER ===')
with open('src/data/navigation.js', 'r', encoding='utf-8') as f:
    nav_content = f.read()
print(nav_content[:1500])
