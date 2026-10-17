"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ArtKind } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import ProductArt from "./ProductArt";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  colorway: string;
  art: ArtKind;
  tint: string;
  ink: string;
  qty: number;
};

type CartApi = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartApi | null>(null);
const STORAGE_KEY = "maxgift.cart.v1";
const FREE_SHIPPING = 120;

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable */
    }
  }, [items, ready]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === item.slug);
      if (existing) {
        return prev.map((i) => (i.slug === item.slug ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...item, qty }];
    });
    setOpen(true);
    setToast(`${item.name} added to bag`);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i)),
    );
  }, []);

  const value = useMemo<CartApi>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
    return { items, count, subtotal, add, remove, setQty, open, setOpen };
  }, [items, add, remove, setQty, open]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 transition-all duration-500 ${
          toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {toast ? (
          <div className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs tracking-wide text-cream shadow-xl">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-clay" />
            {toast}
          </div>
        ) : null}
      </div>
    </CartContext.Provider>
  );
}

function CartDrawer() {
  const { items, subtotal, count, open, setOpen, remove, setQty } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-cream shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <div className="flex items-baseline gap-2">
            <span className="display text-xl">Your bag</span>
            <span className="text-xs text-ink-soft">({count})</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 text-ink-soft transition hover:bg-sand hover:text-ink"
            aria-label="Close bag"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {items.length > 0 ? (
          <div className="border-b border-line px-6 py-4">
            <p className="text-[11px] tracking-wide text-ink-soft">
              {remaining > 0 ? (
                <>
                  You&rsquo;re <span className="text-ink">{formatPrice(remaining)}</span> away from free
                  shipping
                </>
              ) : (
                <span className="text-sage">Free shipping unlocked</span>
              )}
            </p>
            <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-sand">
              <div
                className="h-full rounded-full bg-clay transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : null}

        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-sand/60 text-ink-soft">
                <ProductArt kind="box" className="h-10 w-10 opacity-40" />
              </div>
              <p className="display text-2xl">Nothing here yet</p>
              <p className="max-w-[240px] text-sm text-ink-soft">
                Start with one of our most-gifted pieces — they rarely disappoint.
              </p>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-ink px-6 py-3 text-xs tracking-[0.18em] uppercase text-cream transition hover:bg-clay"
              >
                Browse the shop
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line/70">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4 py-5">
                  <div
                    className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm"
                    style={{ backgroundColor: item.tint, color: item.ink }}
                  >
                    <ProductArt kind={item.art} className="absolute inset-0 h-full w-full p-2" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={() => setOpen(false)}
                          className="block truncate text-sm font-medium hover:text-clay"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-ink-soft">{item.colorway}</p>
                      </div>
                      <span className="text-sm tabular-nums">{formatPrice(item.price * item.qty)}</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          onClick={() => setQty(item.slug, item.qty - 1)}
                          className="grid h-7 w-7 place-items-center text-ink-soft transition hover:text-ink"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-xs tabular-nums">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.slug, item.qty + 1)}
                          className="grid h-7 w-7 place-items-center text-ink-soft transition hover:text-ink"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.slug)}
                        className="text-[11px] tracking-wide text-ink-soft underline-grow hover:text-clay"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <footer className="border-t border-line px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-ink-soft">Subtotal</span>
              <span className="display text-2xl tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-[11px] text-ink-soft">
              Taxes and shipping calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-xs tracking-[0.18em] uppercase text-cream transition hover:bg-clay"
            >
              Continue to checkout
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <p className="mt-3 text-center text-[11px] text-ink-soft">
              Complimentary gift wrap on every order
            </p>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}
