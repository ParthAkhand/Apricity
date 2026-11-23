"use client";
import { useEffect, useState } from "react";
import type { Settings } from "@apricity/shared";
import { adm, refreshSite } from "@/lib/adminApi";

const simple = ["name", "address", "phone", "email", "parentCompany", "tagline", "brandLine"] as const;

export default function AdminSettings() {
  const [s, setS] = useState<Settings | null>(null);
  const [stats, setStats] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // The public endpoint returns the same row, so reuse it for reading.
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/v1/settings`).then((r) => r.json()).then((d: Settings) => { setS(d); setStats(JSON.stringify(d.stats, null, 2)); });
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!s) return;
    try {
      await adm("/admin/settings", { method: "PUT", json: { ...s, stats: JSON.parse(stats) } });
      setMsg("Saved."); refreshSite();
    } catch (err) { setMsg(err instanceof Error ? err.message : "Save failed"); }
  }

  if (!s) return <p className="text-sm">Loading…</p>;
  const field = "w-full rounded-lg border border-ink/25 bg-white px-3 py-2 text-sm";
  return (
    <form onSubmit={save} className="grid max-w-2xl gap-4">
      <h1 className="font-display text-3xl font-bold">Company settings</h1>
      {simple.map((k) => (
        <div key={k}><label className="mb-1 block text-sm font-medium" htmlFor={k}>{k}</label><input id={k} className={field} value={s[k]} onChange={(e) => setS({ ...s, [k]: e.target.value })} /></div>
      ))}
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium" htmlFor="fn">Founder name</label><input id="fn" className={field} value={s.founder.name} onChange={(e) => setS({ ...s, founder: { ...s.founder, name: e.target.value } })} /></div>
        <div><label className="mb-1 block text-sm font-medium" htmlFor="ft">Founder title</label><input id="ft" className={field} value={s.founder.title} onChange={(e) => setS({ ...s, founder: { ...s.founder, title: e.target.value } })} /></div>
      </div>
      <div><label className="mb-1 block text-sm font-medium" htmlFor="stats">Stats (JSON; verified flag per stat)</label><textarea id="stats" rows={8} className={`${field} font-mono text-xs`} value={stats} onChange={(e) => setStats(e.target.value)} /></div>
      <div><button className="btn btn-dark" type="submit">Save</button> <span role="status" className="ml-3 text-sm">{msg}</span></div>
    </form>
  );
}
