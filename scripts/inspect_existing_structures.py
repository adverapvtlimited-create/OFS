import json

with open('src/data/offers.json', 'r', encoding='utf-8') as f:
    offers = json.load(f)

for slug in ['indirect-procurement', 'engineering-epc-support-services', 'logistics-shipping', 'procurement-shipping', 'spare-parts-procurement', 'inventory-planning-optimisation', 'master-data-management', 'mro-supply', 'plant-maintenance-mro-spare-parts-management', 'spare-parts-availability', 'strategic-sourcing-mro-data-enrichment', 'supply-chain-financing', 'procurement-services']:
    if slug in offers:
        obj = offers[slug]
        print(f"\n==================== {slug} ====================")
        print(f"Title: {obj.get('title')}")
        print(f"Tagline: {obj.get('tagline')}")
        print(f"OverviewTitle: {obj.get('overviewTitle')}")
        print(f"OverviewParagraphs: {len(obj.get('overviewParagraphs', []))}")
        print(f"Features: {len(obj.get('features', []))}")
        print(f"Sections: {len(obj.get('sections', []))}")
        for s in obj.get('sections', []):
            print(f"   Section '{s.get('title')}': {len(s.get('paragraphs', []))} paras")
        print(f"Blocks: {len(obj.get('blocks', []))}")
