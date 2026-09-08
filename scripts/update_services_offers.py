import json
import os

with open('src/data/offers.json', 'r', encoding='utf-8') as f:
    offers = json.load(f)

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

# ----------------------------------------------------
# 1. PROCUREMENT & SHIPPING
# ----------------------------------------------------
offers['procurement-shipping'] = {
    "slug": "procurement-shipping",
    "href": "/procurement-shipping",
    "title": "Procurement & Shipping",
    "category": "services",
    "categoryLabel": "Services",
    "heroImage": None,
    "tagline": "End-to-End Sourcing and Global Shipping Solutions",
    "overviewTitle": "Enhance Your Procurement & Shipping with OFS",
    "description": "Welcome to OFS, your trusted partner in supply chain optimisation and operational procurement outsourcing. Backed by years of industry experience and an established global network, we specialise in delivering end-to-end procurement and logistics solutions tailored to the needs of industrial leaders.",
    "overviewParagraphs": [
        "Welcome to OFS, your trusted partner in supply chain optimisation and operational procurement outsourcing.",
        "Backed by years of industry experience and an established global network, we specialise in delivering end-to-end procurement and logistics solutions tailored to the needs of industrial leaders. Our dedicated team works as an extension of your procurement department, closely collaborating with you to identify improvement opportunities, cut total costs, and enhance operational resilience."
    ],
    "blocks": [
        {
            "title": "OFS's Sourcing & Procurement Expertise",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("Procurement-and-shippings.jpg") or "/images/live/Procurement-and-shippings.jpg",
                "alt": "Procurement Expertise"
            },
            "intro": "Four core disciplines where OFS delivers measurable, bottom-line value to industrial enterprises:",
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
            "title": "Structured Global Shipping & Logistics Integration",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("Excellence-tools-official.png") or "/images/live/Excellence-tools-official.png",
                "alt": "Global Shipping and Logistics"
            },
            "intro": "Seamlessly moving mission-critical equipment from global factories directly to your plant site:",
            "noBullets": True,
            "items": [
                {
                    "title": "Global Supplier Sourcing Network",
                    "description": "Access to verified manufacturers across North America, Europe, Middle East, and Asia-Pacific."
                },
                {
                    "title": "Multi-Modal Freight Forwarding",
                    "description": "Integrated ocean container shipping, air express, and heavy oversized road haulage."
                },
                {
                    "title": "Customs Brokerage & Clearance",
                    "description": "Complete handling of export documentation, port clearance, tariff classifications, and duty optimization."
                },
                {
                    "title": "Real-Time Milestone Tracking",
                    "description": "24/7 visibility into cargo location and status updates from factory pickup to final on-site crating."
                }
            ]
        },
        {
            "title": "Why Partner with OFS for Procurement & Shipping?",
            "variant": "light",
            "intro": "The core pillars that make OFS the premier procurement and logistics partner for industrial leaders:",
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
                "Our dedicated specialists are ready to evaluate your spend portfolio and design a bespoke procurement and shipping strategy aligned with your growth objectives."
            ],
            "buttonText": "Request a Procurement & Shipping Consultation",
            "buttonHref": "/contact"
        }
    ]
}

