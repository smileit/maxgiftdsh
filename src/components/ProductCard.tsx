"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatPrice, getCategory } from "@/lib/products";
import ProductArt from "./ProductArt";
import { useCart } from "./cart";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const category = getCategory(product.category);

  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="block focus:outline-none">
        <div
          className="relative aspect-4/5 overflow-hidden rounded-xs"
          style={{ backgroundColor: product.tint, color: product.ink }}
        >
          {product.badge ? (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-cream/85 px-3 py-1 text-[10px] tracking-[0.16em] uppercase text-ink backdrop-blur-sm">
              {product.badge}
            </span>
          ) : null}

          <span className="absolute right-4 top-4 z-10 text-[10px] tracking-[0.16em] uppercase text-ink/45">
            {category?.name}
          </span>

          <ProductArt
            kind={product.art}
            className="art-hover absolute inset-0 h-full w-full p-10 sm:p-12"
          />

          {/* quick add */}
          <div className="absolute inset-x-3 bottom-3 z-10 translate-y-[130%] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                add(
                  {
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    colorway: product.colorway,
                    art: product.art,
                    tint: product.tint,
                    ink: product.ink,
                  },
                  1,
                );
                setAdded(true);
                setTimeout(() => setAdded(false), 1400);
              }}
              className="w-full rounded-full bg-ink/90 py-3 text-[10px] tracking-[0.2em] uppercase text-cream backdrop-blur transition hover:bg-clay"
            >
              {added ? "Added ✓" : "Quick add"}
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[15px] leading-tight font-medium">{product.name}</h3>
            <p className="mt-1 text-xs text-ink-soft">{product.tagline}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-sm tabular-nums">{formatPrice(product.price)}</p>
            {product.compareAt ? (
              <p className="text-[11px] text-ink-soft line-through tabular-nums">
                {formatPrice(product.compareAt)}
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
