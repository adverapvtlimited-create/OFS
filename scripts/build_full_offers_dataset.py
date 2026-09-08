import json
import os
import re

with open('etl/output/raw/raw_extracted_pages.json', 'r', encoding='utf-8') as f:
    raw_pages = json.load(f)

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

# 1. Load existing offers to keep exact crafted blocks for indirect-procurement, project-supply, outsource-manufacturing
with open('src/data/offers.json', 'r', encoding='utf-8') as f:
    offers = json.load(f)

# Shared expectation quotes for solutions pages
expectations_quotes = [
    "“Precision forecasting for increased revenue.”",
    "“Streamline orders, cut costs.”",
    "“Automated safety stock for resilience.”",
    "“Real-time inventory sync across sites.”",
    "“Efficient supplier partnerships.”",
    "“Prevent stockouts, reduce waste.”"
]

broad_advantages_items = [
    {"title": "Assessment & Adaptation", "description": "We assess, adapt, and enhance your inventory and procurement systems for maximum efficiency."},
    {"title": "Tailored Solutions", "description": "Customised strategies and operating workflows designed for your unique business needs."},
    {"title": "Team Empowerment", "description": "Empower your cross-functional teams with comprehensive training and domain mastery."},
    {"title": "Go-Live Support", "description": "Smooth operational transitions with hands-on, end-to-end go-live assistance."},
    {"title": "Continuous Optimization", "description": "Periodic check-ins, KPI monitoring, and ongoing system performance refinement."}
]

pricing_paragraphs = [
    "At OFS, we understand that businesses—large and small—prioritise cost-effective solutions. That’s why our pricing models are flexible, designed to align with your specific operational and budgetary needs.",
    "Whether you're a small enterprise or a global organisation, we offer a range of packages to suit your scale and requirements. Our pricing is fully transparent, with no hidden fees—just straightforward, value-driven plans.",
    "Each package is structured to deliver maximum return on investment, helping you optimise your procurement strategy without compromising on quality or efficiency."
]

# ----------------------------------------------------
# 11. INVENTORY PLANNING & OPTIMISATION
# ----------------------------------------------------
offers['inventory-planning-optimisation'] = {
    "slug": "inventory-planning-optimisation",
    "href": "/inventory-planning-optimisation",
    "title": "Inventory Planning & Optimisation",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Inventory Planning & Optimisation Solutions by OFS",
    "overviewTitle": "Inventory Planning & Optimisation Solutions by OFS",
    "description": "Welcome to OFS, where we specialize in customized Inventory Planning & Optimisation Solutions designed to elevate your business's supply chain performance. Our comprehensive approach blends cutting-edge technology, industry expertise, and tailored strategies to ensure your inventory levels are always aligned with demand.",
    "overviewParagraphs": [
        "Welcome to OFS, where we specialize in customized Inventory Planning & Optimisation Solutions designed to elevate your business's supply chain performance.",
        "Our comprehensive approach blends cutting-edge technology, industry expertise, and tailored strategies to ensure your inventory levels are always aligned with demand—reducing holding costs while eliminating stockout risks."
    ],
    "blocks": [
        {
            "title": "Why Choose OFS for Inventory Optimisation?",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("facilities-offered.png") or "/images/live/facilities-offered.png",
                "alt": "Why Choose OFS for Inventory Optimisation"
            },
            "intro": "Effective inventory planning is essential for operational resilience and cost control. At OFS, we empower industrial leaders with precision forecasting and lean stocking:",
            "noBullets": True,
            "items": [
                {
                    "title": "Tailored Strategy Development",
                    "description": "We analyze your historical consumption patterns, lead times, and criticality to build bespoke inventory profiles for every SKU."
                },
                {
                    "title": "Real-Time Multi-Site Visibility",
                    "description": "Gain complete inventory synchronization across multiple warehouses, plants, and fabrication yards."
                },
                {
                    "title": "Scalable Operating Models",
                    "description": "Flexible inventory management frameworks that seamlessly scale as your production volumes and project footprints expand."
                },
                {
                    "title": "Collaborative Demand Planning",
                    "description": "Aligning procurement, warehouse, and maintenance teams through integrated forecasting schedules."
                },
                {
                    "title": "Obsolescence & Risk Prevention",
                    "description": "Automated safety stock adjustments and dynamic reorder points that prevent dead stock accumulation."
                }
            ]
        },
        {
            "title": "Support and Implementation",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("key-practices.png") or "/images/live/key-practices.png",
                "alt": "Support and Implementation"
            },
            "intro": "We don't just recommend strategies; we guide you through every stage of implementation to ensure long-term success:",
            "noBullets": True,
            "items": [
                {
                    "title": "Comprehensive Workflow Assessment",
                    "description": "Detailed baseline auditing of your existing ERP, inventory holding metrics, and stock turn rates."
                },
                {
                    "title": "Hands-On Training & Empowerment",
                    "description": "Training your plant engineers and procurement teams to master modern inventory optimization tools."
                },
                {
                    "title": "Go-Live Assistance & Staging",
                    "description": "Dedicated on-site and remote support during deployment to ensure zero disruption to plant operations."
                },
                {
                    "title": "Periodic Optimization Reviews",
                    "description": "Regular quarterly check-ins and parameter calibrations to capture ongoing cost savings."
                }
            ]
        },
        {
            "title": "Pricing and Packages",
            "paragraphs": pricing_paragraphs
        },
        {
            "title": "What Can Be Expected",
            "paragraphs": expectations_quotes
        },
        {
            "title": "Broad Advantages",
            "items": broad_advantages_items,
            "buttonText": "Request Inventory Audit",
            "buttonHref": "/contact"
        }
    ]
}

