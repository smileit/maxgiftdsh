import type { Metadata } from "next";
export const instant = false;
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { isAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false } };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="admin-shell">
      <LoginForm />
    </div>
  );
}
