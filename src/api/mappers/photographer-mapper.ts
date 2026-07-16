import { PhotographerEntity } from "../../domain/entities/photographer";
import { GetAllPhotographersResponseDTO } from "../dto/response/photographer/get-all";
import { GetByIdPhotographerResponseDTO } from "../dto/response/photographer/get-by-id";

export class PhotographerMapperDTO {
    constructor() {}

    static toGetAllResponseDTO(photographerEntities: PhotographerEntity[]): GetAllPhotographersResponseDTO[] {
        return photographerEntities.map((photographer) => new GetAllPhotographersResponseDTO(
            photographer.getId(),
            photographer.getName(),
            photographer.getEmail(),
            photographer.getEmailVerified()
        ));
    }

    static toGetByIdResponseDTO(photographerEntity: PhotographerEntity): GetByIdPhotographerResponseDTO {
        return new GetByIdPhotographerResponseDTO(
            photographerEntity.getId(),
            photographerEntity.getName(),
            photographerEntity.getEmail(),
            photographerEntity.getPhoneNumber(),
            photographerEntity.getStudioName(),
            photographerEntity.getIsActive(),
            photographerEntity.getEmailVerified()
        );
    }
}