import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getProducts, getSettings } from "@/lib/api";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Apricity Digital", template: "%s | Apricity Digital" },
  description:
    "Apricity Digital builds AI-driven software for cities and enterprises, including Matrix Track 2.0 and Matrix Track.",
  openGraph: { siteName: "Apricity Digital", type: "website" },
  icons: { icon: "/apricity-logo.png" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, products] = await Promise.all([getSettings(), getProducts()]);
  const opts = products.map((p) => ({ slug: p.slug, name: p.name }));
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.name,
    url: SITE_URL,
    logo: `${SITE_URL}/apricity-logo.png`,
    email: settings.email,
    telephone: settings.phone,
    address: { "@type": "PostalAddress", streetAddress: settings.address },
    parentOrganization: { "@type": "Organization", name: settings.parentCompany },
    founder: { "@type": "Person", name: settings.founder.name, jobTitle: settings.founder.title },
  };
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <Header products={opts} />
        <main id="main">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
