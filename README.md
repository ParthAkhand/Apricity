# Apricity Digital: full-stack site

Monorepo (npm workspaces): `apps/web` (Next.js), `apps/api` (Fastify + Prisma + SQLite), `packages/shared` (zod schemas, types, seed data).
Products are data: edit, reorder or unpublish them in the admin panel, with no code change or redeploy.

## Quick start

Local dev (Node 20+ and no separate DB server (SQLite file)):

```
cp .env.example .env        # then set ADMIN_EMAIL / ADMIN_PASSWORD (dev only) and SESSION_SECRET
npm install
npm run db:migrate          # create tables
npm run db:seed             # settings, 3 products, legal pages, admin from .env
npm run dev                 # web :3000, API :4000
```

| URL | What |
|---|---|
| http://localhost:3000 | Site |
| http://localhost:3000/admin | Admin panel |
| http://localhost:4000/docs | API docs (OpenAPI) |

**Demo admin (dev only):** `admin@apricity.local` / `Apricity-Dev-2026` (set in your local `.env`). Never use these in production.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | web + API with reload |
| `npm run build` | build shared, API, web |
| `npm run lint` / `npm run typecheck` | ESLint, TypeScript (strict) |
| `npm test` | API integration tests (need the DB migrated: `npm run db:migrate`) |
| `npm run db:migrate` / `db:seed` | schema and seed |

## Environment (see `.env.example`)

`DATABASE_URL`, `API_PORT`, `WEB_ORIGIN` (CORS), `NEXT_PUBLIC_API_URL` (browser to API), `API_URL` (server to API), `SESSION_SECRET` (32+ chars in production), `ADMIN_EMAIL`/`ADMIN_PASSWORD` (seed), `SMTP_*` and `LEAD_NOTIFY_TO` (empty `SMTP_HOST` logs lead emails to the console), `TURNSTILE_SECRET` (optional spam check). Secrets never go in the repo.