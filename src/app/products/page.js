import React from "react";
import { getProducts } from "@/lib/strapi";
import ProductsView from "@/components/products/ProductsView";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Products & Certified Equipment | OFS Group India",
    description:
      "Explore OFS certified OEM equipment, API 6D valves, drilling tools, electrical enclosures, turbomachinery spares, and marine instrumentation.",
    path: "/products",
    keywords: [
      "industrial products",
      "OFS equipment",
      "valves India",
      "oilfield equipment",
    ],
  });
}

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsView products={products} />;
}
