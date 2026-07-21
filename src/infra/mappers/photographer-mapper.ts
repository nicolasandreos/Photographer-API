import { Photographer } from "../../../generated/prisma/client";
import { PhotographerEntity } from "../../domain/entities/photographer";

export class PhotographerMapperRepository {
  static toEntity(photographer: Photographer): PhotographerEntity {
    return new PhotographerEntity({
      id: photographer.id,
      name: photographer.name,
      email: photographer.email,
      passwordHash: photographer.passwordHash,
      phoneNumber: photographer.phoneNumber,
      studioName: photographer.studioName,
      isActive: photographer.isActive,
      emailVerified: photographer.emailVerified,
    });
  }
}
