import json
import os

print("=== CHECKING SRC/DATA/OFFERS.JSON ===")
if os.path.exists('src/data/offers.json'):
    with open('src/data/offers.json', 'r', encoding='utf-8') as f:
        offers = json.load(f)
    print(f"Total keys in offers.json: {len(offers)}")
    for slug, obj in offers.items():
        print(f"[{slug}] title: '{obj.get('title')}' | category: '{obj.get('category')}' | blocks: {len(obj.get('blocks', []))} | sections: {len(obj.get('sections', []))} | features: {len(obj.get('features', []))}")

print("\n=== CHECKING SRC/DATA/FETCHED-OFFERS.JSON ===")
if os.path.exists('src/data/fetched-offers.json'):
    with open('src/data/fetched-offers.json', 'r', encoding='utf-8') as f:
        fo = json.load(f)
    print(f"Total keys in fetched-offers.json: {len(fo)}")
    for slug, obj in fo.items():
        print(f"[{slug}] title: '{obj.get('title')}' | category: '{obj.get('category')}'")
else:
    print("src/data/fetched-offers.json does not exist.")
