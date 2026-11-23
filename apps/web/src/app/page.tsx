import { Sparkles, BrainCircuit, Building2, GraduationCap, MonitorSmartphone, Radio, ShieldCheck } from "lucide-react";
import { getProducts, getSettings } from "@/lib/api";
import { Partners } from "@/components/Partners";
import { DemoButton } from "@/components/DemoButton";
import { LiveCommand } from "@/components/LiveCommand";
import { AuditFlow } from "@/components/AuditFlow";
import { ModuleExplorer } from "@/components/ModuleExplorer";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { ProductCard } from "@/components/ProductCard";
import { SplitText } from "@/components/SplitText";
import { Spot } from "@/components/Spot";
import { StoryScroll } from "@/components/StoryScroll";
import { Marquee } from "@/components/Marquee";
import { Parallax } from "@/components/Parallax";
import { CoverageRule, DashboardsSplit } from "@/components/Sections";

export default async function Home() {
  const [products, s] = await Promise.all([getProducts(), getSettings()]);
  const mt2 = products.find((p) => p.slug === "matrix-track-2");
  const opts = products.map((p) => ({ slug: p.slug, name: p.name }));
  const words = s.tagline.split(" ");
  const lead = words.slice(0, -2).join(" ");
  const key = words.slice(-2).join(" ");
  const steps = [
    { t: "Register", d: "Add your workforce and your locations: wards, beats and the assets in them. This is the one step that decides how fast results show up." },
    { t: "Go live", d: "Start on your own data within days. Field staff use the app, supervisors approve reports and the dashboards fill as the work happens." },
    { t: "Review", d: "Track results on the command dashboard. Measurable results appear in about 2 weeks once all workforce and locations are registered." },
  ];
  const serve = [
    { icon: Building2, t: "Municipal corporations", d: "Commissioners and ULBs running sanitation and field operations.", b: ["Sanitation audits with geo-tagged photos", "Collection and vehicle monitoring", "Commissioner View across wards"] },
    { icon: ShieldCheck, t: "Enterprises", d: "Heads who need verified attendance and field visibility.", b: ["Face attendance with location", "Leave management", "Planned vs actual manpower"] },
    { icon: GraduationCap, t: "Institutions", d: "Schools and campuses marking attendance by face.", b: ["1:N group mode for a whole classroom", "Verified, location-stamped marks", "Simple reports for managers"] },
  ];
  return (
    <>
      <section className="on-dark relative overflow-hidden bg-ink text-paper">
        <div className="glow-drift pointer-events-none absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-accent/15 blur-[120px]" aria-hidden />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="hero-out container-x relative grid items-center gap-12 pb-28 pt-16 md:grid-cols-2 md:pt-24">
          <div>
            <p className="eyebrow step-in">{s.brandLine}</p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-light leading-[1.02] tracking-[-0.03em]">
              <SplitText text={lead} className="text-paper/45" />{" "}
              <SplitText text={key} start={lead.length * 22 + 200} className="font-normal text-paper" />
              <Sparkles aria-hidden className="pop ml-2 inline-block h-[0.7em] w-[0.7em] align-baseline text-accent drop-shadow-[0_0_14px_var(--accent-glow)]" style={{ ["--d" as string]: "1500ms" }} />
            </h1>
            <p className="mt-6 max-w-lg text-paper/70">
              Unlock the power of AI to transform urban spaces and drive smarter, faster solutions for tomorrow’s cities.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <DemoButton products={opts} />
              <a href="#products" className="btn btn-ghost">Explore products</a>
              {/* Hand-drawn arrow doodle pointing from the CTAs toward the live dashboard. */}
              <svg viewBox="0 0 90 50" className="absolute -right-4 top-0 hidden h-12 w-24 text-accent lg:block" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path className="doodle" d="M4 40 C20 8 50 4 82 22 M70 12 L83 23 L68 31" />
              </svg>
            </div>
          </div>
          <Parallax speed={0.08}><LiveCommand /></Parallax>
        </div>
      </section>

      <div className="sheet">
      <dl className="container-x grid grid-cols-3 gap-4 py-10 text-center">
        {s.stats.map((x) => (
          <div key={x.label}>
            <dd className="font-display text-3xl font-semibold text-accent-d sm:text-5xl"><CountUp value={x.value} /></dd>
            <dt className="mt-1 text-xs uppercase tracking-widest text-ink/60">{x.label}</dt>
          </div>
        ))}
      </dl>

      <div className="border-y border-ink/10"><Marquee items={mt2?.modules.length ? mt2.modules.map((m) => m.title) : ["Matrix Track", "Swachh Parvv", "Task Force", "MRF and processing", "Survekshan", "Command dashboard"]} /></div>

      <section id="products" className="container-x py-16 md:py-20">
        <p className="eyebrow">Our products</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-5xl">Innovating with AI to transform tomorrow</h2>
        <p className="mt-4 max-w-2xl text-ink/70">Each product solves one real job for the people running a city or an organisation. Open a card to see what it does, who it is for and how it works.</p>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {products.map((p, i) => <li key={p.id}><Reveal delay={i * 120} className="h-full"><ProductCard product={p} /></Reveal></li>)}
        </ul>
      </section>

      <section className="container-x grid items-start gap-10 py-16 md:grid-cols-2 md:py-24">
        <Reveal>
          <p className="eyebrow">The platform story</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">One platform instead of six disconnected tools.</h2>
          <div className="mt-6 space-y-4 text-ink/70">
            <p>Attendance, sanitation audits, vehicle monitoring, processing and surveys usually live in different tools, kept by different teams. Leaders see late, partial figures, and field staff enter the same facts more than once.</p>
            <p>Matrix Track 2.0 brings these together. It starts with Matrix Track, our face-attendance app, and adds Swachh Parvv for civic sanitation audits, Task Force for collection and vehicle monitoring, MRF and processing, Survekshan for surveys and ranking, and a command dashboard with a Commissioner View.</p>
            <p>Because every module writes to the same record, the dashboards agree with each other, and the work done in the field is visible to decision makers the same day.</p>
          </div>
        </Reveal>
        <ul className="grid gap-4">
          {[
            ["Start small", "Begin with face attendance through Matrix Track and add modules as your operation needs them."],
            ["Your own data", "A city or organisation goes live on its own data within days, not after a long implementation."],
            ["Honest timelines", "Measurable results take about 2 weeks, once all workforce and locations are registered."],
          ].map(([t, d], i) => (
            <li key={t}><Reveal delay={i * 100}><div className="flex gap-4 rounded-card border border-ink/10 bg-paper-200 p-6"><span className="font-display text-3xl font-semibold text-accent-d">0{i + 1}</span><div><h3 className="font-display text-lg font-semibold">{t}</h3><p className="mt-1 text-sm text-ink/70">{d}</p></div></div></Reveal></li>
          ))}
        </ul>
      </section>

      <section className="container-x"><StoryScroll /></section>

      <section className="bg-paper-200 py-16 md:py-20">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">See it work</p>
            <h2 className="mt-2 font-display text-3xl font-bold">From a photo to a decision, in four steps</h2>
            <p className="mt-2 max-w-xl text-ink/70">Tap a step. This is the sanitation audit flow inside Matrix Track 2.0: a field supervisor takes a geo-tagged photo, AI gives a hygiene score from 1 to 10, the Sector In-charge approves, and the City Commissioner reviews. Planned versus actual manpower drives penalty deductions.</p>
          </Reveal>
          <div className="mt-8"><AuditFlow /></div>
        </div>
      </section>

      <CoverageRule />
      <DashboardsSplit />

      {mt2 && mt2.modules.length > 0 && (
        <section className="container-x py-16 md:py-20">
          <Reveal>
            <p className="eyebrow">One platform</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Everything in {mt2.name}</h2>
          </Reveal>
          <div className="mt-8"><ModuleExplorer modules={mt2.modules} audience={mt2.audience} /></div>
        </section>
      )}

      <section className="container-x py-16 md:py-20">
        <ul className="grid gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 sm:grid-cols-2">
          {[
            { icon: BrainCircuit, t: "AI-driven solutions", d: "Intelligent automation and models that predict outcomes and streamline operations." },
            { icon: MonitorSmartphone, t: "Websites and app development", d: "Responsive websites and mobile apps built for performance, scale and a good user experience." },
            { icon: ShieldCheck, t: "Advanced data security", d: "Encryption, secure storage and preventive measures that protect information from unauthorised access." },
            { icon: Radio, t: "Real-time information", d: "Updates from devices and transactions delivered straight to the people who decide." },
          ].map(({ icon: Icon, t, d }, i) => (
            <li key={t} className="bg-white"><Reveal delay={i * 80}><div className="flex items-center gap-4 p-7 font-display text-lg font-semibold transition hover:bg-paper-200"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-ink"><Icon aria-hidden /></span><span>{t}<span className="mt-1 block font-sans text-sm font-normal text-ink/65">{d}</span></span></div></Reveal></li>
          ))}
        </ul>
      </section>

      <Partners />

      <section className="container-x py-16 md:py-20">
        <p className="eyebrow">How it works</p>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {steps.map((x, i) => (
            <li key={x.t} className="rounded-card border border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="font-display text-3xl font-bold text-accent-d">0{i + 1}</span>
              <h3 className="mt-2 font-display text-xl font-bold">{x.t}</h3>
              <p className="mt-2 text-sm text-ink/70">{x.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x">
          <p className="eyebrow">Who we serve</p>
          <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">Built for people who run cities, teams and campuses.</h2>
          <p className="mt-4 max-w-2xl text-ink/70">Our customers are municipal corporations, enterprises and institutions. Each gets the same platform, shaped around the way their people actually work.</p>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {serve.map(({ icon: Icon, t, d, b }) => (
              <li key={t}><Spot className="on-dark h-full rounded-card border border-white/10 bg-ink-800 p-7 text-paper hover:shadow-[0_20px_60px_-20px_var(--accent-glow)]"><span className="relative grid h-12 w-12 place-items-center rounded-full bg-accent/15"><Icon className="text-accent" aria-hidden /></span><h3 className="relative mt-5 font-display text-xl font-semibold">{t}</h3><p className="relative mt-2 text-sm text-paper/70">{d}</p><ul className="relative mt-5 space-y-2 border-t border-white/10 pt-4 text-sm text-paper/80">{b.map((x) => <li key={x} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />{x}</li>)}</ul></Spot></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x pb-16 md:pb-24">
        <p className="eyebrow">Questions</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-5xl">Things people ask first.</h2>
        <div className="mt-8 divide-y divide-ink/10 rounded-card border border-ink/10 bg-white">
          {(mt2?.content.faq ?? []).map((f) => (
            <details key={f.q} className="group p-6 open:bg-accent/5"><summary className="cursor-pointer font-display text-lg font-semibold">{f.q}</summary><p className="mt-3 max-w-3xl text-ink/70">{f.a}</p></details>
          ))}
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="on-dark relative overflow-hidden rounded-sheet bg-ink px-6 py-16 text-center text-paper"><div className="glow-drift pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" aria-hidden /><div className="relative">
          <h2 className="font-display text-3xl font-medium sm:text-5xl">See it on your own operations</h2>
          <p className="mx-auto mt-3 max-w-xl text-paper/75">Tell us about your city or organisation and we will arrange a walkthrough.</p>
          <div className="mt-6"><DemoButton products={opts} /></div>
        </div></div>
      </section>
      </div>
    </>
  );
}
