import Link from "next/link";
import { company, families, products } from "@/lib/catalog";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-moss-deep text-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <p className="display text-3xl tracking-[0.14em]">MAXGIFT</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
              A Shenzhen packaging manufacturer making custom reusable bags: non-woven, woven,
              insulated, cotton and jute. One factory, eight product lines, in-house printing.
            </p>

            <div className="mt-8 space-y-2 text-sm text-cream/75">
              <p>{company.address}</p>
              <p className="tabular-nums">{company.phone}</p>
              <a
                href={`mailto:${company.email}`}
                className="inline-block border-b border-cream/30 pb-0.5 transition hover:border-cream"
              >
                {company.email}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="eyebrow text-cream/50">Product lines</p>
              <ul className="mt-4 space-y-2.5">
                {products.slice(0, 5).map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="text-sm text-cream/70 transition hover:text-cream"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-cream/50">Materials</p>
              <ul className="mt-4 space-y-2.5">
                {families.map((f) => (
                  <li key={f.id}>
                    <Link
                      href={`/products?family=${f.id}`}
                      className="text-sm text-cream/70 transition hover:text-cream"
                    >
                      {f.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-cream/50">Company</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  { href: "/#about", label: "About us" },
                  { href: "/#factory", label: "The factory" },
                  { href: "/products", label: "All products" },
                  { href: "/contact", label: "Request a quote" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-cream/70 transition hover:text-cream">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-6 text-[11px] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="tracking-[0.14em] uppercase">{company.port} · Worldwide shipping</p>
        </div>
      </div>
    </footer>
  );
}
