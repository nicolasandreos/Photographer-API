import { config } from "dotenv";

export default async function globalSetup() {
  config({ path: ".env.test", override: true });

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl?.includes("photostudio_test")) {
    throw new Error(
      `Setup refused: non-test database: ${databaseUrl ?? "(unset)"}`
    );
  }

  return async () => {
    config({ path: ".env.test", override: true });

    const { db } = await import("../../infra/database/client");
    const { cleanDatabase } = await import("../../infra/database/seed");

    await cleanDatabase(db);
    await db.$disconnect();
  };
}
