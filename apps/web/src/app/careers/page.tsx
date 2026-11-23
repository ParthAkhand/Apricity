import type { Metadata } from "next";
import { Lightbulb, Rocket, Users, ScanFace, MapPinned, BrainCircuit, Radio } from "lucide-react";
import { CareersForm } from "@/components/CareersForm";
import { PageHero, IconTile } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Careers", description: "Join Apricity Digital and build solutions that matter." };

const values = [
  { icon: Lightbulb, t: "Innovation", d: "We build with AI and current technology trends, and we care about solutions that hold up in real field conditions, not only in demos." },
  { icon: Users, t: "Teamwork", d: "Small teams, shared goals, honest feedback. You will work close to the people who use what you build." },
  { icon: Rocket, t: "Growth", d: "We empower our people to grow with the products they build. As a product widens, so does the work you can take on." },
];

export default function Careers() {
  return (
    <>
      <PageHero eyebrow="Join us" title="Empowering innovation, shaping tomorrow."
        lead="At Apricity Digital, we believe in innovation, teamwork and empowering our employees to grow. Join us to build solutions that matter. Be part of the AI evolution.">
        <a href="#apply" className="btn btn-primary">Apply now</a>
      </PageHero>
      <section className="container-x py-16 md:py-24">
        <Reveal>
          <p className="eyebrow">Why Apricity Digital</p>
          <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">Work on software that cities and teams use every day.</h2>
          <p className="mt-4 max-w-2xl text-ink/70">We are the software brand of Human Matrix Securite, building AI products for municipal corporations, enterprises and institutions. What you build here ends up in the hands of field supervisors, sector in-charges and commissioners.</p>
        </Reveal>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, t, d }, i) => (
            <li key={t}>
              <Reveal delay={i * 120} className="h-full">
                <div className="h-full rounded-3xl border border-ink/10 bg-white p-7 transition hover:-translate-y-1 hover:border-accent hover:shadow-xl"><IconTile><Icon aria-hidden /></IconTile><h2 className="mt-4 font-display text-xl font-bold">{t}</h2><p className="mt-1 text-sm text-ink/70">{d}</p></div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-paper-200 py-16 md:py-24">
        <div className="container-x">
          <p className="eyebrow">What you could work on</p>
          <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">Real problems across a growing product family.</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              [ScanFace, "Face recognition", "Attendance in 1:1 and 1:N group mode, with geotagging and leave management."],
              [MapPinned, "Maps and field operations", "Live GIS asset maps, geo-tagged audits and collection and vehicle monitoring."],
              [BrainCircuit, "AI scoring", "Hygiene scoring from photos and models that turn field data into decisions."],
              [Radio, "Dashboards", "Ward scorecards and a Commissioner View that stay consistent with the ULB dashboard."],
            ].map(([I, t, d], i) => {
              const Icon = I as typeof ScanFace;
              return <li key={t as string}><Reveal delay={i * 80} className="h-full"><div className="flex h-full gap-4 rounded-card bg-white p-6"><IconTile><Icon aria-hidden /></IconTile><div><h3 className="font-display text-lg font-semibold">{t as string}</h3><p className="mt-1 text-sm text-ink/70">{d as string}</p></div></div></Reveal></li>;
            })}
          </ul>
        </div>
      </section>

      <section id="apply" className="py-16 md:py-24">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Apply</h2>
          <p className="mb-6 mt-2 text-sm text-ink/70">Tell us about yourself and upload your resume. Fields marked * are required.</p>
          <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-8"><CareersForm /></div>
        </div>
      </section>
    </>
  );
}
