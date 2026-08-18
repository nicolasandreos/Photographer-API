import { IPasswordService } from "../ports/password-service";
import { IPhotographerRepository } from "../../domain/repositories/photographer";
import { NewPasswordDoesNotMatchException, PhotographerEmailIsNotValidException, PhotographerNotFoundException } from "../../exceptions/photographer";
import { PhotographerEntity } from "../../domain/entities/photographer";
import { ITokenService } from "../ports/token-service";

export class ChangePhotographerPasswordUseCase {

    constructor(
        private readonly passwordService: IPasswordService,
        private readonly repository: IPhotographerRepository,
        private readonly tokenService: ITokenService
    ) {}

    async execute(token: string, newPassword: string, confirmPassword: string): Promise<PhotographerEntity> {
        const userPayload = this.tokenService.verifyChangePasswordToken(token);
        const photographerId = userPayload.sub;
        const email = userPayload.email;

        const databasePhotographer = await this.repository.getById(photographerId);

        if (!databasePhotographer) {
            throw new PhotographerNotFoundException();
        }

        const isValidEmail = databasePhotographer.getEmail() === email;
        if (!isValidEmail) {
            throw new PhotographerEmailIsNotValidException();
        }

        console.log("newPassword", newPassword);
        console.log("confirmNewPassword", confirmPassword);

        const isNewPasswordConfirmed = newPassword === confirmPassword;
        if (!isNewPasswordConfirmed) {
            throw new NewPasswordDoesNotMatchException();
        }
        
        const hashedNewPassword = await this.passwordService.hash(newPassword);
        databasePhotographer.updatePassword(hashedNewPassword);
        const updatedPhotographer = await this.repository.updatePassword(databasePhotographer);
        return updatedPhotographer;
    }
}