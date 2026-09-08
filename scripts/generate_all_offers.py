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

def clean_title(t):
    t = clean(t)
    t = re.sub(r'\s*-\s*Oriented Facility Solution.*$', '', t, flags=re.IGNORECASE)
    t = re.sub(r'\s*-\s*OFS.*$', '', t, flags=re.IGNORECASE)
    t = re.sub(r'\s*\|\s*OFS.*$', '', t, flags=re.IGNORECASE)
    return t.strip()

# Load existing offers to keep custom blocks where curated (indirect-procurement, project-supply, outsource-manufacturing, etc.)
existing_offers = {}
if os.path.exists('src/data/offers.json'):
    with open('src/data/offers.json', 'r', encoding='utf-8') as f:
        existing_offers = json.load(f)

offers_result = {}

# 1. indirect-procurement
ip_raw = raw_pages['indirect-procurement']
offers_result['indirect-procurement'] = existing_offers.get('indirect-procurement', {
    "slug": "indirect-procurement",
    "href": "/indirect-procurement",
    "title": "Indirect Procurement",
    "category": "expertise",
    "categoryLabel": "Expertise",
    "heroImage": None,
    "tagline": "Harness the Power of Indirect Procurement",
    "overviewTitle": "Harness the Power of Indirect Procurement",
    "description": "Indirect procurement encompasses the goods and services vital for day-to-day operations that don't directly enter the final product. While direct procurement focuses on raw materials, indirect procurement supports overall business functionality.",
    "blocks": existing_offers.get('indirect-procurement', {}).get('blocks', [])
})

# 2. outsource-procurement
op_raw = raw_pages['outsource-procurement']
offers_result['outsource-procurement'] = existing_offers.get('outsource-procurement', {
    "slug": "outsource-procurement",
    "href": "/outsource-procurement",
    "title": "Outsource Procurement",
    "category": "expertise",
    "categoryLabel": "Expertise",
    "heroImage": find_img("future-procurement.png"),
    "tagline": "Transforming Procurement Operations for Global Industrial Leaders",
    "overviewTitle": "Strategic Procurement Outsourcing",
    "description": "At OFS, we provide comprehensive outsource procurement services that streamline purchasing, optimize supplier networks, and reduce total cost of ownership across your global supply chain.",
    "features": existing_offers.get('outsource-procurement', {}).get('features', []),
    "sections": existing_offers.get('outsource-procurement', {}).get('sections', [])
})

# 3. procurement-shipping
ps_raw = raw_pages['procurement-shipping']
offers_result['procurement-shipping'] = existing_offers.get('procurement-shipping', {
    "slug": "procurement-shipping",
    "href": "/procurement-shipping",
    "title": "Procurement & Shipping",
    "category": "services",
    "categoryLabel": "Services",
    "heroImage": find_img("Procurement-and-shippings.jpg") or "/images/live/Procurement-Shipping.png",
    "tagline": "End-to-End Sourcing and Global Shipping Solutions",
    "overviewTitle": "Enhance Your Procurement & Shipping with OFS",
    "description": "Welcome to OFS, your trusted partner in supply chain optimisation and operational procurement outsourcing. Backed by years of industry experience and an established global network, we specialise in delivering end-to-end procurement and logistics solutions tailored to the needs of industrial leaders.",
    "features": existing_offers.get('procurement-shipping', {}).get('features', []),
    "sections": existing_offers.get('procurement-shipping', {}).get('sections', [])
})

# 4. engineering-epc-support-services
epc_raw = raw_pages['engineering-epc-support-services']
offers_result['engineering-epc-support-services'] = existing_offers.get('engineering-epc-support-services', {
    "slug": "engineering-epc-support-services",
    "href": "/engineering-epc-support-services",
    "title": "Engineering & EPC",
    "category": "services",
    "categoryLabel": "Services",
    "heroImage": find_img("Engg-e1751278356951.jpg") or "/images/live/Engineering-EP-Support-Services.png",
    "tagline": "End-to-End Engineering Support — Onsite & Offshore",
    "overviewTitle": "End-to-End Engineering Support — Onsite & Offshore",
    "description": "At OFS, we deliver robust engineering support, EPC oversight, technical manpower, and precision project execution across heavy industrial, marine, and energy assets globally.",
    "features": existing_offers.get('engineering-epc-support-services', {}).get('features', []),
    "sections": existing_offers.get('engineering-epc-support-services', {}).get('sections', [])
})

