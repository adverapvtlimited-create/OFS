const fs = require('fs');
const path = require('path');

const offersPath = path.join(__dirname, 'src', 'data', 'offers.json');
let offers = JSON.parse(fs.readFileSync(offersPath, 'utf8'));

if (offers['logistics-shipping']) {
  offers['logistics-shipping'] = {
    ...offers['logistics-shipping'],
    title: "Logistics & Shipping Coordination",
    tagline: "Reliable Freight, Customs & Industrial Supply Chain Support",
    overviewTitle: "Industrial Logistics & Shipping Services by OFS",
    description: "At OFS, we provide coordinated logistics and shipping support designed to strengthen industrial procurement and project supply chains from supplier to site. From international freight coordination and customs documentation to project cargo movement, warehousing, and final delivery, we help ensure critical equipment, machinery, and spare parts reach their destination safely, efficiently, and on schedule.",
    overviewParagraphs: [
      "At OFS, we provide coordinated logistics and shipping support designed to strengthen industrial procurement and project supply chains from supplier to site.",
      "From international freight coordination and customs documentation to project cargo movement, warehousing, and final delivery, we help ensure critical equipment, machinery, and spare parts reach their destination safely, efficiently, and on schedule."
    ],
    blocks: [
      {
        title: "Comprehensive Logistics & Shipping Support Services",
        variant: "light",
        imagePosition: "left",
        image: {
          src: "/images/live/Logistics-and-shippings.jpg",
          alt: "Logistics & Shipping Support Services"
        },
        intro: "Reliable freight and multi-modal logistics support tailored for industrial and engineering requirements:",
        noBullets: true,
        items: [
          {
            title: "Ocean & Air Freight Coordination",
            description: "Coordination of FCL, LCL, breakbulk, and air freight shipments through trusted logistics and transportation partners across global trade routes."
          },
          {
            title: "Customs & Import/Export Coordination",
            description: "Support with customs documentation, tariff classifications, import/export requirements, and clearance coordination to facilitate smooth movement of industrial goods."
          },
          {
            title: "Project Cargo & Heavy Equipment Transport",
            description: "Coordination of specialized transportation for oversized machinery, industrial equipment, turbines, vessels, and other heavy or over-dimensional project cargo."
          },
          {
            title: "Special Cargo & Compliance Support",
            description: "Coordination of handling and transportation requirements for sensitive, regulated, and special-category industrial materials through qualified logistics partners."
          }
        ]
      },
      {
        title: "Logistics & Supply Chain Integration",
        variant: "light",
        imagePosition: "right",
        image: {
          src: "/images/live/logistics-integration-photo.png",
          alt: "Supply Chain Integration"
        },
        intro: "Connecting procurement, suppliers, transportation, warehousing, and project sites for efficient material flow:",
        noBullets: true,
        items: [
          {
            title: "End-to-End Shipment Visibility",
            description: "Shipment milestone tracking and regular status coordination from supplier dispatch through customs, transportation, and final site delivery."
          },
          {
            title: "Inventory & Buffer Management",
            description: "Support for temporary storage, staging, and inventory coordination to ensure critical equipment and spare parts are available when required."
          },
          {
            title: "Freight & Logistics Cost Optimization",
            description: "Evaluation and coordination of suitable logistics providers, transportation modes, and freight options to improve cost efficiency without compromising delivery requirements."
          },
          {
            title: "Route Planning & Contingency Support",
            description: "Planning alternative transportation routes and logistics solutions to address port congestion, delays, regulatory issues, and other supply-chain disruptions."
          }
        ]
      },
      {
        title: "Why Industrial Leaders Rely on OFS Logistics",
        variant: "light",
        paragraphs: [
          "Industrial supply chains require careful coordination between procurement, suppliers, logistics providers, customs authorities, and project sites. Delays in transportation or clearance can directly impact project schedules and operational continuity.",
          "OFS brings together procurement expertise, supplier coordination, logistics planning, documentation support, and project-focused execution to help customers move critical equipment and materials efficiently from source to destination."
        ]
      },
      {
        title: "Get Logistics & Shipping Support Today",
        variant: "dark",
        paragraphs: [
          "Partner with OFS for dependable logistics coordination supporting industrial procurement, engineering, EPC, and project requirements.",
          "Contact our team to discuss your shipment requirements, transportation needs, customs coordination, or project logistics requirements."
        ],
        buttonText: "Request Logistics Support",
        buttonHref: "/contact"
      }
    ]
  };

  fs.writeFileSync(offersPath, JSON.stringify(offers, null, 2), 'utf8');
  console.log('Successfully updated offers.json');
} else {
  console.error('logistics-shipping not found in offers.json');
}
