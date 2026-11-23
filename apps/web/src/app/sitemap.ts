import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/api";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = (await getProducts()).filter((p) => p.landingType === "INTERNAL");
  const paths = ["", "/products", "/about", "/services", "/contact", "/careers", "/privacy-policy", "/terms-and-conditions", "/support-policy", ...products.map((p) => `/products/${p.slug}`)];
  return paths.map((p) => ({ url: `${SITE}${p}`, lastModified: new Date(), priority: p === "" ? 1 : p.startsWith("/products") ? 0.8 : 0.5 }));
}