# ----------------------------------------------------
# 2. ENGINEERING & EPC SUPPORT SERVICES
# ----------------------------------------------------
offers['engineering-epc-support-services'] = {
    "slug": "engineering-epc-support-services",
    "href": "/engineering-epc-support-services",
    "title": "Engineering & EPC",
    "category": "services",
    "categoryLabel": "Services",
    "heroImage": None,
    "tagline": "End-to-End Engineering Support — Onsite & Offshore",
    "overviewTitle": "End-to-End Engineering Support — Onsite & Offshore",
    "description": "At OFS, we deliver robust engineering support, EPC oversight, technical manpower, and precision project execution across heavy industrial, marine, and energy assets globally.",
    "overviewParagraphs": [
        "In complex infrastructure and industrial projects, flawless engineering execution and dependable technical oversight are critical to preventing cost overruns and delays.",
        "At OFS, we provide comprehensive engineering and EPC support services across the full project lifecycle—from detailed design review and procurement expediting to on-site certified technical manpower deployment and commissioning."
    ],
    "blocks": [
        {
            "title": "End-to-End Engineering Capabilities",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("Engg-e1751278356951.jpg") or "/images/live/Engg-e1751278356951.jpg",
                "alt": "Engineering Support"
            },
            "intro": "Our multidisciplinary engineering teams deliver high-impact technical solutions across demanding industrial sectors:",
            "noBullets": True,
            "items": [
                {
                    "title": "Project Engineering & Technical Oversight",
                    "description": "Engineering review, feasibility studies, vendor drawing validation, and constructability audits."
                },
                {
                    "title": "Turnkey EPC Project Support",
                    "description": "Providing specialized commercial and engineering support to lead EPC contractors on energy, marine, and refinery builds."
                },
                {
                    "title": "Certified Technical Manpower Deployment",
                    "description": "Mobilizing certified mechanical engineers, electrical supervisors, QA/QC inspectors, and NDT technicians on-site."
                },
                {
                    "title": "Quality Inspection & NDT Testing",
                    "description": "Comprehensive QA/QC inspections, welding procedure qualification (WPS/PQR), and non-destructive testing."
                },
                {
                    "title": "Pre-Commissioning & Handover Support",
                    "description": "Structured testing, punch-list clearance, hydrostatic verification, and handover documentation packs."
                }
            ]
        },
        {
            "title": "Your Trusted Partner in High-Impact Technical Solutions",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("Engineering-EP-Support-Services.png") or "/images/live/Engineering-EP-Support-Services.png",
                "alt": "High-Impact Technical Solutions"
            },
            "intro": "Why global asset owners and EPC operators rely on OFS Engineering:",
            "noBullets": True,
            "items": [
                {
                    "title": "Multi-Discipline Engineering Excellence",
                    "description": "Deep expertise across mechanical, piping, electrical, instrumentation, civil, and marine disciplines."
                },
                {
                    "title": "Stringent Safety & QA Protocols",
                    "description": "Operating under ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 with zero-compromise safety records."
                },
                {
                    "title": "Global Brand Assurance & Compliance",
                    "description": "Delivering projects that strictly adhere to international engineering codes including ASME, API, ASTM, and DIN."
                },
                {
                    "title": "Rapid Mobilisation Capabilities",
                    "description": "Ability to deploy experienced engineering personnel and equipment to remote operating sites worldwide on short notice."
                }
            ]
        },
        {
            "title": "Global Brand Assurance & Engineering Governance",
            "variant": "light",
            "paragraphs": [
                "At OFS, engineering integrity is backed by robust quality frameworks and verified technical standards.",
                "Every engineering package, technical inspection, and material verification is conducted with complete traceability—guaranteeing that your industrial assets operate safely, reliably, and efficiently for decades."
            ]
        },
        {
            "title": "Connect with OFS Engineering Today",
            "variant": "dark",
            "paragraphs": [
                "Partner with OFS to execute your high-impact engineering projects with precision, safety, and compliance.",
                "Our senior engineering consultants are ready to discuss your project requirements and design tailored technical solutions."
            ],
            "buttonText": "Discuss Your Engineering Project",
            "buttonHref": "/contact"
        }
    ]
}