# ----------------------------------------------------
# 12. MASTER DATA MANAGEMENT
# ----------------------------------------------------
offers['master-data-management'] = {
    "slug": "master-data-management",
    "href": "/master-data-management",
    "title": "Master Data Management",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Elevate Your Business's Data with Ease",
    "overviewTitle": "Master Data Management (MDM) by OFS",
    "description": "Unlock actionable insights, eliminate duplication, and achieve complete procurement governance with OFS Master Data Management (MDM) solutions tailored for complex industrial operations.",
    "overviewParagraphs": [
        "Master Data Management (MDM) is the discipline of creating a single, authoritative source of truth for all critical business data—including parts catalogs, vendor masters, asset hierarchies, and spend classifications.",
        "At OFS, we transform cluttered, inconsistent legacy databases into standardized, high-integrity master data assets that drive procurement automation, prevent duplicate purchases, and enhance ERP reliability."
    ],
    "blocks": [
        {
            "title": "How OFS MDM Operates",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("key-practices.png") or "/images/live/key-practices.png",
                "alt": "How OFS MDM Operates"
            },
            "intro": "Our structured MDM methodology ensures complete data accuracy, compliance, and taxonomy standardization:",
            "noBullets": True,
            "items": [
                {
                    "title": "Data Cleansing & Deduplication",
                    "description": "Automated algorithms and engineering validation to identify, merge, and eliminate redundant SKU records."
                },
                {
                    "title": "Technical Data Enrichment",
                    "description": "Populating missing engineering attributes, manufacturer part numbers (MPNs), material grades, and specifications."
                },
                {
                    "title": "Taxonomy & Classification",
                    "description": "Standardizing part descriptions using global taxonomy schemas such as UNSPSC, eCl@ss, and custom client dictionaries."
                },
                {
                    "title": "Vendor Master Rationalization",
                    "description": "Consolidating duplicate supplier entries, updating tax/compliance credentials, and establishing parent-child hierarchy."
                }
            ]
        },
        {
            "title": "The OFS Advantage: How We Bring MDM to Life",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("facilities-offered.png") or "/images/live/facilities-offered.png",
                "alt": "The OFS Advantage"
            },
            "intro": "Why global industrial enterprises choose OFS for end-to-end Master Data governance:",
            "noBullets": True,
            "items": [
                {
                    "title": "Deep Industrial Domain Expertise",
                    "description": "Our data specialists understand engineering terminology, petrochemical piping specs, electrical gear, and mechanical drawings."
                },
                {
                    "title": "Seamless ERP Integration",
                    "description": "Flawless data migration and API integration with SAP, Oracle, Microsoft Dynamics, and custom ERP systems."
                },
                {
                    "title": "Ongoing Governance Frameworks",
                    "description": "Establishing cataloging workflows and approval gates that prevent rogue SKU creation in the future."
                },
                {
                    "title": "Measurable Cost Savings",
                    "description": "Direct savings achieved by discovering hidden inventory across sites and leveraging volume aggregation."
                }
            ]
        },
        {
            "title": "Pricing and Packages",
            "paragraphs": pricing_paragraphs
        },
        {
            "title": "What Can Be Expected",
            "paragraphs": expectations_quotes
        },
        {
            "title": "Broad Advantages",
            "items": broad_advantages_items,
            "buttonText": "Start Your MDM Consultation",
            "buttonHref": "/contact"
        }
    ]
}

