import type { Metadata } from "next";
import { BrainCircuit, Gauge, MonitorSmartphone, Radio, ShieldCheck, Users, Wallet } from "lucide-react";
import { getProducts } from "@/lib/api";
import { DemoButton } from "@/components/DemoButton";
import { PageHero, IconTile } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ModuleExplorer } from "@/components/ModuleExplorer";

export const metadata: Metadata = { title: "Services", description: "AI-driven solutions, website and app development, data security and real-time information from Apricity Digital." };

const services = [
  { b: ["Intelligent automation", "Machine learning models", "Systems that predict outcomes", "Personalised customer interactions"], icon: BrainCircuit, t: "AI-driven solutions", d: "Tailor-made AI solutions that streamline operations and improve efficiency across business sectors: intelligent automation, machine learning models and AI systems that predict outcomes, optimise processes and personalise customer interactions." },
  { b: ["E-commerce platforms", "Specialised mobile apps", "Built for performance and scale", "User-centric design"], icon: MonitorSmartphone, t: "Websites and app development", d: "Responsive, user-centric websites and mobile applications, from e-commerce platforms to specialised mobile apps, built for performance, scalability and a good user experience." },
  { b: ["Encryption", "Secure storage", "Preventive measures", "Continuous monitoring"], icon: ShieldCheck, t: "Advanced data security", d: "Encryption, secure storage and attention to recognised standards to protect information from cyber threats and unauthorised access, with preventive measures and continuous monitoring." },
  { b: ["IoT device updates", "Transactions as they happen", "Delivered to your devices", "Faster, better-informed decisions"], icon: Radio, t: "Real-time information", d: "Updates from IoT devices to transactions delivered straight to your devices, so decisions are quicker and better informed." },
];

const benefits = [
  { icon: Gauge, t: "Team performance monitoring", d: "Real-time dashboards give oversight of team activity and on-ground performance." },
  { icon: Users, t: "Streamlined workforce", d: "Digital deployment management helps reduce labour cost and improve productivity." },
  { icon: Wallet, t: "Cost reduction", d: "Intelligent routing reduces fuel expense and improves fleet utilisation." },
  { icon: BrainCircuit, t: "Smart analytics", d: "AI-driven insights refine collection routes for efficiency." },
  { icon: ShieldCheck, t: "Compliance ease", d: "Automated reporting aligns with regulatory requirements and reduces administrative effort." },
];

const solutions = [
  { title: "Fleet tracking", description: "Real-time tracking and route optimisation for collection fleets." },
  { title: "Deployment plan monitoring", description: "Real-time insight into worker deployment across sanitation beats, for accountability and clarity." },
  { title: "Swachhata Setu", description: "A sanitation management suite that goes beyond attendance: IEC reporting and employee reporting in one platform." },
  { title: "MRF digital monitoring", description: "Operations of a material recovery facility in a single digital view for data-driven decisions." },
];

export default async function Services() {
  const products = await getProducts();
  const opts = products.map((p) => ({ slug: p.slug, name: p.name }));
  return (
    <>
      <PageHero eyebrow="Apricity services" title="Transforming challenges into opportunities with AI-driven solutions." lead="Driving innovation, empowering success.">
        <a href="#solutions" className="btn btn-ghost">See solutions</a>
      </PageHero>

      <section className="container-x py-16 md:py-24">
        <Reveal>
          <p className="eyebrow">What we do</p>
          <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">Four capabilities behind every product.</h2>
          <p className="mt-4 max-w-2xl text-ink/70">The products on this site are built on the same four capabilities. We also apply them to custom requirements, so talk to us if your need does not fit a ready product.</p>
        </Reveal>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map(({ icon: Icon, t, d, b }, i) => (
            <li key={t}>
              <Reveal delay={(i % 2) * 120} className="h-full">
                <div className="group h-full rounded-3xl border border-ink/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl">
                  <div className="flex items-center justify-between"><IconTile><Icon aria-hidden /></IconTile><span className="font-display text-3xl font-bold text-ink/10 transition group-hover:text-accent/40">0{i + 1}</span></div>
                  <h2 className="mt-4 font-display text-xl font-bold">{t}</h2>
                  <p className="mt-2 text-sm text-ink/75">{d}</p>
                  <ul className="mt-5 grid gap-2 border-t border-ink/10 pt-4 text-sm sm:grid-cols-2">{b.map((x) => <li key={x} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-d" aria-hidden />{x}</li>)}</ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section id="solutions" className="bg-paper-200 py-16">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Solutions</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-5xl">Green-tech and sanitation operations</h2>
            <p className="mt-4 max-w-2xl text-ink/70">Sanitation and waste operations run on people, vehicles and facilities spread across a city. These solutions put them in one digital view, so that accountability and clarity do not depend on phone calls and paper.</p>
          </Reveal>
          <div className="mt-8"><ModuleExplorer modules={solutions} /></div>
          <h3 className="mt-16 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Key benefits</h3>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {benefits.map(({ icon: Icon, t, d }, i) => (
              <li key={t}>
                <Reveal delay={(i % 3) * 100} className="h-full">
                  <div className="h-full rounded-2xl bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"><IconTile><Icon aria-hidden /></IconTile><h4 className="mt-3 font-display font-bold">{t}</h4><p className="mt-1 text-sm text-ink/70">{d}</p></div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <p className="eyebrow">How we work with you</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-5xl">From first call to first result.</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ["Talk", "Tell us what you run and what you need to see. We suggest a product or a custom approach."],
            ["Go live", "We set up on your own data. Go-live takes days, not months."],
            ["Review", "Once all workforce and locations are registered, measurable results appear in about 2 weeks."],
          ].map(([t, d], i) => (
            <li key={t}><Reveal delay={i * 100} className="h-full"><div className="h-full rounded-card border border-ink/10 bg-white p-7"><span className="font-display text-5xl font-semibold text-accent-d/80">0{i + 1}</span><h3 className="mt-3 font-display text-xl font-semibold">{t}</h3><p className="mt-2 text-sm text-ink/70">{d}</p></div></Reveal></li>
          ))}
        </ol>
      </section>

      <section className="on-dark grid-bg bg-ink py-16 text-center text-paper">
        <div className="container-x">
          <h2 className="font-display text-3xl font-medium sm:text-5xl">Talk to us about your requirement</h2>
          <p className="mx-auto mt-3 max-w-xl text-paper/70">Share what you need and we will come back with the right starting point.</p>
          <div className="mt-6"><DemoButton products={opts} /></div>
        </div>
      </section>
    </>
  );
}
