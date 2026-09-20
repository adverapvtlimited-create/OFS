import { getSiteConfig } from "@/lib/strapi";
import ContactView from "@/components/contact/ContactView";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const siteConfig = await getSiteConfig();
  return buildPageMetadata({
    title: "Contact OFS Group India | RFQ & Engineering Procurement Desk",
    description: `Contact OFS Group India. Request quotations for certified steel plates, pipes, valves, marine offshore equipment, and EPC services. Offices in Mumbai & Florida. Phone: ${siteConfig.contact?.phone || "+91 98200 00000"}`,
    path: "/contact",
    keywords: [
      "OFS contact",
      "RFQ submission",
      "procurement enquiry",
      "Mumbai office",
      "Florida office",
    ],
  });
}

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();
  return <ContactView siteConfig={siteConfig} />;
}
