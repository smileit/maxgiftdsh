"use client";

import { useMemo, useState } from "react";
import type { Family } from "@/lib/catalog";
import { families, products } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export default function ProductsClient({ initialFamily }: { initialFamily?: Family }) {
  const [family, setFamily] = useState<Family | "all">(initialFamily ?? "all");

  const list = useMemo(
    () => (family === "all" ? products : products.filter((p) => p.family === family)),
    [family],
  );

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pt-12 sm:px-8">
        <div className="flex flex-col gap-6 border-b border-line pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-ink-soft">The catalogue</p>
            <h1 className="display mt-4 text-[clamp(2.4rem,5vw,4rem)]">Custom bags, by material.</h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
              Every line is built to your dimensions, colour and artwork. The specs below are the
              standard build — change anything.
            </p>
          </div>
          <p className="text-[11px] tracking-[0.16em] uppercase text-ink-soft">
            {list.length} {list.length === 1 ? "line" : "lines"}
          </p>
        </div>

        <div className="sticky top-[104px] z-20 -mx-5 mt-6 border-b border-line/70 bg-paper/85 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            <button
              onClick={() => setFamily("all")}
              className={`shrink-0 rounded-full border px-4 py-2 text-[11px] tracking-[0.12em] uppercase transition ${
                family === "all"
                  ? "border-ink bg-ink text-cream"
                  : "border-line text-ink-soft hover:border-ink/40 hover:text-ink"
              }`}
            >
              All
            </button>
            {families.map((f) => (
              <button
                key={f.id}
                onClick={() => setFamily(f.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[11px] tracking-[0.12em] uppercase transition ${
                  family === f.id
                    ? "border-ink bg-ink text-cream"
                    : "border-line text-ink-soft hover:border-ink/40 hover:text-ink"
                }`}
              >
                {f.name}
              </button>
            ))}
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
            Nothing in this material family yet — try another.
          </p>
        ) : null}
      </section>
    </>
  );
}
