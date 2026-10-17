import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maxgiftpro.com"),
  title: {
    default: "Maxgift — Custom eco bags, made in Shenzhen",
    template: "%s · Maxgift",
  },
  description:
    "Custom reusable bags manufactured in Shenzhen: non-woven, PP woven, insulated cooler, cotton and jute. In-house printing, custom sizes and artwork, FOB Ningbo.",
  keywords: [
    "custom non woven bag",
    "PP woven bag manufacturer",
    "insulated cooler bag",
    "custom cotton tote",
    "jute bag supplier",
    "eco bag factory Shenzhen",
  ],
  openGraph: {
    title: "Maxgift — Custom eco bags, made in Shenzhen",
    description:
      "Eight product lines, one factory. Custom sizes, colours and artwork, printed in-house and shipped FOB Ningbo.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
