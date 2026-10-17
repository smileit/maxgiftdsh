import type { Metadata } from "next";
import type { CategoryId } from "@/lib/products";
import { categories } from "@/lib/products";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "The catalogue",
  description:
    "Eight considered pieces: gift sets, home and scent, kitchen and table, desk and paper. Made in small batches, wrapped by hand.",
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const params = await searchParams;
  const raw = Array.isArray(params.c) ? params.c[0] : params.c;
  const initialCategory = categories.some((c) => c.id === raw)
    ? (raw as CategoryId)
    : undefined;

  return <ShopClient initialCategory={initialCategory} />;
}
