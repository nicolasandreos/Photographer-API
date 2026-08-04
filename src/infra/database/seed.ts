import bcrypt from "bcrypt";
import type { PrismaClient } from "../../../generated/prisma/client";

export const SEED_PASSWORD = "Test@123";

export const SEED_PHOTOGRAPHERS = [
  {
    id: "1",
    name: "Ana Costa",
    email: "ana.costa@luzestudio.fake",
    phoneNumber: "11910904129",
    studioName: "Luz & Sombra Fotografia",
    isActive: true,
    emailVerified: true,
    lastLoginAt: new Date("2026-03-15T14:30:00.000Z"),
  },
  {
    id: "2",
    name: "Bruno Mendes",
    email: "bruno.mendes@clickurban.fake",
    phoneNumber: "21998760002",
    studioName: "Click Urban",
    isActive: true,
    emailVerified: false,
    lastLoginAt: null,
  },
  {
    id: "3",
    name: "Carla Ribeiro",
    email: "carla.ribeiro@momentos.fake",
    phoneNumber: "31987650003",
    studioName: null,
    isActive: true,
    emailVerified: true,
    lastLoginAt: new Date("2026-06-01T09:00:00.000Z"),
  },
  {
    id: "4",
    name: "Diego Alves",
    email: "diego.alves@frameone.fake",
    phoneNumber: "41976540004",
    studioName: "Frame One Studio",
    isActive: false,
    emailVerified: false,
    lastLoginAt: null,
  },
  {
    id: "5",
    name: "Elena Fischer",
    email: "elena.fischer@goldenhour.fake",
    phoneNumber: "51965430005",
    studioName: "Golden Hour",
    isActive: true,
    emailVerified: true,
    lastLoginAt: new Date("2026-07-01T18:45:00.000Z"),
  },
] as const;

export const SEED_ADMINISTRATORS = [
  {
    id: "1",
    email: "admin.one@photostudio.fake",
    lastLoginAt: new Date("2026-03-10T10:00:00.000Z"),
  },
  {
    id: "2",
    email: "admin.two@photostudio.fake",
    lastLoginAt: null,
  },
  {
    id: "3",
    email: "admin.three@photostudio.fake",
    lastLoginAt: new Date("2026-05-20T16:30:00.000Z"),
  },
  {
    id: "4",
    email: "admin.four@photostudio.fake",
    lastLoginAt: null,
  },
  {
    id: "5",
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