# ----------------------------------------------------
# 3. SPARE PARTS PROCUREMENT
# ----------------------------------------------------
offers['spare-parts-procurement'] = {
    "slug": "spare-parts-procurement",
    "href": "/spare-parts-procurement",
    "title": "Spare Parts Procurement",
    "category": "services",
    "categoryLabel": "Services",
    "heroImage": None,
    "tagline": "Proactive Sourcing to Eliminate Unplanned Plant Downtime",
    "overviewTitle": "Spare Parts Procurement and International Logistics",
    "description": "In industrial and engineering sectors, the seamless availability of spare parts is critical to maintaining continuous operations and avoiding costly downtime. At OFS, we specialize in end-to-end spare parts procurement and international logistics.",
    "overviewParagraphs": [
        "In industrial and engineering sectors, the seamless availability of spare parts is critical to maintaining continuous operations and avoiding costly downtime.",
        "At OFS, we specialize in end-to-end spare parts procurement and international logistics. Backed by direct OEM partnerships, engineering cross-referencing capabilities, and rapid global expediting, we ensure your plant never stops."
    ],
    "blocks": [
        {
            "title": "Our Spare Parts Procurement Strategy",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("Spare-Parts-Procurement.jpg") or "/images/live/Spare-Parts-Procurement.jpg",
                "alt": "Spare Parts Strategy"
            },
            "intro": "A systematic approach to eliminate component shortages and prevent plant shutdowns:",
            "noBullets": True,
            "items": [
                {
                    "title": "Genuine OEM & Equivalent Sourcing",
                    "description": "Direct factory procurement of certified OEM parts alongside verified form-fit-function equivalents for legacy equipment."
                },
                {
                    "title": "Critical Spares Buffer Stocking",
                    "description": "Maintaining dedicated inventory buffers for high-wear components in regional warehouses close to your facilities."
                },
                {
                    "title": "Obsolete Part Cross-Referencing",
                    "description": "Engineering cross-referencing and reverse engineering support to replace discontinued parts without equipment modification."
                },
                {
                    "title": "Rapid Emergency Expediting",
                    "description": "Fast-track hot-shot air freight and dedicated customs clearance protocols for emergency breakdown situations."
                }
            ]
        },
        {
            "title": "How OFS Supports You in Spare Parts Procurement",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("Spare-Parts-Procurement.png") or "/images/live/Spare-Parts-Procurement.png",
                "alt": "OFS Spare Parts Support"
            },
            "intro": "End-to-end commercial and technical support for plant maintenance and operations:",
            "noBullets": True,
            "items": [
                {
                    "title": "Single-Point Procurement Channel",
                    "description": "Consolidate thousands of mechanical, electrical, instrumentation, and hydraulic part numbers under one reliable partner."
                },
                {
                    "title": "100% Quality & Material Verification",
                    "description": "Every shipment inspected and supplied with Mill Test Certificates (MTC), Certificate of Conformity (CoC), and warranty."
                },
                {
                    "title": "Multi-Country Warehousing & Storage",
                    "description": "Strategic warehousing hubs in India and internationally for consolidated sea and air freight."
                },
                {
                    "title": "Dedicated Technical Account Management",
                    "description": "Experienced commercial engineers who understand parts manuals, exploded diagrams, and plant equipment nomenclature."
                }
            ]
        },
        {
            "title": "Spare Parts Availability That Drives Productivity",
            "variant": "light",
            "paragraphs": [
                "Unplanned downtime can cost industrial facilities tens of thousands of dollars per hour. Having a reliable, proactive spare parts supply partner is your greatest insurance against production losses.",
                "OFS provides guaranteed response times, complete pricing transparency, and robust warranty backing on every industrial spare part supplied."
            ]
        },
        {
            "title": "Request Spares Support Today",
            "variant": "dark",
            "paragraphs": [
                "Let OFS take the stress out of your industrial spare parts procurement.",
                "Send us your parts list or equipment model numbers today to receive a comprehensive, competitive proposal with guaranteed delivery timelines."
            ],
            "buttonText": "Submit Parts Inquiry",
            "buttonHref": "/contact"
        }
    ]
}

