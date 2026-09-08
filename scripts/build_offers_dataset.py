import json
import os
import re

# Load raw ETL pages
with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw_pages = json.load(f)

# Collect all local images
local_images = {}
for root, dirs, files in os.walk('public'):
    for file in files:
        rel_path = os.path.relpath(os.path.join(root, file), 'public').replace('\\', '/')
        local_images[file.lower()] = '/' + rel_path

def find_local_image(url_or_name):
    if not url_or_name:
        return None
    fname = os.path.basename(url_or_name).lower()
    return local_images.get(fname)

def clean_str(s):
    if not s:
        return ""
    s = s.replace('\u00a0', ' ').replace('&amp;', '&').replace('&#8211;', '—').replace('&quot;', '"').strip()
    return s

def clean_title(t):
    t = clean_str(t)
    t = re.sub(r'\s*-\s*Oriented Facility Solution.*$', '', t, flags=re.IGNORECASE)
    t = re.sub(r'\s*-\s*OFS.*$', '', t, flags=re.IGNORECASE)
    t = re.sub(r'\s*\|\s*OFS.*$', '', t, flags=re.IGNORECASE)
    return t.strip()

# Definitions of the 20 What We Offer pages
page_defs = [
    {
        'slug': 'indirect-procurement',
        'raw_key': 'indirect-procurement',
        'category': 'expertise',
        'categoryLabel': 'Expertise',
        'heroImage': '/images/live/indirect-procurement-hero.png' if 'indirect-procurement-hero.png' in local_images else None,
    },
    {
        'slug': 'outsource-procurement',
        'raw_key': 'outsource-procurement',
        'category': 'expertise',
        'categoryLabel': 'Expertise',
        'heroImage': '/images/live/future-procurement.png' if 'future-procurement.png' in local_images else None,
    },
    {
        'slug': 'procurement-shipping',
        'raw_key': 'procurement-shipping',
        'category': 'services',
        'categoryLabel': 'Services',
        'heroImage': '/images/live/Procurement-and-shippings.jpg' if 'procurement-and-shippings.jpg' in local_images else '/images/live/Procurement-Shipping.png',
    },
    {
        'slug': 'engineering-epc-support-services',
        'raw_key': 'engineering-epc-support-services',
        'category': 'services',
        'categoryLabel': 'Services',
        'heroImage': '/images/live/Engg-e1751278356951.jpg' if 'engg-e1751278356951.jpg' in local_images else '/images/live/Engineering-EP-Support-Services.png',
    },
    {
        'slug': 'spare-parts-procurement',
        'raw_key': 'spare-parts-procurement',
        'category': 'services',
        'categoryLabel': 'Services',
        'heroImage': '/images/live/Spare-Parts-Procurement.jpg' if 'spare-parts-procurement.jpg' in local_images else '/images/live/Spare-Parts-Procurement.png',
    },
    {
        'slug': 'logistics-shipping',
        'raw_key': 'logistics-shipping',
        'category': 'services',
        'categoryLabel': 'Services',
        'heroImage': '/images/live/Logistics-and-shippings.jpg' if 'logistics-and-shippings.jpg' in local_images else '/images/live/Logistic-Shipping.png',
    },
    {
        'slug': 'quality-control',
        'raw_key': 'quality-control',
        'category': 'services',
        'categoryLabel': 'Services',
        'heroImage': None,
    },
    {
        'slug': 'supply-chain-management',
        'raw_key': 'supply-chain-management',
        'category': 'services',
        'categoryLabel': 'Services',
        'heroImage': None,
    },
    {
        'slug': 'warehouse',
        'raw_key': 'warehouse-2',
        'category': 'services',
        'categoryLabel': 'Services',
        'heroImage': None,
    },
    {
        'slug': 'global-mro-procurement-excellence',
        'raw_key': 'global-mro-procurement-excellence',
        'category': 'solutions',
        'categoryLabel': 'Solutions',
        'heroImage': None,
    },
    {
        'slug': 'inventory-planning-optimisation',
        'raw_key': 'inventory-planning-optimisation',
        'category': 'solutions',
        'categoryLabel': 'Solutions',
        'heroImage': None,
    },
    {
        'slug': 'master-data-management',
        'raw_key': 'master-data-management',
        'category': 'solutions',
        'categoryLabel': 'Solutions',
        'heroImage': None,
    },
    {
        'slug': 'mro-supply',
        'raw_key': 'mro-supply',
        'category': 'solutions',
        'categoryLabel': 'Solutions',
        'heroImage': None,
    },
    {
        'slug': 'plant-maintenance-mro-spare-parts-management',
        'raw_key': 'plant-maintenance-mro-spare-parts-management',
        'category': 'solutions',
        'categoryLabel': 'Solutions',
        'heroImage': None,
    },
    {
        'slug': 'spare-parts-availability',
        'raw_key': 'spare-parts-availability',
        'category': 'solutions',
        'categoryLabel': 'Solutions',
        'heroImage': None,
    },
    {
        'slug': 'strategic-sourcing-mro-data-enrichment',
        'raw_key': 'strategic-sourcing-mro-data-enrichment',
        'category': 'solutions',
        'categoryLabel': 'Solutions',
        'heroImage': None,
    },
    {
        'slug': 'supply-chain-financing',
        'raw_key': 'supply-chain-financing',
        'category': 'solutions',
        'categoryLabel': 'Solutions',
        'heroImage': None,
    },
    {
        'slug': 'procurement-services',
        'raw_key': 'procurement-services',
        'category': 'disciplines',
        'categoryLabel': 'Disciplines',
        'heroImage': None,
    },
    {
        'slug': 'project-supply',
        'raw_key': 'project-supply',
        'category': 'disciplines',
        'categoryLabel': 'Disciplines',
        'heroImage': None,
    },
    {
        'slug': 'outsource-manufacturing',
        'raw_key': 'outsource-manufacturing',
        'category': 'manufacturing',
        'categoryLabel': 'Manufacturing',
        'heroImage': None,
    }
]

print(f"Prepared {len(page_defs)} page definitions.")
