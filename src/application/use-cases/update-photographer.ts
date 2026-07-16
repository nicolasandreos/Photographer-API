import { UpdatePhotographerRequestDTO } from "../../api/dto/request/photographer/update";
import { PhotographerEntity } from "../../domain/entities/photographer";
import { IPhotographerRepository } from "../../domain/ports/photographer";
import { PhotographerEmailAlreadyExistsException, PhotographerNotFoundException } from "../../exceptions/photographer";

export class UpdatePhotographerUseCase {
    constructor(
        private readonly photographerRepository: IPhotographerRepository
    ) {}

    async execute(id: string, photographer: UpdatePhotographerRequestDTO): Promise<PhotographerEntity> {
        const existingPhotographer = await this.photographerRepository.getById(id);

        if (!existingPhotographer) {
            throw new PhotographerNotFoundException();
        }


        if (photographer.email && photographer.email !== existingPhotographer.getEmail()) {
            const existingPhotographerWithEmail = await this.photographerRepository.getByEmail(photographer.email);
            if (existingPhotographerWithEmail) {
                throw new PhotographerEmailAlreadyExistsException();
            }
        }
        
        const updatedPhotographer = await this.photographerRepository.update(id, photographer);
        return updatedPhotographer;
    }
}