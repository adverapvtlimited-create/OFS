import json

with open('etl/output/normalized_dataset.json', 'r', encoding='utf-8') as f:
    normalized = json.load(f)

print(f"Type of normalized: {type(normalized)}")
if isinstance(normalized, dict):
    print("Keys:", list(normalized.keys())[:20])
    for k in list(normalized.keys())[:5]:
        print(f"\n--- {k} ---")
        v = normalized[k]
        if isinstance(v, dict):
            print("Title:", v.get('title'))
            print("Slug:", v.get('slug'))
            print("URL:", v.get('url'))
            print("Headings:", len(v.get('headings', [])))
            print("Paragraphs:", len(v.get('paragraphs', [])))
elif isinstance(normalized, list):
    print("Count:", len(normalized))
    for item in normalized[:5]:
        print(item.get('slug'), '|', item.get('title'), '|', item.get('category'))
