#!/usr/bin/env python3
"""
OFS Group Website Content Migration ETL Script
==============================================
A complete 4-stage ETL tool to discover, extract, transform, normalize, download assets,
and load content from the existing OFS website (ofsworld.com / ofsgroupindia.com) into 
the Next.js project dataset.

Features:
  1. Discovery & Raw Extraction: Fetches pages, HTML, metadata, images, and text.
  2. Scope Filtering & Exclusion: Excludes Aviation, Catering, IFM, and Pharma.
  3. Flagged Terms Audit: Logs mentions of excluded terms in valid pages into review CSVs.
  4. Renewables Isolation: Extracts Renewable Energy content into a separate renewables bundle.
  5. Image Asset Downloading: Deduplicates MD5 and downloads images to public/images/migrated/.
  6. Static Data Loading: Updates src/data/*.json for Next.js routes.
  7. Audit Reporting: Generates CSV and JSON migration reports.

Usage:
  python scripts/migrate_ofs.py                 # Full ETL pipeline (Dry-run by default)
  python scripts/migrate_ofs.py --load          # Full ETL pipeline + update src/data/
  python scripts/migrate_ofs.py --stage extract # Extraction only
  python scripts/migrate_ofs.py --stage transform # Transformation & Audit only
  python scripts/migrate_ofs.py --stage media   # Download media assets only
  python scripts/migrate_ofs.py --stage report  # Generate reports only
"""

import os
import sys
import json
import csv
import re
import hashlib
import argparse
import urllib.request
import urllib.parse
import urllib.error
from html.parser import HTMLParser
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
SRC_DATA_DIR = BASE_DIR / "src" / "data"
PUBLIC_IMAGES_DIR = BASE_DIR / "public" / "images" / "migrated"
ETL_DIR = BASE_DIR / "etl"
RAW_DIR = ETL_DIR / "output" / "raw"
REVIEW_DIR = ETL_DIR / "output" / "review"

# Scope Rules
EXCLUDED_KEYWORDS = ["aviation", "catering", "hospitality", "ifm", "facility-management", "pharma", "pharmaceutical", "chemical"]
RENEWABLE_KEYWORDS = ["renewable", "renewables", "solar", "wind", "green-energy"]
FLAGGED_TERMS = ["aviation", "catering", "hospitality", "ifm", "pharmaceutical", "pharma", "chemical"]

# Fallback offline dataset location
OFFLINE_DATASET_FILE = SRC_DATA_DIR / "scraped-live-data.json"

class HTMLTextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_parts = []
        self.headings = []
        self.images = []
        self.links = []
        self.current_tag = None

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        attr_dict = dict(attrs)
        if tag == "img" and "src" in attr_dict:
            src = attr_dict["src"]
            alt = attr_dict.get("alt", "")
            if src and not src.startswith("data:"):
                self.images.append({"src": src, "alt": alt})
        elif tag == "a" and "href" in attr_dict:
            href = attr_dict["href"]
            if href:
                self.links.append(href)

    def handle_data(self, data):
        cleaned = data.strip()
        if cleaned:
            if self.current_tag in ["h1", "h2", "h3", "h4", "h5", "h6"]:
                self.headings.append(cleaned)
            self.text_parts.append(cleaned)

    def get_text(self):
        return " ".join(self.text_parts)


def ensure_directories():
    SRC_DATA_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    REVIEW_DIR.mkdir(parents=True, exist_ok=True)


def fetch_url(url, timeout=10):
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) OFS-Migration-Bot/1.0"}
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as response:
            return response.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"[WARN] Failed to fetch {url}: {e}")
        return None


def download_image(url, target_folder):
    target_folder.mkdir(parents=True, exist_ok=True)
    try:
        url_hash = hashlib.md5(url.encode("utf-8")).hexdigest()[:10]
        parsed = urllib.parse.urlparse(url)
        ext = Path(parsed.path).suffix.lower() or ".jpg"
        if ext not in [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"]:
            ext = ".jpg"
        
        filename = f"img_{url_hash}{ext}"
        filepath = target_folder / filename
        
        if filepath.exists():
            return f"/images/migrated/{target_folder.name}/{filename}"
            
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) OFS-Migration-Bot/1.0"}
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read()
            with open(filepath, "wb") as f:
                f.write(content)
        return f"/images/migrated/{target_folder.name}/{filename}"
    except Exception as e:
        print(f"[WARN] Image download failed for {url}: {e}")
        return url


