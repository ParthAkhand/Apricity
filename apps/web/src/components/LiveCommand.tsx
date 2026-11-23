"use client";
import { useEffect, useState } from "react";

// Illustrative mock: all figures are decoration, not real data.
const wards = [
  { n: "Ward A", v: 82, x: 70, y: 60 },
  { n: "Ward B", v: 67, x: 210, y: 50 },
  { n: "Ward C", v: 91, x: 90, y: 125 },
  { n: "Ward D", v: 58, x: 220, y: 120 },
];

/** Hero dashboard you can play with: pick a ward, watch the live counters tick. */
export function LiveCommand() {
  const [sel, setSel] = useState(0);
  const [audits, setAudits] = useState(128);
  const [present, setPresent] = useState(412);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => { setAudits((a) => a + 1); setPresent((p) => p + (Math.random() > 0.5 ? 1 : 0)); }, 1800);
    return () => clearInterval(id);
  }, []);
  const w = wards[sel];
  const stats: [string, string | number][] = [["Selected", w.n], ["Audits today", audits], ["Present", present]];
  return (
    <div className="float-slow rounded-3xl border border-white/15 bg-ink-800/90 p-4 shadow-2xl backdrop-blur">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-paper/70">
        <span className="flex items-center gap-2"><span className="hero-pulse h-2 w-2 rounded-full bg-emerald-400" /> Live command view</span>
        <span>Illustrative</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-5">
        <svg viewBox="0 0 300 170" className="rounded-xl bg-ink-700 sm:col-span-3" role="group" aria-label="Ward map. Use the ward list to select a ward.">
          {[40, 80, 120].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#2B333B" />)}
          {[75, 150, 225].map((x) => <line key={x} y1="0" y2="170" x1={x} x2={x} stroke="#2B333B" />)}
          <path d="M10 150 C70 100 110 140 160 85 S250 70 290 30" fill="none" stroke="#2EE59D" strokeOpacity=".4" strokeWidth="2" strokeDasharray="4 5" className="dash-flow" />
          {wards.map((k, i) => (
            <g key={k.n} onClick={() => setSel(i)} className="cursor-pointer">
              <circle cx={k.x} cy={k.y} r={i === sel ? 26 : 16} fill="#2EE59D" fillOpacity={i === sel ? 0.22 : 0.1} className="transition-all duration-300" />
              <circle cx={k.x} cy={k.y} r={i === sel ? 7 : 5} fill={i === sel ? "#2EE59D" : "#8B9199"} className={i === sel ? "hero-pulse" : ""} />
              <text x={k.x} y={k.y + 28} textAnchor="middle" fontSize="9" fill="#C5CBD3">{k.n}</text>
            </g>
          ))}
        </svg>
        <div className="space-y-2 sm:col-span-2">
          {wards.map((k, i) => (
            <button key={k.n} type="button" onClick={() => setSel(i)} aria-pressed={i === sel}
              className={`block w-full rounded-lg p-2.5 text-left transition ${i === sel ? "bg-accent/20 ring-1 ring-accent" : "bg-ink-700 hover:bg-ink-600"}`}>
              <span className="flex justify-between text-[11px] text-paper/85"><span>{k.n}</span><span>{k.v}</span></span>
              <span className="mt-1.5 block h-1.5 rounded bg-ink-600"><span className="hero-bar block h-full rounded bg-accent" style={{ ["--w" as string]: `${k.v}%` }} /></span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {stats.map(([l, v]) => (
          <div key={l} className="rounded-lg bg-ink-700 py-2"><div className="font-display text-lg font-bold text-accent">{v}</div><div className="text-[10px] uppercase tracking-widest text-paper/70">{l}</div></div>
        ))}
      </div>
    </div>
  );
}