# 5. spare-parts-procurement
spp_raw = raw_pages['spare-parts-procurement']
offers_result['spare-parts-procurement'] = existing_offers.get('spare-parts-procurement', {
    "slug": "spare-parts-procurement",
    "href": "/spare-parts-procurement",
    "title": "Spare Parts Procurement",
    "category": "services",
    "categoryLabel": "Services",
    "heroImage": find_img("Spare-Parts-Procurement.jpg") or "/images/live/Spare-Parts-Procurement.png",
    "tagline": "Proactive Sourcing to Eliminate Unplanned Plant Downtime",
    "overviewTitle": "Spare Parts Procurement and International Logistics",
    "description": "In industrial and engineering sectors, the seamless availability of spare parts is critical to maintaining continuous operations and avoiding costly downtime. At OFS, we specialize in end-to-end spare parts procurement and international logistics.",
    "features": existing_offers.get('spare-parts-procurement', {}).get('features', []),
    "sections": existing_offers.get('spare-parts-procurement', {}).get('sections', [])
})

# 6. logistics-shipping
ls_raw = raw_pages['logistics-shipping']
offers_result['logistics-shipping'] = existing_offers.get('logistics-shipping', {
    "slug": "logistics-shipping",
    "href": "/logistics-shipping",
    "title": "Logistics & Shipping",
    "category": "services",
    "categoryLabel": "Services",
    "heroImage": find_img("Logistics-and-shippings.jpg") or "/images/live/Logistic-Shipping.png",
    "tagline": "Seamless Freight, Customs Clearance & Supply Chain Optimization",
    "overviewTitle": "Industrial Logistics and Shipping Services",
    "description": "At OFS, we offer integrated logistics and shipping solutions designed to optimize your industrial supply chain from origin to destination. From customs clearance and freight forwarding to warehousing and multi-modal transport, we ensure smooth delivery.",
    "features": existing_offers.get('logistics-shipping', {}).get('features', []),
    "sections": existing_offers.get('logistics-shipping', {}).get('sections', [])
})

# 7. quality-control
qc_raw = raw_pages['quality-control']
offers_result['quality-control'] = {
    "slug": "quality-control",
    "href": "/quality-control",
    "title": "Quality Control",
    "category": "services",
    "categoryLabel": "Services",
    "heroImage": find_img("Inspection-and-Testing.png") or find_img("facilities-offered.png"),
    "tagline": "Ensuring Excellence, Precision & Rigorous Quality Assurance",
    "overviewTitle": "Comprehensive Quality Control & Inspection Services",
    "description": "At OFS, quality is embedded at every stage of the procurement and manufacturing lifecycle. We implement rigorous Quality Management Systems (QMS), comprehensive testing, and non-destructive examination (NDT) to ensure zero defect tolerance.",
    "features": [
        {
            "title": "Inspection and Testing",
            "description": "Complete material verification, dimension validation, non-destructive testing (NDT), hydrostatic pressure testing, and chemical composition analysis."
        },
        {
            "title": "Quality Management Systems",
            "description": "ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 certified processes ensuring total traceability, compliance, and procedural rigor."
        },
        {
            "title": "Defect Prevention Strategies",
            "description": "Proactive root-cause analysis, statistical process control, and supplier quality audits to eliminate failures before dispatch."
        },
        {
            "title": "Third-Party Inspection Coordination",
            "description": "Seamless coordination with global inspection agencies (BV, DNV, Lloyd's Register, TUV, SGS) for client certification and sign-off."
        }
    ],
    "sections": [
        {
            "title": "Our Quality Assurance Framework",
            "paragraphs": [
                "At OFS, quality control is not an afterthought—it is the cornerstone of our operations. We maintain strict compliance with global engineering standards (API, ASME, ASTM, DIN, ISO) across all sourced and manufactured components.",
                "Quality Management System: Our certified QMS framework guarantees that every incoming and outgoing shipment undergoes structured inspection protocols, full documentation verification, and Mill Test Certificate (MTC) validation.",
                "Inspection Protocols: From raw material spectroscopic analysis to final crating inspection, our certified QA/QC engineers oversee every checkpoint with extreme precision."
            ]
        },
        {
            "title": "Testing Capabilities & Certifications",
            "paragraphs": [
                "Non-Destructive Testing (NDT): Ultrasonic Testing (UT), Magnetic Particle Testing (MPT), Liquid Penetrant Testing (LPT), and Radiographic Testing (RT) performed by ASNT Level II/III certified personnel.",
                "Hydrostatic & Pressure Testing: Validating pressure-containing equipment up to 15,000 PSI to ensure leak-proof performance under extreme operating conditions.",
                "Dimensional & Visual Inspection: Coordinate Measuring Machine (CMM) inspections and optical metrology ensuring tolerance compliance within microns."
            ]
        },
        {
            "title": "Why Partner with OFS for Quality Control?",
            "paragraphs": [
                "Zero-Defect Commitment: Delivering parts and assemblies that meet or exceed project specifications every single time.",
                "Complete Traceability: Full documentation pack including MTCs according to EN 10204 3.1 / 3.2, Inspection Release Notes (IRN), and Certificate of Conformity (CoC).",
                "Global Compliance: Ensuring vendor compliance across international jurisdictions, marine classifications, and hazardous location standards."
            ]
        }
    ]
}

