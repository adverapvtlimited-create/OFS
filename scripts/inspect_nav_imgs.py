import json
import re

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for slug, val in data.items():
    if any(k in slug for k in ['procurement-services', 'project-supply', 'outsource-manufacturing', 'indirect-procurement', 'outsource-procurement']):
        print('=== SLUG:', slug, 'TITLE:', val.get('title'))
        raw_html = val.get('raw_html', '')
        imgs = re.findall(r'src=["\']([^"\']+)["\']', raw_html)
        print('Found images in HTML:', set(imgs))
