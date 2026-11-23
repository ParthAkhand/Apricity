import type { Metadata } from "next";
import { CalendarCheck, ExternalLink, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { getProducts, getSettings } from "@/lib/api";
import { LeadForm } from "@/components/LeadForm";
import { PageHero, IconTile } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Apricity Digital." };

export default async function Contact() {
  const [s, products] = await Promise.all([getSettings(), getProducts()]);
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`;
  const card = "flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-5 transition hover:-translate-y-1 hover:border-accent hover:shadow-lg";
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch" lead="Reach out, share a question or provide feedback on our products. We will respond as soon as possible." />
      <div className="container-x grid gap-10 py-16 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-xl sm:p-8">
            <LeadForm products={products.map((p) => ({ slug: p.slug, name: p.name }))} source="contact-page" />
          </div>
        </Reveal>
        <address className="space-y-4 not-italic md:col-span-2">
          <Reveal><a className={card} href={`tel:${s.phone.replace(/\s/g, "")}`}><IconTile><Phone aria-hidden /></IconTile><span><span className="block text-xs font-semibold uppercase tracking-widest text-accent-d">Phone</span>{s.phone}</span></a></Reveal>
          <Reveal delay={100}><a className={card} href={`mailto:${s.email}`}><IconTile><Mail aria-hidden /></IconTile><span><span className="block text-xs font-semibold uppercase tracking-widest text-accent-d">Email</span>{s.email}</span></a></Reveal>
          <Reveal delay={200}>
            <a className={card} href={map} target="_blank" rel="noopener noreferrer">
              <IconTile><MapPin aria-hidden /></IconTile>
              <span><span className="block text-xs font-semibold uppercase tracking-widest text-accent-d">{s.name}</span>{s.address}<span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent-d">View on map <ExternalLink size={14} aria-hidden /><span className="sr-only"> (opens in a new tab)</span></span></span>
            </a>
          </Reveal>
        </address>
      </div>

      <section className="bg-paper-200 py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">What to write to us about</p>
            <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">Tell us what you need.</h2>
          </Reveal>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { icon: CalendarCheck, t: "A product demo", d: "Tell us your organisation, your role and the product you want to see. Matrix Track 2.0, Matrix Track or both." },
              { icon: MessageSquare, t: "A question or feedback", d: "Share a question about our products or feedback on what you have seen. We will respond as soon as possible." },
              { icon: Phone, t: "A direct conversation", d: "Prefer to talk? Call or email using the details above and mention which product you are interested in." },
            ].map(({ icon: Icon, t, d }, i) => (
              <li key={t}><Reveal delay={i * 100} className="h-full"><div className="h-full rounded-card border border-ink/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"><IconTile><Icon aria-hidden /></IconTile><h3 className="mt-4 font-display text-xl font-semibold">{t}</h3><p className="mt-2 text-sm text-ink/70">{d}</p></div></Reveal></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
