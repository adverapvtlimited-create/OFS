import json
from bs4 import BeautifulSoup

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

page = raw.get('outsource-manufacturing', {})
raw_html = page.get('raw_html', '')
soup = BeautifulSoup(raw_html, 'html.parser')

# Print each elementor section's inner structure
for i, sec in enumerate(soup.find_all('section')):
    print(f"\n==================== SECTION {i+1} ====================")
    # find all headings
    for h in sec.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
        print(f"  [{h.name}]: {h.get_text(strip=True)}")
    for p in sec.find_all('p'):
        print(f"  [p]: {p.get_text(strip=True)[:100]}")
    for img in sec.find_all('img'):
        src = img.get('data-src') or img.get('src')
        print(f"  [img]: {src}")
