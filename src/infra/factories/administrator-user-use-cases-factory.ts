import { IPasswordService } from "../../application/ports/password-service";
import { ITokenService } from "../../application/ports/token-service";
import { CreateAdministratorUserUseCase } from "../../application/use-cases/create-administrator-user";
import { LoginAdministratorUserUseCase } from "../../application/use-cases/login-administrator-user";
import { IAdministratorUserRepository } from "../../domain/repositories/administrator-user";
import { JwtTokenService } from "../adapters/jwt-token-service";
import { PasswordService } from "../adapters/password-service";
import { PrismaAdministratorUserRepository } from "../adapters/prisma-administrator-user";

export class AdministratorUserUseCasesFactory {
    private readonly repository: IAdministratorUserRepository = new PrismaAdministratorUserRepository();
    private readonly passwordService: IPasswordService = new PasswordService();
    private readonly tokenService: ITokenService = new JwtTokenService();

    public createAdministratorUserUseCase = new CreateAdministratorUserUseCase(this.repository, this.passwordService);
    public loginAdministratorUserUseCase = new LoginAdministratorUserUseCase(this.repository, this.passwordService, this.tokenService);
}