import type { Metadata } from "next";
export const instant = false;
import Image from "next/image";
import Link from "next/link";
import { deleteProductAction, logoutAction, moveProductAction, togglePublishedAction } from "./actions";
import { requireAdmin } from "@/lib/auth";
import { familyName } from "@/lib/catalog";
import { listProducts } from "@/lib/db";

export const metadata: Metadata = { title: "Catalogue admin", robots: { index: false } };

export default async function AdminPage() {
  await requireAdmin();
  const products = listProducts({ includeDrafts: true });

  return (
    <div className="admin-shell admin-shell--wide">
      <header className="admin-top">
        <div>
          <p className="eyebrow eyebrow--plain">Maxgift Pro</p>
          <h1 className="display h3" style={{ marginTop: 8 }}>
            Catalogue
          </h1>
        </div>
        <div className="admin-top__actions">
          <Link href="/" className="btn btn--outline btn--sm">
            View site
          </Link>
          <Link href="/admin/products/new" className="btn btn--solid btn--sm">
            + New product
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="admin-link">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <p className="admin-hint">
        {products.length} {products.length === 1 ? "product" : "products"} · {products.filter((p) => p.published).length}{" "}
        published. Order here is the order on the site.
      </p>

      <div className="admin-list">
        {products.map((p, i) => (
          <div className="admin-row" key={p.id}>
            <div className="admin-row__thumb">
              {p.images[0] ? (
                <Image src={p.images[0]} alt="" width={96} height={96} className="object-cover" />
              ) : (
                <span className="admin-row__empty">no image</span>
              )}
            </div>

            <div className="admin-row__main">
              <p className="admin-row__title">
                {p.title}
                {p.featured ? <span className="admin-badge">homepage</span> : null}
                {!p.published ? <span className="admin-badge admin-badge--draft">draft</span> : null}
              </p>
              <p className="admin-row__meta">
                /{p.slug} · {p.code || "no code"} · {familyName(p.family)} · {p.images.length} imgs
              </p>
            </div>

            <div className="admin-row__actions">
              <form action={moveProductAction}>
                <input type="hidden" name="id" value={p.id} />
                <input type="hidden" name="dir" value={-1} />
                <button type="submit" disabled={i === 0} aria-label="Move up">
                  ↑
                </button>
              </form>
              <form action={moveProductAction}>
                <input type="hidden" name="id" value={p.id} />
                <input type="hidden" name="dir" value={1} />
                <button type="submit" disabled={i === products.length - 1} aria-label="Move down">
                  ↓
                </button>
              </form>

              <form action={togglePublishedAction}>
                <input type="hidden" name="id" value={p.id} />
                <input type="hidden" name="next" value={p.published ? 0 : 1} />
                <button type="submit">{p.published ? "Unpublish" : "Publish"}</button>
              </form>

              <Link href={`/admin/products/${p.id}`} className="admin-link">
                Edit
              </Link>

              <form action={deleteProductAction}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" className="admin-link admin-link--danger">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}

        {products.length === 0 ? (
          <p style={{ padding: "40px 0", color: "var(--color-ink-soft)" }}>
            No products yet. <Link href="/admin/products/new">Create the first one</Link>.
          </p>
        ) : null}
      </div>
    </div>
  );
}
