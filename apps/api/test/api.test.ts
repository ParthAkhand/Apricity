import { PrismaClient } from "@prisma/client";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { buildApp } from "../src/app";

const prisma = new PrismaClient();
const mailer = vi.fn(async () => {});
let app: Awaited<ReturnType<typeof buildApp>>;

const admin = { email: process.env.ADMIN_EMAIL ?? "", password: process.env.ADMIN_PASSWORD ?? "" };
const newProduct = (over: object = {}) => ({
  slug: "test-product", name: "Test", tagline: "t", summary: "s", landingType: "INTERNAL", published: true, ...over,
});

beforeAll(async () => {
  app = await buildApp(prisma, mailer);
});
afterAll(async () => {
  await prisma.product.deleteMany({ where: { slug: "test-product" } });
  await prisma.lead.deleteMany({ where: { email: { endsWith: "@example.test" } } });
  await app.close();
  await prisma.$disconnect();
});

describe("public API", () => {
  it("lists published products in order, and Insstanto is external", async () => {
    const res = await app.inject("/api/v1/products");
    const list = res.json() as { slug: string; landingType: string; externalUrl: string | null }[];
    expect(list.map((p) => p.slug).slice(0, 3)).toEqual(["matrix-track-2", "matrix-track", "insstanto"]);
    expect(list[2]).toMatchObject({ landingType: "EXTERNAL", externalUrl: "https://insstanto.com/" });
  });

  it("returns 404 for an unknown product", async () => {
    expect((await app.inject("/api/v1/products/nope")).statusCode).toBe(404);
  });

  it("saves a lead and sends the notification", async () => {
    const res = await app.inject({ method: "POST", url: "/api/v1/leads", payload: { name: "Ada", email: "ada@example.test", message: "hi" } });
    expect(res.statusCode).toBe(201);
    expect(await prisma.lead.count({ where: { email: "ada@example.test" } })).toBe(1);
    expect(mailer).toHaveBeenCalledOnce();
  });

  it("silently drops honeypot submissions", async () => {
    const res = await app.inject({ method: "POST", url: "/api/v1/leads", payload: { name: "Bot", email: "bot@example.test", website: "http://spam" } });
    expect(res.statusCode).toBe(201);
    expect(await prisma.lead.count({ where: { email: "bot@example.test" } })).toBe(0);
  });

  it("rejects an invalid lead", async () => {
    const res = await app.inject({ method: "POST", url: "/api/v1/leads", payload: { name: "", email: "not-an-email" } });
    expect(res.statusCode).toBe(400);
  });
});

describe("admin API", () => {
  it("refuses unauthenticated access", async () => {
    for (const url of ["/api/v1/admin/products", "/api/v1/admin/leads", "/api/v1/admin/leads.csv"]) {
      expect((await app.inject(url)).statusCode).toBe(401);
    }
  });

  it("rejects wrong credentials", async () => {
    const res = await app.inject({ method: "POST", url: "/api/v1/admin/login", payload: { email: admin.email, password: "wrong" } });
    expect(res.statusCode).toBe(401);
  });

  it("requires CSRF on writes, validates products, and publish/unpublish drives the public list", async () => {
    const login = await app.inject({ method: "POST", url: "/api/v1/admin/login", payload: admin });
    expect(login.statusCode).toBe(200);
    const { csrf } = login.json() as { csrf: string };
    const cookies = login.cookies.reduce<Record<string, string>>((a, c) => ({ ...a, [c.name]: c.value }), {});
    const call = (method: "POST" | "PUT", url: string, payload: object, token?: string) =>
      app.inject({ method, url, payload, cookies, headers: token ? { "x-csrf-token": token } : {} });

    expect((await call("POST", "/api/v1/admin/products", newProduct())).statusCode).toBe(403);
    expect((await call("POST", "/api/v1/admin/products", newProduct({ landingType: "EXTERNAL" }), csrf)).statusCode).toBe(400);

    const created = await call("POST", "/api/v1/admin/products", newProduct(), csrf);
    expect(created.statusCode).toBe(201);
    expect((await app.inject("/api/v1/products/test-product")).statusCode).toBe(200);

    const { id } = created.json() as { id: string };
    await call("PUT", `/api/v1/admin/products/${id}`, newProduct({ published: false }), csrf);
    expect((await app.inject("/api/v1/products/test-product")).statusCode).toBe(404);
  });

  it("exports leads as CSV with formula cells neutralised", async () => {
    await prisma.lead.create({ data: { name: "=cmd()", email: "csv@example.test" } });
    const login = await app.inject({ method: "POST", url: "/api/v1/admin/login", payload: admin });
    const cookies = login.cookies.reduce<Record<string, string>>((a, c) => ({ ...a, [c.name]: c.value }), {});
    const csv = await app.inject({ url: "/api/v1/admin/leads.csv", cookies });
    expect(csv.headers["content-type"]).toContain("text/csv");
    expect(csv.body).toContain(`"'=cmd()"`);
  });
});
