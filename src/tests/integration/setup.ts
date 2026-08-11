import { beforeEach, afterEach, afterAll, beforeAll } from "vitest";
import { config } from "dotenv";
import { cleanDatabase, seedDatabase } from "../../infra/database/seed";
import { getRedisClient } from "../../infra/database/redis-client";

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
const redis = getRedisClient();

const clearRateLimitKeys = async () => {
  try {
    if (redis.status !== "ready") {
      await redis.connect();
    }

    const keys = await redis.keys("login:*");
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch {
    // Redis may be unavailable for some unit tests; login rate-limit cleanup is best-effort
  }
};

beforeAll(async () => {
  await db.$connect();
});

beforeEach(async () => {
  await clearRateLimitKeys();
  await seedDatabase(db);
});

afterEach(async () => {
  await cleanDatabase(db);
});

afterAll(async () => {
  await db.$disconnect();
});
