import Fastify from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import multipart from "@fastify/multipart";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import argon2 from "argon2";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z, ZodError } from "zod";
import type { Prisma, PrismaClient, Product as Row } from "@prisma/client";
import {
  LeadInput,
  LeadStatus,
  LoginInput,
  PageInput,
  ProductInput,
  SettingsInput,
  type Product,
} from "@apricity/shared";
import { env } from "./env";
import { createMailer, type Mailer } from "./mail";
import { endSession, readSession, requireAdmin, startSession } from "./auth";

const toProduct = (r: Row): Product => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  tagline: r.tagline,
  summary: r.summary,
  audience: r.audience as Product["audience"],
  modules: r.modules as Product["modules"],
  features: r.features as Product["features"],
  metrics: r.metrics as Product["metrics"],
  media: r.media as Product["media"],
  content: r.content as Product["content"],
  landingType: r.landingType,
  externalUrl: r.externalUrl,
  order: r.order,
  published: r.published,
});

const productData = (p: ProductInput) => p as unknown as Prisma.ProductCreateInput;

// A leading quote stops spreadsheet apps from executing cells that start with = + - @.
const csvCell = (v: unknown) => {
  let s = String(v ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

// Resume formats: extension -> content type + first bytes the file must start with.
const RESUME_TYPES: Record<string, { type: string; magic: number[] }> = {
  ".pdf": { type: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] },
  ".doc": { type: "application/msword", magic: [0xd0, 0xcf, 0x11, 0xe0] },
  ".docx": { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", magic: [0x50, 0x4b] },
  ".jpg": { type: "image/jpeg", magic: [0xff, 0xd8, 0xff] },
  ".jpeg": { type: "image/jpeg", magic: [0xff, 0xd8, 0xff] },
  ".png": { type: "image/png", magic: [0x89, 0x50, 0x4e, 0x47] },
};
const RESUME_MAX_BYTES = 5 * 1024 * 1024;

const CareerInput = z.object({
  first: z.string().trim().min(1).max(50),
  last: z.string().trim().max(49).optional().default(""),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(5).max(30),
  description: z.string().trim().max(1500).optional().default(""),
  website: z.string().max(200).optional(),
});

async function verifyTurnstile(token: string | undefined) {
  if (!env.turnstileSecret) return true;
  if (!token) return false;
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret: env.turnstileSecret, response: token }),
  });
  return ((await r.json()) as { success?: boolean }).success === true;
}

