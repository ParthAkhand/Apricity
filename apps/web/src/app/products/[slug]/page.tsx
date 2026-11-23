import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/api";
import { DemoButton } from "@/components/DemoButton";
import { LeadForm } from "@/components/LeadForm";
import { LiveCommand } from "@/components/LiveCommand";
import { AuditFlow } from "@/components/AuditFlow";
import { ModuleExplorer } from "@/components/ModuleExplorer";
import { Reveal } from "@/components/Reveal";
import { FaceScanHero } from "@/components/FaceScanHero";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

// Pre-render known internal products; products added later render on first visit (dynamicParams).
export async function generateStaticParams() {
  return (await getProducts()).filter((p) => p.landingType === "INTERNAL").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProduct((await params).slug);
  return p && p.landingType === "INTERNAL" ? { title: p.name, description: p.summary } : {};
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [p, all] = await Promise.all([getProduct(slug), getProducts()]);
  // EXTERNAL products never get an internal page.
  if (!p || p.landingType !== "INTERNAL") notFound();
  const opts = all.map((x) => ({ slug: x.slug, name: x.name }));
  const c = p.content;
  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    description: p.summary,
    applicationCategory: "BusinessApplication",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="on-dark grid-bg bg-ink text-paper">
        <div className="container-x grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
          <div>
          <p className="eyebrow">{p.name}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">{c.headline || p.tagline}</h1>
          <p className="mt-5 max-w-2xl text-paper/75">{p.summary}</p>
          <div className="mt-8"><DemoButton products={opts} defaultProduct={p.slug} /></div>
          {p.metrics.length > 0 && (
            <dl className="mt-10 flex flex-wrap gap-8">
              {p.metrics.map((m) => (
                <div key={m.label}><dd className="font-display text-3xl font-bold text-accent">{m.value}</dd><dt className="text-xs uppercase tracking-widest text-paper/70">{m.label}</dt></div>
              ))}
            </dl>
          )}
          </div>
          {p.slug === "matrix-track-2" && <LiveCommand />}
          {p.slug === "matrix-track" && <FaceScanHero />}
        </div>
      </section>

      {(c.problem || c.outcome) && (
        <section className="container-x grid gap-8 py-16 md:grid-cols-2">
          <Reveal><div className="h-full rounded-3xl border border-ink/10 bg-white p-6"><h2 className="eyebrow">The problem</h2><p className="mt-2 text-lg">{c.problem}</p></div></Reveal>
          <Reveal delay={120}><div className="h-full rounded-3xl bg-accent/15 p-6"><h2 className="eyebrow">The outcome</h2><p className="mt-2 text-lg">{c.outcome}</p></div></Reveal>
        </section>
      )}

      {p.modules.length > 0 && (
        <section className="bg-paper-200 py-16">
          <div className="container-x">
            <h2 className="eyebrow">Key modules</h2>
            <div className="mt-6"><ModuleExplorer modules={p.modules} /></div>
            {p.features.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {p.features.map((f) => <li key={f} className="rounded-full border border-ink/20 px-3 py-1 text-sm">{f}</li>)}
              </ul>
            )}
          </div>
        </section>
      )}

      {p.slug === "matrix-track-2" && (
        <section className="container-x py-16">
          <h2 className="eyebrow">Sanitation audit flow</h2>
          <div className="mt-6"><AuditFlow /></div>
        </section>
      )}

      {c.steps.length > 0 && (
        <section className="container-x py-16">
          <h2 className="eyebrow">How it works</h2>
          <ol className="mt-6 grid gap-5 md:grid-cols-4">
            {c.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-ink/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"><span className="font-display text-2xl font-bold text-accent-d">0{i + 1}</span><h3 className="mt-1 font-display font-bold">{s.title}</h3><p className="mt-1 text-sm text-ink/70">{s.description}</p></li>
            ))}
          </ol>
        </section>
      )}

      {p.audience.length > 0 && (
        <section className="bg-paper-200 py-14">
          <div className="container-x"><h2 className="eyebrow">Who it is for</h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">{p.audience.map((a) => <li key={a} className="rounded-xl bg-white p-4 font-medium transition hover:-translate-y-1 hover:shadow-lg">{a}</li>)}</ul>
          </div>
        </section>
      )}

      {c.faq.length > 0 && (
        <section className="container-x py-16">
          <h2 className="eyebrow">FAQ</h2>
          <div className="mt-6 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
            {c.faq.map((f) => (
              <details key={f.q} className="group p-5 open:bg-accent/5"><summary className="cursor-pointer font-display font-bold">{f.q}</summary><p className="mt-2 text-ink/75">{f.a}</p></details>
            ))}
          </div>
        </section>
      )}

      <section className="bg-paper-200 py-16">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-3xl font-bold">Request a demo of {p.name}</h2>
          <div className="mt-6"><LeadForm products={opts} source={`product-${p.slug}`} defaultProduct={p.slug} /></div>
        </div>
      </section>
    </>
  );
}
