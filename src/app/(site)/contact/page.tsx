import type { Metadata } from "next";

export const instant = false;
import Image from "next/image";
import InquiryForm from "@/components/InquiryForm";
import { connection } from "next/server";
import { company } from "@/lib/catalog";
import { listProducts } from "@/lib/db";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Send your product, quantity and artwork. Maxgift Pro replies within one working day with material advice, unit price and a sample timeline.",
};

export default async function ContactPage() {
  await connection();
  const products = listProducts().map((p) => ({ slug: p.slug, title: p.title, code: p.code }));
  return (
    <section className="band" style={{ paddingTop: 56 }}>
      <div className="shell">
        <div
          style={{
            display: "grid",
            gap: 56,
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            alignItems: "start",
          }}
        >
          <div>
            <p className="eyebrow">Request a quote</p>
            <h1
              className="display h1"
              style={{ fontSize: "clamp(2.4rem, 4.6vw, 3.6rem)", marginTop: 16 }}
            >
              Tell us what you
              <br />
              need to pack.
            </h1>
            <p className="lede" style={{ marginTop: 20 }}>
              Send the product, the quantity and your artwork file. We come back with material
              advice, a unit price and a sample timeline — usually within one working day.
            </p>

            <dl className="specs" style={{ marginTop: 32 }}>
              <div className="specs__row">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </dd>
              </div>
              <div className="specs__row">
                <dt>Phone</dt>
                <dd style={{ fontVariantNumeric: "tabular-nums" }}>{company.phone}</dd>
              </div>
              <div className="specs__row">
                <dt>Office</dt>
                <dd>{company.address}</dd>
              </div>
              <div className="specs__row">
                <dt>Trade term</dt>
                <dd>{company.port} · worldwide consolidation</dd>
              </div>
              <div className="specs__row">
                <dt>Artwork</dt>
                <dd>JPG · PDF · AI · EPS</dd>
              </div>
            </dl>

            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 10",
                overflow: "hidden",
                background: "var(--color-sand)",
                marginTop: 28,
              }}
            >
              <Image
                src="/img/location-v1.jpg"
                alt="Maxgift Pro showroom, Shenzhen"
                fill
                sizes="(max-width: 900px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="cta" style={{ padding: "36px 28px" }}>
            <p
              style={{
                margin: "0 0 22px",
                fontFamily: "var(--font-display)",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              Enquiry form
            </p>
            <InquiryForm products={products} />
          </div>
        </div>
      </div>
    </section>
  );
}