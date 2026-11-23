import { createHmac, timingSafeEqual } from "node:crypto";
import type { FastifyReply, FastifyRequest } from "fastify";
import { env } from "./env";

const COOKIE = "sid";
const TTL_MS = 8 * 60 * 60 * 1000;

const csrfFor = (sid: string) => createHmac("sha256", env.sessionSecret).update(sid).digest("hex");

export function startSession(reply: FastifyReply, adminId: string) {
  const sid = `${adminId}.${Date.now() + TTL_MS}`;
  reply.setCookie(COOKIE, sid, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.isProd,
    path: "/",
    signed: true,
    maxAge: TTL_MS / 1000,
  });
  return csrfFor(sid);
}

export function endSession(reply: FastifyReply) {
  reply.clearCookie(COOKIE, { path: "/" });
}

/** Returns { adminId, csrf } for a valid session cookie, else null. */
export function readSession(req: FastifyRequest) {
  const raw = req.cookies[COOKIE];
  if (!raw) return null;
  const un = req.unsignCookie(raw);
  if (!un.valid || !un.value) return null;
  const [adminId, exp] = un.value.split(".");
  if (!adminId || Number(exp) < Date.now()) return null;
  return { adminId, csrf: csrfFor(un.value) };
}

/** preHandler for /admin routes: valid session, and a matching CSRF header on writes. */
export async function requireAdmin(req: FastifyRequest, reply: FastifyReply) {
  const s = readSession(req);
  if (!s) return reply.code(401).send({ error: "Unauthorized" });
  if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    const sent = String(req.headers["x-csrf-token"] ?? "");
    const a = Buffer.from(sent);
    const b = Buffer.from(s.csrf);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return reply.code(403).send({ error: "Invalid CSRF token" });
    }
  }
}
