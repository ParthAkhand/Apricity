import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Product } from "@apricity/shared";
import { productHref } from "@/lib/api";

/** Whole card is one link. EXTERNAL products open in a new tab with an indicator. */
export function ProductCard({ product: p, level = 3 }: { product: Product; level?: 2 | 3 }) {
  const Heading = `h${level}` as const;
  const external = p.landingType === "EXTERNAL";
  const cls =
    "group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-xl focus-visible:-translate-y-1";
  const body = (
    <>
      <span className="eyebrow">{external ? "External site" : "Product"}</span>
      <Heading className="mt-2 font-display text-2xl font-bold">{p.name}</Heading>
      <p className="mt-2 text-sm font-medium text-ink/80">{p.tagline}</p>
      <p className="mt-3 flex-1 text-sm text-ink/70">{p.summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-d">
        {external ? "Visit site" : "Learn more"}
        {external ? <ExternalLink size={16} aria-hidden /> : <ArrowRight size={16} aria-hidden className="transition group-hover:translate-x-1" />}
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </span>
    </>
  );
  return external ? (
    <a href={productHref(p)} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
  ) : (
    <Link href={productHref(p)} className={cls}>{body}</Link>
  );
}
