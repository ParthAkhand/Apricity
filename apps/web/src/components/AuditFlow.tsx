"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Camera, Sparkles, UserCheck, Landmark } from "lucide-react";

const steps = [
  { icon: Camera, who: "Field supervisor", t: "Takes a geo-tagged photo", d: "Photo and location are captured together at the asset." },
  { icon: Sparkles, who: "AI", t: "Scores hygiene 1 to 10", d: "Every photo gets a hygiene score automatically." },
  { icon: UserCheck, who: "Sector In-charge", t: "Approves the report", d: "Checks and approves the reports for their sector." },
  { icon: Landmark, who: "City Commissioner", t: "Reviews the result", d: "Planned vs actual manpower drives penalty deductions." },
];

/** Auto-playing, clickable walk-through of the sanitation audit flow. Stops auto-play once the user picks a step. */
export function AuditFlow() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % steps.length), 3200);
    return () => clearInterval(id);
  }, [auto]);
  const S = steps[i];
  return (
    <div className="grid items-center gap-8 md:grid-cols-2">
      <ol className="space-y-3">
        {steps.map((s, k) => (
          <li key={s.t}>
            <button type="button" onClick={() => { setI(k); setAuto(false); }} aria-current={k === i}
              className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${k === i ? "border-accent bg-white shadow-lg" : "border-ink/10 bg-white/60 hover:bg-white"}`}>
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${k === i ? "bg-accent text-ink" : "bg-ink/5 text-ink/60"}`}><s.icon size={22} aria-hidden /></span>
              <span><span className="block text-xs font-semibold uppercase tracking-widest text-accent-d">0{k + 1} · {s.who}</span><span className="font-display font-bold">{s.t}</span></span>
            </button>
          </li>
        ))}
      </ol>
      <div className="on-dark rounded-3xl bg-ink p-6 text-paper shadow-2xl" aria-live="polite">
        <AnimatePresence mode="wait"><motion.div key={i} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-ink"><S.icon size={28} aria-hidden /></div>
          <p className="mt-4 text-xs uppercase tracking-widest text-paper/70">{S.who}</p>
          <h3 className="font-display text-2xl font-bold">{S.t}</h3>
          <p className="mt-2 text-paper/75">{S.d}</p>
          <div className="mt-5 rounded-xl bg-ink-700 p-4">
            {i === 0 && <div className="flex items-center gap-3 text-sm"><span className="grid h-16 w-16 place-items-center rounded-lg bg-ink-600"><Camera aria-hidden /></span><span>Geo-tag attached<br /><span className="text-paper/70">Asset: litter bin</span></span></div>}
            {i === 1 && <div><div className="font-display text-4xl font-bold text-accent">8<span className="text-lg text-paper/70"> / 10</span></div><div className="mt-2 h-2 rounded bg-ink-600"><div className="h-full w-4/5 rounded bg-accent" /></div><p className="mt-1 text-xs text-paper/70">Sample score, illustrative</p></div>}
            {i === 2 && <div className="flex gap-2 text-sm"><span className="rounded-lg bg-emerald-500/20 px-3 py-2 text-emerald-300">Approve</span><span className="rounded-lg bg-ink-600 px-3 py-2">Send back</span></div>}
            {i === 3 && <div className="grid grid-cols-2 gap-2 text-center text-sm"><div className="rounded-lg bg-ink-600 py-2">Planned<br /><b>manpower</b></div><div className="rounded-lg bg-ink-600 py-2">Actual<br /><b>manpower</b></div></div>}
          </div>
        </motion.div></AnimatePresence>
      </div>
    </div>
  );
}
