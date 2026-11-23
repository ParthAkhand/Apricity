import { MapPin, ScanFace, CalendarCheck, Users } from "lucide-react";

/** Code-built Matrix Track mock: face frame with a scan line, plus the three things it records. */
export function FaceScanHero() {
  return (
    <div className="float-slow rounded-3xl border border-white/15 bg-ink-800/90 p-5 shadow-2xl" role="img" aria-label="Illustration of face attendance with location and leave records">
      <div className="mb-3 flex justify-between text-[10px] uppercase tracking-widest text-paper/70"><span>Face attendance</span><span>Illustrative</span></div>
      <div className="grid place-items-center rounded-2xl bg-ink-700 py-8">
        <div className="relative grid h-40 w-40 place-items-center rounded-3xl border-2 border-accent/70">
          <ScanFace size={84} className="text-accent" aria-hidden />
          <span className="scan-line absolute left-2 right-2 top-3 h-0.5 bg-accent shadow-[0_0_14px_#F59E0B]" style={{ ["--d" as string]: "100px" }} />
          {["left-0 top-0 border-l-4 border-t-4", "right-0 top-0 border-r-4 border-t-4", "bottom-0 left-0 border-b-4 border-l-4", "bottom-0 right-0 border-b-4 border-r-4"].map((c) => (
            <span key={c} className={`absolute h-6 w-6 rounded-sm border-accent ${c}`} />
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] text-paper/85">
        {[[MapPin, "Geotagged"], [Users, "1:N group mode"], [CalendarCheck, "Leave management"]].map(([I, l]) => {
          const Icon = I as typeof MapPin;
          return <div key={l as string} className="rounded-lg bg-ink-700 px-1 py-2"><Icon size={16} className="mx-auto mb-1 text-accent" aria-hidden />{l as string}</div>;
        })}
      </div>
    </div>
  );
}
