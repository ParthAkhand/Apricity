import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/api";
import { PageHero } from "./PageHero";

export async function legalMetadata(slug: string): Promise<Metadata> {
  const p = await getPage(slug);
  return { title: p?.title ?? "Legal" };
}

/** Renders legal text exactly as stored (carried over from the previous site). */
export async function LegalPage({ slug }: { slug: string }) {
  const p = await getPage(slug);
  if (!p) notFound();
  return (
    <>
    <PageHero eyebrow="Legal" title={p.title} />
    <div className="container-x max-w-3xl py-12">
      <div className="space-y-4 rounded-3xl border border-ink/10 bg-white p-6 text-ink/85 sm:p-10">
        {/* The stored text starts with its own title; the h1 above already shows it. */}
        {p.body
          .split("\n\n")
          .filter((para, i) => !(i === 0 && para.trim() === p.title))
          .map((para, i) => (
            <p key={i} className="whitespace-pre-line">{para}</p>
          ))}
      </div>
    </div>
    </>
  );
}
