import "dotenv/config";

import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL bulunamadı.");
  }

  const adapter = new PrismaPg({
    connectionString,
  });

  const prisma = new PrismaClient({
    adapter,
  });

  const email = "admin@cetinerstore.com";
  const password = "Admin123!";

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: {
      email,
    },

    update: {
      name: "Admin",
      passwordHash,
      role: "ADMIN",
    },

    create: {
      name: "Admin",
      email,
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("Admin oluşturuldu:");
  console.log(admin.email);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});