import type { Metadata } from "next";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { DemoButton } from "@/components/DemoButton";

export const metadata: Metadata = { title: "Products", description: "Matrix Track 2.0, Matrix Track and Insstanto from Apricity Digital." };

export default async function Products() {
  const products = await getProducts();
  return (
    <>
      <PageHero eyebrow="Products" title="Our products" lead="Software for municipal field operations, workforce attendance and everyday services. Pick a product to see what it does, who it is for and how it works." />
      <div className="container-x py-16">
        <ul className="grid gap-6 md:grid-cols-3">
          {products.map((p, i) => <li key={p.id}><Reveal delay={i * 120} className="h-full"><ProductCard product={p} level={2} /></Reveal></li>)}
        </ul>
      </div>

      <section className="bg-paper-200 py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">How the products fit together</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">Start with attendance. Grow into a command centre.</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["Matrix Track", "Our face-attendance app. It handles 1:1 and 1:N group attendance, geotagging and leave management, for field crews, classrooms and offices. It is also the entry module of Matrix Track 2.0."],
              ["Matrix Track 2.0", "The full operations suite. It brings Matrix Track attendance together with Swachh Parvv, Task Force, MRF and processing, Survekshan and a command dashboard with a Commissioner View."],
              ["Insstanto", "A separate on-demand services marketplace for homes and businesses. It lives on its own site, so its card opens insstanto.com in a new tab."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 100} className="h-full">
                <div className="h-full rounded-card border border-ink/10 bg-white p-7"><span className="font-display text-3xl font-semibold text-accent-d">0{i + 1}</span><h3 className="mt-2 font-display text-xl font-semibold">{t}</h3><p className="mt-2 text-sm text-ink/70">{d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <div className="on-dark relative overflow-hidden rounded-sheet bg-ink px-6 py-14 text-center text-paper">
          <div className="glow-drift pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-3xl font-medium sm:text-5xl">Not sure which product fits?</h2>
            <p className="mx-auto mt-3 max-w-xl text-paper/70">Tell us what you run and what you need to see. We will point you to the right starting point.</p>
            <div className="mt-6"><DemoButton products={products.map((p) => ({ slug: p.slug, name: p.name }))} /></div>
          </div>
        </div>
      </section>
    </>
  );
}
