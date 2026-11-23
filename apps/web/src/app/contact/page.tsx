import type { Metadata } from "next";
import { getProducts, getSettings } from "@/lib/api";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Apricity Digital." };

export default async function Contact() {
  const [s, products] = await Promise.all([getSettings(), getProducts()]);
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`;
  return (
    <div className="container-x grid gap-12 py-16 md:grid-cols-5">
      <div className="md:col-span-3">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Get in touch</h1>
        <p className="mt-3 mb-8 text-ink/75">Reach out, share a question or provide feedback on our products. We will respond as soon as possible.</p>
        <LeadForm products={products.map((p) => ({ slug: p.slug, name: p.name }))} source="contact-page" />
      </div>
      <address className="not-italic md:col-span-2">
        <h2 className="font-display text-xl font-bold">{s.name}</h2>
        <p className="mt-3 text-ink/80">{s.address}</p>
        <p className="mt-3"><a className="text-accent-d underline" href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a></p>
        <p><a className="text-accent-d underline" href={`mailto:${s.email}`}>{s.email}</a></p>
        <p className="mt-3"><a className="text-accent-d underline" href={map} target="_blank" rel="noopener noreferrer">View on map<span className="sr-only"> (opens in a new tab)</span></a></p>
      </address>
    </div>
  );
}
