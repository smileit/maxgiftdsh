import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import Reveal from "@/components/Reveal";
import { company, familyName, getProduct, products } from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.title,
    description: `${product.blurb}. Model ${product.code}. Custom sizes, colours and artwork — FOB Ningbo.`,
    openGraph: { title: `${product.title} · Maxgift`, description: product.blurb },
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug && p.family === product.family);
  const fallback = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const suggestions = (related.length >= 2 ? related : fallback).slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pt-8 sm:px-8">
        <nav className="flex items-center gap-2 text-[11px] tracking-wide text-ink-soft">
          <Link href="/products" className="hover:text-ink">
            Products
          </Link>
          <span aria-hidden>/</span>
          <span>{familyName(product.family)}</span>
          <span aria-hidden>/</span>
          <span className="text-ink">{product.title}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <ProductGallery images={product.images} alt={product.title} />

          <div className="lg:pt-2">
            <p className="eyebrow text-ink-soft">{familyName(product.family)}</p>
            <h1 className="display mt-3 text-[clamp(2.2rem,4.4vw,3.4rem)]">{product.title}</h1>
            <p className="mt-3 text-[15px] text-ink-soft">{product.blurb}</p>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
              {product.intro.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>

            {/* specs */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-ink">Specification</p>
                <span className="text-[10px] tracking-[0.14em] uppercase text-ink-soft tabular-nums">
                  {product.code}
                </span>
              </div>
              <dl className="mt-4 divide-y divide-line border-y border-line">
                {product.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-[110px_1fr] gap-4 py-3 text-sm">
                    <dt className="text-ink-soft">{s.label}</dt>
                    <dd className="text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* cta */}
            <div className="mt-8 rounded-[3px] border border-line bg-cream/70 p-5">
              <p className="text-sm font-medium">Need this in your own size and colour?</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                Send the quantity and artwork file — we reply with material advice, unit price and a
                sample timeline.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Link
                  href={`/contact?product=${product.slug}`}
                  className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-[11px] tracking-[0.18em] uppercase text-cream transition hover:bg-moss"
                >
                  Request a quote
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
                <a
                  href={`mailto:${company.email}?subject=Enquiry: ${encodeURIComponent(product.title)} (${product.code})`}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-ink/20 py-3.5 text-[11px] tracking-[0.18em] uppercase transition hover:border-ink"
                >
                  Email us
                </a>
              </div>
            </div>

            <ul className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-4 text-[11px] text-ink-soft">
              {[
                { t: "Samples first", s: "Before any run" },
                { t: company.port, s: "Consolidation" },
                { t: "Custom artwork", s: "JPG · PDF · AI · EPS" },
              ].map((f) => (
                <li key={f.t}>
                  <p className="text-ink">{f.t}</p>
                  <p className="mt-0.5">{f.s}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-5 sm:px-8">
        <div className="flex items-end justify-between border-t border-line pt-8">
          <h2 className="display text-[clamp(1.7rem,3vw,2.4rem)]">Other lines to consider</h2>
          <Link href="/products" className="text-[11px] tracking-[0.16em] uppercase underline-grow">
            All products
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {suggestions.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
