import { IPhotographerRepository } from "../../domain/ports/photographer";
import { PhotographerNotFoundException } from "../../exceptions/photographer";

export class DeletePhotographerUseCase {
    constructor(
        private readonly photographerRepository: IPhotographerRepository
    ) {}

    async execute(id: string): Promise<void> {
        const existingPhotographer = await this.photographerRepository.getById(id);
        if (!existingPhotographer) {
            throw new PhotographerNotFoundException();
        }

        await this.photographerRepository.delete(id);
        return;
    }
}