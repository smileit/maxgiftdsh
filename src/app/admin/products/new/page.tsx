import type { Metadata } from "next";
export const instant = false;
import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "New product", robots: { index: false } };

export default async function NewProductPage() {
  await requireAdmin();

  return (
    <div className="admin-shell admin-shell--wide">
      <header className="admin-top">
        <div>
          <Link href="/admin" className="admin-link">
            ← Catalogue
          </Link>
          <h1 className="display h3" style={{ marginTop: 8 }}>
            New product
          </h1>
        </div>
      </header>

      <ProductForm />
    </div>
  );
}