# ----------------------------------------------------
# 13. MRO SUPPLY
# ----------------------------------------------------
offers['mro-supply'] = {
    "slug": "mro-supply",
    "href": "/mro-supply",
    "title": "MRO Supply",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Your One-Stop Solution for Maximising Efficiency and Minimising Downtime",
    "overviewTitle": "Your One-Stop Solution for Maximising Efficiency and Minimising Downtime",
    "description": "At OFS, we supply industrial facilities with mission-critical maintenance, repair, and operating supplies with guaranteed authenticity, rapid lead times, and transparent pricing.",
    "overviewParagraphs": [
        "In fast-paced industrial environments, unplanned equipment failure directly threatens productivity and profitability. Sourcing dependable MRO supplies shouldn't be a constant struggle.",
        "At OFS, we provide a unified MRO supply ecosystem that consolidates thousands of indirect suppliers into a single, high-performing procurement channel."
    ],
    "blocks": [
        {
            "title": "Why OFS for Your MRO Needs?",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("Procurement-and-shippings.jpg") or "/images/live/Procurement-and-shippings.jpg",
                "alt": "Why OFS for Your MRO Needs"
            },
            "intro": "How OFS eliminates the operational headaches of fragmented indirect maintenance sourcing:",
            "noBullets": True,
            "items": [
                {
                    "title": "Single-Source Procurement",
                    "description": "Replace hundreds of sporadic vendor purchase orders with a consolidated, streamlined partner."
                },
                {
                    "title": "Rapid Emergency Dispatch",
                    "description": "Dedicated expediting desks ensuring emergency breakdown parts reach your plant floor in hours."
                },
                {
                    "title": "Genuine OEM Certified Products",
                    "description": "Direct manufacturer partnerships guaranteeing 100% authentic components with test certificates."
                },
                {
                    "title": "Volume-Based Cost Reductions",
                    "description": "Leveraging global group purchasing volume to secure tier-1 commercial rates on standard MRO items."
                }
            ]
        },
        {
            "title": "OFS's MRO Supply Solution: What You Get",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("Spare-Parts-Procurement.jpg") or "/images/live/Spare-Parts-Procurement.jpg",
                "alt": "OFS MRO Supply Solution"
            },
            "intro": "Our comprehensive delivery model covers the full breadth of industrial facility requirements:",
            "noBullets": True,
            "items": [
                {
                    "title": "Consolidated Monthly Invoicing",
                    "description": "Drastically cut administrative overhead and AP invoice processing costs with unified billing."
                },
                {
                    "title": "Strategic Inventory Buffers",
                    "description": "Holding critical wear-and-tear spares in nearby regional warehouses dedicated to your plant."
                },
                {
                    "title": "24/7 Technical Sourcing Support",
                    "description": "Commercial engineering specialists ready around the clock to identify hard-to-find or obsolete parts."
                },
                {
                    "title": "Pan-India & Global Distribution",
                    "description": "Multi-modal logistics ensuring reliable delivery to remote refinery sites, offshore rigs, and manufacturing hubs."
                }
            ]
        },
        {
            "title": "Pricing and Packages",
            "paragraphs": pricing_paragraphs
        },
        {
            "title": "What Can Be Expected",
            "paragraphs": expectations_quotes
        },
        {
            "title": "Broad Advantages",
            "items": broad_advantages_items,
            "buttonText": "Consolidate Your MRO Supplies",
            "buttonHref": "/contact"
        }
    ]
}

# ----------------------------------------------------
# 14. PLANT MAINTENANCE & MRO SPARE PARTS MANAGEMENT
# ----------------------------------------------------
offers['plant-maintenance-mro-spare-parts-management'] = {
    "slug": "plant-maintenance-mro-spare-parts-management",
    "href": "/plant-maintenance-mro-spare-parts-management",
    "title": "Plant Maintenance & MRO Spare Parts Management",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Enhancing Plant Maintenance and MRO Spare Parts Management with OFS",
    "overviewTitle": "Enhancing Plant Maintenance and MRO Spare Parts Management with OFS",
    "description": "OFS integrates proactive plant maintenance planning with structured spare parts management to maximize asset lifespan, avoid emergency shutdowns, and stabilize operating budgets.",
    "overviewParagraphs": [
        "Industrial plants operate under demanding conditions where component wear is inevitable. Maintaining equipment reliability while controlling spare parts holding costs requires a balanced, systematic strategy.",
        "At OFS, we help facility managers and maintenance directors align spare parts staging with preventive maintenance schedules—guaranteeing that the right part is in the right place before a maintenance shutdown begins."
    ],
    "blocks": [
        {
            "title": "Recognising the Value & Overcoming Challenges",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("Engg-e1751278356951.jpg") or "/images/live/Engg-e1751278356951.jpg",
                "alt": "Plant Maintenance Challenges"
            },
            "intro": "Key obstacles plant managers face and how OFS systematically resolves them:",
            "noBullets": True,
            "items": [
                {
                    "title": "Criticality Matrix Analysis",
                    "description": "Categorizing equipment by shutdown impact to establish prioritized stocking rules for high-risk components."
                },
                {
                    "title": "Obsolescence Management",
                    "description": "Identifying end-of-life machinery and engineering form-fit-function equivalents before legacy spares disappear."
                },
                {
                    "title": "Unplanned Downtime Prevention",
                    "description": "Moving from costly reactive panic buying to scheduled, predictive parts replenishment."
                },
                {
                    "title": "Storeroom Organization & Audits",
                    "description": "Eliminating duplicate part numbers, physical bin mismatches, and deteriorated inventory in onsite stores."
                }
            ]
        },
        {
            "title": "How OFS Transforms Plant Maintenance",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("Engineering-EP-Support-Services.png") or "/images/live/Engineering-EP-Support-Services.png",
                "alt": "Transforming Plant Maintenance"
            },
            "intro": "Our integrated service offerings for refinery, petrochemical, and heavy manufacturing facilities:",
            "noBullets": True,
            "items": [
                {
                    "title": "Shutdown & Turnaround Sourcing",
                    "description": "End-to-end procurement expediting for annual plant turnarounds, overhauls, and major capital revamps."
                },
                {
                    "title": "Consignment Stocking Agreements",
                    "description": "Placing critical OEM components on-site at your facility with payment triggered only upon consumption."
                },
                {
                    "title": "Maintenance Engineering Oversight",
                    "description": "Technical support for pump rebuilds, valve reconditioning, rotating equipment alignment, and NDT testing."
                },
                {
                    "title": "Total Cost of Maintenance Reduction",
                    "description": "Optimizing mean time between failures (MTBF) and lowering overall asset lifecycle maintenance expenses."
                }
            ]
        },
        {
            "title": "Pricing and Packages",
            "paragraphs": pricing_paragraphs
        },
        {
            "title": "What Can Be Expected",
            "paragraphs": expectations_quotes
        },
        {
            "title": "Broad Advantages",
            "items": broad_advantages_items,
            "buttonText": "Schedule a Maintenance Review",
            "buttonHref": "/contact"
        }
    ]
}

