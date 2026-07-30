import { config } from "dotenv";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../../generated/prisma/client";
import { createMysqlDbConfig } from "./mysql-config";

if (process.env.VITEST) {
  config({ path: ".env.test", override: true });
} else {
  config({ path: ".env" });
  config({ path: ".env.development" });
}

const adapter = new PrismaMariaDb(createMysqlDbConfig());

const db = new PrismaClient({ adapter });

export { db };
