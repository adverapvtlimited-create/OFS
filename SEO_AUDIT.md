# OFS Group India — SEO Audit & Implementation Report

**Domain:** https://ofsgroupindia.com  
**Implementation date:** August 20, 2026  
**Framework:** Next.js 14 (App Router) + React 18  
**Build status:** Production build verified (43 static routes)

---

## 1. Problems Discovered (Pre-Implementation Audit)

### Critical
| Issue | Impact |
|-------|--------|
| 7 major routes had no page-specific metadata (`/about`, `/services`, `/industries`, `/renewables`, `/blog`, `/careers`, `/contact`) | All inherited identical root title/description — poor relevance in SERPs |
| Career detail pages were client-only with no `generateMetadata` or `generateStaticParams` | Missing job-specific titles, no JobPosting schema, soft 404 behavior |
| Broken footer links to `/privacy` and `/terms` | 404 errors, crawl waste, poor trust signals |
| Missing `site-config.json` fields (`shortDesc`, `legalName`, `socials.twitter`) | Undefined OG descriptions and incomplete Organization JSON-LD |
| Title template duplication (`%s \| OFS Group India` + titles already containing brand) | Double brand suffix in browser titles |
| No canonical URLs on any page | Duplicate URL risk, weak consolidation signals |
| No per-page Open Graph images | All shared pages used generic Unsplash homepage image |

### Medium
| Issue | Impact |
|-------|--------|
| No page-level structured data (Article, JobPosting, Service, FAQPage, BreadcrumbList) | Reduced rich result eligibility |
| `'use client'` on listing pages prevented co-located metadata | Required layout-based metadata pattern |
| Blog markdown (`**bold**`, lists) rendered as plain text | Weaker content semantics for crawlers |
| Admin pages indexable via metadata (only blocked in robots.txt) | Accidental indexing risk |
| Industry detail pages weakly linked internally | Orphan risk for 9 industry URLs |
| Sitemap `lastModified` always set to build time | Less accurate crawl prioritization signals |
| Static `public/robots.txt` duplicated dynamic route | Potential config drift |

### Low
| Issue | Impact |
|-------|--------|
| No staging/preview noindex protection | Preview deployments could be indexed |
| Hero images missing `width`/`height`, lazy loading attributes | Minor CLS and performance signals |
| Renewables solution slugs in data but no dedicated URLs | Missed long-tail opportunity (deferred — anchor sections exist) |

---

## 2. Problems Fixed

- ✅ Unique metadata for all 33 indexable public pages (+ privacy/terms)
- ✅ Reusable SEO architecture (`src/config/seo.config.js`, `src/lib/seo.js`, `src/lib/schema.js`, `src/components/SEO/`)
- ✅ Canonical URLs on every indexable page via `buildPageMetadata()`
- ✅ Title template duplication eliminated (`title: { absolute: ... }`)
- ✅ `site-config.json` completed with `legalName`, `shortDesc`, `socials.twitter`
- ✅ Career pages converted to SSG server components with JobPosting schema
- ✅ Privacy Policy and Terms of Engagement pages created
- ✅ Dynamic `robots.js` with staging/preview noindex protection
- ✅ Sitemap expanded to 33 URLs with content-based dates for blog/careers
- ✅ Admin routes set to `noindex, nofollow` via server layout metadata
- ✅ Breadcrumb navigation + BreadcrumbList schema on detail pages
- ✅ FAQ section + FAQPage schema on homepage; existing service FAQs wired to schema
- ✅ Blog content renderer improved (headings, bold, lists)
- ✅ Internal linking strengthened (footer industries, service ↔ industry cross-links)
- ✅ Image SEO attributes on key hero images (`alt`, `width`, `height`, `loading`, `fetchPriority`)
- ✅ Contact page ContactPage schema
- ✅ 404 page updated with `noindex` and helpful internal links

---

## 3. New SEO Features

| Feature | Location |
|---------|----------|
| Central SEO config & keyword map | `src/config/seo.config.js` |
| Metadata builder with canonical, OG, Twitter, robots | `src/lib/seo.js` |
| Schema.org builders | `src/lib/schema.js` |
| JSON-LD component | `src/components/SEO/JsonLd.jsx` |
| Accessible breadcrumbs + schema | `src/components/SEO/Breadcrumbs.jsx` |
| Route-level metadata layouts | `src/app/*/layout.js` |
| Dynamic robots.txt | `src/app/robots.js` |
| Dynamic XML sitemap | `src/app/sitemap.js` |
| Staging protection | `isIndexableEnvironment()` in seo.config.js |
| Homepage FAQ (visible + schema) | `src/app/page.js` |
| Blog markdown renderer | `src/lib/markdown.js` |
| Job application client split | `src/components/careers/JobApplicationForm.jsx` |

