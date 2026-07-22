import { CreateAdministratorUserRequest } from "../../api/dto/request/administrator-user/create";
import { AdministratorUserEntity } from "../../domain/entities/administrator-user";
import { IAdministratorUserRepository } from "../../domain/repositories/administrator-user";
import { IPasswordService } from "../ports/password-service";

export class CreateAdministratorUserUseCase {
    constructor(
        private readonly repository: IAdministratorUserRepository,
        private readonly passwordService: IPasswordService
    ) {}

    async execute(createAdministratorUserRequest: CreateAdministratorUserRequest): Promise<AdministratorUserEntity> {
        const passwordHash = await this.passwordService.hash(createAdministratorUserRequest.password);

        const administratorUserEntity = new AdministratorUserEntity({
            email: createAdministratorUserRequest.email,
            passwordHash: passwordHash,
            lastLoginAt: null,
        });

        const createdAdministratorUser = await this.repository.create(administratorUserEntity);
        return createdAdministratorUser;
    }
}