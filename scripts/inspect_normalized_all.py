import json

with open('etl/output/normalized_dataset.json', 'r', encoding='utf-8') as f:
    normalized = json.load(f)

for category, data in normalized.items():
    print(f"\n=================== CATEGORY: {category} (Type: {type(data)}) ===================")
    if isinstance(data, list):
        print(f"Count: {len(data)}")
        for item in data:
            if isinstance(item, dict):
                print(f"  - slug: {item.get('slug')} | title: {item.get('title')}")
            else:
                print(f"  - {str(item)[:100]}")
    elif isinstance(data, dict):
        print(f"Keys count: {len(data)}")
        for k, v in data.items():
            if isinstance(v, dict):
                print(f"  - {k}: title={v.get('title')}, slug={v.get('slug')}")
            else:
                print(f"  - {k}: {str(v)[:100]}")
