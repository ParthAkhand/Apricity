import { legalPages, seedProducts, seedSettings, type Product, type Settings } from "@apricity/shared";

export const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
export const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/** Returns parsed JSON, null on 404, and throws on network/5xx so callers can fall back to seed data. */
async function get<T>(path: string): Promise<T | null> {
  const res = await fetch(`${API_URL}/api/v1${path}`, { next: { revalidate: 60, tags: ["content"] } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${res.status}`);
  return (await res.json()) as T;
}

// Seeded fallback keeps the demo alive if the API is down.
const seedWithIds: Product[] = seedProducts.map((p) => ({ ...p, id: p.slug }));

export async function getProducts(): Promise<Product[]> {
  try {
    return (await get<Product[]>("/products")) ?? [];
  } catch {
    return seedWithIds.filter((p) => p.published);
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    return await get<Product>(`/products/${slug}`);
  } catch {
    return seedWithIds.find((p) => p.slug === slug && p.published) ?? null;
  }
}

export async function getSettings(): Promise<Settings> {
  try {
    return (await get<Settings>("/settings")) ?? seedSettings;
  } catch {
    return seedSettings;
  }
}

export async function getPage(slug: string): Promise<{ title: string; body: string } | null> {
  try {
    return await get<{ title: string; body: string }>(`/pages/${slug}`);
  } catch {
    return legalPages[slug] ?? null;
  }
}

/** Where a product card goes. EXTERNAL products never get an internal page. */
export const productHref = (p: Product) =>
  p.landingType === "EXTERNAL" && p.externalUrl ? p.externalUrl : `/products/${p.slug}`;
