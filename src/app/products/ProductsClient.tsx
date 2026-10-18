"use client";

import { useEffect, useMemo, useState } from "react";
import type { Family } from "@/lib/catalog";
import { families, products } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export default function ProductsClient() {
  const [family, setFamily] = useState<Family | "all">("all");

  // Read ?family= on the client so the route stays fully static.
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("family");
    if (value && families.some((f) => f.id === value)) setFamily(value as Family);
  }, []);

  const list = useMemo(
    () => (family === "all" ? products : products.filter((p) => p.family === family)),
    [family],
  );

  return (
    <section className="band" style={{ paddingTop: 48 }}>
      <div className="shell">
        <div className="section-head">
          <div className="section-head__text">
            <p className="eyebrow">Catalogue</p>
            <h1 className="display h2" style={{ marginTop: 14 }}>
              All product lines
            </h1>
            <p>
              Eight lines, each made to your size, colour and artwork. The specs below are the
              standard build — change anything.
            </p>
          </div>
          <p className="eyebrow eyebrow--plain">
            {list.length} {list.length === 1 ? "line" : "lines"}
          </p>
        </div>

        <div className="chips" role="group" aria-label="Filter by material">
          <button className="chip" aria-pressed={family === "all"} onClick={() => setFamily("all")}>
            All
          </button>
          {families.map((f) => (
            <button
              key={f.id}
              className="chip"
              aria-pressed={family === f.id}
              onClick={() => setFamily(f.id)}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="grid-products" style={{ marginTop: 36 }}>
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        {list.length === 0 ? (
          <p style={{ padding: "72px 0", textAlign: "center", color: "var(--color-ink-soft)" }}>
            Nothing in this material family yet — try another.
          </p>
        ) : null}

        <div
          style={{
            marginTop: 64,
            paddingTop: 28,
            borderTop: "1px solid var(--color-line)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <p style={{ margin: 0, fontSize: 15, color: "var(--color-ink-soft)", maxWidth: "52ch" }}>
            Not sure which material suits your product? Send the dimensions and what goes inside —
            we will recommend the line and the print method.
          </p>
          <a href="/contact" className="btn btn--solid">
            Ask for advice
          </a>
        </div>
      </div>
    </section>
  );
}
