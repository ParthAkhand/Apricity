import type { Metadata } from "next";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Products", description: "Matrix Track 2.0, Matrix Track and Insstanto from Apricity Digital." };

export default async function Products() {
  const products = await getProducts();
  return (
    <>
      <PageHero eyebrow="Products" title="Our products" lead="Pick a product to see what it does." />
      <div className="container-x py-16">
        <ul className="grid gap-6 md:grid-cols-3">
          {products.map((p, i) => <li key={p.id}><Reveal delay={i * 120} className="h-full"><ProductCard product={p} level={2} /></Reveal></li>)}
        </ul>
      </div>
    </>
  );
}
