import { IPasswordService } from "../../application/ports/password-service";
import { CreateAdministratorUserUseCase } from "../../application/use-cases/create-administrator-user";
import { IAdministratorUserRepository } from "../../domain/repositories/administrator-user";
import { PasswordService } from "../adapters/password-service";
import { PrismaAdministratorUserRepository } from "../adapters/prisma-administrator-user";

export class AdministratorUserUseCasesFactory {
    repository: IAdministratorUserRepository = new PrismaAdministratorUserRepository();
    passwordService: IPasswordService = new PasswordService();

    createAdministratorUserUseCase = new CreateAdministratorUserUseCase(this.repository, this.passwordService);
}