import urllib.request
import re
import json

def get_page_links(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            links = re.findall(r'href=["\'](https?://(?:ofsworld\.com|ofsgroupindia\.com)[^"\']*)["\']', html)
            return set(links)
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return set()

def main():
    start_urls = [
        "https://ofsworld.com/",
        "https://ofsgroupindia.com/",
        "https://ofsworld.com/sitemap.xml",
        "https://ofsgroupindia.com/sitemap.xml",
        "https://ofsworld.com/sitemap_index.xml",
        "https://ofsgroupindia.com/sitemap_index.xml"
    ]
    all_links = set()
    for u in start_urls:
        links = get_page_links(u)
        print(f"Found {len(links)} links from {u}")
        all_links.update(links)
        
    print(f"\nTotal unique links discovered: {len(all_links)}")
    for l in sorted(all_links)[:30]:
        print(" -", l)

if __name__ == "__main__":
    main()
