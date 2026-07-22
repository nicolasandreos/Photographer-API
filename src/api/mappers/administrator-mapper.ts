import { AdministratorUserEntity } from "../../domain/entities/administrator-user";
import { CreateAdministratorUserResponse } from "../dto/response/administrator-user/create";

export class AdministratorUserMapperDTO {

    static toCreateResponseDTO(administratorUserEntity: AdministratorUserEntity): CreateAdministratorUserResponse {
        return new CreateAdministratorUserResponse(
            administratorUserEntity.getEmail(),
        );
    }
}