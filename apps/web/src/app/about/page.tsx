import type { Metadata } from "next";
import { Compass, Target } from "lucide-react";
import { getSettings } from "@/lib/api";
import { Partners } from "@/components/Partners";

export const metadata: Metadata = { title: "About", description: "About Apricity Digital, a Human Matrix Securite company based in Indore." };

export default async function About() {
  const s = await getSettings();
  return (
    <>
      <section className="on-dark bg-ink py-16 text-paper md:py-20">
        <div className="container-x max-w-3xl">
          <p className="eyebrow">About us</p>
          <h1 className="mt-2 font-display text-4xl font-bold">Building smarter solutions for a digital future.</h1>
          <p className="mt-4 text-lg text-paper/80">{s.name} is a {s.parentCompany} company, building AI-powered software for cities, enterprises and institutions.</p>
        </div>
      </section>

      <section className="container-x grid gap-6 py-16 md:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <Target className="text-accent-d" aria-hidden />
          <h2 className="mt-3 font-display text-2xl font-bold">Our mission</h2>
          <p className="mt-1 font-medium">Empowering innovation, shaping tomorrow.</p>
          <p className="mt-3 text-sm text-ink/75">
            We harness AI and digital innovation to create smart, scalable solutions that enhance urban living and business growth. We develop technologies that simplify complex challenges: user-friendly apps, data-driven insights and responsive web design that help businesses and communities thrive.
          </p>
          <p className="mt-3 text-sm text-ink/75">We aim to drive progress through technology, so that our solutions contribute to sustainable and intelligent growth.</p>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <Compass className="text-accent-d" aria-hidden />
          <h2 className="mt-3 font-display text-2xl font-bold">Our vision</h2>
          <p className="mt-1 font-medium">Shaping the future with AI-powered urban innovation.</p>
          <p className="mt-3 text-sm text-ink/75">
            To lead the future of AI-powered solutions, transforming cities and businesses through intelligent automation, and to create a world where technology drives innovation and builds smarter, more efficient communities.
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        <p className="eyebrow">Who we are</p>
        <h2 className="mt-2 font-display text-3xl font-bold">Meet the founders</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          <li className="rounded-2xl border border-ink/10 bg-white p-6">
            <p className="text-sm font-semibold text-accent-d">{s.founder.title}</p>
            <p className="font-display text-xl font-bold">{s.founder.name}</p>
            <p className="mt-2 text-sm text-ink/75">Guiding our vision with expertise and innovation, dedicated to driving excellence and building a sustainable future for our organisation.</p>
          </li>
          <li className="rounded-2xl border border-ink/10 bg-white p-6">
            {/* CONFIRM: VPE and Aditi Agarwal are listed on the previous site; confirm they should appear */}
            <p className="text-sm font-semibold text-accent-d">VPE</p>
            <p className="font-display text-xl font-bold">Aditi Agarwal</p>
            <p className="mt-2 text-sm text-ink/75">Shaping strategies that empower growth and success for our clients and team.</p>
          </li>
        </ul>
      </section>

      <Partners />

      <section className="bg-paper-200 py-16">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-2xl font-bold">Part of Human Matrix Securite</h2>
          <p className="mt-3 text-ink/80">{s.name} is the software brand of {s.parentCompany}.</p>
          <h2 className="mt-10 font-display text-2xl font-bold">Find us</h2>
          <address className="mt-3 not-italic text-ink/80">
            <p>{s.name}</p>
            <p>{s.address}</p>
            <p><a className="text-accent-d underline" href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a></p>
            <p><a className="text-accent-d underline" href={`mailto:${s.email}`}>{s.email}</a></p>
          </address>
        </div>
      </section>
    </>
  );
}
