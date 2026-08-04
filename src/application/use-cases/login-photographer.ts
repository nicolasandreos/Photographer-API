import { LoginPhotographerRequestDTO } from "../../api/dto/request/photographer/login";
import { LoginPhotographerResponseDTO } from "../../api/dto/response/photographer/login";
import { IPhotographerRepository } from "../../domain/repositories/photographer";
import { EmailNotVerifiedException, InvalidPasswordException, PhotographerNotFoundException } from "../../exceptions/photographer";
import { ITokenService, UserTokenPayload } from "../ports/token-service";

export class LoginPhotographerUseCase {
    constructor(
        private readonly photographerRepository: IPhotographerRepository,
        private readonly tokenService: ITokenService,
    ) {}

    async execute(request: LoginPhotographerRequestDTO): Promise<LoginPhotographerResponseDTO> {
        const photographer = await this.photographerRepository.getByEmail(request.email);
        if (!photographer) {
            throw new PhotographerNotFoundException();
        }

        if (!photographer.getEmailVerified()) {
            throw new EmailNotVerifiedException();
        }

        const isPasswordValid = photographer.comparePassword(request.password);
        if (!isPasswordValid) {
            throw new InvalidPasswordException();
        }

        const userPayload: UserTokenPayload = {
            sub: photographer.getId(),
            email: photographer.getEmail(),
        }

        const accessToken = this.tokenService.generateAccessToken(userPayload);
        const refreshToken = this.tokenService.generateRefreshToken(userPayload);

        return new LoginPhotographerResponseDTO(accessToken, refreshToken);
    }
}
