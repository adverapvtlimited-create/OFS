import json

with open('src/data/services.json', 'r', encoding='utf-8') as f:
    services = json.load(f)

print(f"Total in src/data/services.json: {len(services)}")
for s in services:
    print(f"slug: {s.get('slug')} | title: {s.get('title')}")
