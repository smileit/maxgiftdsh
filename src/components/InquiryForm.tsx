"use client";

import { useEffect, useState } from "react";
import { company } from "@/lib/catalog";

const empty = { name: "", brand: "", email: "", quantity: "", product: "", message: "" };

type ProductOption = { slug: string; title: string; code: string };

export default function InquiryForm({
  preset,
  products = [],
}: {
  preset?: string;
  products?: ProductOption[];
}) {
  const [form, setForm] = useState({ ...empty, product: preset ?? "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  // Deep link from a product page: /contact?product=<slug>
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("product");
    if (!slug) return;
    const match = products.find((p) => p.slug === slug);
    if (match) setForm((f) => ({ ...f, product: match.title }));
  }, []);

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (error) setError("");
    };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("That email address doesn’t look right.");
      return;
    }

    const body = [
      `Name: ${form.name}`,
      form.brand && `Brand / company: ${form.brand}`,
      `Email: ${form.email}`,
      form.product && `Product line: ${form.product}`,
      form.quantity && `Quantity: ${form.quantity}`,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    const subject = `Quote request${form.product ? ` — ${form.product}` : ""}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form-success">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#e0b07a" strokeWidth="1.5">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3>Your email is ready to send.</h3>
        <p>
          We opened a draft addressed to {company.email}. If nothing opened, copy your details to
          that address — or call {company.phone}.
        </p>
        <button
          className="btn btn--ghost-light btn--sm"
          style={{ marginTop: 22 }}
          onClick={() => {
            setForm(empty);
            setSent(false);
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="form-grid">
        <label className="field">
          <span className="field__label">
            Your name <i>*</i>
          </span>
          <input value={form.name} onChange={update("name")} placeholder="Jane Doe" autoComplete="name" />
        </label>

        <label className="field">
          <span className="field__label">Brand / company</span>
          <input
            value={form.brand}
            onChange={update("brand")}
            placeholder="Acme Retail"
            autoComplete="organization"
          />
        </label>

        <label className="field">
          <span className="field__label">
            Email <i>*</i>
          </span>
          <input
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@company.com"
            autoComplete="email"
          />
        </label>

        <label className="field">
          <span className="field__label">Quantity</span>
          <input value={form.quantity} onChange={update("quantity")} placeholder="e.g. 5,000 pcs" />
        </label>

        <label className="field span-2">
          <span className="field__label">Product line</span>
          <select value={form.product} onChange={update("product")}>
            <option value="">Not sure yet — advise me</option>
            {products.map((p) => (
              <option key={p.slug} value={p.title}>
                {p.title} ({p.code})
              </option>
            ))}
          </select>
        </label>

        <label className="field span-2">
          <span className="field__label">What are you packing?</span>
          <textarea
            value={form.message}
            onChange={update("message")}
            placeholder="Size, colour, print colours, delivery country, deadline…"
            rows={3}
          />
        </label>
      </div>

      <p className={`form-note ${error ? "form-note--error" : ""}`}>
        {error || "We reply within one working day. Artwork can follow by email — JPG, PDF, AI or EPS."}
      </p>

      <button type="submit" className="btn btn--ghost-light" style={{ width: "100%", maxWidth: 260 }}>
        Send enquiry
      </button>
    </form>
  );
}
