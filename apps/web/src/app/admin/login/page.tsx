"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adm, setCsrf } from "@/lib/adminApi";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    try {
      const r = await adm<{ csrf: string }>("/admin/login", { method: "POST", json: { email: f.get("email"), password: f.get("password") } });
      setCsrf(r.csrf);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }
  const field = "w-full rounded-lg border border-ink/25 bg-white px-3 py-2.5 text-sm";
  return (
    <div className="container-x max-w-sm py-20">
      <meta name="robots" content="noindex" />
      <h1 className="font-display text-3xl font-bold">Admin login</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div><label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label><input id="email" name="email" type="email" required autoComplete="username" className={field} /></div>
        <div><label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label><input id="password" name="password" type="password" required autoComplete="current-password" className={field} /></div>
        <button className="btn btn-dark w-full" type="submit">Log in</button>
        {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
      </form>
    </div>
  );
}
