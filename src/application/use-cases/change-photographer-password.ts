import { ChangePhotographerPasswordRequestDTO } from "../../api/dto/request/photographer/change-password";
import { IPasswordService } from "../ports/password-service";
import { IPhotographerRepository } from "../../domain/repositories/photographer";
import { InvalidPasswordException, NewPasswordCannotBeTheSameAsTheOldPasswordException, PhotographerNotFoundException } from "../../exceptions/photographer";

export class ChangePhotographerPasswordUseCase {

    constructor(
        private readonly passwordService: IPasswordService,
        private readonly repository: IPhotographerRepository
    ) {}

    async execute(photographerId: string, changePhotographerPasswordRequest: ChangePhotographerPasswordRequestDTO): Promise<void> {
        const password = changePhotographerPasswordRequest.password;
        const newPassword = changePhotographerPasswordRequest.newPassword;

        const databasePhotographer = await this.repository.getById(photographerId);

        if (!databasePhotographer) {
            throw new PhotographerNotFoundException();
        }

        const isPasswordTheSame = await this.passwordService.compare(password, databasePhotographer.getPasswordHash());
        if (!isPasswordTheSame) {
            throw new InvalidPasswordException();
        }

        const isNewPasswordTheSameAsTheOldPassword = await this.passwordService.compare(newPassword, databasePhotographer.getPasswordHash());
        if (isNewPasswordTheSameAsTheOldPassword) {
            throw new NewPasswordCannotBeTheSameAsTheOldPasswordException();
        }
        
        const hashedNewPassword = await this.passwordService.hash(newPassword);
        databasePhotographer.updatePassword(hashedNewPassword);
        await this.repository.updatePassword(databasePhotographer);
        return;
    }
}