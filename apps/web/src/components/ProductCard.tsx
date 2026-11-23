import Link from "next/link";
import { ArrowRight, Car, ExternalLink, MapPinned, ScanFace, ShieldCheck, Sparkles, Wrench, Zap, Hammer } from "lucide-react";
import type { Product } from "@apricity/shared";
import { productHref } from "@/lib/api";

/** Code-built preview art per product. Unknown slugs get a generic grid so admin-added products still look finished. */
function Preview({ slug }: { slug: string }) {
  return (
    <div className="on-dark relative h-40 overflow-hidden bg-ink grid-bg" aria-hidden>
      {slug === "matrix-track-2" && (
        <>
          <svg viewBox="0 0 300 160" className="absolute inset-0 h-full w-full">
            <path d="M0 120 C60 80 100 110 150 60 S250 50 300 20" fill="none" stroke="#F59E0B" strokeOpacity=".5" strokeWidth="2" strokeDasharray="4 5" className="dash-flow" />
            {[[60, 90], [120, 70], [190, 50], [240, 40], [90, 120]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill="#F59E0B" className="hero-pulse" style={{ animationDelay: `${i * 0.3}s` }} />)}
          </svg>
          <MapPinned className="absolute bottom-3 right-3 text-accent" />
        </>
      )}
      {slug === "matrix-track" && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative grid h-24 w-24 place-items-center rounded-2xl border-2 border-accent/70">
            <ScanFace size={52} className="text-accent" />
            <span className="scan-line absolute left-1 right-1 top-2 h-0.5 bg-accent shadow-[0_0_10px_#F59E0B]" />
          </div>
        </div>
      )}
      {slug !== "matrix-track-2" && slug !== "matrix-track" && (
        <div className="absolute inset-0 grid grid-cols-4 place-items-center gap-3 p-6">
          {[Sparkles, Wrench, Car, ShieldCheck, Zap, Hammer, Sparkles, Car].map((I, i) => (
            <span key={i} className="hero-pulse grid h-11 w-11 place-items-center rounded-xl bg-accent/20 text-accent" style={{ animationDelay: `${i * 0.25}s` }}><I size={22} /></span>
          ))}
        </div>
      )}
    </div>
  );
}

/** Whole card is one link. EXTERNAL products open in a new tab with an indicator. */
export function ProductCard({ product: p, level = 3 }: { product: Product; level?: 2 | 3 }) {
  const Heading = `h${level}` as const;
  const external = p.landingType === "EXTERNAL";
  const cls =
    "group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-2xl focus-visible:-translate-y-2";
  const body = (
    <>
      <Preview slug={p.slug} />
      <div className="flex flex-1 flex-col p-6">
        <span className="eyebrow">{external ? "External site" : "Product"}</span>
        <Heading className="mt-2 font-display text-2xl font-bold">{p.name}</Heading>
        <p className="mt-2 text-sm font-medium text-ink/80">{p.tagline}</p>
        <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper self-start transition group-hover:bg-accent group-hover:text-ink">
          {external ? "Visit site" : "Explore"}
          {external ? <ExternalLink size={16} aria-hidden /> : <ArrowRight size={16} aria-hidden className="transition group-hover:translate-x-1" />}
          {external && <span className="sr-only">(opens in a new tab)</span>}
        </span>
      </div>
    </>
  );
  return external ? (
    <a href={productHref(p)} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
  ) : (
    <Link href={productHref(p)} className={cls}>{body}</Link>
  );
}
