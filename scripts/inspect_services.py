import json

with open('etl/output/normalized_dataset.json', 'r', encoding='utf-8') as f:
    normalized = json.load(f)

services = normalized.get('services', {})
print(f"Total services in normalized dataset: {len(services)}")
for k, v in services.items():
    title = v.get('title')
    slug = v.get('slug', k)
    url = v.get('url')
    headings = len(v.get('headings', []))
    paras = len(v.get('paragraphs', []))
    images = len(v.get('images', []))
    print(f"Key: {k} | Slug: {slug} | Title: {title} | Headings: {headings} | Paras: {paras} | Images: {images}")
