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
import { Parallax } from "@/components/Parallax";
import { CoverageRule, DashboardsSplit } from "@/components/Sections";
import { Check, ScanFace, Users } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

// Pre-render known internal products; products added later render on first visit (dynamicParams).
export async function generateStaticParams() {
  return (await getProducts()).filter((p) => p.landingType === "INTERNAL").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProduct((await params).slug);
  if (!p || p.landingType !== "INTERNAL") return {};
  const url = `/products/${p.slug}`;
  return { title: p.name, description: p.summary, alternates: { canonical: url }, openGraph: { title: p.name, description: p.summary, url, type: "website" } };
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
    publisher: { "@type": "Organization", name: "Apricity Digital" },
  };
  // FAQPage markup makes the FAQ eligible for rich results.
  const faqLd = c.faq.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <section className="on-dark grid-bg relative overflow-hidden bg-ink text-paper">
        <div className="glow-drift pointer-events-none absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-accent/15 blur-[120px]" aria-hidden />
        <div className="container-x relative grid items-center gap-10 pb-28 pt-16 md:pt-24 lg:grid-cols-2">
          <div>
          <p className="eyebrow">{p.name}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-light leading-tight tracking-[-0.03em] sm:text-6xl">{c.headline || p.tagline}</h1>
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
          <Parallax speed={0.06}>{p.slug === "matrix-track-2" && <LiveCommand />}
          {p.slug === "matrix-track" && <FaceScanHero />}</Parallax>
        </div>
      </section>

      <div className="sheet">
      {(c.problem || c.outcome) && (
        <section className="container-x grid gap-8 py-16 md:grid-cols-2 md:py-24">
          <Reveal><div className="h-full rounded-card border border-ink/10 bg-white p-8 md:p-10"><h2 className="eyebrow">The problem</h2><p className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight">{c.problem}</p><p className="mt-4 text-sm text-ink/60">Without one shared record, every report is a separate effort and every figure needs explaining.</p></div></Reveal>
          <Reveal delay={120}><div className="on-dark h-full rounded-card bg-ink p-8 text-paper shadow-[0_20px_60px_-24px_var(--accent-glow)] md:p-10"><h2 className="eyebrow">The outcome</h2><p className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight">{c.outcome}</p><p className="mt-4 text-sm text-paper/60">The same data feeds every view, so teams spend time acting on figures instead of reconciling them.</p></div></Reveal>
        </section>
      )}

      {p.modules.length > 0 && (
        <section className="bg-paper-200 py-16 md:py-24">
          <div className="container-x">
            <h2 className="eyebrow">Key modules</h2>
            <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-5xl">What is inside {p.name}</h3>
            <div className="mt-8"><ModuleExplorer modules={p.modules} audience={p.audience} /></div>
            {p.features.length > 0 && (
              <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {p.features.map((f) => <li key={f} className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-4 text-sm font-medium"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-ink"><Check size={14} aria-hidden /></span>{f}</li>)}
              </ul>
            )}
          </div>
        </section>
      )}

      {p.slug === "matrix-track-2" && (
        <>
          <section className="container-x py-16 md:py-24">
            <h2 className="eyebrow">Sanitation audit flow</h2>
            <h3 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">From a photo to a decision, with a name against every step.</h3>
            <p className="mt-4 max-w-2xl text-ink/70">Every audit passes through the same four hands. The supervisor captures, AI scores, the Sector In-charge approves and the City Commissioner reviews, so a score is never just a number: it has a photo, a place and a person behind it.</p>
            <div className="mt-8"><AuditFlow /></div>
          </section>
          <CoverageRule />
          <DashboardsSplit />
        </>
      )}

      {p.slug === "matrix-track" && (
        <section className="container-x py-16 md:py-24">
          <h2 className="eyebrow">Two ways to mark attendance</h2>
          <h3 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">One person at a time, or a whole group in one capture.</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              { icon: ScanFace, t: "1:1 attendance", d: "Each person marks their own attendance by face. It suits offices and individual check-ins where every mark must be tied to one person.", b: ["Face match recorded with the mark", "Location attached to each mark", "Leave management alongside"] },
              { icon: Users, t: "1:N group mode", d: "Capture a whole field crew or classroom in one go, instead of queueing people one by one. It suits places where time at the gate matters.", b: ["Mark a crew or classroom together", "Same verified, location-stamped record", "Rolls up into the same reports"] },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 120} className="h-full">
                <div className="on-dark h-full rounded-card bg-ink p-8 text-paper"><span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-ink"><x.icon aria-hidden /></span><h4 className="mt-5 font-display text-2xl font-semibold">{x.t}</h4><p className="mt-3 text-paper/70">{x.d}</p><ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm text-paper/85">{x.b.map((y) => <li key={y} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />{y}</li>)}</ul></div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {c.steps.length > 0 && (
        <section className="container-x py-16 md:py-24">
          <h2 className="eyebrow">How it works</h2>
          <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-5xl">{c.steps.length} steps from setup to a result you can read.</h3>
          <ol className="mt-8 grid gap-5 md:grid-cols-4">
            {c.steps.map((s, i) => (
              <li key={s.title} className="rounded-card border border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"><span className="font-display text-5xl font-semibold text-accent-d/80">0{i + 1}</span><h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3><p className="mt-2 text-sm text-ink/70">{s.description}</p></li>
            ))}
          </ol>
        </section>
      )}

      {p.audience.length > 0 && (
        <section className="bg-paper-200 py-16 md:py-24">
          <div className="container-x"><h2 className="eyebrow">Who it is for</h2>
            <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-5xl">Made for the people who use it every day.</h3>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">{p.audience.map((a, i) => <li key={a} className="rounded-card bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"><span className="font-display text-3xl font-semibold text-accent-d">0{i + 1}</span><p className="mt-3 font-display text-xl font-semibold">{a}</p></li>)}</ul>
          </div>
        </section>
      )}

      {c.faq.length > 0 && (
        <section className="container-x py-16 md:py-24">
          <h2 className="eyebrow">FAQ</h2>
          <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-5xl">Straight answers.</h3>
          <div className="mt-8 divide-y divide-ink/10 rounded-card border border-ink/10 bg-white">
            {c.faq.map((f) => (
              <details key={f.q} className="group p-5 open:bg-accent/5"><summary className="cursor-pointer font-display text-lg font-semibold">{f.q}</summary><p className="mt-2 text-ink/75">{f.a}</p></details>
            ))}
          </div>
        </section>
      )}

      <section className="bg-paper-200 py-16 md:py-24">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Request a demo of {p.name}</h2>
          <p className="mt-3 text-ink/70">Tell us about your organisation and what you want to see. We will arrange a walkthrough on your own use case.</p>
          <div className="mt-6"><LeadForm products={opts} source={`product-${p.slug}`} defaultProduct={p.slug} /></div>
        </div>
      </section>
    </div>
    </>
  );
}
