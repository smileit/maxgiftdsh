import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { familyName } from "@/lib/catalog";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            className="img-zoom object-cover"
          />

          <span className="absolute left-4 top-4 rounded-full bg-cream/85 px-3 py-1 text-[10px] tracking-[0.16em] uppercase text-ink backdrop-blur-sm">
            {familyName(product.family)}
          </span>

          <div className="absolute inset-x-3 bottom-3 translate-y-[130%] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <span className="flex w-full items-center justify-between rounded-full bg-cream/92 px-5 py-3 text-[10px] tracking-[0.18em] uppercase backdrop-blur">
              View specs
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[15px] leading-tight font-medium">{product.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">{product.blurb}</p>
          </div>
          <span className="shrink-0 text-[10px] tracking-[0.12em] text-ink-soft tabular-nums">
            {product.code}
          </span>
        </div>
      </Link>
    </article>
  );
}
