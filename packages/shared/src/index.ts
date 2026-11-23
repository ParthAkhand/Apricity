import { z } from "zod";

export const LandingType = z.enum(["INTERNAL", "EXTERNAL"]);
export type LandingType = z.infer<typeof LandingType>;

const titled = z.object({ title: z.string().min(1).max(120), description: z.string().max(600) });
const step = titled;
const faq = z.object({ q: z.string().min(1).max(200), a: z.string().min(1).max(800) });

/** Landing-page copy for INTERNAL products. Everything is data, so admin edits need no deploy. */
export const ProductContent = z.object({
  headline: z.string().max(160).default(""),
  problem: z.string().max(800).default(""),
  outcome: z.string().max(800).default(""),
  steps: z.array(step).max(6).default([]),
  faq: z.array(faq).max(10).default([]),
  /** Short notes shown only in admin, e.g. "// CONFIRM" items. */
  notes: z.string().max(1000).default(""),
});
export type ProductContent = z.infer<typeof ProductContent>;

export const ProductInput = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "lowercase letters, numbers and dashes"),
    name: z.string().min(1).max(80),
    tagline: z.string().max(160),
    summary: z.string().max(600),
    audience: z.array(z.string().max(120)).max(10).default([]),
    modules: z.array(titled).max(12).default([]),
    features: z.array(z.string().max(160)).max(20).default([]),
    metrics: z.array(z.object({ label: z.string().max(80), value: z.string().max(40) })).max(8).default([]),
    media: z.record(z.string(), z.string()).default({}),
    content: ProductContent.default({}),
    landingType: LandingType,
    externalUrl: z.string().url().startsWith("https://").nullable().default(null),
    order: z.number().int().min(0).default(0),
    published: z.boolean().default(false),
  })
  .refine((p) => p.landingType !== "EXTERNAL" || !!p.externalUrl, {
    message: "externalUrl is required for EXTERNAL products",
    path: ["externalUrl"],
  });
export type ProductInput = z.infer<typeof ProductInput>;
export type Product = ProductInput & { id: string };

export const LeadStatus = z.enum(["NEW", "CONTACTED", "CLOSED"]);
export type LeadStatus = z.infer<typeof LeadStatus>;

export const LeadInput = z.object({
  name: z.string().trim().min(1).max(100),
  organisation: z.string().trim().max(160).optional().default(""),
  role: z.string().trim().max(100).optional().default(""),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional().default(""),
  productInterest: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  source: z.string().trim().max(80).optional().default("website"),
  /** Honeypot: real users never fill this. Bots do. */
  website: z.string().max(200).optional(),
  turnstileToken: z.string().max(2048).optional(),
});
export type LeadInput = z.infer<typeof LeadInput>;

export const Stat = z.object({ value: z.string(), label: z.string(), verified: z.boolean() });

export const SettingsInput = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  parentCompany: z.string().min(1),
  founder: z.object({ name: z.string().min(1), title: z.string().min(1) }),
  stats: z.array(Stat).max(6),
  tagline: z.string().min(1),
  brandLine: z.string().min(1),
});
export type Settings = z.infer<typeof SettingsInput>;

export const PageInput = z.object({
  title: z.string().min(1).max(160),
  body: z.string().max(100_000),
  published: z.boolean().default(true),
});
export type PageInput = z.infer<typeof PageInput>;
export type LegalPage = PageInput & { slug: string };

export const LoginInput = z.object({ email: z.string().email(), password: z.string().min(1).max(200) });
export type LoginInput = z.infer<typeof LoginInput>;

export * from "./seed";
export * from "./legal";
