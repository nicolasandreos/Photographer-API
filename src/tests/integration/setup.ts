import { beforeEach, afterEach, afterAll, beforeAll } from "vitest";
import { config } from "dotenv";
import { cleanDatabase, seedDatabase } from "../../infra/database/seed";

config({ path: ".env.test", override: true });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

if (!databaseUrl.includes("photostudio_test")) {
  throw new Error(
    `Tests are pointing to a non-test database: ${databaseUrl}`
  );
}

const { db } = await import("../../infra/database/client");

beforeAll(async () => {
  await db.$connect();
});

beforeEach(async () => {
  await seedDatabase(db);
});

afterEach(async () => {
  await cleanDatabase(db);
});

afterAll(async () => {
  await db.$disconnect();
});