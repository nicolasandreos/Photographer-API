import { config } from "dotenv";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../../generated/prisma/client";
import { createMysqlDbConfig } from "./mysql-config";

config({ path: ".env" });
config({ path: ".env.development" });

const adapter = new PrismaMariaDb(createMysqlDbConfig());

const db = new PrismaClient({ adapter });

export { db };
