import type { Metadata } from "next";

export const instant = false;
import { connection } from "next/server";
import { listProducts } from "@/lib/db";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Custom non-woven, PP woven, insulated cooler, cotton, jute, drawstring and shoulder bags. Standard specs, fully customisable — FOB Ningbo.",
};

export default async function ProductsPage() {
  await connection();
  const products = listProducts();
  return <ProductsClient products={products} />;
}
