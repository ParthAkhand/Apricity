"use client";
import { useState } from "react";
import { PUBLIC_API_URL } from "@/lib/api";

/** Posts multipart to POST /careers; the API stores the resume and lists the application under Admin > Leads. */
export function CareersForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const body = new FormData(e.currentTarget);
    const file = body.get("resume") as File;
    if (file.size > 5 * 1024 * 1024) { setError("File is too large (max 5 MB)."); setState("error"); return; }
    try {
      const res = await fetch(`${PUBLIC_API_URL}/api/v1/careers`, { method: "POST", body });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(res.status === 429 ? "Too many requests. Please try again in a minute." : j.error ?? "Could not send. Please check the fields and try again.");
      }
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send.");
      setState("error");
    }
  }

  if (state === "done") return <p role="status" className="rounded-lg bg-accent/15 p-4 text-sm font-medium">Thank you. We have received your application.</p>;

  const field = "w-full rounded-lg border border-ink/25 bg-white px-3 py-2.5 text-sm text-ink focus:border-accent-d";
  const label = "mb-1 block text-sm font-medium";
  return (
    <form onSubmit={onSubmit} className="grid gap-4 text-left text-ink sm:grid-cols-2">
      <div><label className={label} htmlFor="c-first">First name *</label><input className={field} id="c-first" name="first" required maxLength={50} autoComplete="given-name" /></div>
      <div><label className={label} htmlFor="c-last">Last name</label><input className={field} id="c-last" name="last" maxLength={49} autoComplete="family-name" /></div>
      <div><label className={label} htmlFor="c-email">Email *</label><input className={field} id="c-email" name="email" type="email" required autoComplete="email" /></div>
      <div><label className={label} htmlFor="c-phone">Phone *</label><input className={field} id="c-phone" name="phone" type="tel" required maxLength={30} autoComplete="tel" /></div>
      <div className="sm:col-span-2"><label className={label} htmlFor="c-desc">Description</label><textarea className={field} id="c-desc" name="description" rows={4} maxLength={1500} /></div>
      <div className="sm:col-span-2">
        <label className={label} htmlFor="c-resume">Upload resume *</label>
        <input className={`${field} file:mr-3 file:rounded file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-paper`} id="c-resume" name="resume" type="file" required accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
        <p className="mt-1 text-xs text-ink/60">PDF, Word (doc, docx), JPG or PNG. Maximum 5 MB.</p>
      </div>
      <div aria-hidden="true" className="absolute left-[-9999px]"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="sm:col-span-2">
        <button className="btn btn-primary" disabled={state === "sending"} type="submit">{state === "sending" ? "Sending…" : "Submit"}</button>
        {state === "error" && <p role="alert" className="mt-3 text-sm font-medium text-red-700">{error}</p>}
      </div>
    </form>
  );
}
