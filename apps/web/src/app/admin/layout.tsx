"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adm, setCsrf } from "@/lib/adminApi";

const tabs = [
  { href: "/admin", label: "Products" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/leads", label: "Leads" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const isLogin = path === "/admin/login";

  useEffect(() => {
    if (isLogin) return;
    adm<{ email: string; csrf: string }>("/admin/me")
      .then((me) => { setCsrf(me.csrf); setEmail(me.email); })
      .catch(() => router.replace("/admin/login"));
  }, [isLogin, router]);

  if (isLogin) return <>{children}</>;
  if (!email) return <div className="container-x space-y-4 py-16" role="status" aria-label="Checking session"><div className="skeleton h-8 w-1/3" /><div className="skeleton h-24" /><div className="skeleton h-24" /></div>;
  return (
    <div className="container-x py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4">
        <nav aria-label="Admin" className="flex gap-5 text-sm font-semibold">
          {tabs.map((t) => (
            <Link key={t.href} href={t.href} aria-current={path === t.href ? "page" : undefined} className={path === t.href ? "text-accent-d underline" : ""}>{t.label}</Link>
          ))}
        </nav>
        <span className="text-sm text-ink/70">{email} ·{" "}
          <button className="underline" onClick={async () => { await adm("/admin/logout", { method: "POST" }); router.replace("/admin/login"); }}>Log out</button>
        </span>
      </div>
      {children}
    </div>
  );
}
