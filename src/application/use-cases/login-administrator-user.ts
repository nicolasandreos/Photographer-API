import { LoginAdministratorUserRequest } from "../../api/dto/request/administrator-user/login";
import { LoginAdministratorUserResponse } from "../../api/dto/response/administrator-user/login";
import { IAdministratorUserRepository } from "../../domain/repositories/administrator-user";
import { AdministratorUserNotFoundException } from "../../exceptions/administrator-user";
import { InvalidPasswordException } from "../../exceptions/photographer";
import { IPasswordService } from "../ports/password-service";
import { ITokenService, UserTokenPayload } from "../ports/token-service";

export class LoginAdministratorUserUseCase {
    constructor(
        private readonly repository: IAdministratorUserRepository,
        private readonly passwordService: IPasswordService,
        private readonly tokenService: ITokenService
    ) {}

    async execute(request: LoginAdministratorUserRequest): Promise<LoginAdministratorUserResponse> {
        const administratorUser = await this.repository.getByEmail(request.email);
        if (!administratorUser) {
            throw new AdministratorUserNotFoundException();
        }
        const hashedPassword = administratorUser.getPasswordHash();
        const passwordMatch = await this.passwordService.compare(request.password, hashedPassword);
        if (!passwordMatch) {
            throw new InvalidPasswordException();
        }

        const userPayload: UserTokenPayload = {
            sub: administratorUser.getId() as string,
            email: administratorUser.getEmail(),
        }

        const accessToken = await this.tokenService.generateAccessToken(userPayload);
        const refreshToken = await this.tokenService.generateRefreshToken(userPayload);

        return new LoginAdministratorUserResponse(accessToken, refreshToken);
    }
}