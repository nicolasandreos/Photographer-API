import { describe, it, expect } from "vitest";
import { PrismaPhotographerRepository } from "../../infra/adapters/prisma-photographer";
import { CreatePhotographerEntity, PhotographerEntity, UpdatePhotographerEntity } from "../../domain/entities/photographer";

describe("PrismaPhotographerRepository", () => {
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

  it("should find photographer by id", async () => {
    const photographer = await repository.getById("1");

    expect(photographer).not.toBeNull();
    expect(photographer!.getId()).toBe("1");
    expect(photographer!.getName()).toBe("Ana Costa");
    expect(photographer!.getEmail()).toBe("ana.costa@luzestudio.fake");
    expect(photographer!.getPhoneNumber()).toBe("+55 11 91234-0001");
    expect(photographer!.getStudioName()).toBe("Luz & Sombra Fotografia");
    expect(photographer!.getIsActive()).toBe(true);
    expect(photographer!.getEmailVerified()).toBe(true);
  });

  it("should create a new photographer", async () => {
    const photographer = await repository.create(new CreatePhotographerEntity({
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "+55 11 91234-0001",
      studioName: null,
      passwordHash: "123456",
    }));

    expect(photographer).not.toBeNull();
    expect(photographer!.getName()).toBe("John Doe");
    expect(photographer!.getEmail()).toBe("john.doe@example.com");
    expect(photographer!.getPhoneNumber()).toBe("+55 11 91234-0001");
    expect(photographer!.getStudioName()).toBeNull();
  });

  it("should update a photographer", async () => {
    const photographer = await repository.update("1", new UpdatePhotographerEntity({
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "+55 11 91234-0001",
      studioName: null,
    }));

    expect(photographer).not.toBeNull();
    expect(photographer!.getName()).toBe("John Doe");
    expect(photographer!.getEmail()).toBe("john.doe@example.com");
    expect(photographer!.getPhoneNumber()).toBe("+55 11 91234-0001");
    expect(photographer!.getStudioName()).toBeNull();
  });

  it("should delete a photographer", async () => {
    await repository.delete("1");

    const photographer = await repository.getById("1");

    expect(photographer).toBeNull();
  });

  it("should update a photographer's password", async () => {
    const photographer = await repository.updatePassword(new PhotographerEntity({
      id: "1",
      name: "Ana Costa",
      email: "ana.costa@luzestudio.fake",
      phoneNumber: "+55 11 91234-0001",
      studioName: "Luz & Sombra Fotografia",
      passwordHash: "hashedPassword",
      isActive: true,
      emailVerified: true,
    }));

    expect(photographer.getPasswordHash()).toBe("hashedPassword");
  });
});