# 8. supply-chain-management
scm_raw = raw_pages['supply-chain-management']
offers_result['supply-chain-management'] = {
    "slug": "supply-chain-management",
    "href": "/supply-chain-management",
    "title": "Supply Chain Management",
    "category": "services",
    "categoryLabel": "Services",
    "heroImage": find_img("key-practices.png") or find_img("future-procurement.png"),
    "tagline": "End-to-End Supply Chain Optimization, Resilience & Transparency",
    "overviewTitle": "Streamline and Protect Your Global Supply Chain with OFS",
    "description": "In today's complex industrial landscape, supply chain resilience is essential for operational continuity. OFS delivers integrated supply chain management solutions—from supplier diversification and strategic sourcing to inventory buffer management and predictive risk mitigation.",
    "features": [
        {
            "title": "Supplier Network Diversification",
            "description": "Broadening vendor ecosystems across domestic and international markets to mitigate geographic and geopolitical vulnerabilities."
        },
        {
            "title": "Demand & Inventory Synchronisation",
            "description": "Aligning procurement schedules with plant maintenance cycles to avoid stockouts while cutting holding costs."
        },
        {
            "title": "End-to-End Logistics Coordination",
            "description": "Multi-modal transport management, customs clearance, and real-time tracking from supplier factory to plant site."
        },
        {
            "title": "Proactive Risk Mitigation",
            "description": "Deploying predictive analytics and contingency protocols to anticipate supply bottlenecks and market shifts."
        }
    ],
    "sections": [
        {
            "title": "Overcoming Modern Supply Chain Challenges",
            "paragraphs": [
                "Industrial supply chains face unprecedented volatility, including price fluctuations, extended lead times, port congestions, and changing regulatory environments. OFS acts as your strategic partner to navigate these complexities.",
                "Price Variations: We leverage volume consolidation and long-term rate agreements to protect your budgets against raw material price swings.",
                "Prolonged Lead Times: Our strategic buffer stocking and expedited logistics protocols ensure critical spares arrive before downtime occurs.",
                "Unpredictable Global Conditions: Multi-region sourcing gives you alternative supply routes when global disruptions arise."
            ]
        },
        {
            "title": "Strategic Capabilities & Core Pillars",
            "paragraphs": [
                "Adopt clever automation to resolve disturbances and increase dependability across all operational nodes.",
                "Create robust and long-lasting supply chains that improve transparency, productivity, and minimise IT complexity and costs.",
                "Enhance traditional planning processes with real-time data insights to shift from a reactive to a proactive mindset.",
                "Utilise data and automation to improve cost and service efficiency, transforming business operations into competitive advantages."
            ]
        },
        {
            "title": "Why Choose OFS Supply Chain Management?",
            "paragraphs": [
                "Complete Operational Visibility: Transparent tracking and milestone reporting at every stage of the procurement and transit cycle.",
                "Dedicated Account Leadership: Single point of contact supported by cross-functional logistics, engineering, and commercial specialists.",
                "Measurable Value Delivery: Demonstrated cost reductions, shortened delivery cycles, and enhanced plant uptime."
            ]
        }
    ]
}

