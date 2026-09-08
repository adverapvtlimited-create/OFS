# OFS — Oriented Facility Solution Pvt. Ltd. (OFS Group India)

> **Driven by Quality, Defined by Trust**
> Official Corporate Website for Oriented Facility Solution Pvt Ltd (India) & Oriented Facility Solution LLC (USA).

---

## 🌟 Overview

**OFS Group India** is a premier corporate and industrial solutions provider specializing in:
- **Procurement & Shipping**: End-to-end industrial sourcing powered by 3,000+ approved brands across the US and Europe.
- **Engineering & EPC Support Services**: Turnkey technical support from concept design to onsite/offshore commissioning.
- **Integrated Facility Management (IFM)**: Total facility operations covering hard systems, soft services, and remote camps.
- **Spare Parts Procurement & MRO**: 15+ years global supplier network ensuring zero-downtime maintenance.
- **Industrial Logistics & Shipping**: Multimodal ocean, air, and road cargo transport with real-time tracking.
- **Renewables & Clean Energy Portal**: Utility-scale solar EPC procurement and containerized BESS infrastructure.

---

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI / Styling**: Vanilla CSS with custom Design Tokens (`@/styles/design-tokens.css`, `@/styles/globals.css`)
- **Animation & Motion**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Outfit (Headings), Inter (Body), JetBrains Mono (Code/Telemetry)

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Production Build
```bash
npm run build
npm start
```

---

## 📊 Data Migration & ETL

This project uses a custom Python ETL pipeline to migrate legacy WordPress content into the Next.js static JSON architecture. The script crawls the legacy site, extracts raw text/HTML, deduplicates and downloads media assets, and injects the data into `src/data/*.json`.

**For full documentation, see the [ETL README](./etl/README.md).**

### Quick Run

```bash
# 1. Install dependencies
pip install beautifulsoup4

# 2. Dry-Run (Will extract data to etl/output/ without modifying src/data)
python scripts/migrate_ofs.py

# 3. Production Run (Will inject data into src/data/*.json)
python scripts/migrate_ofs.py --load
```

---

## 🏢 Corporate Presence

- **India Headquarters**: Dynasty Business Park, A Wing, Andheri-Kurla Road, Andheri (East), Mumbai, Maharashtra – 400059, India
- **USA Office**: Oriented Facility Solution LLC, 7901 4th St N, Suite 300, St. Petersburg, Florida, 33702, USA
- **Contact**: `info@ofsgroupindia.com` | `https://ofsgroupindia.com`
