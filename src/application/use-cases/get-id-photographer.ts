import { PhotographerEntity } from "../../domain/entities/photographer";
import { IPhotographerRepository } from "../../domain/ports/photographer";
import { PhotographerNotFoundException } from "../../exceptions/photographer";

export class GetByIdPhotographerUseCase {
    constructor(
        private repository: IPhotographerRepository
    ) {}

    async execute(id: string): Promise<PhotographerEntity> {
        const photographer = await this.repository.getById(id);
        if (!photographer) {
            throw new PhotographerNotFoundException();
        }
        return photographer;
    }
}