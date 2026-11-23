# Apricity Digital: full-stack site

Monorepo (npm workspaces): `apps/web` (Next.js), `apps/api` (Fastify + Prisma + PostgreSQL), `packages/shared` (zod schemas, types, seed data).
Products are data: add, edit, reorder or unpublish them in the admin panel, with no code change or redeploy.

## Quick start

Option A: everything in Docker (web, API, Postgres, seeded):

```
docker compose up --build
```

Option B: local dev (Node 20+; Postgres from compose):

```
cp .env.example .env        # then set ADMIN_EMAIL / ADMIN_PASSWORD (dev only) and SESSION_SECRET
npm install
npm run db:up               # Postgres in Docker
npm run db:migrate          # create tables
npm run db:seed             # settings, 3 products, legal pages, admin from .env
npm run dev                 # web :3000, API :4000
```

| URL | What |
|---|---|
| http://localhost:3000 | Site |
| http://localhost:3000/admin | Admin panel |
| http://localhost:4000/docs | API docs (OpenAPI) |

**Demo admin (dev only):** `admin@apricity.local` / `Apricity-Dev-2026` (set in `docker-compose.yml` and your local `.env`). Never use these in production.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | web + API with reload |
| `npm run build` | build shared, API, web |
| `npm run lint` / `npm run typecheck` | ESLint, TypeScript (strict) |
| `npm test` | API integration tests (need Postgres running and migrated) |
| `npm run db:migrate` / `db:seed` | schema and seed |

## Environment (see `.env.example`)

`DATABASE_URL`, `API_PORT`, `WEB_ORIGIN` (CORS), `NEXT_PUBLIC_API_URL` (browser to API), `API_URL` (server to API), `SESSION_SECRET` (32+ chars in production), `ADMIN_EMAIL`/`ADMIN_PASSWORD` (seed), `SMTP_*` and `LEAD_NOTIFY_TO` (empty `SMTP_HOST` logs lead emails to the console), `TURNSTILE_SECRET` (optional spam check). Secrets never go in the repo.

## Architecture

- **Web** fetches products, settings and legal pages from `/api/v1` with ISR (60 s) and shows seeded fallback data if the API is down. Admin saves also mark the cache stale.
- **API** validates every input with the shared zod schemas, rate-limits, uses helmet and locked CORS, and protects admin routes with a signed httpOnly session cookie plus a CSRF header. Passwords are hashed with argon2.
- **Product rule:** `landingType: EXTERNAL` products (Insstanto) never get an internal page; their card opens `externalUrl` in a new tab. `INTERNAL` products render at `/products/[slug]`.
- **Legacy:** the frozen copy of the old Wix site is in `legacy/wix-snapshot/` (tag `legacy-reference`). Old URLs redirect (see `apps/web/next.config.mjs`).
- **Docs:** `docs/01-site-review.md`, `docs/02-plan.md`, `docs/03-final-summary.md`. Context graph: `graphify-out/`.

## Production notes

Serve web and API on the same site (e.g. `www.` and `api.` subdomains) so the session cookie works, set `secure` via `NODE_ENV=production`, and set real `SESSION_SECRET`, SMTP and admin credentials.