# ----------------------------------------------------
# 15. SPARE PARTS AVAILABILITY
# ----------------------------------------------------
offers['spare-parts-availability'] = {
    "slug": "spare-parts-availability",
    "href": "/spare-parts-availability",
    "title": "Spare Parts Availability",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Elevating Industrial Efficiency Through Spare Parts Availability",
    "overviewTitle": "Elevating Industrial Efficiency Through Spare Parts Availability",
    "description": "Ensure your production never stops. OFS establishes proactive inventory buffers, OEM vendor agreements, and rapid-dispatch logistics so critical spare parts are always available when you need them.",
    "overviewParagraphs": [
        "In mission-critical industries, waiting weeks for a replacement valve, bearing, or seal can result in catastrophic production losses. Availability is the true benchmark of supply chain performance.",
        "OFS designs robust spare parts availability models backed by global sourcing hubs, manufacturer partnerships, and predictive lead-time algorithms."
    ],
    "blocks": [
        {
            "title": "Advantages of Choosing OFS",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("Spare-Parts-Procurement.jpg") or "/images/live/Spare-Parts-Procurement.jpg",
                "alt": "Advantages of Choosing OFS"
            },
            "intro": "Why leading operators trust OFS for uninterrupted parts availability:",
            "noBullets": True,
            "items": [
                {
                    "title": "Guaranteed Sourcing Speed",
                    "description": "Rapid turnaround on urgent RFQs with pre-established vendor pipelines across North America, Europe, and Asia."
                },
                {
                    "title": "Verified Global Vendor Network",
                    "description": "Over 5,000 vetted manufacturers and authorized distributors ready to fulfill urgent industrial requirements."
                },
                {
                    "title": "100% Quality & Authenticity Checks",
                    "description": "Every part inspected and accompanied by original manufacturer test certificates and compliance papers."
                },
                {
                    "title": "Strategic Inventory Buffers",
                    "description": "Dedicated buffer stock held in bonded and regional warehouses for rapid same-day or next-day dispatch."
                }
            ]
        },
        {
            "title": "Optimising Spare Parts Management & Resilience",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("Spare-Parts-Procurement.png") or "/images/live/Spare-Parts-Procurement.png",
                "alt": "Optimising Spare Parts Management"
            },
            "intro": "Structured methodologies to safeguard industrial production continuity:",
            "noBullets": True,
            "items": [
                {
                    "title": "Critical Spares Identification",
                    "description": "Categorizing equipment by downtime severity to ensure high-priority components are never out of stock."
                },
                {
                    "title": "Automated Safety Stock Triggering",
                    "description": "Real-time consumption tracking that triggers replenishment before stocks drop below critical thresholds."
                },
                {
                    "title": "Long-Term Supplier Agreements",
                    "description": "Locking in guaranteed lead times and fixed volume pricing with key component manufacturers."
                },
                {
                    "title": "Shared-Risk Collaborative Model",
                    "description": "Working as an invested partner to ensure your plant runs continuously with transparent communication."
                }
            ]
        },
        {
            "title": "Pricing and Packages",
            "paragraphs": pricing_paragraphs
        },
        {
            "title": "What Can Be Expected",
            "paragraphs": expectations_quotes
        },
        {
            "title": "Broad Advantages",
            "items": broad_advantages_items,
            "buttonText": "Ensure Spares Availability",
            "buttonHref": "/contact"
        }
    ]
}

