import json

with open('etl/output/review/migration-report.json', 'r', encoding='utf-8') as f:
    report = json.load(f)

print(json.dumps(report, indent=2)[:3000])
