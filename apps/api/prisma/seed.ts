import { PrismaClient, type Prisma } from "@prisma/client";
import argon2 from "argon2";
import { legalPages, seedProducts, seedSettings } from "@apricity/shared";

const prisma = new PrismaClient();

async function main() {
  await prisma.companySettings.upsert({
    where: { id: "company" },
    update: seedSettings,
    create: { id: "company", ...seedSettings },
  });
  for (const p of seedProducts) {
    const data = p as unknown as Prisma.ProductCreateInput;
    await prisma.product.upsert({ where: { slug: p.slug }, update: data, create: data });
  }
  for (const [slug, page] of Object.entries(legalPages)) {
    await prisma.page.upsert({ where: { slug }, update: page, create: { slug, ...page } });
  }
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    const email = ADMIN_EMAIL.toLowerCase();
    await prisma.adminUser.upsert({
      where: { email },
      update: {},
      create: { email, passwordHash: await argon2.hash(ADMIN_PASSWORD) },
    });
    console.log(`Admin ready: ${email}`);
  } else {
    console.log("ADMIN_EMAIL/ADMIN_PASSWORD not set: no admin created");
  }
}

main().finally(() => prisma.$disconnect());