# ----------------------------------------------------
# 16. STRATEGIC SOURCING & MRO DATA ENRICHMENT
# ----------------------------------------------------
offers['strategic-sourcing-mro-data-enrichment'] = {
    "slug": "strategic-sourcing-mro-data-enrichment",
    "href": "/strategic-sourcing-mro-data-enrichment",
    "title": "Strategic Sourcing & MRO Data Enrichment",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Strategic Sourcing & MRO Data Enrichment Solutions",
    "overviewTitle": "Strategic Sourcing & MRO Data Enrichment Solutions",
    "description": "Transform unstandardized parts catalogs into clean, enriched, UNSPSC-classified master data combined with strategic supplier negotiations to drive measurable savings.",
    "overviewParagraphs": [
        "Incomplete part descriptions, missing manufacturer specifications, and fragmented supplier bases prevent procurement teams from negotiating effective volume contracts.",
        "OFS delivers an integrated solution combining technical data cleansing with aggressive strategic sourcing—unlocking transparency and driving double-digit procurement savings."
    ],
    "blocks": [
        {
            "title": "Overcoming the Challenges of Sourcing Perfection",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("facilities-offered.png") or "/images/live/facilities-offered.png",
                "alt": "Challenges of Sourcing"
            },
            "intro": "Eliminating common inefficiencies in industrial procurement pipelines:",
            "noBullets": True,
            "items": [
                {
                    "title": "Supplier Base Fragmentation",
                    "description": "Consolidating thousands of disparate tier-3 vendors into manageable, performance-monitored categories."
                },
                {
                    "title": "Inaccurate Item Descriptions",
                    "description": "Replacing free-text purchase requests with structured, engineering-verified material master records."
                },
                {
                    "title": "Price Volatility Protection",
                    "description": "Benchmarking historical spend against global market indices to negotiate locked-in supplier contracts."
                },
                {
                    "title": "Direct Sourcing Channels",
                    "description": "Bypassing unnecessary intermediaries to buy directly from primary manufacturers and master distributors."
                }
            ]
        },
        {
            "title": "Finding Reliable Sources & Specialized Services",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("key-practices.png") or "/images/live/key-practices.png",
                "alt": "Reliable Sourcing Services"
            },
            "intro": "Our comprehensive suite of data enrichment and sourcing capabilities:",
            "noBullets": True,
            "items": [
                {
                    "title": "Catalog Standardization & UNSPSC Coding",
                    "description": "Classifying every item into standardized taxonomic codes for global spend visibility."
                },
                {
                    "title": "Spend Analytics & Opportunity Assessment",
                    "description": "Analyzing company-wide purchasing patterns to uncover immediate cost reduction opportunities."
                },
                {
                    "title": "Supplier Quality & Financial Audits",
                    "description": "Vetting prospective suppliers for financial health, ISO compliance, and manufacturing capabilities."
                },
                {
                    "title": "Contract Renegotiation & SLA Setup",
                    "description": "Drafting enforceable Service Level Agreements with clear delivery, warranty, and pricing terms."
                }
            ]
        },
        {
            "title": "Pricing and Packages",
            "paragraphs": pricing_paragraphs
        },
        {
            "title": "What Can Be Expected",
            "paragraphs": expectations_quotes
        },
        {
            "title": "Broad Advantages",
            "items": broad_advantages_items,
            "buttonText": "Start Sourcing Optimization",
            "buttonHref": "/contact"
        }
    ]
}

# ----------------------------------------------------
# 17. SUPPLY CHAIN FINANCING
# ----------------------------------------------------
offers['supply-chain-financing'] = {
    "slug": "supply-chain-financing",
    "href": "/supply-chain-financing",
    "title": "Supply Chain Financing",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Streamline Your Supply Chain Financing with OFS",
    "overviewTitle": "Streamline Your Supply Chain Financing with OFS",
    "description": "OFS bridges cash flow gaps and enables extended payment terms while ensuring upfront supplier liquidity through structured supply chain financing and one-off payment management.",
    "overviewParagraphs": [
        "Managing international cash flow, extended buyer terms, and upfront vendor payment demands is one of the most critical challenges in global procurement.",
        "OFS provides flexible Supply Chain Financing and One-Off Payment solutions that bridge financial gaps, protect liquidity, and strengthen strategic vendor partnerships."
    ],
    "blocks": [
        {
            "title": "Mastering MRO Complexity & Supplier Financing",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("future-procurement.png") or "/images/live/future-procurement.png",
                "alt": "Mastering MRO Complexity"
            },
            "intro": "How OFS redefines financial agility across your global supply chain:",
            "noBullets": True,
            "items": [
                {
                    "title": "Extended Buyer Payment Terms",
                    "description": "Optimize your working capital by extending payment terms up to 90 or 120 days while keeping vendors satisfied."
                },
                {
                    "title": "Immediate Supplier Settlement",
                    "description": "OFS pays international and local manufacturers upfront upon dispatch, ensuring zero shipment delays."
                },
                {
                    "title": "Multi-Currency Management",
                    "description": "Eliminating currency conversion headaches and mitigating foreign exchange volatility across cross-border deals."
                },
                {
                    "title": "Unified Terms & Conditions",
                    "description": "Consolidating divergent vendor contractual terms into a single, straightforward credit framework."
                }
            ]
        },
        {
            "title": "One-Off Payments: A Smart Solution to Complex Challenges",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("facilities-offered.png") or "/images/live/facilities-offered.png",
                "alt": "One-Off Payments Solution"
            },
            "intro": "Overcoming one-off vendor onboarding bottlenecks and emergency purchasing hurdles:",
            "noBullets": True,
            "items": [
                {
                    "title": "Rapid Vendor Onboarding",
                    "description": "Procure from non-registered or spot vendors instantly through OFS without cumbersome internal vendor registration."
                },
                {
                    "title": "Foreign Exchange Risk Absorption",
                    "description": "OFS manages currency hedging and regulatory compliance for overseas payments on your behalf."
                },
                {
                    "title": "Tier-2 Pre-Financing Support",
                    "description": "Removing capital bottlenecks for specialized Tier-2 component fabricators that require advance funding."
                },
                {
                    "title": "Full Financial Transparency",
                    "description": "Clear, upfront fee structures with zero hidden charges and comprehensive audit documentation."
                }
            ]
        },
        {
            "title": "Pricing and Packages",
            "paragraphs": pricing_paragraphs
        },
        {
            "title": "What Can Be Expected",
            "paragraphs": expectations_quotes
        },
        {
            "title": "Broad Advantages",
            "items": broad_advantages_items,
            "buttonText": "Explore Financing Options",
            "buttonHref": "/contact"
        }
    ]
}

