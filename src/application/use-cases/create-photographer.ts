import { CreatePhotographerRequestDTO } from "../../api/dto/request/photographer/create";
import {
  CreatePhotographerEntity,
  PhotographerEntity,
} from "../../domain/entities/photographer";
import { IPhotographerRepository } from "../../domain/repositories/photographer";
import {
  PhotographerAlreadyExistsException,
  PhotographerCreationFailedException,
} from "../../exceptions/photographer";
import { ISendNotificationService, sendNotificationProps } from "../ports/email-verification";
import { IPasswordService } from "../ports/password-service";
import { ITokenService, UserTokenPayload } from "../ports/token-service";

export class CreatePhotographerUseCase {
  constructor(
    private readonly repository: IPhotographerRepository,
    private readonly passwordService: IPasswordService,
    private readonly emailNotifier: ISendNotificationService,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(
    photographer: CreatePhotographerRequestDTO,
  ): Promise<PhotographerEntity> {
    const databasePhotographer = await this.repository.getByEmail(
      photographer.email,
    );
    if (databasePhotographer) {
      throw new PhotographerAlreadyExistsException();
    }

    const hashedPassword = await this.passwordService.hash(
      photographer.password,
    );

    const photographerEntity = new CreatePhotographerEntity({
      name: photographer.name,
      email: photographer.email,
      passwordHash: hashedPassword,
      phoneNumber: photographer.phoneNumber,
      studioName: photographer.studioName ?? null,
    });
    try {
      const createdPhotographerEntity =
        await this.repository.create(photographerEntity);

      const userTokenPayload: UserTokenPayload = {
        sub: createdPhotographerEntity.getId(),
        email: createdPhotographerEntity.getEmail(),
      }

      const token = this.tokenService.generateEmailVerificationToken(userTokenPayload);
      
      const emailNotifierProps: sendNotificationProps = {
        to: "nicolasandreose@gmail.com",
        subject: "Hello from Resend Using Login",
        text: "Hello from Resend",
        token,
        photographerName: photographer.name,
      };

      this.emailNotifier.sendNotification(emailNotifierProps);
      return createdPhotographerEntity;
    } catch (error) {
      throw new PhotographerCreationFailedException();
    }
  }
}
