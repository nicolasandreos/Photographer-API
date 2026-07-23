import {
  CreatePhotographerEntity,
  PhotographerEntity,
  UpdatePhotographerEntity,
} from "../../domain/entities/photographer";
import { IPhotographerRepository } from "../../domain/repositories/photographer";
import { db } from "../database/client";
import { PhotographerMapperRepository } from "../mappers/photographer-mapper";

export class PrismaPhotographerRepository implements IPhotographerRepository {
  async getAll(): Promise<PhotographerEntity[]> {
    const databasePhotographers = await db.photographer.findMany();
    const entityPhotographers = databasePhotographers.map(
      PhotographerMapperRepository.toEntity,
    );

    return entityPhotographers;
  }

  async getById(id: string): Promise<PhotographerEntity | null> {
    const databasePhotographer = await db.photographer.findUnique({
      where: {
        id: id,
      },
    });
    return databasePhotographer
      ? PhotographerMapperRepository.toEntity(databasePhotographer)
      : null;
  }

  async create(photographer: CreatePhotographerEntity): Promise<PhotographerEntity> {
    const databasePhotographer = await db.photographer.create({
      data: {
        name: photographer.getName(),
        email: photographer.getEmail(),
        passwordHash: photographer.getPasswordHash(),
        phoneNumber: photographer.getPhoneNumber(),
        studioName: photographer.getStudioName(),
      },
    });
    return PhotographerMapperRepository.toEntity(databasePhotographer);
  }

  async getByEmail(email: string): Promise<PhotographerEntity | null> {
    const databasePhotographer = await db.photographer.findUnique({
      where: {
        email,
      },
    });

    if (!databasePhotographer) {
      return null;
    }

    return PhotographerMapperRepository.toEntity(databasePhotographer);
  }

  async update(
    id: string,
    photographer: UpdatePhotographerEntity,
  ): Promise<PhotographerEntity> {
    const updatedPhotographer = await db.photographer.update({
      where: {
        id,
      },
      data: {
        name: photographer.getName(),
        email: photographer.getEmail(),
        phoneNumber: photographer.getPhoneNumber(),
        studioName: photographer.getStudioName(),
      },
    });

    return PhotographerMapperRepository.toEntity(updatedPhotographer);
  }

  async delete(id: string): Promise<void> {
    await db.photographer.delete({
      where: {
        id,
      },
    });
  }

  async updatePassword(photographer: PhotographerEntity): Promise<void> {
    await db.photographer.update({
      where: {
        id: photographer.getId(),
      },
      data: {
        passwordHash: photographer.getPasswordHash(),
      },
    });
  }
}