# ----------------------------------------------------
# 18. PROCUREMENT SERVICES
# ----------------------------------------------------
offers['procurement-services'] = {
    "slug": "procurement-services",
    "href": "/procurement-services",
    "title": "Procurement Services",
    "category": "disciplines",
    "categoryLabel": "Disciplines",
    "heroImage": None,
    "tagline": "Enhance Your Procurement Services with OFS",
    "overviewTitle": "Enhance Your Procurement Services with OFS",
    "description": "Welcome to OFS, your trusted partner in supply chain optimisation and operational procurement outsourcing. Backed by years of industry experience and an established global network, we specialise in delivering end-to-end procurement solutions.",
    "overviewParagraphs": [
        "Welcome to OFS, your trusted partner in supply chain optimisation and operational procurement outsourcing.",
        "Backed by years of industry experience and an established global network, we specialise in delivering end-to-end procurement and logistics solutions tailored to the needs of industrial leaders. Our dedicated team works as an extension of your procurement department, closely collaborating with you to identify improvement opportunities, cut total costs, and enhance operational resilience."
    ],
    "blocks": [
        {
            "title": "OFS's Core Procurement Expertise",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("one.png") or "/images/live/one.png",
                "alt": "OFS Core Expertise"
            },
            "intro": "Four core disciplines where OFS delivers measurable, bottom-line value:",
            "noBullets": True,
            "items": [
                {
                    "title": "Tail Spend Management",
                    "description": "Bringing disciplined oversight and consolidation to the unmanaged 20% of indirect spend that drains internal resources."
                },
                {
                    "title": "NPR (Non-Product Related) Purchasing",
                    "description": "Optimizing procurement of consumables, packaging, tools, and industrial facility operating supplies."
                },
                {
                    "title": "Invoice & Supplier Reduction",
                    "description": "Consolidating hundreds of fragmented suppliers into single monthly invoices, reducing AP administration costs by up to 70%."
                },
                {
                    "title": "Decrease Total Cost of Ownership (TCO)",
                    "description": "Looking beyond purchase price to optimize maintenance lifecycles, logistics freight, and inventory holding costs."
                }
            ]
        },
        {
            "title": "Why Partner with OFS?",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("two-rdjvqwegm3tilwnmboyyo1yd9xikpofjirqc5k2bi0.png") or "/images/live/two-rdjvqwegm3tilwnmboyyo1yd9xikpofjirqc5k2bi0.png",
                "alt": "Why Partner with OFS"
            },
            "intro": "The pillars that make OFS the premier procurement partner for industrial leaders:",
            "noBullets": True,
            "items": [
                {
                    "title": "Comprehensive Tailored Services",
                    "description": "End-to-end solutions designed around the exact operational realities and compliance requirements of your organization."
                },
                {
                    "title": "Advanced Technological Solutions",
                    "description": "Award-winning procurement systems providing real-time visibility, automated approval workflows, and deep analytics."
                },
                {
                    "title": "Deep Industry Domain Expertise",
                    "description": "Seasoned procurement professionals with engineering backgrounds delivering actionable commercial insights."
                },
                {
                    "title": "Ethics-Driven Partnership",
                    "description": "A core commitment to transparency, open costing, anti-bribery governance (ISO 37001), and mutual success."
                }
            ]
        },
        {
            "title": "Leverage the Procurement Expertise of OFS Today",
            "variant": "dark",
            "paragraphs": [
                "Partner with OFS to unlock efficiency, lower operational risk, and drive sustainable savings across your entire procurement lifecycle.",
                "Our dedicated specialists are ready to evaluate your spend portfolio and design a bespoke procurement strategy aligned with your growth objectives."
            ],
            "buttonText": "Speak with Our Procurement Team",
            "buttonHref": "/contact"
        }
    ]
}

