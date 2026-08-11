import { PhotographerEntity } from "../../domain/entities/photographer";
import { ChangePhotographerPasswordResponseDTO } from "../dto/response/photographer/change-password";
import { CreatePhotographerResponseDTO } from "../dto/response/photographer/create";
import { GetAllPhotographersResponseDTO } from "../dto/response/photographer/get-all";
import { GetByIdPhotographerResponseDTO } from "../dto/response/photographer/get-by-id";
import { UpdatePhotographerResponseDTO } from "../dto/response/photographer/update";
import { UploadPhotographerProfilePictureResponseDTO } from "../dto/response/photographer/upload-profile-picture";
import { buildProfilePictureUrl } from "../utils/profile-picture-url";

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
            photographerEntity.getEmailVerified(),
            buildProfilePictureUrl(photographerEntity.getProfilePictureBlobName())
        );
    }

    static toCreateResponseDTO(photographerEntity: PhotographerEntity): CreatePhotographerResponseDTO {
        return new CreatePhotographerResponseDTO(
            photographerEntity.getId(),
            photographerEntity.getName(),
            photographerEntity.getEmail(),
            photographerEntity.getPhoneNumber(),
            photographerEntity.getStudioName(),
            photographerEntity.getIsActive(),
            photographerEntity.getEmailVerified()
        );
    }

    static toUpdateResponseDTO(photographerEntity: PhotographerEntity): UpdatePhotographerResponseDTO {
        return new UpdatePhotographerResponseDTO(
            photographerEntity.getName(),
            photographerEntity.getEmail(),
            photographerEntity.getPhoneNumber(),
            photographerEntity.getStudioName(),
            buildProfilePictureUrl(photographerEntity.getProfilePictureBlobName())
        );
    }

    static toChangePasswordResponseDTO(photographerEntity: PhotographerEntity): ChangePhotographerPasswordResponseDTO {
        return new ChangePhotographerPasswordResponseDTO(
            photographerEntity.getName(),
            photographerEntity.getEmail(),
            photographerEntity.getPhoneNumber(),
            photographerEntity.getStudioName(),
            photographerEntity.getPasswordHash()
        );
    }

    static toUploadProfilePictureResponseDTO(
        photographerEntity: PhotographerEntity,
    ): UploadPhotographerProfilePictureResponseDTO {
        return new UploadPhotographerProfilePictureResponseDTO(
            buildProfilePictureUrl(photographerEntity.getProfilePictureBlobName()),
        );
    }
}
