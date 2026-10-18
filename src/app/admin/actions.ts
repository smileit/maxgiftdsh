"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Family } from "@/lib/catalog";
import { isAdmin, signIn, signOut } from "@/lib/auth";
import {
  createProduct,
  deleteProduct,
  moveProduct,
  setPublished,
  slugExists,
  updateProduct,
  type ProductInput,
} from "@/lib/db";

function revalidateAll() {
  revalidatePath("/", "layout");
}

/* ---------------- auth ---------------- */

export async function loginAction(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");
  const ok = await signIn(password);
  if (!ok) return { error: "Wrong password. Try again." };
  redirect("/admin");
}

export async function logoutAction() {
  await signOut();
  redirect("/admin/login");
}

/* ---------------- products ---------------- */

function parseJsonArray<T>(raw: FormDataEntryValue | null, fallback: T[]): T[] {
  if (typeof raw !== "string" || !raw.trim()) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function readInput(formData: FormData): ProductInput {
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return {
    slug,
    title: String(formData.get("title") ?? "").trim(),
    code: String(formData.get("code") ?? "").trim(),
    family: (String(formData.get("family") ?? "non-woven") as Family) ?? "non-woven",
    blurb: String(formData.get("blurb") ?? "").trim(),
    intro: String(formData.get("intro") ?? "")
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
    images: parseJsonArray<string>(formData.get("imagesJson"), []),
    specs: parseJsonArray<{ label: string; value: string }>(formData.get("specsJson"), []).filter(
      (s) => s && String(s.label).trim(),
    ),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };
}

export async function saveProductAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");

  const idRaw = String(formData.get("id") ?? "");
  const id = idRaw ? Number(idRaw) : null;
  const input = readInput(formData);

  if (!input.title || !input.slug) {
    redirect(`/admin/products/${id ?? "new"}?error=missing`);
  }
  if (slugExists(input.slug, id ?? undefined)) {
    redirect(`/admin/products/${id ?? "new"}?error=slug`);
  }

  if (id) {
    updateProduct(id, input);
  } else {
    createProduct(input);
  }

  revalidateAll();
  redirect("/admin?saved=1");
}

export async function deleteProductAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const id = Number(formData.get("id"));
  if (Number.isFinite(id)) deleteProduct(id);
  revalidateAll();
  redirect("/admin?deleted=1");
}

export async function togglePublishedAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const id = Number(formData.get("id"));
  const next = formData.get("next") === "1";
  if (Number.isFinite(id)) setPublished(id, next);
  revalidateAll();
  redirect("/admin");
}

export async function moveProductAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const id = Number(formData.get("id"));
  const dir = Number(formData.get("dir"));
  if (Number.isFinite(id) && (dir === -1 || dir === 1)) moveProduct(id, dir as -1 | 1);
  revalidateAll();
  redirect("/admin");
}