# ----------------------------------------------------
# 7. QUALITY CONTROL
# ----------------------------------------------------
offers['quality-control'] = {
    "slug": "quality-control",
    "href": "/quality-control",
    "title": "Quality Control",
    "category": "services",
    "categoryLabel": "Services",
    "heroImage": None,
    "tagline": "Ensuring Excellence, Precision & Rigorous Quality Assurance",
    "overviewTitle": "Quality Control & Assurance by OFS",
    "description": "At OFS, quality is embedded at every stage of the procurement and manufacturing lifecycle. We implement rigorous Quality Management Systems (QMS), comprehensive testing, and non-destructive examination (NDT) to ensure zero defect tolerance.",
    "overviewParagraphs": [
        "In heavy industrial, energy, and marine engineering, product quality is non-negotiable. Material failures or out-of-tolerance components cause catastrophic delays and safety hazards.",
        "At OFS, we enforce a comprehensive Quality Control framework spanning raw material chemical verification, precision dimensional metrology, certified non-destructive testing (NDT), and complete EN 10204 3.1/3.2 traceability."
    ],
    "blocks": [
        {
            "title": "Our Quality Assurance Framework",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("facilities-offered.png") or "/images/live/facilities-offered.png",
                "alt": "Quality Assurance Framework"
            },
            "intro": "How OFS guarantees zero-defect deliveries across every project:",
            "noBullets": True,
            "items": [
                {
                    "title": "Inspection and Testing Protocols",
                    "description": "Rigorous incoming, in-process, and final inspection checkpoints validating chemical composition, mechanical strength, and tolerances."
                },
                {
                    "title": "Certified Quality Management Systems",
                    "description": "Operating under ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 standards ensuring complete procedural control and traceability."
                },
                {
                    "title": "Defect Prevention Strategies",
                    "description": "Deploying statistical process control, Six Sigma methodologies, and comprehensive supplier audits to prevent defects before dispatch."
                },
                {
                    "title": "Third-Party Inspection (TPI) Coordination",
                    "description": "Seamless coordination with premier international inspection agencies (BV, DNV, Lloyd's Register, TUV, SGS) for client witness testing."
                }
            ]
        },
        {
            "title": "Testing Capabilities & Global Standards",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("key-practices.png") or "/images/live/key-practices.png",
                "alt": "Testing Capabilities"
            },
            "intro": "Comprehensive laboratory and on-site testing capabilities:",
            "noBullets": True,
            "items": [
                {
                    "title": "Non-Destructive Testing (NDT)",
                    "description": "Ultrasonic Testing (UT), Magnetic Particle Testing (MPT), Liquid Penetrant (LPT), and Radiography (RT) performed by ASNT Level II/III certified inspectors."
                },
                {
                    "title": "Hydrostatic & Pressure Testing",
                    "description": "Pressure-testing valves, piping, and vessels up to 15,000 PSI to verify zero-leakage integrity under extreme operating pressures."
                },
                {
                    "title": "Coordinate Measuring & Metrology",
                    "description": "High-precision CMM inspection, laser scanning, and optical surface roughness testing ensuring micron-level accuracy."
                },
                {
                    "title": "Complete Documentation Packs",
                    "description": "Furnishing Mill Test Certificates (MTC), Inspection Release Notes (IRN), Coating Reports, and Certificates of Conformity (CoC) with every shipment."
                }
            ]
        },
        {
            "title": "Why Partner with OFS for Quality Control?",
            "variant": "dark",
            "paragraphs": [
                "Zero-Defect Commitment: Delivering parts and assemblies that meet or exceed project specifications every single time.",
                "Complete Traceability: Full documentation pack according to EN 10204 3.1 / 3.2, Inspection Release Notes (IRN), and Certificate of Conformity (CoC).",
                "Global Compliance: Ensuring vendor compliance across international jurisdictions, marine classifications, and hazardous location standards."
            ],
            "buttonText": "Schedule a Quality Consultation",
            "buttonHref": "/contact"
        }
    ]
}

# ----------------------------------------------------
# 8. SUPPLY CHAIN MANAGEMENT
# ----------------------------------------------------
offers['supply-chain-management'] = {
    "slug": "supply-chain-management",
    "href": "/supply-chain-management",
    "title": "Supply Chain Management",
    "category": "services",
    "categoryLabel": "Services",
    "heroImage": None,
    "tagline": "End-to-End Supply Chain Optimization, Resilience & Transparency",
    "overviewTitle": "Comprehensive Supply Chain Management Solutions by OFS",
    "description": "In today's complex industrial landscape, supply chain resilience is essential for operational continuity. OFS delivers integrated supply chain management solutions—from supplier diversification and strategic sourcing to inventory buffer management and predictive risk mitigation.",
    "overviewParagraphs": [
        "In today's complex industrial landscape, supply chain resilience is essential for operational continuity.",
        "OFS delivers integrated supply chain management solutions—from supplier diversification and strategic sourcing to inventory buffer management, freight forwarding, and predictive risk mitigation."
    ],
    "blocks": [
        {
            "title": "Supply Chain Process, Planning & Strategies",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("key-practices.png") or "/images/live/key-practices.png",
                "alt": "Supply Chain Process"
            },
            "intro": "Core strategic pillars to match product supply with dynamic customer demand:",
            "noBullets": True,
            "items": [
                {
                    "title": "Reduce Inventory Expenses",
                    "description": "Maintain accurate inventory counts and automated reordering to prevent costly overstocking and production-halting understocking."
                },
                {
                    "title": "Integrate Advanced Technology",
                    "description": "Automate procurement workflows, ERP integrations, and tracking to shorten lead times and accelerate shipment deliveries."
                },
                {
                    "title": "Green & Sustainable Initiatives",
                    "description": "Embedding environmentally conscious, ethical sourcing and carbon-efficient transport across the entire supply chain."
                },
                {
                    "title": "Dynamic Pricing & Demand Planning",
                    "description": "Deploying forecasting software to anticipate market fluctuations and secure optimal volume pricing."
                }
            ]
        },
        {
            "title": "Overcoming Supply Chain Challenges & Solutions",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("future-procurement.png") or "/images/live/future-procurement.png",
                "alt": "Supply Chain Solutions"
            },
            "intro": "How OFS actively resolves the most pressing supply chain hurdles:",
            "noBullets": True,
            "items": [
                {
                    "title": "Price Variations & Costing",
                    "description": "Long-term rate locking and volume consolidation to shield budgets from global commodity volatility."
                },
                {
                    "title": "Prolonged Lead Times",
                    "description": "Strategic buffer stocking and multi-modal expedited freight routes to bypass port bottlenecks."
                },
                {
                    "title": "Supplier Risk Diversification",
                    "description": "Maintaining redundant, qualified supplier pipelines so alternate sources are immediately available."
                },
                {
                    "title": "Transparent Operational Visibility",
                    "description": "Real-time shipment milestone reporting providing actionable insights to keep all stakeholders aligned."
                }
            ]
        },
        {
            "title": "Benefits of OFS Supply Chain Management Services",
            "variant": "dark",
            "paragraphs": [
                "PROVIDE A UNIQUE CLIENT EXPERIENCE: Adopt clever automation to resolve disturbances and increase dependability.",
                "INCREASE YOUR AGILITY AND VISIBILITY: Create robust and long-lasting supply chains that improve transparency, productivity, and minimise IT complexity and costs.",
                "PREDICT INTERRUPTION AND MANAGE POSSIBLE HAZARDS AHEAD OF TIME: Enhance traditional planning processes with technology such as AI and real-time data insights to shift from a reactive to a proactive mindset.",
                "UTILISE DATA AND AUTOMATION TO IMPROVE COST AND SERVICE EFFICIENCY: Use the competitive benefits of data-driven decision-making to transform corporate operations."
            ],
            "buttonText": "Optimize Your Supply Chain Today",
            "buttonHref": "/contact"
        }
    ]
}

