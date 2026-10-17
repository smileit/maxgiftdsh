import Link from "next/link";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Newsletter from "@/components/Newsletter";
import { bestsellers, categories, formatPrice, getProduct, products } from "@/lib/products";

const pillar = [
  {
    title: "Made by people we know",
    body: "Nine makers across six countries. We visit, we order small, we pay on time.",
  },
  {
    title: "Wrapped, not bagged",
    body: "Every order is wrapped by hand in unbleached tissue, with a card you can write on.",
  },
  {
    title: "Kept, not discarded",
    body: "Refillable vessels, repairable hardware, packaging that survives the next move.",
  },
];

const quotes = [
  {
    quote:
      "I have bought the Atlas Box four times now. Each recipient has asked where it came from — which is the whole point.",
    name: "Clara M.",
    meta: "Verified buyer · Copenhagen",
  },
  {
    quote:
      "The candle smells like a room I want to live in. It replaced three others on my shelf.",
    name: "Tomás R.",
    meta: "Verified buyer · Lisbon",
  },
  {
    quote:
      "Ordered on Tuesday, arrived Thursday, wrapped better than anything I have bought in a shop.",
    name: "Priya N.",
    meta: "Verified buyer · Toronto",
  },
];

export default function Home() {
  const feature = getProduct("lumen-desk-lamp")!;
  const bestsellersList = bestsellers.map((slug) => getProduct(slug)!).filter(Boolean);

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.03fr_1fr] lg:gap-16 lg:pb-24 lg:pt-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-ink/30" />
              <p className="eyebrow text-ink-soft">The winter edit — 2026</p>
            </div>

            <h1 className="display mt-6 text-[clamp(2.8rem,6.2vw,5.2rem)]">
              Gifts that <span className="text-clay italic">earn</span>
              <br />
              their keep.
            </h1>

            <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-ink-soft">
              A small studio catalogue of objects worth giving twice: hand-poured candles, a throw
              woven on a century-old loom, copper coffee kit, paper goods made to be filled in. No
              novelty, no filler.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-[11px] tracking-[0.18em] uppercase text-cream transition-colors hover:bg-clay"
              >
                Shop the collection
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
              </Link>
              <Link
                href="/shop?c=gift-sets"
                className="rounded-full border border-ink/20 px-7 py-4 text-[11px] tracking-[0.18em] uppercase transition-colors hover:border-ink"
              >
                Gift finder
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-6">
              {[
                { k: "4.9/5", v: "1,842 reviews" },
                { k: "24h", v: "Dispatch window" },
                { k: "30 days", v: "Returns, no fuss" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="display text-2xl leading-none">{s.k}</dt>
                  <dd className="mt-1.5 text-[11px] tracking-wide text-ink-soft">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Reveal className="relative">
            <div
              className="grain relative aspect-[4/5] overflow-hidden rounded-[3px]"
              style={{ backgroundColor: "#efe4d3", color: "#8d3d20" }}
            >
              <ProductArt kind="box" className="absolute inset-0 h-full w-full p-8 sm:p-12" />
              <span className="absolute left-5 top-5 rounded-full bg-cream/80 px-3 py-1 text-[10px] tracking-[0.18em] uppercase backdrop-blur-sm">
                Best seller
              </span>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase opacity-70">No. 01</p>
                  <p className="display mt-1 text-2xl leading-none">The Atlas Box</p>
                </div>
                <span className="rounded-full bg-cream/85 px-4 py-2 text-[11px] tabular-nums backdrop-blur-sm">
                  {formatPrice(148)}
                </span>
              </div>
            </div>

            <div className="absolute -left-5 -top-5 hidden -rotate-6 rounded-full border border-ink/15 bg-cream px-4 py-2 text-[10px] tracking-[0.18em] uppercase shadow-sm lg:block">
              Wrapped by hand
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- categories ---------------- */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex items-end justify-between gap-6 border-t border-line pt-8">
          <p className="eyebrow text-ink-soft">Shop by room</p>
          <Link href="/shop" className="text-[11px] tracking-[0.16em] uppercase underline-grow">
            All {products.length} pieces
          </Link>
        </div>

        <div className="mt-6 grid gap-px overflow-hidden rounded-[3px] bg-line sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const count = products.filter((p) => p.category === cat.id).length;
            return (
              <Reveal key={cat.id} delay={i * 70} className="h-full">
                <Link
                  href={`/shop?c=${cat.id}`}
                  className="group flex h-full flex-col justify-between bg-cream p-6 transition-colors duration-500 hover:bg-paper"
                >
                  <span className="text-[10px] tracking-[0.2em] text-ink-soft">{cat.note}</span>
                  <div className="mt-10">
                    <p className="display text-2xl">{cat.name}</p>
                    <p className="mt-2 text-xs text-ink-soft">{cat.blurb}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between text-[11px] text-ink-soft">
                    <span>
                      {count} {count === 1 ? "piece" : "pieces"}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    >
                      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- bestsellers ---------------- */}
      <section className="mx-auto mt-24 max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-ink-soft">Most gifted</p>
            <h2 className="display mt-3 text-[clamp(2rem,3.6vw,3rem)]">The ones that keep selling</h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase underline-grow"
          >
            View all
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {bestsellersList.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- story ---------------- */}
      <section id="story" className="mt-24 bg-ink py-20 text-cream sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr]">
            <Reveal>
              <p className="eyebrow text-cream/50">The studio</p>
              <p className="display mt-6 text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.08]">
                We started in a two-room flat with{" "}
                <span className="text-[#d99a6c] italic">one candle</span> and a list of nine makers we
                trusted. That list is still the whole catalogue.
              </p>
              <p className="mt-8 max-w-lg text-sm leading-relaxed text-cream/60">
                Everything is bought in small runs, checked by hand, and wrapped in the same room it
                ships from. When something sells out, we wait for the next batch rather than find a
                cheaper factory.
              </p>
              <Link
                href="/shop"
                className="mt-10 inline-flex items-center gap-3 rounded-full border border-cream/25 px-7 py-4 text-[11px] tracking-[0.18em] uppercase transition-colors hover:border-cream"
              >
                See what we make
              </Link>
            </Reveal>

            <div className="grid gap-px overflow-hidden rounded-[3px] bg-cream/15">
              {pillar.map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <div className="bg-ink p-7">
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-medium">{p.title}</p>
                      <span className="text-[10px] tracking-[0.2em] text-cream/35">0{i + 1}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-cream/55">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- feature ---------------- */}
      <section className="mx-auto mt-24 max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div
              className="grain relative aspect-square overflow-hidden rounded-[3px]"
              style={{ backgroundColor: feature.tint, color: feature.ink }}
            >
              <ProductArt kind={feature.art} className="absolute inset-0 h-full w-full p-14 sm:p-20" />
              <span className="absolute right-5 top-5 text-[10px] tracking-[0.2em] uppercase opacity-60">
                New in
              </span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <p className="eyebrow text-ink-soft">Field notes</p>
            <h2 className="display mt-4 text-[clamp(2rem,3.4vw,2.9rem)]">{feature.name}</h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-soft">
              {feature.description}
            </p>

            <ul className="mt-8 divide-y divide-line border-y border-line">
              {feature.details.map((d) => (
                <li key={d} className="flex items-start gap-3 py-3 text-sm text-ink-soft">
                  <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-clay" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href={`/product/${feature.slug}`}
                className="rounded-full bg-ink px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase text-cream transition hover:bg-clay"
              >
                {formatPrice(feature.price)} — View piece
              </Link>
              <span className="text-[11px] text-ink-soft">
                {feature.rating} ★ · {feature.reviews} reviews
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- testimonials ---------------- */}
      <section className="mx-auto mt-24 max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-px overflow-hidden rounded-[3px] bg-line md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 80} className="h-full">
              <figure className="flex h-full flex-col justify-between bg-cream p-7">
                <blockquote className="text-[15px] leading-relaxed text-ink">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8">
                  <p className="text-xs font-medium">{q.name}</p>
                  <p className="mt-1 text-[11px] text-ink-soft">{q.meta}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- newsletter ---------------- */}
      <section className="mx-auto mt-24 max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-center gap-10 rounded-[3px] bg-sand/70 px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr_1fr] lg:py-16">
          <div>
            <p className="eyebrow text-ink-soft">The letter</p>
            <h2 className="display mt-3 text-[clamp(1.8rem,3vw,2.5rem)]">
              New pieces land here first.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
              One email a month: what the makers just finished, what came back in stock, and one
              genuinely useful piece of gifting advice.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Newsletter />
          </div>
        </div>
      </section>
    </>
  );
}
