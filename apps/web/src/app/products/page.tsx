import type { Metadata } from "next";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = { title: "Products", description: "Matrix Track 2.0, Matrix Track and Insstanto from Apricity Digital." };

export default async function Products() {
  const products = await getProducts();
  return (
    <div className="container-x py-16">
      <p className="eyebrow">Products</p>
      <h1 className="mt-2 font-display text-4xl font-bold">Our products</h1>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {products.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
      </ul>
    </div>
  );
}
