import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Custom non-woven, PP woven, insulated cooler, cotton, jute, drawstring and shoulder bags. Standard specs, fully customisable — FOB Ningbo.",
};

export default function ProductsPage() {
  return <ProductsClient />;
}