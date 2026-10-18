import type { Metadata } from "next";
export const instant = false;
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/auth";
import { getProductById } from "@/lib/db";

export const metadata: Metadata = { title: "Edit product", robots: { index: false } };

export default async function EditProductPage(props: PageProps<"/admin/products/[id]">) {
  await requireAdmin();
  const { id } = await props.params;
  const product = getProductById(Number(id));
  if (!product) notFound();

  return (
    <div className="admin-shell admin-shell--wide">
      <header className="admin-top">
        <div>
          <Link href="/admin" className="admin-link">
            ← Catalogue
          </Link>
          <h1 className="display h3" style={{ marginTop: 8 }}>
            {product.title}
          </h1>
        </div>
        <div className="admin-top__actions">
          <Link href={`/products/${product.slug}`} className="btn btn--outline btn--sm">
            View on site
          </Link>
        </div>
      </header>

      <ProductForm product={product} />
    </div>
  );
}
