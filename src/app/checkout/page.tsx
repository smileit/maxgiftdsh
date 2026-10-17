"use client";

import Link from "next/link";
import { useState } from "react";
import ProductArt from "@/components/ProductArt";
import { useCart } from "@/components/cart";
import { formatPrice } from "@/lib/products";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [placed, setPlaced] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const shipping = subtotal > 120 || subtotal === 0 ? 0 : 9;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 py-24 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-sage/20 text-sage">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="display mt-6 text-4xl">Order noted.</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          This is a demo checkout — no payment was taken. In a live store this is where the order
          confirmation, receipt and dispatch timeline would appear.
        </p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-ink px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase text-cream transition hover:bg-clay"
        >
          Back to the shop
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8">
      <p className="eyebrow text-ink-soft">Checkout</p>
      <h1 className="display mt-3 text-[clamp(2rem,4vw,3rem)]">Almost there.</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPlaced(true);
          }}
          className="space-y-8"
        >
          <fieldset className="space-y-4">
            <legend className="eyebrow text-ink-soft">Contact</legend>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email for the receipt"
              className="w-full border-b border-line bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
            />
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="eyebrow text-ink-soft">Shipping address</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="border-b border-line bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
              />
              <input
                required
                placeholder="Country"
                className="border-b border-line bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
              />
              <input
                required
                placeholder="Address"
                className="sm:col-span-2 border-b border-line bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
              />
              <input
                required
                placeholder="City"
                className="border-b border-line bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
              />
              <input
                required
                placeholder="Postal code"
                className="border-b border-line bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
              />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="eyebrow text-ink-soft">Payment</legend>
            <div className="rounded-[3px] border border-line bg-cream/60 p-4 text-[11px] leading-relaxed text-ink-soft">
              Demo mode — no card is collected. In production this block would host Stripe, Shop Pay
              or PayPal, with the same custom styling.
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={items.length === 0}
            className="w-full rounded-full bg-ink py-4 text-[11px] tracking-[0.18em] uppercase text-cream transition hover:bg-clay disabled:cursor-not-allowed disabled:opacity-40"
          >
            {items.length === 0 ? "Your bag is empty" : `Place order — ${formatPrice(total)}`}
          </button>
        </form>

        <aside className="h-fit rounded-[3px] border border-line bg-cream/60 p-6">
          <p className="eyebrow text-ink-soft">In your bag</p>
          <ul className="mt-4 divide-y divide-line/70">
            {items.length === 0 ? (
              <li className="py-6 text-sm text-ink-soft">
                Nothing yet. <Link href="/shop" className="underline">Browse the shop</Link>.
              </li>
            ) : (
              items.map((item) => (
                <li key={item.slug} className="flex items-center gap-3 py-4">
                  <div
                    className="h-16 w-14 shrink-0 overflow-hidden rounded-[2px]"
                    style={{ backgroundColor: item.tint, color: item.ink }}
                  >
                    <ProductArt kind={item.art} className="h-full w-full p-1.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{item.name}</p>
                    <p className="text-[11px] text-ink-soft">Qty {item.qty}</p>
                  </div>
                  <span className="text-sm tabular-nums">{formatPrice(item.price * item.qty)}</span>
                </li>
              ))
            )}
          </ul>

          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-ink-soft">
              <dt>Subtotal</dt>
              <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ink-soft">
              <dt>Shipping</dt>
              <dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-2 text-base">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatPrice(total)}</dd>
            </div>
          </dl>

          <p className="mt-4 text-[11px] leading-relaxed text-ink-soft">
            Every order ships with hand-wrapping, a blank card and a return label.
          </p>
        </aside>
      </div>
    </section>
  );
}
