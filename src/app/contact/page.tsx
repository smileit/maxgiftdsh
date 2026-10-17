import type { Metadata } from "next";
import Image from "next/image";
import InquiryForm from "@/components/InquiryForm";
import { company, products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Send your product, quantity and artwork. Maxgift replies within one working day with material advice, unit price and a sample timeline.",
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const params = await searchParams;
  const raw = Array.isArray(params.product) ? params.product[0] : params.product;
  const preset = products.find((p) => p.slug === raw)?.title;

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:py-16">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <p className="eyebrow text-ink-soft">Request a quote</p>
          <h1 className="display mt-4 text-[clamp(2.4rem,4.6vw,3.8rem)]">
            Tell us what you need to pack.
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            Send the product, the quantity and your artwork file. We come back with material advice,
            a unit price and a sample timeline — usually within one working day.
          </p>

          <dl className="mt-10 divide-y divide-line border-y border-line text-sm">
            <div className="grid grid-cols-[90px_1fr] gap-4 py-4">
              <dt className="text-ink-soft">Email</dt>
              <dd>
                <a href={`mailto:${company.email}`} className="underline-grow">
                  {company.email}
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-[90px_1fr] gap-4 py-4">
              <dt className="text-ink-soft">Phone</dt>
              <dd className="tabular-nums">{company.phone}</dd>
            </div>
            <div className="grid grid-cols-[90px_1fr] gap-4 py-4">
              <dt className="text-ink-soft">Office</dt>
              <dd className="leading-relaxed">{company.address}</dd>
            </div>
            <div className="grid grid-cols-[90px_1fr] gap-4 py-4">
              <dt className="text-ink-soft">Terms</dt>
              <dd>{company.port} · worldwide consolidation</dd>
            </div>
          </dl>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-sand">
            <Image
              src="/img/location-v3.jpg"
              alt="Maxgift factory"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-cream/85 px-3 py-1 text-[10px] tracking-[0.16em] uppercase backdrop-blur-sm">
              Shenzhen · Guangdong
            </span>
          </div>
        </div>

        <div className="lg:pt-4">
          <InquiryForm preset={preset} />
        </div>
      </div>
    </section>
  );
}
