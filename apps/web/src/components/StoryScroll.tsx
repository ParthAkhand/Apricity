"use client";
import { useEffect, useRef, useState } from "react";
import { Camera, CheckCircle2, ScanSearch, UserCheck } from "lucide-react";

const lines = [
  { t: "A live GIS map of every asset.", d: "Litter bins, beats and toilets sit on one map, so supervisors always know where the work is and what state it is in." },
  { t: "Facial attendance for the field workforce.", d: "Attendance is marked by face and stamped with location, so a mark can be verified instead of argued over." },
  { t: "Hygiene scoring for restrooms.", d: "A geo-tagged photo is scored from 1 to 10, then checked and approved by the Sector In-charge." },
  { t: "Litter-bin monitoring across beats.", d: "Bins are tracked as assets, and the 20% daily coverage rule keeps every one of them in rotation." },
  { t: "Ward scorecards the Commissioner can trust.", d: "Ward-level scorecards roll up into the Commissioner View, using the same figures the ULB sees." },
];

/** Sticky, scroll-driven list: the active statement is full ink, the rest fade. Plain list on small screens. */
export function StoryScroll() {
  const box = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = box.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(Math.max(-r.top / (r.height - innerHeight), 0), 0.999);
      setI(Math.floor(p * lines.length));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <div ref={box} className="relative md:h-[260vh]">
      <div className="grid items-center gap-10 md:sticky md:top-0 md:h-screen md:grid-cols-2">
        <div>
          <p className="eyebrow">Why Matrix Track 2.0</p>
          <ul className="mt-4 space-y-3 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {lines.map((l, k) => (
              <li key={l.t} aria-current={k === i} className={`transition-colors duration-500 md:text-ink/25 ${k === i ? "md:!text-ink" : ""}`}>
                {l.t}
                {/* Only the active line shows its sentence on desktop; all are shown on mobile. */}
                <span className={`grid transition-all duration-500 md:grid-rows-[0fr] ${k === i ? "md:grid-rows-[1fr]" : ""}`}><span className="overflow-hidden"><span className="mt-2 block font-sans text-base font-normal tracking-normal text-ink/70">{l.d}</span></span></span>
              </li>
            ))}
          </ul>
        </div>
        {/* Overlapping cards give depth: a photo-style audit card under a dark review card. */}
        <div className="relative mx-auto h-80 w-full max-w-md" aria-hidden>
          <div className="absolute left-0 top-0 w-3/4 rounded-card border border-ink/10 bg-paper-200 p-5 shadow-xl">
            <div className="grid h-28 place-items-center rounded-2xl bg-ink-700 text-accent"><Camera size={36} /></div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-ink/60">Geo-tagged photo</p>
            <p className="mt-1 font-display text-lg font-bold">Hygiene score 1 to 10</p>
          </div>
          <div className="on-dark absolute bottom-0 right-0 w-4/5 rounded-card border border-white/10 bg-ink-800 p-5 text-paper shadow-[0_20px_60px_-10px_var(--accent-glow)]">
            {[[ScanSearch, "AI scores the photo"], [UserCheck, "Sector In-charge approves"], [CheckCircle2, "City Commissioner reviews"]].map(([Icon, t], k) => {
              const I = Icon as typeof Camera;
              return <div key={k} className="flex items-center gap-3 py-2 text-sm"><span className="grid h-8 w-8 place-items-center rounded-full bg-accent/15 text-accent"><I size={16} /></span>{t as string}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
