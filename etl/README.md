# OFS Group Website Content Migration ETL Tool Documentation

Welcome to the **OFS Group Content Migration Deep-Crawl ETL Engine**. This tool automatically performs a deep recursive crawl across 120+ live URLs from `ofsgroupindia.com` and `ofsworld.com`, extracting, transforming, auditing, deduplicating, and loading 100% of all technical product, service, and industry data into the Next.js static data ecosystem.

---

## 🚀 Quick Start Guide: How to Boot Up the Pipeline

### 1. Default Dry-Run Mode
Extracts raw live data, applies scope rules, downloads/deduplicates images, and generates audit reports **without altering** existing static files in `src/data/`:
```bash
python scripts/migrate_ofs.py
```

### 2. Full ETL & Static Data Load Mode
Executes the deep crawl and **overwrites static JSON datasets** in `src/data/` for immediate Next.js route consumption:
```bash
python scripts/migrate_ofs.py --load
```

### 3. Stage-Specific Execution
Execute specific stages of the pipeline using the `--stage` flag:

| Command | Pipeline Stage & Operation |
| :--- | :--- |
| `python scripts/migrate_ofs.py --stage extract` | Recursively crawls 120+ live URLs and saves complete un-truncated page text & HTML structure to `etl/output/raw/raw_extracted_pages.json`. |
| `python scripts/migrate_ofs.py --stage transform` | Applies scope rules, exclusions, term flagging, and transforms raw data into `normalized_dataset.json`. |
| `python scripts/migrate_ofs.py --stage media` | Downloads and MD5-deduplicates product/service image assets to `public/images/migrated/`. |
| `python scripts/migrate_ofs.py --stage report` | Generates audit CSVs and JSON statistics in `etl/output/review/`. |
| `python scripts/migrate_ofs.py --stage load` | Loads transformed collections into `src/data/*.json` routes. |

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
   - Instead, **454 exact context snippets** are logged in `etl/output/review/flagged-terms.csv` for line-by-line client screening calls.

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
│       │   └── raw_extracted_pages.json  <-- 58 Deep-Crawled Page Datasets (Un-truncated text & HTML)
│       ├── normalized_dataset.json      <-- Transformed intermediate data
│       └── review\
│           ├── migration-inventory.csv  <-- Audit of all 53 approved pages
│           ├── flagged-terms.csv        <-- 454 flagged term snippets for client review
│           └── migration-report.json    <-- Execution summary JSON
└── public\
    └── images\
        └── migrated\
            └── products\               <-- 84 MD5 deduplicated images downloaded
```

---

## 📊 How to Use the Output Data in Your Project

### 1. In Next.js Frontend Components
The loaded datasets in `src/data/` map directly to Next.js routes with full technical details:
* `src/data/products.json` -> Drives `/products` and `/products/[slug]` pages (13 comprehensive product categories).
* `src/data/services.json` -> Drives `/services` and `/services/[slug]` pages (4 core service offerings).
* `src/data/industries.json` -> Drives `/industries` and `/industries/[slug]` pages (10 industrial sectors).
* `src/data/renewables.json` -> Drives `renewables.ofsworld.com` subdomain routes.

### 2. In Client Screening Calls with OFS
* Open `etl/output/review/flagged-terms.csv` in Excel or VS Code during your content review call with Glenn/OFS.
* Use the 454 logged snippets to quickly confirm whether specific mentions of chemical/aviation terms in general product descriptions should be retained or edited.
