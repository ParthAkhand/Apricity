import { Fragment } from "react";
import { Building2, Landmark, LayoutDashboard, Scale } from "lucide-react";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

/** The 20% rule explained: Daroga covers 20% of assets daily, SI approves 20% of those reports, giving 100% coverage 5 times a month. */
export function CoverageRule() {
  const nums = [
    { v: "20%", t: "of assets, every day", d: "Each Daroga covers 20% of their assigned assets daily." },
    { v: "20%", t: "of reports, every day", d: "The SI checks and approves 20% of those reports daily." },
    { v: "100%", t: "coverage", d: "Every assigned asset is covered, not sampled once and forgotten." },
    { v: "5x", t: "a month", d: "Full coverage comes round five times in a month." },
  ];
  return (
    <section className="on-dark relative overflow-hidden bg-ink py-20 text-paper md:py-28">
      <div className="glow-drift pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent/15 blur-[110px]" aria-hidden />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">The 20% rule</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-light leading-tight tracking-[-0.03em] sm:text-6xl">Full coverage, built into the daily routine.</h2>
          <p className="mt-5 max-w-2xl text-paper/70">
            Checking every asset every day is not practical. So Matrix Track 2.0 spreads the work: a fixed share of assets is covered each day by the field team, and a fixed share of those reports is checked by the supervisor. Over a month, that adds up to complete coverage, five times over. Here, assets means litter bins, beats and toilets.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nums.map((n, i) => (
            <li key={n.t}>
              <Reveal delay={i * 90} className="h-full">
                <div className="h-full rounded-card border border-white/10 bg-ink-800 p-6 transition hover:border-accent/50">
                  <p className="font-display text-6xl font-semibold tracking-tight text-accent"><CountUp value={n.v} /></p>
                  <p className="mt-2 font-display text-lg font-semibold">{n.t}</p>
                  <p className="mt-2 text-sm text-paper/65">{n.d}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** ULB vs Commissioner dashboards: two views, one set of figures. */
export function DashboardsSplit() {
  const cols = [
    { icon: Building2, t: "ULB dashboard", p: "For the teams who run the work day to day: ward scorecards, attendance, audit reports and the status of assets across the area.", b: ["Ward-level scorecards", "Attendance and manpower, planned against actual", "Audit reports waiting for approval"] },
    { icon: Landmark, t: "Commissioner View", p: "For the city leadership who need the whole picture without opening every report: a summary built from the same records the field teams create.", b: ["City-wide view across wards", "Reviews the audit results", "Penalty deductions driven by planned vs actual manpower"] },
  ];
  return (
    <section className="container-x py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">Two views, one truth</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">Separate dashboards whose figures match.</h2>
        <p className="mt-4 max-w-2xl text-ink/70">The ULB dashboard and the Commissioner dashboard read from the same data, so a number that appears in one appears identically in the other. There is no second spreadsheet to reconcile.</p>
      </Reveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
        {cols.map((c, i) => (
          <Fragment key={c.t}>
            <Reveal delay={i * 120} className="h-full">
              <div className="h-full rounded-card border border-ink/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-ink"><c.icon aria-hidden /></span>
                <h3 className="mt-5 font-display text-2xl font-semibold">{c.t}</h3>
                <p className="mt-3 text-ink/70">{c.p}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {c.b.map((x) => <li key={x} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-d" aria-hidden />{x}</li>)}
                </ul>
              </div>
            </Reveal>
            {i === 0 && <div className="hidden items-center lg:flex" aria-hidden><span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-accent"><Scale /></span></div>}
          </Fragment>
        ))}
      </div>
      <p className="mt-6 flex items-center gap-2 text-sm text-ink/60"><LayoutDashboard size={16} aria-hidden />Figures shown on this site are illustrative. Real dashboards use your own data.</p>
    </section>
  );
}
