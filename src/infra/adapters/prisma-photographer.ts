import { PhotographerEntity } from "../../domain/entities/photographer";
import { IPhotographerRepository } from "../../domain/ports/photographer";
import { db } from "../database/client";
import { PhotographerMapper } from "../mappers/photographer-mapper";

export class PrismaPhotographerRepository implements IPhotographerRepository {
  async getAll(): Promise<PhotographerEntity[]> {
    const databasePhotographers = await db.photographer.findMany();
    const entityPhotographers = databasePhotographers.map(
      PhotographerMapper.toEntity,
    );

    return entityPhotographers;
  }
}
