"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, {});

  return (
    <form action={action} className="admin-login">
      <p className="eyebrow eyebrow--plain">Maxgift Pro · admin</p>
      <h1 className="display h3" style={{ marginTop: 12 }}>
        Sign in
      </h1>
      <p style={{ margin: "10px 0 22px", fontSize: 13, color: "var(--color-ink-soft)" }}>
        Enter the admin password to manage the catalogue.
      </p>

      <label className="afield">
        <span>Password</span>
        <input type="password" name="password" autoFocus autoComplete="current-password" required />
      </label>

      {state?.error ? <p className="admin-error">{state.error}</p> : null}

      <button type="submit" className="btn btn--solid" style={{ width: "100%", marginTop: 18 }} disabled={pending}>
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
