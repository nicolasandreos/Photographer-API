import { describe, it, expect } from "vitest";
import { PrismaPhotographerRepository } from "../../infra/adapters/prisma-photographer";

describe("PrismaPhotographerRepository (integration)", () => {
  const repository = new PrismaPhotographerRepository();

  it("should find seeded photographer by email", async () => {
    const photographer = await repository.getByEmail(
      "carla.ribeiro@momentos.fake",
    );

    expect(photographer).not.toBeNull();
    expect(photographer!.getEmail()).toBe("carla.ribeiro@momentos.fake");
    expect(photographer!.getName()).toBe("Carla Ribeiro");
    expect(photographer!.getPhoneNumber()).toBe("+55 31 98765-0003");
    expect(photographer!.getStudioName()).toBeNull();
    expect(photographer!.getIsActive()).toBe(true);
    expect(photographer!.getEmailVerified()).toBe(true);
  });
});
