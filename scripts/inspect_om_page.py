import json
from bs4 import BeautifulSoup

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

page = raw.get('outsource-manufacturing', {})
raw_html = page.get('raw_html', '')
soup = BeautifulSoup(raw_html, 'html.parser')

# Find all elementor sections
sections = soup.find_all('section')
print(f"Total sections: {len(sections)}")

for i, sec in enumerate(sections):
    headings = [h.get_text(strip=True) for h in sec.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])]
    paras = [p.get_text(strip=True) for p in sec.find_all('p') if p.get_text(strip=True)]
    imgs = [img.get('src') for img in sec.find_all('img') if img.get('src')]
    print(f"\n=== SECTION {i+1} ===")
    print("Headings:", headings)
    print(f"Paras ({len(paras)}):", paras[:4])
    print(f"Images ({len(imgs)}):", imgs[:4])
