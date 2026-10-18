"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company } from "@/lib/catalog";

const links = [
  { href: "/products", label: "Products" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#factory", label: "Factory" },
  { href: "/#process", label: "How it works" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
    <>
      <div className="utility">
        <div className="shell utility__inner">
          <span>Custom eco bags · Shenzhen, China · Since 2018</span>
          <div className="utility__right">
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <span>{company.phone}</span>
          </div>
        </div>
      </div>

      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="shell header__inner">
          <Link href="/" className="brand" aria-label={`${company.name} home`}>
            <span className="brand__name">MAXGIFT PRO</span>
            <span className="brand__tag">Eco bag manufacturer</span>
          </Link>

          <nav className="nav" aria-label="Primary">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="header__actions">
            <Link href="/contact" className="btn btn--solid btn--sm header__cta">
              Get a quote
            </Link>
            <button
              className="burger"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
            >
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 6h14M3 13h14" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav ${menu ? "mobile-nav--open" : ""}`} aria-hidden={!menu}>
        <div className="mobile-nav__top">
          <span className="brand__name">MAXGIFT PRO</span>
          <button onClick={() => setMenu(false)} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="mobile-nav__link" onClick={() => setMenu(false)}>
            {l.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="btn btn--solid"
          style={{ marginTop: 28 }}
          onClick={() => setMenu(false)}
        >
          Get a quote
        </Link>
        <p style={{ marginTop: 28, fontSize: 12, color: "var(--color-ink-soft)", lineHeight: 1.7 }}>
          {company.address}
          <br />
          {company.email} · {company.phone}
        </p>
      </div>
    </>
  );
}
