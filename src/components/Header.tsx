"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./cart";

const links = [
  { href: "/shop", label: "Shop all" },
  { href: "/shop?c=gift-sets", label: "Gift sets" },
  { href: "/shop?c=home-scent", label: "Home & scent" },
  { href: "/#story", label: "Our story" },
];

export default function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <header className="sticky top-0 z-40">
      <div className="overflow-hidden bg-ink py-2 text-cream">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap text-[10px] tracking-[0.24em] uppercase">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-10">
              <span>Complimentary shipping over $120</span>
              <span aria-hidden>·</span>
              <span>Hand-wrapped in the studio</span>
              <span aria-hidden>·</span>
              <span>Ships within 24 hours</span>
              <span aria-hidden>·</span>
              <span>30-day returns, no questions</span>
              <span aria-hidden>·</span>
            </span>
          ))}
        </div>
      </div>

      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-line/80 bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent bg-paper"
        }`}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 sm:px-8">
          {/* left */}
          <nav className="hidden items-center gap-7 text-[11px] tracking-[0.16em] uppercase lg:flex">
            {links.slice(0, 3).map((l) => (
              <Link key={l.href} href={l.href} className="underline-grow text-ink-soft hover:text-ink">
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setMenu(true)}
            className="flex items-center gap-2 text-ink lg:hidden"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M3 6h14M3 13h14" strokeLinecap="round" />
            </svg>
          </button>

          {/* logo */}
          <Link href="/" className="justify-self-center text-center">
            <span className="display block text-[22px] leading-none tracking-[0.16em] sm:text-[26px]">
              MAXGIFT
            </span>
            <span className="mt-1 block text-[8px] tracking-[0.42em] uppercase text-ink-soft">
              Considered gifting
            </span>
          </Link>

          {/* right */}
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <Link
              href="/shop"
              className="hidden rounded-full p-2.5 text-ink-soft transition hover:bg-sand/70 hover:text-ink sm:block"
              aria-label="Search the shop"
            >
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="9" cy="9" r="5.5" />
                <path d="M13.5 13.5 17 17" strokeLinecap="round" />
              </svg>
            </Link>
            <Link
              href="/#story"
              className="hidden rounded-full p-2.5 text-ink-soft transition hover:bg-sand/70 hover:text-ink sm:block"
              aria-label="About us"
            >
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="10" cy="7" r="3.2" />
                <path d="M4 17c1.4-3.2 3.4-4.6 6-4.6s4.6 1.4 6 4.6" strokeLinecap="round" />
              </svg>
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="group relative flex items-center gap-2 rounded-full px-2.5 py-2 text-ink-soft transition hover:bg-sand/70 hover:text-ink"
              aria-label={`Open bag, ${count} items`}
            >
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M4.5 6h11l-1 11h-9l-1-11Z" strokeLinejoin="round" />
                <path d="M7.4 6V4.8a2.6 2.6 0 0 1 5.2 0V6" strokeLinecap="round" />
              </svg>
              <span className="text-[11px] tabular-nums">{count}</span>
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-paper transition-opacity duration-300 lg:hidden ${
          menu ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <span className="display text-xl tracking-[0.16em]">MAXGIFT</span>
          <button onClick={() => setMenu(false)} aria-label="Close menu" className="p-2">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-2 px-5 pt-6">
          {[...links, { href: "/checkout", label: "Checkout" }].map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className="display border-b border-line/70 py-4 text-3xl"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="px-5 pt-8 text-xs leading-relaxed text-ink-soft">
          Considered gifts, made in small batches and wrapped by hand in our studio.
          <br />
          hello@maxgift.co
        </p>
      </div>
    </header>
  );
}
