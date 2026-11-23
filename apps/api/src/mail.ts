import nodemailer from "nodemailer";
import { env } from "./env";

export type Mailer = (subject: string, text: string) => Promise<void>;

/** SMTP when SMTP_HOST is set, otherwise logs to the console (dev). */
export function createMailer(): Mailer {
  if (!env.smtp.host) {
    return async (subject, text) => {
      console.log(`[mail:dev] to=${env.smtp.to}\nsubject: ${subject}\n${text}\n`);
    };
  }
  const transport = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.pass } : undefined,
  });
  return async (subject, text) => {
    await transport.sendMail({ from: env.smtp.from, to: env.smtp.to, subject, text });
  };
}
