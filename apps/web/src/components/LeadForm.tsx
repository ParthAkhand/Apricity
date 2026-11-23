"use client";
import { useState } from "react";
import { PUBLIC_API_URL } from "@/lib/api";

type Opt = { slug: string; name: string };

export function LeadForm({ products, source, defaultProduct = "" }: { products: Opt[]; source: string; defaultProduct?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch(`${PUBLIC_API_URL}/api/v1/leads`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...body, source }),
      });
      if (!res.ok) throw new Error(res.status === 429 ? "Too many requests. Please try again in a minute." : "Could not send. Please check the fields and try again.");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send.");
      setState("error");
    }
  }

  if (state === "done") {
    return <p role="status" className="rounded-lg bg-accent/15 p-4 text-sm font-medium">Thank you. We have received your request and will get back to you.</p>;
  }

  const field = "w-full rounded-lg border border-ink/25 bg-white px-3 py-2.5 text-sm text-ink focus:border-accent-d";
  const label = "mb-1 block text-sm font-medium";
  return (
    <form onSubmit={onSubmit} className="grid gap-4 text-left text-ink sm:grid-cols-2">
      <div><label className={label} htmlFor={`${source}-name`}>Name *</label><input className={field} id={`${source}-name`} name="name" required maxLength={100} autoComplete="name" /></div>
      <div><label className={label} htmlFor={`${source}-email`}>Email *</label><input className={field} id={`${source}-email`} name="email" type="email" required autoComplete="email" /></div>
      <div><label className={label} htmlFor={`${source}-org`}>Organisation</label><input className={field} id={`${source}-org`} name="organisation" maxLength={160} autoComplete="organization" /></div>
      <div><label className={label} htmlFor={`${source}-role`}>Role</label><input className={field} id={`${source}-role`} name="role" maxLength={100} autoComplete="organization-title" /></div>
      <div><label className={label} htmlFor={`${source}-phone`}>Phone</label><input className={field} id={`${source}-phone`} name="phone" type="tel" maxLength={30} autoComplete="tel" /></div>
      <div>
        <label className={label} htmlFor={`${source}-interest`}>Interested in</label>
        <select className={field} id={`${source}-interest`} name="productInterest" defaultValue={defaultProduct}>
          <option value="">General enquiry</option>
          {products.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2"><label className={label} htmlFor={`${source}-msg`}>Message</label><textarea className={field} id={`${source}-msg`} name="message" rows={4} maxLength={2000} /></div>
      {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
      <div aria-hidden="true" className="absolute left-[-9999px]"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="sm:col-span-2">
        <button className="btn btn-primary" disabled={state === "sending"} type="submit">{state === "sending" ? "Sending…" : "Send message"}</button>
        {state === "error" && <p role="alert" className="mt-3 text-sm font-medium text-red-700">{error}</p>}
      </div>
    </form>
  );
}