# 9. warehouse
wh_raw = raw_pages['warehouse-2']
offers_result['warehouse'] = {
    "slug": "warehouse",
    "href": "/warehouse",
    "title": "Warehouse",
    "category": "services",
    "categoryLabel": "Services",
    "heroImage": find_img("facilities-offered.png") or find_img("Procurement-and-shippings.jpg"),
    "tagline": "State-of-the-Art Industrial Warehousing, Storage & Value-Added Services",
    "overviewTitle": "Welcome to OFS Warehouse Solutions",
    "description": "Explore OFS's Warehouse Management System—offering real-time visibility to streamline your operations, boost productivity, and maximize efficiency. Our innovative, dependable solutions are built to elevate your business and simplify warehouse management at every level.",
    "features": [
        {
            "title": "Storage & Warehousing",
            "description": "Flexible facilities supporting a variety of storage options—including rack, bulk, temperature-controlled, and specialized storage for industrial materials."
        },
        {
            "title": "Real-Time Inventory Tracking",
            "description": "Advanced warehouse management tracking systems providing 24/7 visibility into stock movements and inventory levels."
        },
        {
            "title": "Precision Order Fulfilment",
            "description": "Accurate, rapid pick-pack-ship operations reducing lead times and ensuring on-time delivery to project sites."
        },
        {
            "title": "Value-Added Services",
            "description": "Custom labeling, repackaging, kitting, preservation coating, quality checks, and crating for domestic and export shipping."
        }
    ],
    "sections": [
        {
            "title": "Our Warehouse Services",
            "paragraphs": [
                "At OFS, we offer comprehensive warehouse solutions tailored to meet the diverse needs of modern supply chains. Here's what sets our services apart:",
                "Storage & Warehousing: Our flexible facilities support a variety of storage options—including rack, bulk, and specialized storage—designed to handle goods of all sizes and requirements.",
                "Inventory Tracking: With our advanced tracking systems, you gain real-time visibility into your stock movements. This transparency enables smarter decision-making and ensures supply chain efficiency.",
                "Order Fulfilment: We ensure accurate and timely order processing, reducing lead times and consistently meeting delivery commitments—enhancing your customer satisfaction.",
                "Value-Added Services: In addition to standard storage, we offer labelling, repackaging, quality checks, and kitting—adding efficiency and value to your operations."
            ]
        },
        {
            "title": "Why Choose OFS for Warehouse Solutions?",
            "paragraphs": [
                "Industry Expertise: With deep experience in the process industry, we understand the complexities of handling raw materials, intermediates, and finished goods. Our solutions are tailored to meet the sector's precise storage and handling needs.",
                "Advanced Infrastructure: Our warehouses feature state-of-the-art infrastructure—including temperature-controlled zones, specialized storage units, and robust security systems—to ensure your inventory is stored safely and securely.",
                "Efficient Inventory Management: Through real-time tracking and monitoring, we help prevent stockouts, overstocking, and product obsolescence—enhancing cost control and operational efficiency.",
                "Customised Solutions: We recognize that no two businesses are alike. Our team works closely with you to design tailored warehousing strategies that align with your specific goals and operational requirements."
            ]
        },
        {
            "title": "Experience Outstanding Customer Service and Collaboration",
            "paragraphs": [
                "At OFS, we go beyond advanced infrastructure and smart technologies—we focus on building lasting, collaborative relationships with our clients.",
                "Dedicated Support: Our experienced team provides continuous assistance to keep your warehouse operations running smoothly—whether it's technical help, solution upgrades, or day-to-day queries.",
                "Continuous Improvement: We foster a culture of innovation and refinement. As your partner, we actively monitor performance and identify opportunities to improve efficiency and reduce costs.",
                "Transparency & Communication: We believe in open, honest communication. You'll always be informed with relevant updates, KPIs, and performance insights—so you clearly see the value we deliver."
            ]
        }
    ]
}

# 10. global-mro-procurement-excellence
offers_result['global-mro-procurement-excellence'] = existing_offers.get('global-mro-procurement-excellence', {
    "slug": "global-mro-procurement-excellence",
    "href": "/global-mro-procurement-excellence",
    "title": "Global MRO Procurement Excellence",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Strategic MRO Sourcing, Tail Spend Rationalization & Plant Optimization",
    "overviewTitle": "Global MRO Procurement Excellence",
    "description": "At OFS, we transform maintenance, repair, and operations (MRO) procurement from a transactional burden into a strategic asset. Our end-to-end framework consolidates suppliers, optimizes inventory holding, and guarantees supply chain agility.",
    "blocks": existing_offers.get('global-mro-procurement-excellence', {}).get('blocks', [])
})

