import { config } from "dotenv";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";
import { createMysqlDbConfig } from "../src/infra/database/mysql-config";

config({ path: ".env" });
config({ path: ".env.development" });

const adapter = new PrismaMariaDb(createMysqlDbConfig());

const prisma = new PrismaClient({ adapter });

const photographers = [
  {
    name: "Ana Costa",
    email: "ana.costa@luzestudio.fake",
    passwordHash: "$2a$10$fakehashana000000000000000000000000000000000000",
    phoneNumber: "+55 11 91234-0001",
    studioName: "Luz & Sombra Fotografia",
    isActive: true,
    emailVerified: true,
    lastLoginAt: new Date("2026-03-15T14:30:00.000Z"),
  },
  {
    name: "Bruno Mendes",
    email: "bruno.mendes@clickurban.fake",
    passwordHash: "$2a$10$fakehashbruno00000000000000000000000000000000",
    phoneNumber: "+55 21 99876-0002",
    studioName: "Click Urban",
    isActive: true,
    emailVerified: false,
    lastLoginAt: null,
  },
  {
    name: "Carla Ribeiro",
    email: "carla.ribeiro@momentos.fake",
    passwordHash: "$2a$10$fakehashcarla0000000000000000000000000000000",
    phoneNumber: "+55 31 98765-0003",
    studioName: null,
    isActive: true,
    emailVerified: true,
    lastLoginAt: new Date("2026-06-01T09:00:00.000Z"),
  },
  {
    name: "Diego Alves",
    email: "diego.alves@frameone.fake",
    passwordHash: "$2a$10$fakehashdiego0000000000000000000000000000000",
    phoneNumber: "+55 41 97654-0004",
    studioName: "Frame One Studio",
    isActive: false,
    emailVerified: false,
    lastLoginAt: null,
  },
  {
    name: "Elena Fischer",
    email: "elena.fischer@goldenhour.fake",
    passwordHash: "$2a$10$fakehashelena0000000000000000000000000000000",
    phoneNumber: "+55 51 96543-0005",
    studioName: "Golden Hour",
    isActive: true,
    emailVerified: true,
    lastLoginAt: new Date("2026-07-01T18:45:00.000Z"),
  },
] as const;

async function main() {
  for (const photographer of photographers) {
    await prisma.photographer.upsert({
      where: { email: photographer.email },
      update: {
        name: photographer.name,
        passwordHash: photographer.passwordHash,
        phoneNumber: photographer.phoneNumber,
        studioName: photographer.studioName,
        isActive: photographer.isActive,
        emailVerified: photographer.emailVerified,
        lastLoginAt: photographer.lastLoginAt,
      },
      create: photographer,
    });
  }

  console.log(`Seed: ${photographers.length} photographers upserted.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
