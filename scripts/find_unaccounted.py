import json

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

company_and_meta = {
    'home', 'company-profile', 'mission-vision', 'contact-us', 'ofsworld.com', 'ofsgroupindia.com'
}

# Industry aliases in raw pages
industry_aliases = {
    'oil-gas', 'marine', 'renewable-energy', 'power-energy', 'petroleum-refining',
    'cement', 'mining-minerals', 'heavy-engineering', 'natural-gas-distribution',
    'biotechnology', 'transportation', 'general-manufacturing', 'electrical-electronics'
}

# Product aliases in raw pages
product_aliases = {
    'pumps', 'pumps-spare-parts', 'mro-tools', 'heavy-machinery-equipments',
    'safety-tools-equipments', 'instrumentation', 'maintenance-repair-tools',
    'rotary-equipment', 'electrical-power-equipments', 'hvac-refrigeration',
    'industrial-valves', 'drilling-equipment', 'process-equipment'
}

all_categorized = set()
all_categorized.update(discontinued)
all_categorized.update(company_and_meta)
all_categorized.update(ind_slugs)
all_categorized.update(industry_aliases)
all_categorized.update(prod_slugs)
all_categorized.update(product_aliases)

unaccounted = []
for k, v in raw_pages.items():
    if k.isdigit():
        continue
    if k not in all_categorized:
        unaccounted.append((k, v.get('title'), v.get('url'), len(v.get('paragraphs', []))))

print(f"Total non-numeric pages unaccounted for: {len(unaccounted)}")
for u in unaccounted:
    print(u)
