import { CreatePhotographerRequestDTO } from "../../api/dto/response/request/photographer/create";
import { PhotographerEntity } from "../../domain/entities/photographer";
import { IPhotographerRepository } from "../../domain/ports/photographer";
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

  async create(
    photographer: CreatePhotographerRequestDTO,
  ): Promise<PhotographerEntity> {
    const databasePhotographer = await db.photographer.create({
      data: {
        name: photographer.name,
        email: photographer.email,
        passwordHash: photographer.password,
        phoneNumber: photographer.phoneNumber,
        studioName: photographer.studioName,
      },
    });
    return PhotographerMapperRepository.toEntity(databasePhotographer);
  }

  async getByEmail(email: string): Promise<PhotographerEntity | null> {
    const databasePhotographer = await db.photographer.findUnique({
      where: {
        email
      }
    })
    
    if (!databasePhotographer) {
      return null;
    }

    return PhotographerMapperRepository.toEntity(databasePhotographer);
  }
}
