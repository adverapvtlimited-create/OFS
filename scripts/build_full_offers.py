import json
import os
import re

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

# Collect all local images
local_images = {}
for root, dirs, files in os.walk('public'):
    for file in files:
        rel_path = os.path.relpath(os.path.join(root, file), 'public').replace('\\', '/')
        local_images[file.lower()] = '/' + rel_path

def find_img(name):
    if not name:
        return None
    fname = os.path.basename(name).lower()
    return local_images.get(fname)

def clean(t):
    if not t:
        return ""
    t = t.replace('\u00a0', ' ').replace('&amp;', '&').replace('&#8211;', '—').replace('&quot;', '"').replace('', '—').strip()
    return t

def clean_title(t):
    t = clean(t)
    t = re.sub(r'\s*-\s*Oriented Facility Solution.*$', '', t, flags=re.IGNORECASE)
    t = re.sub(r'\s*-\s*OFS.*$', '', t, flags=re.IGNORECASE)
    t = re.sub(r'\s*\|\s*OFS.*$', '', t, flags=re.IGNORECASE)
    return t.strip()

print("Ready to build full 20 pages dataset.")
