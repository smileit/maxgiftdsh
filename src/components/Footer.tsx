import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All gifts", href: "/shop" },
      { label: "Gift sets", href: "/shop?c=gift-sets" },
      { label: "Home & scent", href: "/shop?c=home-scent" },
      { label: "Kitchen & table", href: "/shop?c=kitchen" },
      { label: "Desk & paper", href: "/shop?c=desk" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", href: "/shop" },
      { label: "Returns", href: "/shop" },
      { label: "Gift wrapping", href: "/shop" },
      { label: "Contact", href: "/shop" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Our story", href: "/#story" },
      { label: "Makers", href: "/#story" },
      { label: "Journal", href: "/#story" },
      { label: "Stockists", href: "/#story" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <p className="display text-3xl tracking-[0.14em]">MAXGIFT</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
              A small studio making gifts we would want to receive: objects made properly, by people
              we know, in quantities that stay honest.
            </p>
            <div className="mt-6 flex items-center gap-3 text-[11px] tracking-[0.16em] uppercase text-ink-soft">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
              Studio in Lisbon · Shipping worldwide
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow text-ink">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-ink-soft transition hover:text-clay">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-[11px] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Maxgift Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span className="flex items-center gap-2">
              <span className="rounded-xs border border-line px-2 py-1">VISA</span>
              <span className="rounded-xs border border-line px-2 py-1">MC</span>
              <span className="rounded-xs border border-line px-2 py-1">AMEX</span>
              <span className="rounded-xs border border-line px-2 py-1">PAY</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
