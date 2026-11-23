import type { Metadata } from "next";
import { Lightbulb, Rocket, Users } from "lucide-react";
import { CareersForm } from "@/components/CareersForm";

export const metadata: Metadata = { title: "Careers", description: "Join Apricity Digital and build solutions that matter." };

const values = [
  { icon: Lightbulb, t: "Innovation", d: "We build with AI and current technology trends." },
  { icon: Users, t: "Teamwork", d: "Small teams, shared goals, honest feedback." },
  { icon: Rocket, t: "Growth", d: "We empower our people to grow with the products they build." },
];

export default function Careers() {
  return (
    <>
      <section className="on-dark bg-ink py-16 text-paper md:py-20">
        <div className="container-x max-w-3xl">
          <p className="eyebrow">Join us</p>
          <h1 className="mt-2 font-display text-4xl font-bold">Empowering innovation, shaping tomorrow.</h1>
          <p className="mt-4 text-lg text-paper/80">
            At Apricity Digital, we believe in innovation, teamwork and empowering our employees to grow. Join us to build solutions that matter. Be part of the AI evolution.
          </p>
        </div>
      </section>
      <section className="container-x py-14">
        <ul className="grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, t, d }) => (
            <li key={t}><Icon className="text-accent-d" aria-hidden /><h2 className="mt-3 font-display text-xl font-bold">{t}</h2><p className="mt-1 text-sm text-ink/70">{d}</p></li>
          ))}
        </ul>
      </section>
      <section className="bg-paper-200 py-14">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-2xl font-bold">Apply</h2>
          <p className="mb-6 mt-2 text-sm text-ink/70">Tell us about yourself and upload your resume. Fields marked * are required.</p>
          <CareersForm />
        </div>
      </section>
    </>
  );
}
