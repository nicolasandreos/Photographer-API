import { IPhotographerRepository } from "../../domain/repositories/photographer";
import { EmailNotVerifiedException, PhotographerEmailIsNotValidException, PhotographerNotFoundException } from "../../exceptions/photographer";
import { ISendNotificationService, sendNotificationProps } from "../ports/email-verification";
import { ITokenService, UserTokenPayload } from "../ports/token-service";

export class SendEmailPhotographerChangePasswordUseCase {
    constructor(
        private readonly tokenService: ITokenService,
        private readonly photographerRepository: IPhotographerRepository,
        private readonly emailNotifier: ISendNotificationService
    ) {}

    async execute(userPayload: UserTokenPayload): Promise<void> {
        const id = userPayload.sub;
        const email = userPayload.email;

        
        
        const photographer = await this.photographerRepository.getById(id);
        if (!photographer) {
            throw new PhotographerNotFoundException();
        }
        
        const isEmailVerified = photographer.getEmailVerified();
        if (!isEmailVerified) {
            throw new EmailNotVerifiedException();
        }
        
        const isValidEmail = photographer.getEmail() === email;
        if (!isValidEmail) {
            throw new PhotographerEmailIsNotValidException();
        }

        const token = this.tokenService.generateChangePasswordToken({ sub: id, email } as UserTokenPayload);
        
        const emailNotifierProps: sendNotificationProps = {
            to: email,
            subject: "Change Password",
            text: "Change Password",
            token,
            photographerName: photographer.getName(),
        };

        await this.emailNotifier.sendChangePasswordEmailNotification(emailNotifierProps);
    }
}