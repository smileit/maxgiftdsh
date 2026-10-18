import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import {
  company,
  customisation,
  families,
  faqs,
  processSteps,
  products,
  quotes,
  trustPoints,
} from "@/lib/catalog";
import InquiryForm from "@/components/InquiryForm";

const familyCovers: Record<string, string> = {
  "non-woven": "/img/nwb003.jpg",
  woven: "/img/pwb002.jpg",
  insulated: "/img/clb004.jpg",
  natural: "/img/jtb001.jpg",
  specialty: "/img/dsb002.jpg",
};

const capabilities = [
  {
    icon: "/img/icon-inventory.svg",
    title: "Own factory floor",
    body: "Cutting, printing, stitching and packing under one roof in Shenzhen — no broker between you and production.",
  },
  {
    icon: "/img/icon-service.svg",
    title: "In-house printing",
    body: "Screen, heat transfer and laminated full colour. We colour-match to Pantone and check separations before a run.",
  },
  {
    icon: "/img/icon-setting.svg",
    title: "Made to your spec",
    body: "Size, colour, handle and packing are yours to choose. Nothing here is off-the-shelf.",
  },
  {
    icon: "/img/icon-team.svg",
    title: "One contact, start to finish",
    body: "The person who quotes your job walks the sample through production and sends you photos along the way.",
  },
];

