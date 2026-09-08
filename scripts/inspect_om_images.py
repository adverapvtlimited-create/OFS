import json
from bs4 import BeautifulSoup

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

page = raw.get('outsource-manufacturing', {})
raw_html = page.get('raw_html', '')
soup = BeautifulSoup(raw_html, 'html.parser')

for i, img in enumerate(soup.find_all('img')):
    src = img.get('src')
    data_src = img.get('data-src') or img.get('data-lazy-src') or img.get('srcset')
    alt = img.get('alt')
    parent_text = img.parent.get_text(strip=True) if img.parent else ''
    print(f"Img {i+1}: src={src[:60] if src else None} | data_src={data_src[:60] if data_src else None} | alt={alt} | text={parent_text[:40]}")
