import { PrismaClient } from "@prisma/client";
import { buildApp } from "./app";
import { env } from "./env";

const prisma = new PrismaClient();

buildApp(prisma)
  .then((app) => app.listen({ port: env.port, host: "0.0.0.0" }))
  .then((addr) => console.log(`API listening on ${addr} (docs: ${addr}/docs)`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