# 11. inventory-planning-optimisation
offers_result['inventory-planning-optimisation'] = existing_offers.get('inventory-planning-optimisation', {
    "slug": "inventory-planning-optimisation",
    "href": "/inventory-planning-optimisation",
    "title": "Inventory Planning & Optimisation",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Inventory Planning & Optimisation Solutions by OFS",
    "overviewTitle": "Inventory Planning & Optimisation Solutions",
    "description": "OFS delivers data-driven inventory planning and optimization strategies that balance high parts availability with lean working capital. We eliminate obsolete stock, rationalize safety margins, and guarantee critical spares availability.",
    "features": existing_offers.get('inventory-planning-optimisation', {}).get('features', []),
    "sections": existing_offers.get('inventory-planning-optimisation', {}).get('sections', [])
})

# 12. master-data-management
offers_result['master-data-management'] = existing_offers.get('master-data-management', {
    "slug": "master-data-management",
    "href": "/master-data-management",
    "title": "Master Data Management",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Elevate Your Business's Data with Ease",
    "overviewTitle": "Master Data Management by OFS",
    "description": "Unlock actionable insights, eliminate duplication, and achieve complete procurement governance with OFS Master Data Management (MDM) solutions tailored for complex industrial operations.",
    "features": existing_offers.get('master-data-management', {}).get('features', []),
    "sections": existing_offers.get('master-data-management', {}).get('sections', [])
})

# 13. mro-supply
offers_result['mro-supply'] = existing_offers.get('mro-supply', {
    "slug": "mro-supply",
    "href": "/mro-supply",
    "title": "MRO Supply",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Your One-Stop Solution for Maximising Efficiency and Minimising Downtime",
    "overviewTitle": "Comprehensive MRO Supply Solutions",
    "description": "At OFS, we supply industrial facilities with mission-critical maintenance, repair, and operating supplies with guaranteed authenticity, rapid lead times, and transparent pricing.",
    "features": existing_offers.get('mro-supply', {}).get('features', []),
    "sections": existing_offers.get('mro-supply', {}).get('sections', [])
})

# 14. plant-maintenance-mro-spare-parts-management
offers_result['plant-maintenance-mro-spare-parts-management'] = existing_offers.get('plant-maintenance-mro-spare-parts-management', {
    "slug": "plant-maintenance-mro-spare-parts-management",
    "href": "/plant-maintenance-mro-spare-parts-management",
    "title": "Plant Maintenance & MRO Spare Parts Management",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Enhancing Plant Maintenance and MRO Spare Parts Management with OFS",
    "overviewTitle": "Plant Maintenance and MRO Spare Parts Management",
    "description": "OFS integrates proactive plant maintenance planning with structured spare parts management to maximize asset lifespan, avoid emergency shutdowns, and stabilize operating budgets.",
    "features": existing_offers.get('plant-maintenance-mro-spare-parts-management', {}).get('features', []),
    "sections": existing_offers.get('plant-maintenance-mro-spare-parts-management', {}).get('sections', [])
})

# 15. spare-parts-availability
offers_result['spare-parts-availability'] = existing_offers.get('spare-parts-availability', {
    "slug": "spare-parts-availability",
    "href": "/spare-parts-availability",
    "title": "Spare Parts Availability",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Elevating Industrial Efficiency Through Spare Parts Availability",
    "overviewTitle": "Guaranteed Spare Parts Availability for Critical Operations",
    "description": "Ensure your production never stops. OFS establishes proactive inventory buffers, OEM vendor agreements, and rapid-dispatch logistics so critical spare parts are always available when you need them.",
    "features": existing_offers.get('spare-parts-availability', {}).get('features', []),
    "sections": existing_offers.get('spare-parts-availability', {}).get('sections', [])
})

