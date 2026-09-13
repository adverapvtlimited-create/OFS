import json
import os
from urllib.parse import urlparse

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw_pages = json.load(f)

# The 20 offer pages
offer_keys = {
    'indirect-procurement': 'indirect-procurement',
    'outsource-procurement': 'outsource-procurement',
    'procurement-shipping': 'procurement-shipping',
    'engineering-epc-support-services': 'engineering-epc-support-services',
    'spare-parts-procurement': 'spare-parts-procurement',
    'logistics-shipping': 'logistics-shipping',
    'quality-control': 'quality-control',
    'supply-chain-management': 'supply-chain-management',
    'warehouse': 'warehouse-2',
    'global-mro-procurement-excellence': 'global-mro-procurement-excellence',
    'inventory-planning-optimisation': 'inventory-planning-optimisation',
    'master-data-management': 'master-data-management',
    'mro-supply': 'mro-supply',
    'plant-maintenance-mro-spare-parts-management': 'plant-maintenance-mro-spare-parts-management',
    'spare-parts-availability': 'spare-parts-availability',
    'strategic-sourcing-mro-data-enrichment': 'strategic-sourcing-mro-data-enrichment',
    'supply-chain-financing': 'supply-chain-financing',
    'procurement-services': 'procurement-services',
    'project-supply': 'project-supply',
    'outsource-manufacturing': 'outsource-manufacturing'
}

# Collect all local images
local_images = {}
for root, dirs, files in os.walk('public'):
    for file in files:
        rel_path = os.path.relpath(os.path.join(root, file), 'public').replace('\\', '/')
        local_images[file.lower()] = '/' + rel_path

print(f"Total local image files in public/: {len(local_images)}")

report = {}
for slug, raw_key in offer_keys.items():
    page_data = raw_pages.get(raw_key, {})
    imgs = page_data.get('images', [])
    found_imgs = []
    missing_imgs = []
    
    for img in imgs:
        src = img.get('src', '') if isinstance(img, dict) else str(img)
        filename = os.path.basename(urlparse(src).path).lower()
        if filename in local_images:
            found_imgs.append((src, local_images[filename]))
        else:
            missing_imgs.append(src)
            
    report[slug] = {
        'total_etl_images': len(imgs),
        'found_count': len(found_imgs),
        'missing_count': len(missing_imgs),
        'found': found_imgs,
        'missing': missing_imgs
    }
    print(f"[{slug}] ETL Images: {len(imgs)} | Local Matches: {len(found_imgs)} | Missing: {len(missing_imgs)}")

print("\n--- Summary of Missing Images ---")
for slug, rep in report.items():
    if rep['missing_count'] > 0:
        print(f"{slug}: {rep['missing_count']} missing:")
        for m in rep['missing'][:3]:
            print(f"   - {m}")
