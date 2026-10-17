import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import Reveal from "@/components/Reveal";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return { title: "Piece not found" };
  return {
    title: product.name,
    description: product.tagline,
    openGraph: { title: product.name, description: product.tagline },
  };
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = [
    ...products.filter((p) => p.category === product.category && p.slug !== product.slug),
    ...products.filter((p) => p.category !== product.category),
  ].slice(0, 4);

  return (
    <>
      <ProductDetail product={product} />

      <section className="mx-auto mt-24 max-w-[1400px] px-5 sm:px-8">
        <div className="flex items-end justify-between border-t border-line pt-8">
          <h2 className="display text-[clamp(1.7rem,3vw,2.4rem)]">Pairs well with</h2>
          <span className="text-[11px] tracking-[0.16em] uppercase text-ink-soft">
            Four suggestions
          </span>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
