import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { familyName } from "@/lib/catalog";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="pcard">
      <Link href={`/products/${product.slug}`} className="pcard__media" aria-label={product.title}>
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 900px) 50vw, 25vw"
          className="object-cover"
        />
        <span className="pcard__chip">{familyName(product.family)}</span>
        <span className="pcard__hover">
          View specs
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>

      <div className="pcard__meta">
        <div>
          <h3 className="pcard__title">
            <Link href={`/products/${product.slug}`}>{product.title}</Link>
          </h3>
          <p className="pcard__blurb">{product.blurb}</p>
        </div>
        <span className="pcard__code">{product.code}</span>
      </div>
    </article>
  );
}
