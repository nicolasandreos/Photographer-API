import { Photographer } from "../../../generated/prisma/client";
import { PhotographerEntity } from "../../domain/entities/photographer";

export class PhotographerMapper {
    static toEntity(photographer: Photographer): PhotographerEntity {
        return new PhotographerEntity(
            photographer.id,
            photographer.name,
            photographer.email,
            photographer.passwordHash,
            photographer.phoneNumber,
            photographer.studioName,
            photographer.isActive,
            photographer.emailVerified,
        );
    }
}