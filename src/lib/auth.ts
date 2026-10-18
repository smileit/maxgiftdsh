import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "mg_admin";

/** Set ADMIN_PASSWORD in .env.local before deploying. */
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "maxgift2026";

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

function token(): string {
  return createHmac("sha256", ADMIN_PASSWORD).update("maxgift-admin").digest("hex");
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(COOKIE)?.value;
  if (!value) return false;
  const expected = token();
  if (value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

export async function signIn(password: string): Promise<boolean> {
  if (password !== ADMIN_PASSWORD) return false;
  const store = await cookies();
  store.set(COOKIE, token(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
  return true;
}

export async function signOut() {
  const store = await cookies();
  store.delete(COOKIE);
}
