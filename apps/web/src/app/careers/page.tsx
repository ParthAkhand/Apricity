import type { Metadata } from "next";
import { Lightbulb, Rocket, Users } from "lucide-react";
import { CareersForm } from "@/components/CareersForm";
import { PageHero, IconTile } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Careers", description: "Join Apricity Digital and build solutions that matter." };

const values = [
  { icon: Lightbulb, t: "Innovation", d: "We build with AI and current technology trends." },
  { icon: Users, t: "Teamwork", d: "Small teams, shared goals, honest feedback." },
  { icon: Rocket, t: "Growth", d: "We empower our people to grow with the products they build." },
];

export default function Careers() {
  return (
    <>
      <PageHero eyebrow="Join us" title="Empowering innovation, shaping tomorrow."
        lead="At Apricity Digital, we believe in innovation, teamwork and empowering our employees to grow. Join us to build solutions that matter. Be part of the AI evolution.">
        <a href="#apply" className="btn btn-primary">Apply now</a>
      </PageHero>
      <section className="container-x py-14">
        <ul className="grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, t, d }, i) => (
            <li key={t}>
              <Reveal delay={i * 120} className="h-full">
                <div className="h-full rounded-3xl border border-ink/10 bg-white p-7 transition hover:-translate-y-1 hover:border-accent hover:shadow-xl"><IconTile><Icon aria-hidden /></IconTile><h2 className="mt-4 font-display text-xl font-bold">{t}</h2><p className="mt-1 text-sm text-ink/70">{d}</p></div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <section id="apply" className="bg-paper-200 py-14">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-2xl font-bold">Apply</h2>
          <p className="mb-6 mt-2 text-sm text-ink/70">Tell us about yourself and upload your resume. Fields marked * are required.</p>
          <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-8"><CareersForm /></div>
        </div>
      </section>
    </>
  );
}
