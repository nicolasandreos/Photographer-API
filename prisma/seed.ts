import { config } from "dotenv";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";
import { createMysqlDbConfig } from "../src/infra/database/mysql-config";
import {
  resetDatabase,
  SEED_ADMINISTRATORS,
  SEED_PHOTOGRAPHERS,
} from "../src/infra/database/seed";

config({ path: ".env" });
config({ path: ".env.development" });

const adapter = new PrismaMariaDb(createMysqlDbConfig());
const prisma = new PrismaClient({ adapter });

async function main() {
  await resetDatabase(prisma);

  console.log(
    `Seed: ${SEED_PHOTOGRAPHERS.length} photographers and ${SEED_ADMINISTRATORS.length} administrators inserted.`
  );
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
