import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { company, families, products } from "@/lib/catalog";

const capabilities = [
  {
    icon: "/img/icon-inventory.svg",
    title: "In-house printing",
    body: "Screen, transfer and laminated print under one roof — artwork to first sample without an outside vendor.",
  },
  {
    icon: "/img/icon-service.svg",
    title: "Sustainable production",
    body: "Waste trimmed at cutting, offcuts returned to the line, and material chosen for reuse rather than disposal.",
  },
  {
    icon: "/img/icon-setting.svg",
    title: "Traceable batches",
    body: "Every order keeps its material lot and print recipe, so a reorder three years later matches the first run.",
  },
  {
    icon: "/img/icon-team.svg",
    title: "One account team",
    body: "The person who quotes your job also walks the sample through the workshop. No handovers mid-project.",
  },
];

const stories = [
  {
    img: "/img/clb001.jpg",
    title: "Eco bags",
    body: "The design of your next packaging solution starts with the material — curated from mills we have bought from for years.",
  },
  {
    img: "/img/dsb002.jpg",
    title: "Reusable",
    body: "A bag that survives a hundred trips is a better advertisement than a cheaper one that tears in the car park.",
  },
  {
    img: "/img/pwb001.jpg",
    title: "Recycled",
    body: "Woven and non-woven polypropylene re-enters the line as regrind, so offcuts become the next batch rather than landfill.",
  },
];

const clients = [
  {
    img: "/img/c1.png",
    title: "Tailored for your brand",
    body: "Your logo, your colours, your dimensions. Small boutiques and large corporations get the same design attention.",
  },
  {
    img: "/img/c2.png",
    title: "Built for your lifestyle",
    body: "Reinforced, water-resistant construction for outdoor, gym and travel programmes that see real wear.",
  },
  {
    img: "/img/c3.png",
    title: "Crafted for your community",
    body: "Schools, non-profits and civic organisations use our bags to make sustainability visible at events.",
  },
];