export default function Home() {
  const hero = products.find((p) => p.slug === "non-woven-bag") ?? products[0];

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="hero">
        <div className="shell hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">Shenzhen manufacturer · Since 2018</p>
            <h1 className="display h1 hero__title">
              Bags your customers
              <br />
              <em>keep using.</em>
            </h1>
            <p className="lede hero__lede">
              Custom reusable bags for retail, grocery and lifestyle brands — non-woven, woven,
              insulated, cotton and jute. Designed, printed and packed in our own Shenzhen factory.
            </p>
            <div className="hero__actions">
              <Link href="/products" className="btn btn--solid">
                Browse product lines
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/contact" className="btn btn--outline">
                Get a quote
              </Link>
            </div>
          </div>

          <div className="hero__media">
            <Image
              src={hero.images[1] ?? hero.images[0]}
              alt={hero.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
            <span className="hero__tag">Best seller · {hero.code}</span>
            <div className="hero__caption">
              <div>
                <small>Product line 01</small>
                <strong>{hero.title}</strong>
              </div>
              <small>{company.port}</small>
            </div>
          </div>
        </div>
      </section>

      <div className="trust">
        <div className="shell trust__inner">
          {trustPoints.map((t) => (
            <div className="trust__cell" key={t}>
              <span className="trust__dot" />
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- categories ---------------- */}
      <section className="band">
        <div className="shell">
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Materials</p>
              <h2 className="display h2" style={{ marginTop: 14 }}>
                Five materials, one factory
              </h2>
              <p>
                Each line is built to your dimensions, colour and artwork. Start with the material
                that fits the product, not the one that fits the price.
              </p>
            </div>
            <Link href="/products" className="link-arrow">
              All product lines
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="cats">
            {families.map((f, i) => {
              const count = products.filter((p) => p.family === f.id).length;
              return (
                <Reveal key={f.id} delay={i * 60}>
                  <Link href={`/products?family=${f.id}`} className="cat">
                    <Image
                      src={familyCovers[f.id]}
                      alt={f.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover"
                    />
                    <span className="cat__body">
                      <strong>{f.name}</strong>
                      <span>
                        {count} {count === 1 ? "line" : "lines"} · custom to your spec
                      </span>
                    </span>                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- products ---------------- */}
      <section className="band" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">The catalogue</p>
              <h2 className="display h2" style={{ marginTop: 14 }}>
                Eight lines, ready to customise
              </h2>
            </div>
            <Link href="/products" className="link-arrow">
              View all specs
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid-products">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- capabilities ---------------- */}
      <section id="capabilities">
        <div className="caps">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 60} className="cap">
              <Image src={c.icon} alt="" width={30} height={30} />
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- process ---------------- */}
      <section className="band" id="process">
        <div className="shell">
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">How it works</p>
              <h2 className="display h2" style={{ marginTop: 14 }}>
                From artwork to container
              </h2>
              <p>
                Five steps, no surprises. You approve a physical sample before anything goes into
                production.
              </p>
            </div>
          </div>

          <div className="process">
            {processSteps.map((s) => (
              <div className="step" key={s.step}>
                <span className="step__num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gap: 16,
              marginTop: 40,
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            }}
          >
            {customisation.map((c) => (
              <div
                key={c.title}
                style={{ borderTop: "2px solid var(--color-ink)", paddingTop: 14 }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {c.title}
                </p>
                <p style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.55, color: "var(--color-ink-soft)" }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- factory ---------------- */}
      <section className="factory" id="factory">
        <Image src="/img/location-bg.jpg" alt="" fill sizes="100vw" className="factory__bg" />
        <div className="shell band">
          <div className="factory__grid">
            <Reveal>
              <p className="eyebrow">Inside the factory</p>
              <h2 className="display h2" style={{ marginTop: 18 }}>
                Where the bag is actually <em>made</em>
              </h2>
              <p className="factory__copy">
                Not a trading office with a catalogue. Cutting tables, print lines, sewing stations
                and a packing floor — all in the same building in Futian, Shenzhen. Ask for a video
                call and we will walk you through it.
              </p>

              <div className="factory__stats">
                <div className="factory__stat">
                  <strong>8</strong>
                  <span>Product lines</span>
                </div>
                <div className="factory__stat">
                  <strong>1</strong>
                  <span>Building, whole process</span>
                </div>
                <div className="factory__stat">
                  <strong>FOB</strong>
                  <span>Ningbo, worldwide</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80} className="factory__pics">
              <div>
                <Image src="/img/location-v3.jpg" alt="Production floor" fill sizes="30vw" className="object-cover" />
              </div>
              <div>
                <Image src="/img/location-v1.jpg" alt="Showroom" fill sizes="20vw" className="object-cover" />
              </div>
              <div>
                <Image src="/img/location-v2.jpg" alt="Finished goods" fill sizes="20vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- testimonials ---------------- */}
      <section className="band">
        <div className="shell">
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Clients</p>
              <h2 className="display h2" style={{ marginTop: 14 }}>
                What buyers say
              </h2>
            </div>
          </div>

          <div className="quotes">
            {quotes.map((q, i) => (
              <Reveal key={q.name} delay={i * 70} className="quote" as="figure">
                <span className="quote__mark">&ldquo;</span>
                <blockquote>{q.text}</blockquote>
                <figcaption>
                  <strong>{q.name}</strong>
                  <span>{q.role}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="band" id="faq" style={{ paddingTop: 0 }}>
        <div className="shell" style={{ display: "grid", gap: 40 }}>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <div className="section-head__text">
              <p className="eyebrow">Questions buyers ask</p>
              <h2 className="display h2" style={{ marginTop: 14 }}>
                Before you send an enquiry
              </h2>
            </div>
            <Link href="/contact" className="link-arrow">
              Ask something else
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- cta ---------------- */}
      <section className="cta" id="contact">
        <div className="shell band">
          <div className="cta__grid">
            <div>
              <p className="eyebrow" style={{ color: "rgba(255,255,255,.6)" }}>
                Request a quote
              </p>
              <h2 className="display h2" style={{ marginTop: 16 }}>
                Tell us what you need to pack.
              </h2>
              <p
                style={{
                  marginTop: 18,
                  maxWidth: "46ch",
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,.72)",
                }}
              >
                Send the product, the quantity and your artwork. We reply with material advice, a
                unit price and a sample timeline — usually within one working day.
              </p>

              <ul className="cta__list">
                <li>
                  <span style={{ color: "#e0b07a" }}>→</span> Custom size, colour and print
                </li>
                <li>
                  <span style={{ color: "#e0b07a" }}>→</span> Physical sample before production
                </li>
                <li>
                  <span style={{ color: "#e0b07a" }}>→</span> {company.port} · worldwide shipping
                </li>
              </ul>

              <div style={{ marginTop: 30, fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.8 }}>
                <p style={{ margin: 0 }}>{company.address}</p>
                <p style={{ margin: "4px 0 0" }}>
                  <a href={`mailto:${company.email}`} style={{ color: "#fff" }}>
                    {company.email}
                  </a>{" "}
                  · {company.phone}
                </p>
              </div>
            </div>

            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
