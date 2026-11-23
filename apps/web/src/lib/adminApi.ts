"use client";
import { PUBLIC_API_URL } from "./api";

let csrf = "";
export const setCsrf = (t: string) => {
  csrf = t;
};

/** Browser -> API with the httpOnly session cookie. Writes carry the CSRF token. */
export async function adm<T = unknown>(path: string, init: RequestInit & { json?: unknown } = {}): Promise<T> {
  const { json, ...rest } = init;
  const res = await fetch(`${PUBLIC_API_URL}/api/v1${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      ...(json !== undefined ? { "content-type": "application/json" } : {}),
      ...(csrf ? { "x-csrf-token": csrf } : {}),
    },
    body: json !== undefined ? JSON.stringify(json) : undefined,
  }).catch(() => {
    throw new Error("Cannot reach the API. Start it with `npm run dev` and check NEXT_PUBLIC_API_URL.");
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string; issues?: { path: (string | number)[]; message: string }[] };
    const detail = body.issues?.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    throw Object.assign(new Error(res.status >= 500 ? "The server hit an error. Check that the database is running (`npm run db:up`) and seeded (`npm run db:seed`)." : detail || body.error || `Error ${res.status}`), { status: res.status });
  }
  return (res.headers.get("content-type")?.includes("json") ? res.json() : res.text()) as Promise<T>;
}

/** Revalidate public pages after an admin save (best effort). */
export const refreshSite = () => fetch("/api/revalidate", { method: "POST" }).catch(() => undefined);
