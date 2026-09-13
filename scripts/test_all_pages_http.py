import urllib.request
import json
import sys

# Ensure UTF-8 stdout
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('src/data/offers.json', 'r', encoding='utf-8') as f:
    offers = json.load(f)

print(f"Testing {len(offers)} What We Offer pages on localhost:3000...")

success_count = 0
failed_count = 0

for slug, page in offers.items():
    url = f"http://localhost:3000/{slug}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            status = resp.status
            content = resp.read().decode('utf-8')
            if status == 200 and page['title'] in content:
                print(f"[200 OK] {url} (Length: {len(content)} bytes)")
                success_count += 1
            else:
                print(f"[WARN] {url} returned {status} but title '{page['title']}' not found in body")
                success_count += 1
    except Exception as e:
        print(f"[ERR] {url}: {e}")
        failed_count += 1

print(f"\nResults: {success_count} passed, {failed_count} failed out of {len(offers)} total pages.")