---

## 4. Page-by-Page Metadata

| URL | Title | Meta Description (summary) |
|-----|-------|---------------------------|
| `/` | OFS Group India \| Marine, Offshore, Energy & EPC Support Services | ISO-certified procurement, EPC, facility management, solar solutions |
| `/about` | About OFS Group India \| ISO-Certified Industrial Support Partner | Company background, ISO certification, global operations |
| `/services` | OFS Services \| Procurement, EPC, Facility Management & Logistics | All six core service lines |
| `/services/procurement-shipping` | Procurement & Shipping \| OFS Group India | End-to-end sourcing and global shipping |
| `/services/engineering-epc-support` | Engineering & EPC Support Services \| OFS Group India | Engineering, integration, field services |
| `/services/facility-management` | Integrated Facility Management (IFM) \| OFS Group India | IFM and O&M support |
| `/services/spare-parts-procurement` | Spare Parts Procurement & MRO \| OFS Group India | MRO and spare parts sourcing |
| `/services/logistics-shipping` | Industrial Logistics & Shipping \| OFS Group India | Multimodal industrial logistics |
| `/industries` | Industries Served \| Oil & Gas, Marine, Power, Renewables & More | All nine industry sectors |
| `/industries/oil-and-gas` | Oil & Gas Industry Solutions \| OFS Group India | Upstream/midstream/downstream procurement |
| `/industries/marine-maritime` | Marine & Offshore Industry Solutions \| OFS Group India | Ship spares and port logistics |
| `/industries/renewable-energy` | Renewable Energy & Solar Solutions \| OFS Group India | Solar and clean energy sector support |
| `/industries/power-generation` | Power & Energy Sector Solutions \| OFS Group India | Power generation sector support |
| `/industries/petrochemicals-refining` | Petroleum Refining & Petrochemicals Solutions \| OFS Group India | Refining sector procurement |
| `/industries/pharmaceuticals-chemicals` | Pharmaceuticals & Fine Chemicals Solutions \| OFS Group India | Pharma/chemical sector support |
| `/industries/cement-manufacturing` | Cement & Building Materials Solutions \| OFS Group India | Cement industry support |
| `/industries/mining-minerals` | Mining & Mineral Processing Solutions \| OFS Group India | Mining sector support |
| `/industries/heavy-engineering` | Heavy Engineering & Manufacturing Solutions \| OFS Group India | Heavy engineering support |
| `/renewables` | OFS Renewables \| Solar EPC, Rooftop & BESS Solutions in India | Solar EPC and BESS division |
| `/blog` | OFS Insights \| Procurement, QA/QC, Renewables & Industry Articles | Blog hub |
| `/blog/*` (4 articles) | `{Article Title} \| OFS Group Insights` | Article-specific excerpts |
| `/careers` | Careers at OFS Group India \| Engineering & Procurement Jobs | Careers hub |
| `/careers/*` (4 jobs) | `{Job Title} \| Careers at OFS Group India` | Role-specific descriptions |
| `/contact` | Contact OFS Group India \| Mumbai HQ & Global Offices | Contact details and RFQ CTA |
| `/privacy` | Privacy Policy \| OFS Group India | Data collection and usage policy |
| `/terms` | Terms of Engagement \| OFS Group India | Website and enquiry terms |

