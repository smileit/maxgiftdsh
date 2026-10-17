"use client";

import { useMemo, useState } from "react";
import type { CategoryId } from "@/lib/products";
import { categories, products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

const sorts: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Best rated" },
];

export default function ShopClient({ initialCategory }: { initialCategory?: CategoryId }) {
  const [category, setCategory] = useState<CategoryId | "all">(initialCategory ?? "all");
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    const filtered =
      category === "all" ? [...products] : products.filter((p) => p.category === category);

    switch (sort) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [category, sort]);

  const activeLabel =
    category === "all" ? "All pieces" : (categories.find((c) => c.id === category)?.name ?? "All");

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pt-10 sm:px-8">
        <div className="flex flex-col gap-6 border-b border-line pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-ink-soft">The catalogue</p>
            <h1 className="display mt-4 text-[clamp(2.4rem,5vw,4rem)]">Everything, considered.</h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
              Eight pieces, nine makers, one standard. If we would not keep it in our own homes, it
              does not go in the shop.
            </p>
          </div>
          <p className="text-[11px] tracking-[0.16em] uppercase text-ink-soft">
            {list.length} {list.length === 1 ? "piece" : "pieces"} · {activeLabel}
          </p>
        </div>

        {/* filters */}
        <div className="sticky top-[104px] z-20 -mx-5 mt-6 border-b border-line/70 bg-paper/85 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              <button
                onClick={() => setCategory("all")}
                className={`shrink-0 rounded-full border px-4 py-2 text-[11px] tracking-[0.12em] uppercase transition ${
                  category === "all"
                    ? "border-ink bg-ink text-cream"
                    : "border-line text-ink-soft hover:border-ink/40 hover:text-ink"
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-[11px] tracking-[0.12em] uppercase transition ${
                    category === c.id
                      ? "border-ink bg-ink text-cream"
                      : "border-line text-ink-soft hover:border-ink/40 hover:text-ink"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-ink-soft">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border border-line bg-transparent px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-ink focus:border-ink focus:outline-none"
              >
                {sorts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="py-24 text-center text-sm text-ink-soft">
            Nothing in this room yet — try another category.
          </p>
        ) : null}
      </section>
    </>
  );
}
