import { getRenewablesData } from "@/lib/strapi";
import RenewablesView from "@/components/renewables/RenewablesView";

export async function generateMetadata() {
  const data = await getRenewablesData();
  return {
    title: `${data.title || "Renewables"} | OFS - Oriental Foundry Services`,
    description:
      data.tagline ||
      data.heroDescription ||
      "Clean energy engineering, EPC services, and sustainable industrial solutions.",
  };
}

export default async function RenewablesPage() {
  const renewablesData = await getRenewablesData();
  return <RenewablesView renewablesData={renewablesData} />;
}
