import bcrypt from "bcrypt";
import type { PrismaClient } from "../../../generated/prisma/client";

export const SEED_PASSWORD = "Test@123";

export const SEED_PHOTOGRAPHERS = [
  {
    name: "Ana Costa",
    email: "ana.costa@luzestudio.fake",
    phoneNumber: "+55 11 91234-0001",
    studioName: "Luz & Sombra Fotografia",
    isActive: true,
    emailVerified: true,
    lastLoginAt: new Date("2026-03-15T14:30:00.000Z"),
  },
  {
    name: "Bruno Mendes",
    email: "bruno.mendes@clickurban.fake",
    phoneNumber: "+55 21 99876-0002",
    studioName: "Click Urban",
    isActive: true,
    emailVerified: false,
    lastLoginAt: null,
  },
  {
    name: "Carla Ribeiro",
    email: "carla.ribeiro@momentos.fake",
    phoneNumber: "+55 31 98765-0003",
    studioName: null,
    isActive: true,
    emailVerified: true,
    lastLoginAt: new Date("2026-06-01T09:00:00.000Z"),
  },
  {
    name: "Diego Alves",
    email: "diego.alves@frameone.fake",
    phoneNumber: "+55 41 97654-0004",
    studioName: "Frame One Studio",
    isActive: false,
    emailVerified: false,
    lastLoginAt: null,
  },
  {
    name: "Elena Fischer",
    email: "elena.fischer@goldenhour.fake",
    phoneNumber: "+55 51 96543-0005",
    studioName: "Golden Hour",
    isActive: true,
    emailVerified: true,
    lastLoginAt: new Date("2026-07-01T18:45:00.000Z"),
  },
] as const;

export const SEED_ADMINISTRATORS = [
  {
    email: "admin.one@photostudio.fake",
    lastLoginAt: new Date("2026-03-10T10:00:00.000Z"),
  },
  {
    email: "admin.two@photostudio.fake",
    lastLoginAt: null,
  },
  {
    email: "admin.three@photostudio.fake",
    lastLoginAt: new Date("2026-05-20T16:30:00.000Z"),
  },
  {
    email: "admin.four@photostudio.fake",
    lastLoginAt: null,
  },
  {
    email: "admin.five@photostudio.fake",
    lastLoginAt: new Date("2026-07-15T08:15:00.000Z"),
  },
] as const;

export async function cleanDatabase(db: PrismaClient): Promise<void> {
  await db.photographer.deleteMany();
  await db.administratorUser.deleteMany();
}

export async function seedDatabase(db: PrismaClient): Promise<void> {
  const passwordHash = await bcrypt.hash(SEED_PASSWORD, 10);

  await db.photographer.createMany({
    data: SEED_PHOTOGRAPHERS.map((photographer) => ({
      ...photographer,
      passwordHash,
    })),
  });

  await db.administratorUser.createMany({
    data: SEED_ADMINISTRATORS.map((administrator) => ({
      ...administrator,
      passwordHash,
    })),
  });
}