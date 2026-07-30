import { beforeEach } from "vitest";
import { config } from "dotenv";

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
const { resetDatabase } = await import("../../infra/database/seed");

beforeEach(async () => {
  await resetDatabase(db);
});
