import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://maxgiftpro.com"),
  title: {
    default: "Maxgift Pro — Custom eco bags, made in Shenzhen",
    template: "%s · Maxgift Pro",
  },
  description:
    "Custom reusable bags manufactured in Shenzhen: non-woven, PP woven, insulated cooler, cotton and jute. In-house printing, custom sizes and artwork, FOB Ningbo.",
  keywords: [
    "custom non woven bag",
    "PP woven bag manufacturer",
    "insulated cooler bag supplier",
    "custom cotton tote bag",
    "jute bag manufacturer China",
    "eco bag factory Shenzhen",
  ],
  openGraph: {
    title: "Maxgift Pro — Custom eco bags, made in Shenzhen",
    description:
      "Eight product lines, one factory. Custom sizes, colours and artwork, printed in-house and shipped FOB Ningbo.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
