"use client";
import { useEffect, useState } from "react";
import { adm } from "@/lib/adminApi";
import { PUBLIC_API_URL } from "@/lib/api";

type Lead = { id: string; name: string; organisation: string; email: string; phone: string; productInterest: string; message: string; source: string; status: "NEW" | "CONTACTED" | "CLOSED"; createdAt: string; resumeName: string };

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [msg, setMsg] = useState("");
  const [source, setSource] = useState("");
  useEffect(() => { adm<Lead[]>("/admin/leads").then(setLeads).catch((e) => setMsg(e.message)); }, []);

  async function setStatus(id: string, status: Lead["status"]) {
    try {
      const u = await adm<Lead>(`/admin/leads/${id}`, { method: "PATCH", json: { status } });
      setLeads((l) => l.map((x) => (x.id === id ? { ...x, status: u.status } : x)));
    } catch (e) { setMsg(e instanceof Error ? e.message : "Failed"); }
  }

  async function downloadResume(l: Lead) {
    try {
      const res = await fetch(`${PUBLIC_API_URL}/api/v1/admin/leads/${l.id}/resume`, { credentials: "include" });
      if (!res.ok) throw new Error("Could not download the resume");
      const url = URL.createObjectURL(await res.blob());
      Object.assign(document.createElement("a"), { href: url, download: l.resumeName || "resume" }).click();
      URL.revokeObjectURL(url);
    } catch (e) { setMsg(e instanceof Error ? e.message : "Failed"); }
  }

  async function exportCsv() {
    const text = await adm<string>("/admin/leads.csv");
    const url = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
    Object.assign(document.createElement("a"), { href: url, download: "enquiries.csv" }).click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Enquiries</h1>
        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="src">Filter by source</label>
          <select id="src" className="rounded border border-ink/25 p-2 text-sm" value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">All sources</option>
            {[...new Set(leads.map((l) => l.source))].map((x) => <option key={x}>{x}</option>)}
          </select>
          <button className="btn btn-dark" onClick={exportCsv}>Export CSV</button>
        </div>
      </div>
      <p role="status" className="mt-2 min-h-5 text-sm text-red-700">{msg}</p>
      <div className="relative mt-4 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-200 text-xs uppercase tracking-wide"><tr><th className="p-3">Date</th><th className="p-3">Name</th><th className="p-3">Contact</th><th className="p-3">Interest</th><th className="p-3">Message</th><th className="p-3">Status</th></tr></thead>
          <tbody className="divide-y divide-ink/10">
            {leads.filter((l) => !source || l.source === source).map((l) => (
              <tr key={l.id} className="align-top">
                <td className="whitespace-nowrap p-3">{new Date(l.createdAt).toLocaleString()}</td>
                <td className="p-3">{l.name}<br /><span className="text-ink/60">{l.organisation}</span></td>
                <td className="p-3">{l.email}<br />{l.phone}</td>
                <td className="p-3">{l.productInterest || "General"}<br /><span className="text-ink/60">{l.source}</span></td>
                <td className="max-w-xs p-3">{l.message}{l.resumeName && <><br /><button className="mt-1 text-accent-d underline" onClick={() => downloadResume(l)}>Download resume: {l.resumeName}</button></>}</td>
                <td className="p-3">
                  <label className="sr-only" htmlFor={`s-${l.id}`}>Status for {l.name}</label>
                  <select id={`s-${l.id}`} className="rounded border border-ink/25 p-1" value={l.status} onChange={(e) => setStatus(l.id, e.target.value as Lead["status"])}>
                    <option>NEW</option><option>CONTACTED</option><option>CLOSED</option>
                  </select>
                </td>
              </tr>
            ))}
            {leads.length === 0 && <tr><td className="p-6 text-ink/60" colSpan={6}>No enquiries yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
