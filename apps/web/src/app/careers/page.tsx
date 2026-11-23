import type { Metadata } from "next";
import { getSettings } from "@/lib/api";

export const metadata: Metadata = { title: "Careers", description: "Join Apricity Digital." };

export default async function Careers() {
  const s = await getSettings();
  return (
    <div className="container-x max-w-3xl py-16">
      <p className="eyebrow">Careers</p>
      <h1 className="mt-2 font-display text-4xl font-bold">Join us</h1>
      <p className="mt-4 text-lg text-ink/80">
        We believe in innovation, teamwork and helping our people grow. Join us to build solutions that matter.
      </p>
      <p className="mt-4 text-ink/80">
        Online applications are coming soon. For now, write to{" "}
        <a className="text-accent-d underline" href={`mailto:${s.email}`}>{s.email}</a>.
      </p>
    </div>
  );
}
