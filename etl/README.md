# OFS Group Website Content Migration ETL Tool Documentation

Welcome to the **OFS Group Content Migration Deep-Crawl ETL Engine**. This tool automatically performs a deep recursive crawl across 120+ live URLs from `ofsgroupindia.com` and `ofsworld.com`, extracting, transforming, auditing, deduplicating, and loading 100% of all technical product, service, and industry data into the Next.js static data ecosystem.

---

## 🚀 Quick Start Guide: Step-by-Step Execution

If you are a frontend developer or data engineer picking up this pipeline, follow these exact steps to run the extraction safely.

### Step 1: Install Dependencies
Ensure you have the required Python packages installed before running anything:
```bash
pip install beautifulsoup4
```

### Step 2: Test the Pipeline (Dry-Run Mode)
We highly recommend running a dry-run first. This mode extracts raw live data, applies scope rules, downloads/deduplicates images, and generates audit reports **without altering** existing static files in `src/data/`:
```bash
python scripts/migrate_ofs.py
```
*Check the `etl/output/review/` directory after this run to ensure no critical pages were excluded accidentally.*

### Step 3: Full ETL & Static Data Load Mode (Production Run)
Once you verify the dry-run, execute the full load command. This will do the deep crawl and **permanently overwrite the static JSON datasets** in `src/data/` so the Next.js routes can immediately consume them:
```bash
python scripts/migrate_ofs.py --load
```

### Advanced: Stage-Specific Execution
If the script crashes midway or you only need to run a specific part of the pipeline (e.g., just re-downloading images), use the `--stage` flag:

| Command | Pipeline Stage & Operation |
| :--- | :--- |
| `python scripts/migrate_ofs.py --stage extract` | Recursively crawls 120+ live URLs and saves complete un-truncated page text & HTML structure to `etl/output/raw/raw_extracted_pages.json`. Now safely captures all short technical specs and lists. |
| `python scripts/migrate_ofs.py --stage transform` | Applies scope rules, exclusions, term flagging, and intelligently maps crawled text into the `fullContentText` fields of your `src/data/*.json` datasets under a `--- MIGRATED RAW TEXT ---` separator. |
| `python scripts/migrate_ofs.py --stage media` | Downloads and MD5-deduplicates product/service image assets to `public/images/migrated/`, appending new images to the `scrapedImages` arrays. |
| `python scripts/migrate_ofs.py --stage report` | Generates audit CSVs and JSON statistics in `etl/output/review/`. |
| `python scripts/migrate_ofs.py --stage load` | Overwrites `src/data/*.json` with the newly enriched dataset collections. |
---

## 🛡️ Scope Rules & Exclusion Logic

1. **Discontinued Sector Exclusions (5 Dedicated Pages):**
   - The following discontinued/restricted sector pages are automatically excluded from main site routes:
     - `ifm-business` (Integrated Facility Management)
     - `pharmaceuticals-chemicals`
     - `hospitality-catering-services`
     - `aviation`
     - `industrial-oil-chemicals-lubricants`

2. **Flagged Terms Soft Audit (`flagged-terms.csv`):**
   - Mentions of restricted keywords (`aviation`, `catering`, `hospitality`, `pharma`, `chemical`, `ifm`) inside valid pages (e.g. Oil & Gas, Marine, Valves) are **NOT deleted automatically**.
   - Instead, **58 exact context snippets** (including headings) are logged in `etl/output/review/flagged-terms.csv` for line-by-line client screening calls.

3. **Renewables Subdomain Isolation:**
   - Renewable energy items are isolated into `src/data/renewables.json` for deployment to `renewables.ofsworld.com`.

---

## 📁 Directory Output Structure & Artifacts

```
C:\dev stuff\projects\OFS\
├── scripts\
│   └── migrate_ofs.py                  <-- Central Deep-Crawl CLI Runner
├── etl\
│   ├── README.md                       <-- This Documentation
│   └── output\
│       ├── raw\
│       │   └── raw_extracted_pages.json  <-- 113 Deep-Crawled Page Datasets (Un-truncated text & HTML)
│       ├── normalized_dataset.json      <-- Transformed intermediate data
│       └── review\
│           ├── migration-inventory.csv  <-- Audit of all 108 approved pages
│           ├── flagged-terms.csv        <-- 58 flagged term snippets for client review
│           └── migration-report.json    <-- Execution summary JSON
└── public\
    └── images\
        └── migrated\
            └── products\               <-- 103 MD5 deduplicated images downloaded
```

---

## 📊 How to Handle the Output Data

Once the ETL pipeline finishes running with the `--load` flag, here is exactly how you handle the generated assets:

### 1. Handling the JSON Datasets (`src/data/`)
The pipeline automatically merges all scraped text into your Next.js static files. It does NOT delete your existing data; instead, it safely appends the legacy content under the `--- MIGRATED RAW TEXT ---` separator inside the `fullContentText` field.
* `src/data/products.json` -> Drives `/products` and `/products/[slug]` pages.
* `src/data/services.json` -> Drives `/services` and `/services/[slug]` pages.
* `src/data/industries.json` -> Drives `/industries` and `/industries/[slug]` pages.
* `src/data/renewables.json` -> Drives `renewables.ofsworld.com` subdomain.

**What to do next:**
Pass the massive string inside the `fullContentText` field into an AI formatting script or your chosen CMS to clean the data and automatically populate structured arrays like `specifications` or `keyPoints`.

### 2. Handling the Images (`public/images/migrated/`)
You do not need to manually download legacy images or fix broken HTTP links. The script handles this automatically via the following flow:
1. **Extraction:** Grabs all `<img src="...">` links during the crawl.
2. **Deduplication:** Downloads the image via Python's `urllib` and runs an **MD5 Hash** on the physical file. If two products use the same exact stock photo, it skips downloading the duplicate.
3. **Local Mapping:** Saves the unique image directly to `public/images/migrated/products/` and instantly rewrites the JSON object to use the local Next.js path (e.g., `/images/migrated/products/hash.jpg`).

**What to do next:**
Simply use the standard Next.js `<Image />` component on your frontend. The images are already stored locally and mapped perfectly in the JSON arrays (`heroImage` and `scrapedImages`).

### 3. Handling the Audit Reports (Client Screening)
The pipeline generates audit CSVs inside `etl/output/review/` so you can verify data integrity with the client.
* **Open `flagged-terms.csv`** in Excel or VS Code.
* The script actively flags mentions of restricted keywords (`aviation`, `pharma`, `catering`) but does NOT delete them. 
* Sit down with Glenn/OFS, read the 58 exact context snippets provided in the CSV, and manually decide if those terms should be kept or edited out of the general product descriptions.
