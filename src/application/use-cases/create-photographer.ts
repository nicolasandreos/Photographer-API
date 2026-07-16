import { CreatePhotographerRequestDTO } from "../../api/dto/request/photographer/create";
import { PhotographerEntity } from "../../domain/entities/photographer";
import { IPhotographerRepository } from "../../domain/ports/photographer";
import { PhotographerAlreadyExistsException, PhotographerCreationFailedException } from "../../exceptions/photographer";

export class CreatePhotographerUseCase {

    constructor(private readonly repository: IPhotographerRepository) {}

    async execute(photographer: CreatePhotographerRequestDTO): Promise<PhotographerEntity> {

        const databasePhotographer = await this.repository.getByEmail(photographer.email);
        if (databasePhotographer) {
            throw new PhotographerAlreadyExistsException();
        }

        const newPhotographerEntity = await this.repository.create(photographer);
        if (!newPhotographerEntity) {
            throw new PhotographerCreationFailedException();
        }

        return newPhotographerEntity;
    }
}