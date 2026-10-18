"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { saveProductAction } from "@/app/admin/actions";
import { families } from "@/lib/catalog";
import type { ProductRow } from "@/lib/db";

type Spec = { label: string; value: string };

export default function ProductForm({ product }: { product?: ProductRow }) {
  const editing = Boolean(product);

  const [title, setTitle] = useState(product?.title ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(editing);
  const [code, setCode] = useState(product?.code ?? "");
  const [family, setFamily] = useState(product?.family ?? "non-woven");
  const [blurb, setBlurb] = useState(product?.blurb ?? "");
  const [intro, setIntro] = useState(product?.intro.join("\n\n") ?? "");
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [specs, setSpecs] = useState<Spec[]>(
    product?.specs?.length ? product.specs : [{ label: "Material", value: "" }],
  );
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [published, setPublished] = useState(product?.published ?? true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [pending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  const guessSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const onTitle = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(guessSlug(value));
  };

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setUploadError("");
    try {
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "upload failed");
        setImages((prev) => [...prev, data.path]);
      }
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <form
      action={(formData) => {
        formData.set("imagesJson", JSON.stringify(images));
        formData.set("specsJson", JSON.stringify(specs.filter((s) => s.label.trim())));
        startTransition(() => saveProductAction(formData));
      }}
      className="admin-form"
    >
      {product ? <input type="hidden" name="id" value={product.id} /> : null}

      <div className="admin-form__grid">
        <label className="afield">
          <span>Title *</span>
          <input value={title} onChange={(e) => onTitle(e.target.value)} name="title" required />
        </label>

        <label className="afield">
          <span>URL slug *</span>
          <input
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(guessSlug(e.target.value));
            }}
            name="slug"
            required
          />
          <em>/products/{slug || "…"}</em>
        </label>

        <label className="afield">
          <span>Model code</span>
          <input value={code} onChange={(e) => setCode(e.target.value)} name="code" placeholder="NWB-B24001" />
        </label>

        <label className="afield">
          <span>Material family</span>
          <select value={family} onChange={(e) => setFamily(e.target.value as typeof family)} name="family">
            {families.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="afield">
        <span>Short blurb (one line, shown on cards)</span>
        <input value={blurb} onChange={(e) => setBlurb(e.target.value)} name="blurb" />
      </label>

      <label className="afield">
        <span>Description — blank line between paragraphs</span>
        <textarea value={intro} onChange={(e) => setIntro(e.target.value)} name="intro" rows={6} />
      </label>

      {/* images */}
      <div className="afield">
        <span>Images</span>
        <div className="admin-images">
          {images.map((src, i) => (
            <figure key={`${src}-${i}`} className="admin-image">
              <Image src={src} alt="" width={120} height={120} className="object-cover" />
              <div className="admin-image__bar">
                <button type="button" onClick={() => setImages((p) => p.filter((_, j) => j !== i))}>
                  remove
                </button>
                {i > 0 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setImages((p) => {
                        const next = [...p];
                        [next[i - 1], next[i]] = [next[i], next[i - 1]];
                        return next;
                      })
                    }
                  >
                    ←
                  </button>
                ) : null}
              </div>
              {i === 0 ? <figcaption>cover</figcaption> : null}
            </figure>
          ))}

          <label className="admin-upload">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => upload(e.target.files)}
              hidden
            />
            <span>{uploading ? "uploading…" : "+ upload"}</span>
          </label>
        </div>
        {uploadError ? <p className="admin-error">{uploadError}</p> : null}
        <p className="admin-hint">First image is the cover. JPG / PNG / WebP / AVIF · up to 8 MB each.</p>
      </div>

      {/* specs */}
      <div className="afield">
        <span>Specification table</span>
        <div className="admin-specs">
          {specs.map((row, i) => (
            <div className="admin-spec-row" key={i}>
              <input
                value={row.label}
                placeholder="Label (e.g. Material)"
                onChange={(e) =>
                  setSpecs((p) => p.map((s, j) => (j === i ? { ...s, label: e.target.value } : s)))
                }
              />
              <input
                value={row.value}
                placeholder="Value (e.g. PP non woven)"
                onChange={(e) =>
                  setSpecs((p) => p.map((s, j) => (j === i ? { ...s, value: e.target.value } : s)))
                }
              />
              <button type="button" onClick={() => setSpecs((p) => p.filter((_, j) => j !== i))}>
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            className="admin-add"
            onClick={() => setSpecs((p) => [...p, { label: "", value: "" }])}
          >
            + add row
          </button>
        </div>
      </div>

      <div className="admin-checks">
        <label>
          <input type="checkbox" name="featured" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Show on the homepage
        </label>
        <label>
          <input
            type="checkbox"
            name="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Published
        </label>
      </div>

      <div className="admin-form__actions">
        <button type="submit" className="btn btn--solid" disabled={pending || uploading}>
          {pending ? "Saving…" : editing ? "Save changes" : "Create product"}
        </button>
        <a className="btn btn--outline" href="/admin">
          Cancel
        </a>
      </div>
    </form>
  );
}
