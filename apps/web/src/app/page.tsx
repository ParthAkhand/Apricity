import Link from "next/link";
import { BrainCircuit, Building2, GraduationCap, MonitorSmartphone, Radio, ShieldCheck } from "lucide-react";
import { getProducts, getSettings } from "@/lib/api";
import { Partners } from "@/components/Partners";
import { DemoButton } from "@/components/DemoButton";
import { HeroCommandCentre } from "@/components/HeroCommandCentre";
import { ProductCard } from "@/components/ProductCard";

export default async function Home() {
  const [products, s] = await Promise.all([getProducts(), getSettings()]);
  const opts = products.map((p) => ({ slug: p.slug, name: p.name }));
  const steps = [
    { t: "Register", d: "Add your workforce and locations." },
    { t: "Go live", d: "Start on your own data within days." },
    { t: "Review", d: "Track results on the command dashboard. Measurable results appear in about 2 weeks once all workforce and locations are registered." },
  ];
  const serve = [
    { icon: Building2, t: "Municipal corporations", d: "Commissioners and ULBs running sanitation and field operations." },
    { icon: ShieldCheck, t: "Enterprises", d: "Heads who need verified attendance and field visibility." },
    { icon: GraduationCap, t: "Institutions", d: "Schools and campuses marking attendance by face." },
  ];
  return (
    <>
      <section className="on-dark bg-ink text-paper">
        <div className="container-x grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="eyebrow">{s.brandLine}</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">{s.tagline}</h1>
            <p className="mt-5 max-w-lg text-paper/75">
              Unlock the power of AI to transform urban spaces and drive smarter, faster solutions for tomorrow’s cities.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <DemoButton products={opts} />
              <a href="#products" className="btn btn-ghost">Explore products</a>
            </div>
          </div>
          <HeroCommandCentre />
        </div>
        <div className="border-t border-white/10">
          <dl className="container-x grid grid-cols-3 gap-4 py-6 text-center">
            {s.stats.map((x) => (
              <div key={x.label}>
                <dd className="font-display text-3xl font-bold text-accent">{x.value}</dd>
                <dt className="text-xs uppercase tracking-widest text-paper/70">{x.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="products" className="container-x py-16 md:py-20">
        <p className="eyebrow">Our products</p>
        <h2 className="mt-2 font-display text-3xl font-bold">Innovating with AI to transform tomorrow</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {products.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
        </ul>
      </section>

      <section className="bg-paper-200 py-16 md:py-20">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Vision</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Shaping the future with AI-powered urban innovation</h2>
            <p className="mt-4 text-ink/75">
              Our vision is to lead the future of AI-powered solutions, transforming cities and businesses through intelligent automation.
              We aim to create a world where technology drives innovation and builds smarter, more efficient communities.
            </p>
          </div>
          <div>
            <p className="eyebrow">Why Apricity</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Innovating tomorrow with intelligent technology</h2>
            <p className="mt-4 text-ink/75">
              Apricity Digital delivers AI-powered solutions that drive innovation and efficiency. From custom apps to data analytics and
              web design, we create scalable, user-friendly technologies that help businesses and communities thrive in a digital world.
            </p>
            <Link href="/services" className="btn btn-dark mt-5">Our services</Link>
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-20">
        <p className="eyebrow">What we do</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BrainCircuit, t: "AI-driven solutions" },
            { icon: MonitorSmartphone, t: "Websites and app development" },
            { icon: ShieldCheck, t: "Advanced data security" },
            { icon: Radio, t: "Real-time information" },
          ].map(({ icon: Icon, t }) => (
            <li key={t} className="flex items-center gap-3 rounded-xl border border-ink/10 bg-white p-4 font-medium"><Icon className="text-accent-d" aria-hidden /> {t}</li>
          ))}
        </ul>
        <div className="mt-12 max-w-2xl">
          <p className="eyebrow">Company</p>
          <h2 className="mt-2 font-display text-3xl font-bold">We improve and innovate with the tech trends</h2>
          <p className="mt-3 text-ink/75">
            Our tech team constantly improves our products and services based on customer feedback, and we build new products using
            cutting-edge technologies and trends in the market.
          </p>
        </div>
      </section>

      <Partners />

      <section className="container-x py-16 md:py-20">
        <p className="eyebrow">How it works</p>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {steps.map((x, i) => (
            <li key={x.t} className="rounded-2xl border border-ink/10 bg-white p-6">
              <span className="font-display text-3xl font-bold text-accent-d">0{i + 1}</span>
              <h3 className="mt-2 font-display text-xl font-bold">{x.t}</h3>
              <p className="mt-2 text-sm text-ink/70">{x.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-paper-200 py-16 md:py-20">
        <div className="container-x">
          <p className="eyebrow">Who we serve</p>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {serve.map(({ icon: Icon, t, d }) => (
              <li key={t}><Icon className="text-accent-d" aria-hidden /><h3 className="mt-3 font-display text-xl font-bold">{t}</h3><p className="mt-1 text-sm text-ink/70">{d}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-dark bg-ink py-16 text-center text-paper">
        <div className="container-x">
          <h2 className="font-display text-3xl font-bold">See it on your own operations</h2>
          <p className="mx-auto mt-3 max-w-xl text-paper/75">Tell us about your city or organisation and we will arrange a walkthrough.</p>
          <div className="mt-6"><DemoButton products={opts} /></div>
        </div>
      </section>
    </>
  );
}
