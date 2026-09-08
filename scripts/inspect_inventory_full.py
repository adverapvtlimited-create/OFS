import csv

with open('etl/output/review/migration-inventory.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    print("Fieldnames:", reader.fieldnames)
    rows = list(reader)
    print(f"Total rows: {len(rows)}")
    for i, r in enumerate(rows):
        print(f"{i+1:2d}. slug={r.get('slug')} | status={r.get('status')} | title={r.get('title')} | url={r.get('url')} | word_count={r.get('word_count')}")
