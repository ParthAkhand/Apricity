// Illustrative mock: figures here are decoration, not real data. CSS-only motion (see globals.css) keeps the hero free of client JS.
const wards = [
  { n: "Ward A", v: 82 },
  { n: "Ward B", v: 67 },
  { n: "Ward C", v: 91 },
  { n: "Ward D", v: 58 },
];
const dots = Array.from({ length: 28 }, (_, i) => ({ x: 24 + ((i * 53) % 250), y: 22 + ((i * 37) % 120), hot: i % 7 === 0, i }));

export function HeroCommandCentre() {
  return (
    <div role="img" aria-label="Illustration of a city command-centre dashboard with a map and ward scorecards" className="rounded-2xl border border-white/15 bg-ink-800 p-4 shadow-2xl">
      <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-paper/70">
        <span className="h-2 w-2 rounded-full bg-accent" /> Command view (illustrative)
      </div>
      <div className="grid gap-3 sm:grid-cols-5">
        <svg viewBox="0 0 300 170" className="rounded-lg bg-ink-700 sm:col-span-3" aria-hidden>
          {[40, 80, 120].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#2A3A58" strokeWidth="1" />)}
          {[75, 150, 225].map((x) => <line key={x} y1="0" y2="170" x1={x} x2={x} stroke="#2A3A58" strokeWidth="1" />)}
          <path d="M10 140 C70 100 110 130 160 80 S250 60 290 30" fill="none" stroke="#F59E0B" strokeOpacity=".5" strokeWidth="2" />
          {dots.map((d) => (
            <circle key={d.i} cx={d.x} cy={d.y} r={d.hot ? 5 : 3} fill={d.hot ? "#F59E0B" : "#7C8DB0"} className={d.hot ? "hero-pulse" : undefined} style={d.hot ? { animationDelay: `${d.i * 0.1}s` } : undefined} />
          ))}
        </svg>
        <div className="space-y-2 sm:col-span-2">
          {wards.map((w, i) => (
            <div key={w.n} className="rounded-lg bg-ink-700 p-2.5">
              <div className="flex justify-between text-[11px] text-paper/80"><span>{w.n}</span><span>{w.v}</span></div>
              <div className="mt-1.5 h-1.5 rounded bg-ink-600">
                <div className="hero-bar h-full rounded bg-accent" style={{ ["--w" as string]: `${w.v}%`, animationDelay: `${0.2 * i}s` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