const quotes = [
  {
    quote:
      "The eco-bags from Maxgift are truly exceptional. The quality is outstanding, and I am proud to use them in my business. Their commitment to sustainability is unparalleled.",
    name: "David Wilkins",
    meta: "Sustainability Manager, Greenleaf Enterprises",
  },
  {
    quote:
      "Maxgift's eco-bags have become an integral part of my daily routine. The durability and functionality make them a perfect choice for an eco-friendly lifestyle.",
    name: "Julia Chen",
    meta: "Environmental Activist, Save Our Planet",
  },
  {
    quote:
      "The team has been incredibly helpful and responsive throughout the entire purchasing experience. The bags blend style and sustainability.",
    name: "Michael Rodriguez",
    meta: "General Manager, City Market Grocery",
  },
];

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="relative">
        <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden bg-ink">
          <Image
            src="/img/banner001.jpg"
            alt="Custom printed reusable bags from the Maxgift factory"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/15" />

          <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-14 sm:px-8 lg:pb-20">
            <div className="flex items-center gap-3 text-cream/70">
              <span className="h-px w-10 bg-cream/40" />
              <p className="eyebrow">Shenzhen · custom packaging since 2018</p>
            </div>

            <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.8rem,6.4vw,5.4rem)] text-cream">
              Bags your brand can live in.
            </h1>

            <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-cream/75">
              We design and print custom reusable bags in our own Shenzhen factory — non-woven,
              woven, insulated, cotton and jute. Artwork in, freight-ready cartons out.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-[11px] tracking-[0.18em] uppercase text-ink transition-colors hover:bg-kraft hover:text-cream"
              >
                Browse the catalogue
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-cream/35 px-7 py-4 text-[11px] tracking-[0.18em] uppercase text-cream transition-colors hover:border-cream"
              >
                Request a quote
              </Link>
            </div>
          </div>
        </div>

        <div className="border-b border-line bg-cream">
          <div className="mx-auto grid max-w-[1400px] divide-line px-5 sm:grid-cols-3 sm:divide-x sm:px-8">
            {[
              { k: "8 product lines", v: "Non-woven to jute" },
              { k: "In-house print", v: "Screen, transfer, laminated" },
              { k: "FOB Ningbo", v: "Worldwide consolidation" },
            ].map((s) => (
              <div key={s.k} className="py-5 sm:px-6 sm:first:pl-0">
                <p className="text-sm">{s.k}</p>
                <p className="mt-1 text-[11px] tracking-wide text-ink-soft">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- about ---------------- */}
      <section id="about" className="mx-auto max-w-[1400px] px-5 pt-20 sm:px-8 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-ink-soft">Who we are</p>
            <h2 className="display mt-4 text-[clamp(2rem,3.8vw,3.2rem)]">
              A packaging bag is the first thing your customer touches — and the last thing they keep.
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
              <p>
                It can be more than something used to pack a product. It is an extension of the
                brand: proof of how carefully you build what is inside.
              </p>
              <p>
                That is why we make bags that grab attention while protecting what goes in them —
                material chosen for the load, print that survives repeated use, and dimensions cut to
                your product rather than the nearest standard size.
              </p>
              <p>
                We work with clients the same way we have since 2018: one account team, a sample
                before a production run, and a factory you are welcome to walk through.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 text-[11px] tracking-[0.18em] uppercase underline-grow"
            >
              Talk to us about a custom bag
            </Link>
          </Reveal>

          <Reveal delay={90}>
            <div className="relative aspect-[4/5] overflow-hidden bg-sand">
              <Image
                src="/img/location-v1.jpg"
                alt="Inside the Maxgift workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="relative aspect-square overflow-hidden bg-sand">
                <Image src="/img/location-v2.jpg" alt="Printing line" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden bg-sand">
                <Image src="/img/location-v3.jpg" alt="Finished goods" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- products ---------------- */}
      <section className="mx-auto mt-24 max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-8">
          <div>
            <p className="eyebrow text-ink-soft">What we offer</p>
            <h2 className="display mt-3 text-[clamp(2rem,3.6vw,3rem)]">Eight lines, one factory</h2>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase underline-grow"
          >
            All specs
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
          </Link>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
          From sleek shopping bags to durable mailers and gift boxes, we cover the formats most
          retail programmes actually order — and customise every one of them.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- capabilities ---------------- */}
      <section className="mx-auto mt-24 max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 70} className="h-full">
              <div className="flex h-full flex-col bg-cream p-7">
                <Image src={c.icon} alt="" width={34} height={34} className="h-8 w-8 opacity-70" />
                <p className="display mt-8 text-xl">{c.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- factory ---------------- */}
      <section id="factory" className="relative mt-24 overflow-hidden bg-ink text-cream">
        <div className="absolute inset-0">
          <Image
            src="/img/location-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
        </div>

        <div className="relative mx-auto grid max-w-[1400px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:py-28">
          <Reveal>
            <p className="eyebrow text-cream/50">The factory</p>
            <h2 className="display mt-5 text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.06]">
              Where artisanry meets{" "}
              <span className="text-[#c9a469] italic">sustainable production</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-cream/65">
              Cutting, printing, stitching and packing happen in the same building in Shenzhen. Walk
              the floor and you can follow a bag from a roll of fabric to a sealed carton.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {["/img/location-v1.jpg", "/img/location-v2.jpg", "/img/location-v3.jpg"].map((src) => (
                <div key={src} className="relative aspect-square overflow-hidden bg-cream/10">
                  <Image src={src} alt="Maxgift factory floor" fill sizes="20vw" className="object-cover" />
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-px self-start bg-cream/15">
            {[
              {
                t: "Experience our craftsmanship",
                d: "Sustainable material selection, stitching and finishing checked piece by piece before packing.",
              },
              {
                t: "Sustainable production practices",
                d: "Waste minimised at cutting, energy use measured per batch, offcuts returned to the line.",
              },
              {
                t: "Transparency and traceability",
                d: "Material lot and print recipe recorded against every order, so reorders match.",
              },
              {
                t: "Exclusive product showcase",
                d: "A showroom of previous custom programmes to handle before you commit to a run.",
              },
            ].map((row, i) => (
              <Reveal key={row.t} delay={i * 70}>
                <div className="bg-ink p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-sm font-medium">{row.t}</p>
                    <span className="text-[10px] tracking-[0.2em] text-cream/35">0{i + 1}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-cream/55">{row.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- stories ---------------- */}
      <section className="mx-auto mt-24 max-w-[1400px] px-5 sm:px-8">
        <p className="eyebrow text-ink-soft">Materials, honestly</p>
        <h2 className="display mt-3 text-[clamp(2rem,3.6vw,3rem)]">Why reusable beats cheaper</h2>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="img-zoom object-cover"
                  />
                </div>
                <p className="display mt-5 text-2xl">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- clients ---------------- */}
      <section className="mx-auto mt-24 max-w-[1400px] px-5 sm:px-8">
        <p className="eyebrow text-ink-soft">Who we serve</p>
        <h2 className="display mt-3 text-[clamp(2rem,3.6vw,3rem)]">Built around how you use them</h2>

        <div className="mt-10 grid gap-px overflow-hidden bg-line lg:grid-cols-3">
          {clients.map((c, i) => (
            <Reveal key={c.title} delay={i * 80} className="h-full">
              <div className="flex h-full flex-col bg-cream">
                <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                  <Image src={c.img} alt={c.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="display text-2xl">{c.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- testimonials ---------------- */}
      <section className="mx-auto mt-24 max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-px overflow-hidden bg-line md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 80} className="h-full">
              <figure className="flex h-full flex-col justify-between bg-cream p-7">
                <blockquote className="text-[15px] leading-relaxed">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8">
                  <p className="text-xs font-medium">{q.name}</p>
                  <p className="mt-1 text-[11px] text-ink-soft">{q.meta}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- cta ---------------- */}
      <section className="mx-auto mt-24 max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-center gap-10 bg-moss px-6 py-14 text-cream sm:px-12 lg:grid-cols-[1.2fr_1fr] lg:py-20">
          <div>
            <p className="eyebrow text-cream/60">Start a project</p>
            <h2 className="display mt-4 text-[clamp(1.9rem,3.4vw,2.9rem)]">
              Tell us what you need to pack.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">
              Send the product, the quantity and your artwork file. We come back with material
              advice, a unit price and a sample timeline.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-cream px-8 py-4 text-[11px] tracking-[0.18em] uppercase text-ink transition hover:bg-kraft hover:text-cream"
            >
              Request a quote
            </Link>
            <a
              href={`mailto:${company.email}`}
              className="text-sm text-cream/75 underline decoration-cream/30 underline-offset-4 transition hover:text-cream"
            >
              {company.email}
            </a>
            <p className="text-[11px] tracking-[0.14em] uppercase text-cream/50">
              {families.length} material families · {company.port}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
