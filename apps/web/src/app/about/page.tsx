import type { Metadata } from "next";
import { Building2, Compass, MapPin, Phone, Mail, Target } from "lucide-react";
import Link from "next/link";
import { ArrowRight, Lightbulb, Rocket, Users } from "lucide-react";
import { getProducts, getSettings, productHref } from "@/lib/api";
import { Partners } from "@/components/Partners";
import { PageHero, IconTile } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";

export const metadata: Metadata = { title: "About", description: "About Apricity Digital, a Human Matrix Securite company based in Indore." };

const initials = (n: string) => n.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w) && !w.endsWith(".")).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export default async function About() {
  const [s, products] = await Promise.all([getSettings(), getProducts()]);
  const people = [
    { role: s.founder.title, name: s.founder.name, text: "Guiding our vision with expertise and innovation, dedicated to driving excellence and building a sustainable future for our organisation." },
    // CONFIRM: VPE and Aditi Agarwal are listed on the previous site; confirm they should appear
    { role: "VPE", name: "Aditi Agarwal", text: "Shaping strategies that empower growth and success for our clients and team." },
  ];
  return (
    <>
      <PageHero eyebrow="About us" title="Building smarter solutions for a digital future."
        lead={`${s.name} is a ${s.parentCompany} company, building AI-powered software for cities, enterprises and institutions.`} />

      <section className="container-x grid items-start gap-10 py-16 md:grid-cols-5 md:py-24">
        <Reveal className="md:col-span-3">
          <p className="eyebrow">Our story</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">A software brand with a field-operations mindset.</h2>
          <div className="mt-6 space-y-4 text-ink/70">
            <p>{s.name} is the software brand of {s.parentCompany}, based in Indore. We build AI-powered products for the people who run cities, enterprises and institutions, and who need to see what is happening on the ground without waiting for a report.</p>
            <p>Our work starts from a simple question: can the people doing the work, the people approving it and the people accountable for it all look at the same record? Matrix Track 2.0, our command and control suite, is our answer for municipal corporations. Matrix Track, our face-attendance app, brings the same idea to attendance.</p>
            <p>We keep the technology practical. Products are meant to go live on a customer&apos;s own data within days, and we say plainly that measurable results need all workforce and locations to be registered first.</p>
          </div>
        </Reveal>
        <Reveal delay={120} className="md:col-span-2">
          <div className="on-dark rounded-card bg-ink p-8 text-paper shadow-[0_20px_60px_-24px_var(--accent-glow)]">
            <p className="eyebrow">At a glance</p>
            <dl className="mt-4 space-y-4 text-sm">
              {[["Company", s.name], ["Parent company", s.parentCompany], ["Based in", "Indore, Madhya Pradesh"], ["We serve", "Municipal corporations, enterprises, institutions"]].map(([k, v]) => (
                <div key={k} className="border-b border-white/10 pb-3 last:border-0"><dt className="text-xs uppercase tracking-widest text-paper/60">{k}</dt><dd className="mt-1 font-display text-lg">{v}</dd></div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      <section className="container-x grid gap-6 pb-16 md:grid-cols-2">
        {[
          { icon: Target, h: "Our mission", sub: "Empowering innovation, shaping tomorrow.", body: ["We harness AI and digital innovation to create smart, scalable solutions that enhance urban living and business growth. We develop technologies that simplify complex challenges: user-friendly apps, data-driven insights and responsive web design that help businesses and communities thrive.", "We aim to drive progress through technology, so that our solutions contribute to sustainable and intelligent growth."] },
          { icon: Compass, h: "Our vision", sub: "Shaping the future with AI-powered urban innovation.", body: ["To lead the future of AI-powered solutions, transforming cities and businesses through intelligent automation, and to create a world where technology drives innovation and builds smarter, more efficient communities."] },
        ].map(({ icon: Icon, h, sub, body }, i) => (
          <Reveal key={h} delay={i * 120} className="h-full">
            <div className="h-full rounded-3xl border border-ink/10 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
              <IconTile><Icon aria-hidden /></IconTile>
              <h2 className="mt-4 font-display text-2xl font-bold">{h}</h2>
              <p className="mt-1 font-medium">{sub}</p>
              {body.map((t) => <p key={t} className="mt-3 text-sm text-ink/75">{t}</p>)}
            </div>
          </Reveal>
        ))}
      </section>

      <section className="on-dark grid-bg bg-ink py-14 text-paper">
        <dl className="container-x grid grid-cols-3 gap-4 text-center">
          {s.stats.map((x) => (
            <div key={x.label}><dd className="font-display text-4xl font-bold text-accent md:text-5xl"><CountUp value={x.value} /></dd><dt className="mt-1 text-xs uppercase tracking-widest text-paper/70">{x.label}</dt></div>
          ))}
        </dl>
      </section>

      <section className="container-x py-16 md:py-24">
        <p className="eyebrow">What we stand for</p>
        <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">Innovation, teamwork and room to grow.</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { icon: Lightbulb, t: "Innovation", d: "We build with AI and current technology, and we keep what works in the field rather than what looks good on a slide." },
            { icon: Users, t: "Teamwork", d: "Small teams with shared goals and honest feedback. The people who build a product also listen to the people who use it." },
            { icon: Rocket, t: "Growth", d: "We empower our people to grow with the products they build, and we want our customers to grow with them." },
          ].map(({ icon: Icon, t, d }, i) => (
            <li key={t}><Reveal delay={i * 100} className="h-full"><div className="h-full rounded-card border border-ink/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"><IconTile><Icon aria-hidden /></IconTile><h3 className="mt-4 font-display text-xl font-semibold">{t}</h3><p className="mt-2 text-sm text-ink/70">{d}</p></div></Reveal></li>
          ))}
        </ul>
      </section>

      <section className="container-x pb-8">
        <p className="eyebrow">Who we are</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-5xl">Meet the founders</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {people.map((p, i) => (
            <li key={p.name}>
              <Reveal delay={i * 120} className="h-full">
                <div className="flex h-full gap-5 rounded-3xl border border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
                  <span aria-hidden className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-ink font-display text-xl font-bold text-accent">{initials(p.name)}</span>
                  <div>
                    <p className="text-sm font-semibold text-accent-d">{p.role}</p>
                    <p className="font-display text-xl font-bold">{p.name}</p>
                    <p className="mt-2 text-sm text-ink/75">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-x py-16 md:py-24">
        <p className="eyebrow">What we build</p>
        <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">Our products, in one place.</h2>
        <ul className="mt-8 grid gap-4">
          {products.map((p, i) => {
            const ext = p.landingType === "EXTERNAL";
            const inner = (<><div className="flex-1"><p className="eyebrow">{ext ? "External site" : "Product"}</p><h3 className="mt-1 font-display text-2xl font-semibold">{p.name}</h3><p className="mt-2 max-w-2xl text-sm text-ink/70">{p.summary}</p></div><span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition group-hover:bg-accent group-hover:text-ink">{ext ? "Visit site" : "Explore"}<ArrowRight size={16} aria-hidden /></span></>);
            const cls = "group flex flex-col gap-4 rounded-card border border-ink/10 bg-white p-7 transition hover:-translate-y-1 hover:border-accent hover:shadow-xl sm:flex-row sm:items-center";
            return <li key={p.id}><Reveal delay={i * 90}>{ext ? <a href={productHref(p)} target="_blank" rel="noopener noreferrer" className={cls}>{inner}<span className="sr-only">(opens in a new tab)</span></a> : <Link href={productHref(p)} className={cls}>{inner}</Link>}</Reveal></li>;
          })}
        </ul>
      </section>

      <Partners />

      <section className="bg-paper-200 py-16">
        <div className="container-x grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-ink p-8 text-paper on-dark">
              <Building2 className="text-accent" aria-hidden />
              <h2 className="mt-4 font-display text-2xl font-bold">Part of {s.parentCompany}</h2>
              <p className="mt-3 text-paper/80">{s.name} is the software brand of {s.parentCompany}.</p>
              <p className="mt-3 text-sm text-paper/60">Our products are built and supported by {s.name}, and sit within the wider {s.parentCompany} family of businesses.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <address className="h-full rounded-3xl bg-white p-8 not-italic text-ink/80">
              <h2 className="font-display text-2xl font-bold text-ink">Find us</h2>
              <p className="mt-3 font-medium text-ink">{s.name}</p>
              <p className="mt-2 flex gap-2"><MapPin size={18} className="mt-0.5 shrink-0 text-accent-d" aria-hidden />{s.address}</p>
              <p className="mt-2 flex gap-2"><Phone size={18} className="mt-0.5 shrink-0 text-accent-d" aria-hidden /><a className="underline" href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a></p>
              <p className="mt-2 flex gap-2"><Mail size={18} className="mt-0.5 shrink-0 text-accent-d" aria-hidden /><a className="underline" href={`mailto:${s.email}`}>{s.email}</a></p>
            </address>
          </Reveal>
        </div>
      </section>
    </>
  );
}
