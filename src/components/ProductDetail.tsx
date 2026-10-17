"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatPrice, getCategory } from "@/lib/products";
import ProductArt from "./ProductArt";
import { useCart } from "./cart";

const views = [
  { label: "Front", bg: "#f1e9da", scale: 1, rotate: 0 },
  { label: "Angle", bg: "#e9e1d1", scale: 1.14, rotate: -7 },
  { label: "Detail", bg: "#efe6d8", scale: 1.42, rotate: 3 },
];

const accordion = [
  {
    title: "Details",
    body: (p: Product) => (
      <ul className="space-y-2">
        {p.details.map((d) => (
          <li key={d} className="flex items-start gap-3">
            <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-clay" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Materials & care",
    body: (p: Product) => <p>{p.materials}. Wipe clean with a soft dry cloth; avoid prolonged direct sun.</p>,
  },
  {
    title: "Shipping & returns",
    body: () => (
      <p>
        Dispatched within 24 hours from Lisbon. Free shipping over $120, otherwise $9 flat.
        30-day returns on unused pieces — we pay the return label.
      </p>
    ),
  },
];

export default function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [view, setView] = useState(0);
  const [qty, setQty] = useState(1);
  const [wrap, setWrap] = useState(true);
  const [open, setOpen] = useState<string | null>("Details");
  const category = getCategory(product.category);

  const item = {
    slug: product.slug,
    name: product.name,
    price: product.price,
    colorway: product.colorway,
    art: product.art,
    tint: product.tint,
    ink: product.ink,
  };

  return (
    <section className="mx-auto max-w-[1400px] px-5 pt-8 sm:px-8">
      <nav className="flex items-center gap-2 text-[11px] tracking-wide text-ink-soft">
        <span>Shop</span>
        <span aria-hidden>/</span>
        <span>{category?.name}</span>
        <span aria-hidden>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* gallery */}
        <div>
          <div
            className="grain relative aspect-[4/5] overflow-hidden rounded-[3px] transition-colors duration-700"
            style={{ backgroundColor: views[view].bg, color: product.ink }}
          >
            <ProductArt
              kind={product.art}
              className="absolute inset-0 h-full w-full p-10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-16"
            />
            {product.badge ? (
              <span className="absolute left-5 top-5 rounded-full bg-cream/80 px-3 py-1 text-[10px] tracking-[0.18em] uppercase backdrop-blur-sm">
                {product.badge}
              </span>
            ) : null}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {views.map((v, i) => (
              <button
                key={v.label}
                onClick={() => setView(i)}
                aria-label={`View ${v.label}`}
                aria-pressed={view === i}
                className={`relative aspect-square overflow-hidden rounded-[2px] border transition ${
                  view === i ? "border-ink" : "border-transparent hover:border-line"
                }`}
                style={{ backgroundColor: v.bg, color: product.ink }}
              >
                <ProductArt kind={product.art} className="absolute inset-0 h-full w-full p-4" />
                <span className="absolute bottom-1.5 left-2 text-[9px] tracking-[0.14em] uppercase opacity-50">
                  {v.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* buy box */}
        <div className="lg:pt-2">
          <p className="eyebrow text-ink-soft">{category?.name}</p>
          <h1 className="display mt-3 text-[clamp(2.2rem,4.4vw,3.4rem)]">{product.name}</h1>
          <p className="mt-3 text-[15px] text-ink-soft">{product.tagline}</p>

          <div className="mt-4 flex items-center gap-3 text-[11px] text-ink-soft">
            <span className="text-clay">
              {"★".repeat(Math.round(product.rating))}
              <span className="text-line">{"★".repeat(5 - Math.round(product.rating))}</span>
            </span>
            <span>
              {product.rating} · {product.reviews} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="display text-3xl tabular-nums">{formatPrice(product.price)}</span>
            {product.compareAt ? (
              <span className="text-sm text-ink-soft line-through tabular-nums">
                {formatPrice(product.compareAt)}
              </span>
            ) : null}
          </div>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink-soft">{product.description}</p>

          {/* colorway */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-[11px] tracking-[0.12em] uppercase">
              <span className="text-ink-soft">Colourway</span>
              <span className="text-ink">{product.colorway}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <span
                className="h-8 w-8 rounded-full border border-ink/30 ring-1 ring-ink/20 ring-offset-2 ring-offset-paper"
                style={{ backgroundColor: product.tint }}
                aria-label={product.colorway}
              />
              <span className="grid h-8 place-items-center rounded-full border border-line px-3 text-[10px] tracking-[0.12em] text-ink-soft">
                One colourway only
              </span>
            </div>
          </div>

          {/* gift wrap */}
          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-[3px] border border-line bg-cream/60 p-4">
            <input
              type="checkbox"
              checked={wrap}
              onChange={(e) => setWrap(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#b0502c]"
            />
            <span>
              <span className="block text-sm">Add hand-wrapping & a written card</span>
              <span className="mt-0.5 block text-[11px] text-ink-soft">
                Complimentary — tissue, cotton ribbon, blank letterpress card.
              </span>
            </span>
          </label>

          {/* qty + add */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center justify-between rounded-full border border-line px-2 sm:w-32">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-11 w-9 place-items-center text-ink-soft transition hover:text-ink"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="text-sm tabular-nums">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(9, q + 1))}
                className="grid h-11 w-9 place-items-center text-ink-soft transition hover:text-ink"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={() => add(item, qty)}
              className="group flex flex-1 items-center justify-center gap-3 rounded-full bg-ink py-4 text-[11px] tracking-[0.18em] uppercase text-cream transition hover:bg-clay"
            >
              Add to bag — {formatPrice(product.price * qty)}
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <ul className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-4 text-[11px] text-ink-soft">
            {[
              { t: "Ships in 24h", s: "Tracked worldwide" },
              { t: "Free over $120", s: "$9 flat otherwise" },
              { t: "30-day returns", s: "Label included" },
            ].map((f) => (
              <li key={f.t}>
                <p className="text-ink">{f.t}</p>
                <p className="mt-0.5">{f.s}</p>
              </li>
            ))}
          </ul>

          {/* accordion */}
          <div className="mt-2">
            {accordion.map((row) => {
              const isOpen = open === row.title;
              return (
                <div key={row.title} className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : row.title)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-4 text-left text-sm"
                  >
                    {row.title}
                    <span
                      className={`text-ink-soft transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-5 text-sm leading-relaxed text-ink-soft">
                        {row.body(product)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
