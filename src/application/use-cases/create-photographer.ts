import { CreatePhotographerRequestDTO } from "../../api/dto/request/photographer/create";
import { PhotographerEntity } from "../../domain/entities/photographer";
import { IPhotographerRepository } from "../../domain/repositories/photographer";
import {
  PhotographerAlreadyExistsException,
  PhotographerCreationFailedException,
} from "../../exceptions/photographer";
import { IPasswordService } from "../ports/password-service";

export class CreatePhotographerUseCase {
  constructor(
    private readonly repository: IPhotographerRepository,
    private readonly passwordService: IPasswordService
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

    const hashedPassword = await this.passwordService.hash(photographer.password);

    const photographerEntity = new PhotographerEntity({
      name: photographer.name,
      email: photographer.email,
      passwordHash: hashedPassword,
      phoneNumber: photographer.phoneNumber,
      studioName: photographer.studioName,
    });

    const createdPhotographerEntity =
      await this.repository.create(photographerEntity);
    if (!createdPhotographerEntity) {
      throw new PhotographerCreationFailedException();
    }

    return createdPhotographerEntity;
  }
}
