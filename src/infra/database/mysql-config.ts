import type { PoolConfig } from "mariadb";

export function createMysqlDbConfig(): PoolConfig {
  const sslEnabled = process.env.DATABASE_SSL === "true";

  return {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT ?? "3306", 10),
    database: process.env.DATABASE_NAME,
    connectionLimit: 5,
    allowPublicKeyRetrieval: true,
    ssl: sslEnabled ? { rejectUnauthorized: true } : undefined,
  };
}
