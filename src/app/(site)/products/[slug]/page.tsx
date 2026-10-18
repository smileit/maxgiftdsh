import type { Metadata } from "next";

export const instant = false;
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import Reveal from "@/components/Reveal";
import { company, customisation, familyName } from "@/lib/catalog";
import { getProductBySlug, listProducts } from "@/lib/db";

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  await connection();
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.title,
    description: `${product.blurb}. Model ${product.code}. Custom sizes, colours and artwork — FOB Ningbo.`,
    openGraph: { title: `${product.title} · Maxgift Pro`, description: product.blurb },
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  await connection();
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product || !product.published) notFound();

  const products = listProducts();
  const same = products.filter((p) => p.slug !== product.slug && p.family === product.family);
  const rest = products.filter((p) => p.slug !== product.slug);
  const related = (same.length >= 2 ? same : rest).slice(0, 4);

  return (
    <>
      <section className="pdp">
        <div className="shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/products">Products</Link>
            <span>/</span>
            <span style={{ color: "var(--color-ink)" }}>{product.title}</span>
          </nav>

          <div className="pdp__grid">
            <div className="pdp__gallery">
              <ProductGallery images={product.images} alt={product.title} />
            </div>

            <div>
              <p className="eyebrow">{familyName(product.family)}</p>
              <h1 className="display h2 pdp__title">{product.title}</h1>
              <p className="pdp__blurb">{product.blurb}</p>

              <dl className="pdp__facts">
                <div className="pdp__fact">
                  <dt>Model</dt>
                  <dd>{product.code}</dd>
                </div>
                <div className="pdp__fact">
                  <dt>Material</dt>
                  <dd>{product.specs.find((s) => s.label === "Material")?.value ?? "Custom"}</dd>
                </div>
                <div className="pdp__fact">
                  <dt>Trade term</dt>
                  <dd>{company.port}</dd>
                </div>
              </dl>

              <div className="pdp__body" style={{ marginTop: 22 }}>
                {product.intro.map((para) => (
                  <p key={para.slice(0, 20)}>{para}</p>
                ))}
              </div>

              <div className="pdp__actions">
                <Link href={`/contact?product=${product.slug}`} className="btn btn--solid">
                  Request a quote
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a
                  className="btn btn--outline"
                  href={`mailto:${company.email}?subject=${encodeURIComponent(
                    `Enquiry: ${product.title} (${product.code})`,
                  )}`}
                >
                  Email us
                </a>
              </div>

              <div style={{ marginTop: 26 }}>
                <p className="eyebrow eyebrow--plain" style={{ marginBottom: 10 }}>
                  Specification
                </p>
                <dl className="specs">
                  {product.specs.map((s) => (
                    <div className="specs__row" key={s.label}>
                      <dt>{s.label}</dt>
                      <dd>{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="accordion">
                <details>
                  <summary>Customisation</summary>
                  <ul>
                    {customisation.map((c) => (
                      <li key={c.title}>
                        <strong style={{ color: "var(--color-ink)" }}>{c.title}:</strong> {c.body}
                      </li>
                    ))}
                  </ul>
                </details>
                <details>
                  <summary>Sampling &amp; production</summary>
                  <p>
                    We cut a physical pre-production sample before any run so you can check the
                    material, print and stitching. Production starts once that sample is approved in
                    writing.
                  </p>
                </details>
                <details>
                  <summary>Shipping</summary>
                  <p>
                    {company.port} as standard, or we hand the goods to the forwarder you already
                    use. Cartons are labelled to your specification.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Also consider</p>
              <h2 className="display h3" style={{ marginTop: 12 }}>
                Other lines for the same job
              </h2>
            </div>
            <Link href="/products" className="link-arrow">
              All products
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid-products">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
