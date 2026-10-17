"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-sand">
        <Image
          key={images[active]}
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-6 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={active === i}
              className={`relative aspect-square overflow-hidden border transition ${
                active === i ? "border-ink" : "border-transparent hover:border-line"
              }`}
            >
              <Image src={src} alt="" fill sizes="10vw" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