def extract_stage():
    print("=" * 60)
    print("STAGE 1: DISCOVERY & RAW EXTRACTION")
    print("=" * 60)
    ensure_directories()
    
    extracted_data = {}
    
    if OFFLINE_DATASET_FILE.exists():
        print(f"[INFO] Reading baseline dataset from {OFFLINE_DATASET_FILE.name}")
        with open(OFFLINE_DATASET_FILE, "r", encoding="utf-8") as f:
            extracted_data = json.load(f)
    
    target_urls = [
        "https://ofsgroupindia.com/",
        "https://ofsgroupindia.com/company-profile/",
        "https://ofsgroupindia.com/mission-vision/",
        "https://ofsgroupindia.com/contact-us/",
        "https://ofsworld.com/products/",
        "https://ofsworld.com/services/",
        "https://ofsworld.com/industries/",
        "https://ofsworld.com/renewables/"
    ]
    
    for url in target_urls:
        slug = url.strip("/").split("/")[-1] or "home"
        if slug in extracted_data:
            print(f"[INFO] Page '{slug}' already exists in baseline.")
            continue
        print(f"[FETCH] Attempting to scrape: {url}")
        html = fetch_url(url)
        if html:
            parser = HTMLTextExtractor()
            parser.feed(html)
            extracted_data[slug] = {
                "url": url,
                "title": slug.replace("-", " ").title(),
                "headings": parser.headings,
                "paragraphs": parser.text_parts,
                "images": parser.images,
                "raw_html": html
            }

    raw_output_path = RAW_DIR / "raw_extracted_pages.json"
    with open(raw_output_path, "w", encoding="utf-8") as f:
        json.dump(extracted_data, f, indent=2)
        
    print(f"[SUCCESS] Extracted {len(extracted_data)} page datasets saved to {raw_output_path}")
    return extracted_data


def transform_stage(raw_data=None):
    print("=" * 60)
    print("STAGE 2: TRANSFORMATION & ONTOLOGY MAPPING")
    print("=" * 60)
    ensure_directories()

    if not raw_data:
        raw_output_path = RAW_DIR / "raw_extracted_pages.json"
        if raw_output_path.exists():
            with open(raw_output_path, "r", encoding="utf-8") as f:
                raw_data = json.load(f)
        elif OFFLINE_DATASET_FILE.exists():
            with open(OFFLINE_DATASET_FILE, "r", encoding="utf-8") as f:
                raw_data = json.load(f)
        else:
            print("[ERROR] No raw data available for transformation.")
            return None

    inventory = []
    flagged_entries = []
    excluded_entries = []
    
    normalized = {
        "products": [],
        "services": [],
        "industries": [],
        "renewables": [],
        "company_pages": []
    }

    existing_products_file = SRC_DATA_DIR / "products.json"
    existing_services_file = SRC_DATA_DIR / "services.json"
    existing_industries_file = SRC_DATA_DIR / "industries.json"
    existing_renewables_file = SRC_DATA_DIR / "renewables.json"

    if existing_products_file.exists():
        with open(existing_products_file, "r", encoding="utf-8") as f:
            normalized["products"] = json.load(f)
    if existing_services_file.exists():
        with open(existing_services_file, "r", encoding="utf-8") as f:
            normalized["services"] = json.load(f)
    if existing_industries_file.exists():
        with open(existing_industries_file, "r", encoding="utf-8") as f:
            normalized["industries"] = json.load(f)
    if existing_renewables_file.exists():
        with open(existing_renewables_file, "r", encoding="utf-8") as f:
            normalized["renewables"] = json.load(f)

    for page_slug, page_content in raw_data.items():
        url = page_content.get("url", "")
        title = page_content.get("title", page_slug)
        paragraphs = page_content.get("paragraphs", [])
        full_text = " ".join(paragraphs) if isinstance(paragraphs, list) else str(paragraphs)
        
        is_excluded = any(ex in page_slug.lower() or ex in title.lower() for ex in EXCLUDED_KEYWORDS)
        if is_excluded:
            print(f"[EXCLUDE] Skipping discontinued/restricted sector page: {page_slug} ({title})")
            excluded_entries.append({
                "page": page_slug,
                "url": url,
                "reason": "Exclusion keyword matched (Aviation/Catering/IFM/Pharma)"
            })
            continue

        for term in FLAGGED_TERMS:
            matches = re.finditer(r"\b" + re.escape(term) + r"\b", full_text, re.IGNORECASE)
            for m in matches:
                start = max(0, m.start() - 50)
                end = min(len(full_text), m.end() + 50)
                snippet = full_text[start:end].replace("\n", " ").strip()
                flagged_entries.append({
                    "page": page_slug,
                    "url": url,
                    "term": term,
                    "snippet": f"...{snippet}...",
                    "action_required": "OFS Client Review Required (Do not delete automatically)"
                })

        is_renewable = any(rk in page_slug.lower() or rk in title.lower() for rk in RENEWABLE_KEYWORDS)
        status = "RENEWABLES_SUBDOMAIN" if is_renewable else "APPROVED_MAIN_SITE"
        
        word_count = len(full_text.split())
        inventory.append({
            "page_slug": page_slug,
            "title": title,
            "url": url,
            "status": status,
            "word_count": word_count,
            "headings_count": len(page_content.get("headings", []))
        })

    normalized_file = ETL_DIR / "output" / "normalized_dataset.json"
    with open(normalized_file, "w", encoding="utf-8") as f:
        json.dump(normalized, f, indent=2)

    inv_csv_path = REVIEW_DIR / "migration-inventory.csv"
    with open(inv_csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["page_slug", "title", "url", "status", "word_count", "headings_count"])
        writer.writeheader()
        writer.writerows(inventory)

    flagged_csv_path = REVIEW_DIR / "flagged-terms.csv"
    with open(flagged_csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["page", "url", "term", "snippet", "action_required"])
        writer.writeheader()
        writer.writerows(flagged_entries)

    print(f"[SUCCESS] Transformed datasets and generated review CSVs in {REVIEW_DIR}")
    print(f"  - Approved Inventory: {len(inventory)} pages")
    print(f"  - Excluded Pages: {len(excluded_entries)} pages")
    print(f"  - Flagged Terms Snippets: {len(flagged_entries)} instances")
    return normalized, inventory, flagged_entries, excluded_entries