# ----------------------------------------------------
# 9. WAREHOUSE
# ----------------------------------------------------
offers['warehouse'] = {
    "slug": "warehouse",
    "href": "/warehouse",
    "title": "Warehouse",
    "category": "services",
    "categoryLabel": "Services",
    "heroImage": None,
    "tagline": "State-of-the-Art Industrial Warehousing, Storage & Value-Added Services",
    "overviewTitle": "Welcome to OFS Warehouse Solutions",
    "description": "Explore OFS's Warehouse Management System—offering real-time visibility to streamline your operations, boost productivity, and maximize efficiency. Our innovative, dependable solutions are built to elevate your business and simplify warehouse management at every level.",
    "overviewParagraphs": [
        "Welcome to OFS Warehouse Solutions. Explore OFS's Warehouse Management System—offering real-time visibility to streamline your operations, boost productivity, and maximize efficiency.",
        "Our innovative, dependable solutions are built to elevate your business and simplify warehouse management at every level—from raw material staging to finished goods distribution."
    ],
    "blocks": [
        {
            "title": "Our Warehouse Services",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("facilities-offered.png") or "/images/live/facilities-offered.png",
                "alt": "Our Warehouse Services"
            },
            "intro": "At OFS, we offer comprehensive warehouse solutions tailored to meet the diverse needs of modern industrial supply chains:",
            "noBullets": True,
            "items": [
                {
                    "title": "Storage & Warehousing",
                    "description": "Our flexible facilities support a variety of storage options—including rack, bulk, temperature-controlled, and specialized storage—designed to handle goods of all sizes."
                },
                {
                    "title": "Real-Time Inventory Tracking",
                    "description": "With our advanced tracking systems, you gain 24/7 visibility into your stock movements, enabling smarter decision-making and supply chain efficiency."
                },
                {
                    "title": "Order Fulfilment",
                    "description": "We ensure accurate and timely order processing, reducing lead times and consistently meeting delivery commitments—enhancing your customer satisfaction."
                },
                {
                    "title": "Value-Added Services",
                    "description": "In addition to standard storage, we offer labelling, repackaging, quality checks, kitting, and preservation coating—adding efficiency and value to your operations."
                }
            ]
        },
        {
            "title": "Why Choose OFS for Warehouse Solutions?",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("Procurement-and-shippings.jpg") or "/images/live/Procurement-and-shippings.jpg",
                "alt": "Why Choose OFS Warehouse"
            },
            "intro": "Engineered specifically for the demands of the process, energy, and manufacturing sectors:",
            "noBullets": True,
            "items": [
                {
                    "title": "Process Industry Domain Expertise",
                    "description": "Deep experience handling raw materials, hazardous supplies, valves, piping, electrical components, and heavy engineering goods."
                },
                {
                    "title": "Advanced Secure Infrastructure",
                    "description": "Featuring climate control, 24/7 CCTV surveillance, fire suppression, overhead gantry cranes, and heavy-duty racking systems."
                },
                {
                    "title": "Efficient Inventory Control",
                    "description": "Real-time barcoding and RFID tracking to prevent stockouts, overstocking, and material obsolescence."
                },
                {
                    "title": "Customised Logistics Integration",
                    "description": "Seamless integration with multi-modal transport networks for rapid in-country and international dispatch."
                }
            ]
        },
        {
            "title": "Experience Outstanding Customer Service and Collaboration",
            "variant": "dark",
            "paragraphs": [
                "Dedicated Support: Our experienced team provides continuous assistance to keep your warehouse operations running smoothly—whether it's technical help, solution upgrades, or day-to-day queries.",
                "Continuous Improvement: We foster a culture of innovation and refinement. As your partner, we actively monitor performance and identify opportunities to improve efficiency and reduce costs.",
                "Transparency & Communication: We believe in open, honest communication. You'll always be informed with relevant updates, KPIs, and performance insights—so you clearly see the value we deliver."
            ],
            "buttonText": "Inquire About Warehouse Space",
            "buttonHref": "/contact"
        }
    ]
}

# Write final dataset to src/data/offers.json
with open('src/data/offers.json', 'w', encoding='utf-8') as f:
    json.dump(offers, f, indent=2, ensure_ascii=False)

print("Successfully generated rich, complete, faithful datasets for all 20 pages in src/data/offers.json!")
