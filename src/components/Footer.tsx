import Link from "next/link";
import { connection } from "next/server";
import { company, families } from "@/lib/catalog";
import { listProducts } from "@/lib/db";

// Evaluated once per build rather than during render (Next's unstable-value rule).
const YEAR = new Date().getFullYear();

export default async function Footer() {
  await connection();
  const products = listProducts();
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div>
            <p className="footer__brand">MAXGIFT PRO</p>
            <p className="footer__copy">
              A Shenzhen packaging manufacturer making custom reusable bags: non-woven, woven,
              insulated, cotton and jute. One factory, eight product lines, in-house printing.
            </p>

            <div className="footer__contact">
              <span>{company.address}</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{company.phone}</span>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
          </div>

          <div className="footer__cols">
            <div>
              <p>Product lines</p>
              <ul>
                {products.slice(0, 5).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`}>{p.title}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/products">All products</Link>
                </li>
              </ul>
            </div>

            <div>
              <p>Materials</p>
              <ul>
                {families.map((f) => (
                  <li key={f.id}>
                    <Link href={`/products?family=${f.id}`}>{f.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p>Company</p>
              <ul>
                <li>
                  <Link href="/#capabilities">Capabilities</Link>
                </li>
                <li>
                  <Link href="/#factory">The factory</Link>
                </li>
                <li>
                  <Link href="/#process">How it works</Link>
                </li>
                <li>
                  <Link href="/#faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/contact">Request a quote</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p style={{ margin: 0 }}>
            漏 {YEAR} {company.name}. All rights reserved.
          </p>
          <p style={{ margin: 0, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {company.port} 路 Worldwide shipping
          </p>
        </div>
      </div>
    </footer>
  );
}