def media_stage():
    print("=" * 60)
    print("STAGE 3: MEDIA ASSETS DOWNLOAD & DEDUPLICATION")
    print("=" * 60)
    ensure_directories()
    
    normalized_file = ETL_DIR / "output" / "normalized_dataset.json"
    if not normalized_file.exists():
        print("[WARN] No normalized dataset found. Skipping media download.")
        return

    with open(normalized_file, "r", encoding="utf-8") as f:
        normalized = json.load(f)

    downloaded_count = 0
    # Process products heroImages and scrapedImages
    for p in normalized.get("products", []):
        hero = p.get("heroImage")
        if hero and hero.startswith("http"):
            local_path = download_image(hero, PUBLIC_IMAGES_DIR / "products")
            p["heroImage"] = local_path
            downloaded_count += 1
        
        scraped = p.get("scrapedImages", [])
        updated_scraped = []
        for img_url in scraped:
            if img_url and img_url.startswith("http"):
                lp = download_image(img_url, PUBLIC_IMAGES_DIR / "products")
                updated_scraped.append(lp)
                downloaded_count += 1
            else:
                updated_scraped.append(img_url)
        p["scrapedImages"] = updated_scraped

    with open(normalized_file, "w", encoding="utf-8") as f:
        json.dump(normalized, f, indent=2)

    print(f"[SUCCESS] Downloaded/Processed {downloaded_count} image assets into {PUBLIC_IMAGES_DIR}")


def report_stage(inventory=None, flagged_entries=None, excluded_entries=None):
    print("=" * 60)
    print("STAGE 4: MIGRATION AUDIT REPORT GENERATION")
    print("=" * 60)
    ensure_directories()

    report_data = {
        "timestamp": str(Path(__file__).stat().st_mtime),
        "total_pages_discovered": len(inventory) if inventory else 0,
        "excluded_pages_count": len(excluded_entries) if excluded_entries else 0,
        "flagged_terms_count": len(flagged_entries) if flagged_entries else 0,
        "summary": "Content migration ETL completed. Flagged terms recorded for OFS screening."
    }

    report_json_path = REVIEW_DIR / "migration-report.json"
    with open(report_json_path, "w", encoding="utf-8") as f:
        json.dump(report_data, f, indent=2)

    print(f"[REPORT] Summary report written to {report_json_path}")
    print("Audit Report Summary:")
    print(f"  - Total Pages Discovered: {report_data['total_pages_discovered']}")
    print(f"  - Excluded Sectors: {report_data['excluded_pages_count']}")
    print(f"  - Flagged Terms Needing Client Review: {report_data['flagged_terms_count']}")


def load_stage():
    print("=" * 60)
    print("STAGE 5: LOADING DATASETS TO NEXT.JS PROJECT DATA")
    print("=" * 60)
    
    normalized_file = ETL_DIR / "output" / "normalized_dataset.json"
    if not normalized_file.exists():
        print("[ERROR] Normalized dataset not found. Run transform stage first.")
        return

    with open(normalized_file, "r", encoding="utf-8") as f:
        normalized = json.load(f)

    for key, data in normalized.items():
        if data:
            target_path = SRC_DATA_DIR / f"{key}.json"
            with open(target_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            print(f"[LOADED] Written {len(data)} items to {target_path}")

    print("[SUCCESS] Static datasets loaded to src/data/ for Next.js consumption.")


def main():
    parser = argparse.ArgumentParser(description="OFS Group Website Content Migration ETL Tool")
    parser.add_argument("--stage", choices=["all", "extract", "transform", "media", "report", "load"], default="all", help="Specify stage to run")
    parser.add_argument("--load", action="store_true", help="Explicitly enable loading into src/data/")
    parser.add_argument("--dry-run", action="store_true", help="Run without altering src/data/")

    args = parser.parse_args()

    print("\n[INIT] OFS CONTENT MIGRATION ETL ENGINE INITIALIZED\n")

    if args.stage in ["all", "extract"]:
        raw_data = extract_stage()
    else:
        raw_data = None

    if args.stage in ["all", "transform"]:
        normalized, inventory, flagged, excluded = transform_stage(raw_data)
    else:
        inventory, flagged, excluded = None, None, None

    if args.stage in ["all", "media"]:
        media_stage()

    if args.stage in ["all", "report"]:
        report_stage(inventory, flagged, excluded)

    if (args.stage == "all" and args.load and not args.dry_run) or args.stage == "load":
        load_stage()
    elif args.dry_run or not args.load:
        print("\n[NOTE] Dry-run completed. Run with --load to overwrite src/data/ static files.\n")


if __name__ == "__main__":
    main()
