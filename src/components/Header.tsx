"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/products", label: "Products" },
  { href: "/#factory", label: "Factory" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <header className="sticky top-0 z-40">
      <div className="overflow-hidden bg-moss-deep py-2 text-cream">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap text-[10px] tracking-[0.24em] uppercase">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-10">
              <span>Custom eco bags, made in Shenzhen</span>
              <span aria-hidden>·</span>
              <span>FOB Ningbo · worldwide shipping</span>
              <span aria-hidden>·</span>
              <span>Eight product lines, one factory</span>
              <span aria-hidden>·</span>
              <span>Artwork files: JPG, PDF, AI, EPS</span>
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

          <Link href="/" className="justify-self-center text-center">
            <span className="display block text-[22px] leading-none tracking-[0.16em] sm:text-[26px]">
              MAXGIFT
            </span>
            <span className="mt-1 block text-[8px] tracking-[0.42em] uppercase text-ink-soft">
              Packaging since 2018
            </span>
          </Link>

          <div className="flex items-center justify-end gap-2">
            <Link
              href="/products"
              className="hidden rounded-full p-2.5 text-ink-soft transition hover:bg-sand/70 hover:text-ink lg:block"
              aria-label="Search products"
            >
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="9" cy="9" r="5.5" />
                <path d="M13.5 13.5 17 17" strokeLinecap="round" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[10px] tracking-[0.16em] uppercase text-cream transition hover:bg-moss sm:inline-flex"
            >
              Request a quote
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-ink/20 px-4 py-2 text-[10px] tracking-[0.16em] uppercase sm:hidden"
            >
              Quote
            </Link>
          </div>
        </div>
      </div>

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
          {[...links, { href: "/contact", label: "Request a quote" }].map((l) => (
            <Link key={l.href + l.label} href={l.href} className="display border-b border-line/70 py-4 text-3xl">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="px-5 pt-8 text-xs leading-relaxed text-ink-soft">
          Custom non-woven, woven, insulated, cotton and jute bags.
          <br />
          sales@maxgiftpro.com
        </p>
      </div>
    </header>
  );
}
