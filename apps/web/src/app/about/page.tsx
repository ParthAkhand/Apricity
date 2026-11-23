import type { Metadata } from "next";
import { getSettings } from "@/lib/api";

export const metadata: Metadata = { title: "About", description: "About Apricity Digital, a Human Matrix Securite company based in Indore." };

export default async function About() {
  const s = await getSettings();
  return (
    <div className="container-x max-w-3xl py-16">
      <p className="eyebrow">About</p>
      <h1 className="mt-2 font-display text-4xl font-bold">Building smarter solutions for a digital future</h1>
      <p className="mt-6 text-lg text-ink/80">
        Our mission is to use AI and digital innovation to create smart, scalable solutions that improve urban living and business
        growth: user-friendly apps and data-driven insights that help communities and organisations thrive.
      </p>
      <p className="mt-4 text-ink/80">
        {s.name} was founded by {s.founder.name}, whose Indian Army background shaped the company’s ethos of discipline and
        innovation. {/* CONFIRM: history wording carried over from the previous site */}
      </p>

      <h2 className="mt-12 font-display text-2xl font-bold">Leadership</h2>
      <div className="mt-4 rounded-2xl border border-ink/10 bg-white p-6">
        <p className="font-display text-xl font-bold">{s.founder.name}</p>
        <p className="text-sm text-accent-d">{s.founder.title}</p>
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold">Part of Human Matrix Securite</h2>
      <p className="mt-3 text-ink/80">{s.name} is the software brand of {s.parentCompany}.</p>

      <h2 className="mt-12 font-display text-2xl font-bold">Find us</h2>
      <address className="mt-3 not-italic text-ink/80">
        <p>{s.name}</p>
        <p>{s.address}</p>
        <p><a className="text-accent-d underline" href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a></p>
        <p><a className="text-accent-d underline" href={`mailto:${s.email}`}>{s.email}</a></p>
      </address>
    </div>
  );
}