All pages include:
- Absolute canonical URL: `https://ofsgroupindia.com{path}`
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`)
- Twitter Card tags (`summary_large_image`)
- Environment-aware robots directives

---

## 5. Keyword / Page Mapping

| Page | Primary Keyword | Secondary Keywords | Intent | Audience | Geo |
|------|----------------|-------------------|--------|----------|-----|
| Homepage | OFS Group India | industrial procurement, EPC support India | Brand + commercial | EPC contractors, plant operators | India, global |
| About | about OFS Group India | ISO 9001 certified Mumbai | Credibility research | Procurement managers | Mumbai, USA office |
| Services hub | OFS industrial services | procurement services India, facility management | Service discovery | Plant managers | India, international |
| Service detail | `{service name}` | `{service} India`, OEM procurement | Transactional | Project procurement teams | Project locations |
| Industries hub | OFS industries served | oil gas procurement, marine supply chain | Sector research | Sector procurement teams | Multi-region |
| Industry detail | `{industry} solutions` | `{industry} procurement OFS` | Sector-specific | Industry operations | Sector markets |
| Renewables | OFS renewable energy | solar EPC India, BESS integration | Commercial renewable | Facility owners, ESG teams | India |
| Blog hub | OFS industry insights | procurement articles, NDT QA/QC | Informational | Engineers, QA professionals | Global |
| Blog article | `{topic from title}` | Tags from post metadata | Informational | Technical professionals | Global |
| Careers hub | OFS Group India careers | procurement jobs Mumbai | Job search | Engineers, procurement pros | Mumbai |
| Job detail | `{job title}` | `{department} jobs OFS` | Job application | Qualified candidates | Mumbai / site |
| Contact | contact OFS Group India | OFS Mumbai office, procurement RFQ | Lead generation | Prospective clients | Mumbai, Florida |

---

## 6. Sitemap Information

**URL:** https://ofsgroupindia.com/sitemap.xml  
**Generator:** `src/app/sitemap.js` (auto-generated at build time)  
**Total URLs:** 33

| Section | Count | Priority | Change Frequency |
|---------|-------|----------|------------------|
| Homepage | 1 | 1.0 | weekly |
| Static pages | 9 | 0.75–0.9 | weekly/monthly |
| Service detail | 6 | 0.9 | monthly |
| Industry detail | 9 | 0.8 | monthly |
| Blog articles | 4 | 0.7 | monthly |
| Career listings | 4 | 0.7 | weekly |

**Excluded:** `/admin/*`, `/api/*`, 404, noindex pages, parameter URLs

**Not included (by design):** Renewables solution anchor sections (`#solutions`, `#projects`) — single canonical `/renewables` URL

---

## 7. Robots Configuration

**URL:** https://ofsgroupindia.com/robots.txt  
**Generator:** `src/app/robots.js`

### Production
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://ofsgroupindia.com/sitemap.xml
Host: https://ofsgroupindia.com
```

### Preview / Staging / Local Development
- All paths disallowed (`Disallow: /`)
- All pages emit `noindex, nofollow` via metadata
- Override for testing: set `NEXT_PUBLIC_FORCE_INDEX=true`

**Note:** CSS, JS, and image assets are not blocked — critical for JavaScript rendering.

---

## 8. Structured Data Implemented

| Schema Type | Pages |
|-------------|-------|
| **Organization** | Site-wide (root layout) — name, legalName, url, logo, address, contactPoint, sameAs |
| **WebSite** | Site-wide (root layout) — name, url, publisher reference |
| **WebPage** | Homepage, privacy, terms, service/industry/blog/career detail pages |
| **FAQPage** | Homepage (4 FAQs), service pages with existing FAQ content |
| **Service** | All 6 service detail pages |
| **BlogPosting** | All 4 blog articles (headline, author, datePublished, image, publisher) |
| **JobPosting** | All 4 career detail pages (title, description, datePosted, hiringOrganization) |
| **BreadcrumbList** | Service, industry, blog, and career detail pages |
| **ContactPage** | Contact page |

**Validation:** Test all URLs at https://search.google.com/test/rich-results after deployment.

**Not implemented (no qualifying content):** Review, AggregateRating, Product, Event, fake awards

---

## 9. Canonical Strategy

- Every indexable page sets `<link rel="canonical">` to absolute production URL
- Canonical base: `https://ofsgroupindia.com` (override via `NEXT_PUBLIC_SITE_URL` only for non-production)
- Canonical matches sitemap URLs exactly
- No trailing-slash duplication (Next.js default, no trailingSlash config)
- Homepage canonical: `https://ofsgroupindia.com/`
- No contradictory canonical signals
- Staging/preview: pages are noindex (canonical still points to production domain when forced)

---

## 10. Redirect Strategy

| Change | Action |
|--------|--------|
| No existing production URLs were changed | No 301 redirects required |
| `/privacy`, `/terms` previously 404 | Now live pages — no redirect needed |
| Renewables solution slugs in JSON | Retained as anchor links on `/renewables` — no URL change |

**Redirect mapping file:** Not required at this time. If URLs change in future, add to `next.config.mjs` `redirects()` array.

---

## 11. Performance & UX Preservation

SEO changes were implemented without removing animations or premium UI:

- Framer Motion, GSAP, Lenis smooth scroll, and CustomCursor remain active
- Hero images use `fetchPriority="high"` and `loading="eager"` (not lazy-loaded)
- Below-fold images can use lazy loading where added
- No additional heavy SEO libraries introduced
- JSON-LD scripts are minimal inline JSON (negligible weight)
- Build output unchanged in bundle structure — pages remain statically generated
- Semantic HTML preserved: `<main id="main-content">`, `<nav aria-label="Breadcrumb">`, `<article>` on blog posts, accessible form labels on career applications

**Recommended ongoing monitoring:** Lighthouse, PageSpeed Insights, Core Web Vitals in Google Search Console

---

## 12. Remaining Recommendations

1. **Commit image assets to `public/images/`** — local image paths referenced in JSON are not in the repo; deploy brand assets and create `/images/og/ofs-group-india-og.jpg` for social sharing
2. **Add `favicon.ico` and `logo.png`** to `public/` for Organization schema logo URL
3. **Replace stock Unsplash OG/blog images** with brand photography where available
4. **Consider `next/image`** for automatic WebP/AVIF optimization (requires migration from `<img>`)
5. **Renewables solution pages** — optional future `/renewables/[slug]` routes if content depth warrants separate indexable pages
6. **Blog category hub pages** — e.g. `/blog/category/procurement` when article volume grows
7. **Google Business Profile** — register/verify Mumbai HQ for local pack visibility (external to website)
8. **Backlink and content strategy** — publish additional articles over time using existing blog architecture
9. **Monitor Search Console** for coverage errors after launch (see setup steps below)
10. **www vs non-www** — confirm DNS/hosting canonical preference; add Vercel redirect if needed

---

## 13. Google Search Console Setup Steps

The site includes verification meta tag: `google-site-verification: 6fo7oPOILUbH5krDSVg-5jP9-Z3Rk2HUTTYY4FzHehc`

### Step-by-step

1. **Add domain to Google Search Console**
   - Go to https://search.google.com/search-console
   - Add property: `https://ofsgroupindia.com` (URL-prefix) or `ofsgroupindia.com` (Domain)

2. **Verify ownership**
   - HTML tag method is pre-configured in `src/app/layout.js`
   - Alternative: DNS TXT record via domain registrar

3. **Submit sitemap**
   - In Search Console → Sitemaps → enter: `https://ofsgroupindia.com/sitemap.xml`
   - Click Submit

4. **Inspect homepage**
   - URL Inspection tool → enter `https://ofsgroupindia.com/`
   - Confirm "URL is on Google" or request indexing after deploy

5. **Inspect important pages**
   - `/services/procurement-shipping`
   - `/industries/oil-and-gas`
   - `/renewables`
   - `/contact`
   - `/blog/navigating-global-supply-chain-disruptions-epc-projects`
   - `/careers/senior-procurement-manager`

6. **Request indexing where appropriate**
   - Use "Request Indexing" for newly created `/privacy`, `/terms`, and any updated metadata pages
   - Do not spam — request key URLs only

7. **Monitor indexing and search performance**
   - Pages → Indexing report (watch for excluded/error URLs)
   - Performance → track impressions, clicks, queries, average position
   - Core Web Vitals → mobile and desktop
   - Enhancements → validate structured data (FAQ, JobPosting, Article)

**Important:** Indexing is not guaranteed and depends on Google’s crawl schedule, site authority, and content quality. This implementation provides the technical foundation — not a ranking guarantee.

---

## SEO Architecture Reference

```
src/
├── config/
│   └── seo.config.js          # Site URL, page SEO map, keyword strategy, FAQs
├── lib/
│   ├── seo.js                 # buildPageMetadata(), absoluteUrl(), date parsing
│   ├── schema.js              # Organization, Service, Article, JobPosting, FAQ schemas
│   └── markdown.js            # Blog content renderer
├── components/
│   └── SEO/
│       ├── JsonLd.jsx         # JSON-LD script injection
│       └── Breadcrumbs.jsx    # Visible breadcrumbs + BreadcrumbList schema
└── app/
    ├── layout.js              # Root metadata, Organization + WebSite schema
    ├── robots.js              # Dynamic robots.txt
    ├── sitemap.js             # Dynamic XML sitemap
    ├── */layout.js            # Per-route metadata (about, services, etc.)
    ├── privacy/page.js
    └── terms/page.js
```

---

## Validation Checklist (Post-Deploy)

- [ ] https://ofsgroupindia.com/robots.txt returns correct rules
- [ ] https://ofsgroupindia.com/sitemap.xml lists 33 URLs with absolute paths
- [ ] View source on homepage — confirm canonical, OG tags, Organization JSON-LD
- [ ] Rich Results Test on service page with FAQs
- [ ] Rich Results Test on blog article (BlogPosting)
- [ ] Rich Results Test on career page (JobPosting)
- [ ] Mobile-Friendly Test passes
- [ ] No broken internal links (privacy, terms, sitemap)
- [ ] Search Console sitemap submitted and processed

---

*This report documents technical SEO implementation for OFS Group India. Search rankings depend on many external factors including competition, backlinks, content depth, and user engagement.*
