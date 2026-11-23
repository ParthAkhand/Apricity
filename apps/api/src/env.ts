import path from "node:path";
const secret = process.env.SESSION_SECRET ?? "";
if (process.env.NODE_ENV === "production" && secret.length < 32) {
  throw new Error("SESSION_SECRET must be at least 32 characters in production");
}

export const env = {
  isProd: process.env.NODE_ENV === "production",
  port: Number(process.env.API_PORT ?? 4000),
  webOrigin: process.env.WEB_ORIGIN ?? "http://localhost:3000",
  // Dev-only fallback so tests and local runs start without setup; production is guarded above.
  sessionSecret: secret || "dev-only-insecure-secret-change-me-0123456789",
  smtp: {
    host: process.env.SMTP_HOST ?? "",
    port: Number(process.env.SMTP_PORT ?? 587),
    user: process.env.SMTP_USER ?? "",
    pass: process.env.SMTP_PASS ?? "",
    from: process.env.SMTP_FROM || process.env.LEAD_NOTIFY_TO || "info@apricitydigital.in",
    to: process.env.LEAD_NOTIFY_TO ?? "info@apricitydigital.in",
  },
  // Resume uploads are written here. Back it up and mount a persistent volume in production.
  uploadDir: path.resolve(process.env.UPLOAD_DIR ?? "uploads"),
  turnstileSecret: process.env.TURNSTILE_SECRET ?? "",
};
