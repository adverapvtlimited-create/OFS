import csv

with open('etl/output/review/migration-inventory.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for i, r in enumerate(reader):
        slug = r.get('page_slug')
        status = r.get('status')
        title = r.get('title')
        words = r.get('word_count')
        url = r.get('url')
        print(f"{i+1:3d}. [{status}] slug='{slug}' | title='{title}' | words={words}")
