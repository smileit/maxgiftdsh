import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart";
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
  metadataBase: new URL("https://maxgift.co"),
  title: {
    default: "Maxgift — Considered gifts, beautifully made",
    template: "%s · Maxgift",
  },
  description:
    "A small studio making gifts worth keeping: hand-poured candles, woven throws, copper coffee kit and paper goods. Hand-wrapped, shipped worldwide.",
  openGraph: {
    title: "Maxgift — Considered gifts, beautifully made",
    description:
      "Objects made properly, by people we know, in quantities that stay honest. Hand-wrapped in our Lisbon studio.",
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
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