# 16. strategic-sourcing-mro-data-enrichment
offers_result['strategic-sourcing-mro-data-enrichment'] = existing_offers.get('strategic-sourcing-mro-data-enrichment', {
    "slug": "strategic-sourcing-mro-data-enrichment",
    "href": "/strategic-sourcing-mro-data-enrichment",
    "title": "Strategic Sourcing & MRO Data Enrichment",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Strategic Sourcing & MRO Data Enrichment Solutions",
    "overviewTitle": "Strategic Sourcing & Data Enrichment by OFS",
    "description": "Transform unstandardized parts catalogs into clean, enriched, UNSPSC-classified master data combined with strategic supplier negotiations to drive measurable savings.",
    "features": existing_offers.get('strategic-sourcing-mro-data-enrichment', {}).get('features', []),
    "sections": existing_offers.get('strategic-sourcing-mro-data-enrichment', {}).get('sections', [])
})

# 17. supply-chain-financing
offers_result['supply-chain-financing'] = existing_offers.get('supply-chain-financing', {
    "slug": "supply-chain-financing",
    "href": "/supply-chain-financing",
    "title": "Supply Chain Financing",
    "category": "solutions",
    "categoryLabel": "Solutions",
    "heroImage": None,
    "tagline": "Streamline Your Supply Chain Financing with OFS",
    "overviewTitle": "Flexible Supply Chain & Vendor Financing Solutions",
    "description": "OFS bridges cash flow gaps and enables extended payment terms while ensuring upfront supplier liquidity through structured supply chain financing and one-off payment management.",
    "features": existing_offers.get('supply-chain-financing', {}).get('features', []),
    "sections": existing_offers.get('supply-chain-financing', {}).get('sections', [])
})

# 18. procurement-services
offers_result['procurement-services'] = existing_offers.get('procurement-services', {
    "slug": "procurement-services",
    "href": "/procurement-services",
    "title": "Procurement Services",
    "category": "disciplines",
    "categoryLabel": "Disciplines",
    "heroImage": None,
    "tagline": "Enhance Your Procurement Services with OFS",
    "overviewTitle": "Enhance Your Procurement Services with OFS",
    "description": "Welcome to OFS, your trusted partner in supply chain optimisation and operational procurement outsourcing. Backed by years of industry experience and an established global network, we specialise in delivering end-to-end procurement solutions.",
    "features": existing_offers.get('procurement-services', {}).get('features', []),
    "sections": existing_offers.get('procurement-services', {}).get('sections', [])
})

# 19. project-supply
offers_result['project-supply'] = existing_offers.get('project-supply', {
    "slug": "project-supply",
    "href": "/project-supply",
    "title": "Project Supply",
    "category": "disciplines",
    "categoryLabel": "Disciplines",
    "heroImage": None,
    "tagline": "Your Strategic Partner for All Industrial Procurement Needs",
    "overviewTitle": "Your Strategic Partner for All Industrial Procurement Needs",
    "description": "Successful project execution hinges on timely access to the right materials, efficient resource planning, and expert coordination. At OFS, we are committed to being your trusted partner in achieving operational and project excellence. Through our comprehensive Project Supply Solutions, we empower you to streamline procurement and logistics from concept to completion.",
    "blocks": existing_offers.get('project-supply', {}).get('blocks', [])
})

# 20. outsource-manufacturing
offers_result['outsource-manufacturing'] = existing_offers.get('outsource-manufacturing', {
    "slug": "outsource-manufacturing",
    "href": "/outsource-manufacturing",
    "title": "Outsource Manufacturing",
    "category": "manufacturing",
    "categoryLabel": "Manufacturing",
    "heroImage": None,
    "tagline": "Streamline your production with OFS Managed Manufacturing Services",
    "overviewTitle": "Streamline your production with OFS Managed Manufacturing Services",
    "description": "At OFS, we provide end-to-end outsourced manufacturing services from India, allowing you to simplify production without sacrificing quality, cost, or control. We take complete ownership from design to delivery.",
    "blocks": existing_offers.get('outsource-manufacturing', {}).get('blocks', [])
})

# Write updated offers.json
with open('src/data/offers.json', 'w', encoding='utf-8') as f:
    json.dump(offers_result, f, indent=2, ensure_ascii=False)

print(f"\nSuccessfully wrote {len(offers_result)} pages to src/data/offers.json!")
for k, v in offers_result.items():
    print(f"[{k}] title='{v['title']}' | category='{v['category']}' | blocks={len(v.get('blocks', []))} | sections={len(v.get('sections', []))} | features={len(v.get('features', []))}")
