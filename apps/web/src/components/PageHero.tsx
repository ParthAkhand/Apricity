import type { ReactNode } from "react";

/** Shared dark page hero: dot grid, glow and an animated orbit motif so inner pages match the home page. */
export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead?: string; children?: ReactNode }) {
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-paper grid-bg">
      <div className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <svg className="pointer-events-none absolute right-0 top-1/2 hidden h-72 w-72 -translate-y-1/2 translate-x-1/4 md:block" viewBox="0 0 200 200" fill="none" aria-hidden>
        <circle cx="100" cy="100" r="90" stroke="#2EE59D" strokeOpacity=".25" strokeDasharray="3 6" className="dash-flow" />
        <circle cx="100" cy="100" r="60" stroke="#2EE59D" strokeOpacity=".35" />
        <circle cx="100" cy="100" r="6" fill="#2EE59D" className="hero-pulse" />
        <circle cx="160" cy="100" r="4" fill="#2EE59D" />
        <circle cx="70" cy="48" r="4" fill="#8B9199" />
      </svg>
      <div className="container-x relative max-w-5xl pb-24 pt-16 md:pb-32 md:pt-24">
        <p className="eyebrow step-in">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-light leading-tight tracking-[-0.03em] sm:text-6xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg text-paper/80">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
      {/* Rounded edge of the page sheet, matching the home page. */}
      <div className="absolute inset-x-0 bottom-0 h-10 rounded-t-sheet bg-paper" aria-hidden />
    </section>
  );
}

/** Rounded accent tile that holds an icon. */
export function IconTile({ children }: { children: ReactNode }) {
  return <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-d">{children}</span>;
}
