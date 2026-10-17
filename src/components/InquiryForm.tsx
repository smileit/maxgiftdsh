"use client";

import { useState } from "react";
import { company, products } from "@/lib/catalog";

type Status = "idle" | "error" | "sent";

export default function InquiryForm({ preset }: { preset?: string }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    product: preset ?? "",
    quantity: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setStatus("error");
      setError("Name and email are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("error");
      setError("That email address doesn’t look right.");
      return;
    }

    const body = [
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
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
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="border border-line bg-cream/70 p-8 text-center sm:p-12">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-moss/12 text-moss">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="display mt-6 text-3xl">Your email is ready to send.</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          We opened a draft in your mail app addressed to{" "}
          <a href={`mailto:${company.email}`} className="text-ink underline">
            {company.email}
          </a>
          . If nothing opened, copy your details to that address — or call {company.phone}.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-7 rounded-full border border-ink/20 px-6 py-3 text-[11px] tracking-[0.18em] uppercase transition hover:border-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" required>
          <input
            value={form.name}
            onChange={set("name")}
            placeholder="Jane Doe"
            className="w-full border-b border-line bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
          />
        </Field>
        <Field label="Company">
          <input
            value={form.company}
            onChange={set("company")}
            placeholder="Acme Retail"
            className="w-full border-b border-line bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="you@company.com"
            className="w-full border-b border-line bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
          />
        </Field>
        <Field label="Quantity">
          <input
            value={form.quantity}
            onChange={set("quantity")}
            placeholder="e.g. 5,000 pcs"
            className="w-full border-b border-line bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
          />
        </Field>
        <Field label="Product line" className="sm:col-span-2">
          <select
            value={form.product}
            onChange={set("product")}
            className="w-full border-b border-line bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
          >
            <option value="">Not sure yet — advise me</option>
            {products.map((p) => (
              <option key={p.slug} value={p.title}>
                {p.title} ({p.code})
              </option>
            ))}
          </select>
        </Field>
        <Field label="What are you packing?" className="sm:col-span-2">
          <textarea
            value={form.message}
            onChange={set("message")}
            rows={4}
            placeholder="Size, colour, print colours, delivery country, deadline…"
            className="w-full resize-none border-b border-line bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
          />
        </Field>
      </div>

      {status === "error" ? (
        <p className="text-[12px] text-[#a4361f]">{error}</p>
      ) : (
        <p className="text-[11px] leading-relaxed text-ink-soft">
          We reply within one working day. Artwork can follow by email — JPG, PDF, AI or EPS.
        </p>
      )}

      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink py-4 text-[11px] tracking-[0.18em] uppercase text-cream transition hover:bg-moss sm:w-auto sm:px-10"
      >
        Send enquiry
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          className="transition-transform duration-500 group-hover:translate-x-1"
        >
          <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 flex items-center gap-1 text-[10px] tracking-[0.16em] uppercase text-ink-soft">
        {label}
        {required ? <span className="text-kraft">*</span> : null}
      </span>
      {children}
    </label>
  );
}
