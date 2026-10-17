import type { Metadata } from "next";
import type { Family } from "@/lib/catalog";
import { families } from "@/lib/catalog";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Custom non-woven, PP woven, insulated cooler, cotton, jute, drawstring and shoulder bags. Standard specs, fully customisable — FOB Ningbo.",
};

export default async function ProductsPage({ searchParams }: PageProps<"/products">) {
  const params = await searchParams;
  const raw = Array.isArray(params.family) ? params.family[0] : params.family;
  const initialFamily = families.some((f) => f.id === raw) ? (raw as Family) : undefined;

  return <ProductsClient initialFamily={initialFamily} />;
}