# ----------------------------------------------------
# 4. LOGISTICS & SHIPPING
# ----------------------------------------------------
offers['logistics-shipping'] = {
    "slug": "logistics-shipping",
    "href": "/logistics-shipping",
    "title": "Logistics & Shipping",
    "category": "services",
    "categoryLabel": "Services",
    "heroImage": None,
    "tagline": "Seamless Freight, Customs Clearance & Supply Chain Optimization",
    "overviewTitle": "Industrial Logistics and Shipping Services by OFS",
    "description": "At OFS, we offer integrated logistics and shipping solutions designed to optimize your industrial supply chain from origin to destination. From customs clearance and freight forwarding to warehousing and multi-modal transport, we ensure smooth delivery.",
    "overviewParagraphs": [
        "At OFS, we offer integrated logistics and shipping solutions designed to optimize your industrial supply chain from origin to destination.",
        "From international customs brokerage and ocean freight forwarding to heavy over-dimensional cargo transport and regional warehousing, we deliver end-to-end logistics with precision, speed, and safety."
    ],
    "blocks": [
        {
            "title": "Comprehensive Logistics & Shipping Services",
            "variant": "light",
            "imagePosition": "left",
            "image": {
                "src": find_img("Logistics-and-shippings.jpg") or "/images/live/Logistics-and-shippings.jpg",
                "alt": "Logistics & Shipping Services"
            },
            "intro": "Complete freight and multi-modal transport solutions tailored for industrial and engineering sectors:",
            "noBullets": True,
            "items": [
                {
                    "title": "Ocean & Air Freight Forwarding",
                    "description": "Full container load (FCL), less-than-container load (LCL), breakbulk, and charter air freight across global trade lanes."
                },
                {
                    "title": "Customs Brokerage & Port Clearance",
                    "description": "Expert handling of import/export customs clearance, duty drawback, tariff classifications, and regulatory documentation."
                },
                {
                    "title": "Project Cargo & Heavy Lift Transport",
                    "description": "Specialized multi-axle trailers, barge transport, and route surveys for oversized refinery vessels, turbines, and machinery."
                },
                {
                    "title": "Dangerous Goods (DG) Handling",
                    "description": "Certified handling and transportation of Class 1–9 dangerous goods and chemicals in compliance with IMO and IATA standards."
                }
            ]
        },
        {
            "title": "Logistics and Supply Chain Integration",
            "variant": "light",
            "imagePosition": "right",
            "image": {
                "src": find_img("Logistic-Shipping.png") or "/images/live/Logistic-Shipping.png",
                "alt": "Supply Chain Integration"
            },
            "intro": "Connecting transportation networks with advanced inventory and warehouse management:",
            "noBullets": True,
            "items": [
                {
                    "title": "End-to-End Real-Time Visibility",
                    "description": "Continuous milestone tracking and automated status updates from factory dispatch to final site gate delivery."
                },
                {
                    "title": "Inventory & Buffer Management",
                    "description": "Bonded warehousing and climate-controlled storage enabling pre-staged staging of critical equipment."
                },
                {
                    "title": "Carrier Rate Optimization",
                    "description": "Leveraging global cargo volumes to secure competitive freight rates and guaranteed vessel space allocations."
                },
                {
                    "title": "Route Planning & Contingency Logistics",
                    "description": "Dynamic route optimization and alternative transport corridors to bypass geopolitical and port bottlenecks."
                }
            ]
        },
        {
            "title": "Why Industrial Leaders Rely on OFS Logistics",
            "variant": "light",
            "paragraphs": [
                "Industrial logistics demands precision planning, strict safety compliance, and deep regulatory knowledge. A single customs hold-up or damaged shipment can halt an entire project site.",
                "OFS provides experienced on-the-ground port agents, comprehensive marine cargo insurance options, and dedicated logistics coordinators who manage every shipment with meticulous care."
            ]
        },
        {
            "title": "Get a Shipping & Freight Quote Today",
            "variant": "dark",
            "paragraphs": [
                "Partner with OFS for reliable, cost-effective global freight and domestic transportation.",
                "Contact our logistics desk today to receive custom freight rates and route recommendations for your next shipment."
            ],
            "buttonText": "Request a Shipping Quote",
            "buttonHref": "/contact"
        }
    ]
}

# Write final dataset to src/data/offers.json
with open('src/data/offers.json', 'w', encoding='utf-8') as f:
    json.dump(offers, f, indent=2, ensure_ascii=False)

print("Successfully updated all 7 services in src/data/offers.json!")