export async function buildApp(prisma: PrismaClient, mailer: Mailer = createMailer()) {
  const app = Fastify({ logger: env.isProd });

  await app.register(helmet);
  await app.register(cors, {
    origin: env.webOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["content-type", "x-csrf-token"],
  });
  await app.register(multipart, { limits: { fileSize: RESUME_MAX_BYTES, files: 1, fields: 10 } });
  await app.register(cookie, { secret: env.sessionSecret });
  await app.register(rateLimit, { max: 120, timeWindow: "1 minute" });
  await app.register(swagger, {
    openapi: { info: { title: "Apricity Digital API", version: "1.0.0" } },
  });
  await app.register(swaggerUi, { routePrefix: "/docs" });

  app.setErrorHandler((err: unknown, _req, reply) => {
    // Match by name too: shared and api can load different zod module instances (ESM vs CJS).
    if (err instanceof ZodError || (err as Error)?.name === "ZodError") {
      return reply.code(400).send({ error: "Validation failed", issues: (err as ZodError).issues });
    }
    const e = err as { statusCode?: number; code?: string; message?: string };
    if (e.code === "P2002") return reply.code(409).send({ error: "Already exists" });
    if (e.code === "P2025") return reply.code(404).send({ error: "Not found" });
    const status = e.statusCode ?? 500;
    if (status >= 500) app.log.error(err);
    return reply.code(status).send({ error: status >= 500 ? "Internal error" : e.message });
  });

  app.get("/health", { schema: { hide: true } }, async () => ({ ok: true }));

  await app.register(
    async (v1) => {
      // ---------- public ----------
      v1.get("/products", { schema: { tags: ["public"] } }, async () => {
        const rows = await prisma.product.findMany({
          where: { published: true },
          orderBy: { order: "asc" },
        });
        return rows.map(toProduct);
      });

      v1.get<{ Params: { slug: string } }>(
        "/products/:slug",
        { schema: { tags: ["public"] } },
        async (req, reply) => {
          const row = await prisma.product.findFirst({
            where: { slug: req.params.slug, published: true },
          });
          return row ? toProduct(row) : reply.code(404).send({ error: "Not found" });
        },
      );

      v1.get("/settings", { schema: { tags: ["public"] } }, async (_req, reply) => {
        const s = await prisma.companySettings.findUnique({ where: { id: "company" } });
        return s ?? reply.code(404).send({ error: "Not found" });
      });

      v1.get<{ Params: { slug: string } }>(
        "/pages/:slug",
        { schema: { tags: ["public"] } },
        async (req, reply) => {
          const p = await prisma.page.findFirst({
            where: { slug: req.params.slug, published: true },
          });
          return p ?? reply.code(404).send({ error: "Not found" });
        },
      );

      v1.post(
        "/leads",
        { schema: { tags: ["public"] }, config: { rateLimit: { max: 5, timeWindow: "1 minute" } } },
        async (req, reply) => {
          const input = LeadInput.parse(req.body);
          // Honeypot: pretend success so bots learn nothing.
          if (input.website) return reply.code(201).send({ ok: true });
          if (!(await verifyTurnstile(input.turnstileToken))) {
            return reply.code(400).send({ error: "Spam check failed" });
          }
          const product = input.productInterest
            ? await prisma.product.findUnique({ where: { slug: input.productInterest } })
            : null;
          const lead = await prisma.lead.create({
            data: {
              name: input.name,
              organisation: input.organisation,
              role: input.role,
              email: input.email,
              phone: input.phone,
              productInterest: input.productInterest,
              message: input.message,
              source: input.source,
              productId: product?.id,
            },
          });
          // A mail failure must not lose the lead: it is already saved.
          mailer(
            `New lead: ${lead.name}${lead.organisation ? ` (${lead.organisation})` : ""}`,
            [
              `Name: ${lead.name}`,
              `Organisation: ${lead.organisation}`,
              `Role: ${lead.role}`,
              `Email: ${lead.email}`,
              `Phone: ${lead.phone}`,
              `Interest: ${lead.productInterest}`,
              `Source: ${lead.source}`,
              "",
              lead.message,
            ].join("\n"),
          ).catch((e) => app.log.error(e));
          return reply.code(201).send({ ok: true });
        },
      );

      // Careers application: multipart form with one resume file. Stored on disk, listed as a lead (source "careers").
      v1.post(
        "/careers",
        { schema: { tags: ["public"], consumes: ["multipart/form-data"] }, config: { rateLimit: { max: 5, timeWindow: "1 minute" } } },
        async (req, reply) => {
          const fields: Record<string, string> = {};
          let file: { name: string; ext: string; buf: Buffer } | undefined;
          for await (const part of req.parts()) {
            if (part.type === "field") {
              fields[part.fieldname] = String(part.value);
              continue;
            }
            const buf = await part.toBuffer();
            if (part.file.truncated) return reply.code(413).send({ error: "File is too large (max 5 MB)" });
            file = { name: part.filename, ext: path.extname(part.filename).toLowerCase(), buf };
          }
          const input = CareerInput.parse(fields);
          if (input.website) return reply.code(201).send({ ok: true }); // honeypot
          if (!file || file.buf.length === 0) return reply.code(400).send({ error: "Please attach your resume" });
          const kind = RESUME_TYPES[file.ext];
          if (!kind || !kind.magic.every((b, i) => file!.buf[i] === b)) {
            return reply.code(400).send({ error: "Unsupported file. Use PDF, Word (doc, docx), JPG or PNG" });
          }
          // Random on-disk name: the client's file name is never used as a path.
          const stored = `${randomUUID()}${file.ext}`;
          await mkdir(env.uploadDir, { recursive: true });
          await writeFile(path.join(env.uploadDir, stored), file.buf);
          const lead = await prisma.lead.create({
            data: {
              name: `${input.first} ${input.last}`.trim(),
              email: input.email,
              phone: input.phone,
              message: input.description,
              source: "careers",
              resumeFile: stored,
              resumeName: path.basename(file.name).slice(0, 200),
            },
          });
          mailer(
            `New career application: ${lead.name}`,
            [`Name: ${lead.name}`, `Email: ${lead.email}`, `Phone: ${lead.phone}`, `Resume: ${lead.resumeName} (download from Admin > Leads)`, "", lead.message].join("\n"),
          ).catch((e) => app.log.error(e));
          return reply.code(201).send({ ok: true });
        },
      );

      // ---------- admin ----------
      v1.post(
        "/admin/login",
        { schema: { tags: ["admin"] }, config: { rateLimit: { max: 10, timeWindow: "1 minute" } } },
        async (req, reply) => {
          const { email, password } = LoginInput.parse(req.body);
          const admin = await prisma.adminUser.findUnique({ where: { email: email.toLowerCase() } });
          // Same response for unknown user and wrong password.
          if (!admin || !(await argon2.verify(admin.passwordHash, password))) {
            return reply.code(401).send({ error: "Invalid credentials" });
          }
          return { email: admin.email, csrf: startSession(reply, admin.id) };
        },
      );

      v1.post(
        "/admin/logout",
        { schema: { tags: ["admin"] }, preHandler: requireAdmin },
        async (_req, reply) => {
          endSession(reply);
          return { ok: true };
        },
      );

      v1.get("/admin/me", { schema: { tags: ["admin"] } }, async (req, reply) => {
        const s = readSession(req);
        if (!s) return reply.code(401).send({ error: "Unauthorized" });
        const admin = await prisma.adminUser.findUnique({ where: { id: s.adminId } });
        return admin
          ? { email: admin.email, csrf: s.csrf }
          : reply.code(401).send({ error: "Unauthorized" });
      });

      await v1.register(async (admin) => {
        admin.addHook("preHandler", requireAdmin);

        admin.get("/admin/products", async () =>
          (await prisma.product.findMany({ orderBy: { order: "asc" } })).map(toProduct),
        );
        admin.post("/admin/products", async (req, reply) => {
          const data = ProductInput.parse(req.body);
          const row = await prisma.product.create({ data: productData(data) });
          return reply.code(201).send(toProduct(row));
        });
        // Registered before /:id so "reorder" is not read as an id.
        admin.put("/admin/products/reorder", async (req) => {
          const { ids } = z.object({ ids: z.array(z.string()).min(1) }).parse(req.body);
          await prisma.$transaction(
            ids.map((id, i) => prisma.product.update({ where: { id }, data: { order: i + 1 } })),
          );
          return { ok: true };
        });
        admin.put<{ Params: { id: string } }>("/admin/products/:id", async (req) => {
          const data = ProductInput.parse(req.body);
          return toProduct(
            await prisma.product.update({ where: { id: req.params.id }, data: productData(data) }),
          );
        });
        admin.delete<{ Params: { id: string } }>("/admin/products/:id", async (req) => {
          await prisma.product.delete({ where: { id: req.params.id } });
          return { ok: true };
        });

        admin.put("/admin/settings", async (req) => {
          const data = SettingsInput.parse(req.body);
          return prisma.companySettings.upsert({
            where: { id: "company" },
            update: data,
            create: { id: "company", ...data },
          });
        });

        admin.get("/admin/leads", async () =>
          prisma.lead.findMany({ orderBy: { createdAt: "desc" } }),
        );
        admin.patch<{ Params: { id: string } }>("/admin/leads/:id", async (req) => {
          const { status } = z.object({ status: LeadStatus }).parse(req.body);
          return prisma.lead.update({ where: { id: req.params.id }, data: { status } });
        });
        admin.get<{ Params: { id: string } }>("/admin/leads/:id/resume", async (req, reply) => {
          const lead = await prisma.lead.findUnique({ where: { id: req.params.id } });
          if (!lead?.resumeFile) return reply.code(404).send({ error: "No resume" });
          const ext = path.extname(lead.resumeFile);
          const safeName = (lead.resumeName || `resume${ext}`).replace(/[^\w. -]/g, "_");
          const data = await readFile(path.join(env.uploadDir, path.basename(lead.resumeFile)));
          return reply
            .header("content-type", RESUME_TYPES[ext]?.type ?? "application/octet-stream")
            .header("content-disposition", `attachment; filename="${safeName}"`)
            .header("x-content-type-options", "nosniff")
            .send(data);
        });
        admin.get("/admin/leads.csv", async (_req, reply) => {
          const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
          const head = [
            "createdAt",
            "status",
            "name",
            "organisation",
            "role",
            "email",
            "phone",
            "productInterest",
            "source",
            "resumeName",
            "message",
          ] as const;
          const rows = leads.map((l) => head.map((h) => csvCell(l[h])).join(","));
          return reply
            .header("content-type", "text/csv; charset=utf-8")
            .header("content-disposition", 'attachment; filename="leads.csv"')
            .send([head.join(","), ...rows].join("\n"));
        });

        admin.get("/admin/pages", async () => prisma.page.findMany({ orderBy: { slug: "asc" } }));
        admin.put<{ Params: { slug: string } }>("/admin/pages/:slug", async (req) => {
          const data = PageInput.parse(req.body);
          return prisma.page.upsert({
            where: { slug: req.params.slug },
            update: data,
            create: { slug: req.params.slug, ...data },
          });
        });
      });
    },
    { prefix: "/api/v1" },
  );

  return app;
}
