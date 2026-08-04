import { IPhotographerRepository } from "../../domain/repositories/photographer";
import { PhotographerEmailIsNotValidException, PhotographerNotFoundException } from "../../exceptions/photographer";
import { ITokenService } from "../ports/token-service";

export class VerifyPhotographerEmailUseCase {

    constructor(
        private readonly tokenService: ITokenService,
        private readonly repository: IPhotographerRepository
    ) {}
    
    async execute(token: string): Promise<void> {
        const { sub: id, email } = this.tokenService.verifyEmailVerificationToken(token);

        const photographer = await this.repository.getById(id)
        if (!photographer) {
            throw new PhotographerNotFoundException()
        }

        const isEmailValid = photographer.getEmail() === email;
        if (!isEmailValid) {
            throw new PhotographerEmailIsNotValidException();
        }

        photographer.verifyEmail()
        await this.repository.verifyEmail(id);
    }
}