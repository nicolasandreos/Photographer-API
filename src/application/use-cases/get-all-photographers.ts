import { IPhotographerRepository } from "../../domain/repositories/photographer";

export class GetAllPhotographersUseCase {
    constructor(
        private repository: IPhotographerRepository
    ) {}

    async execute() {
        const photographers = await this.repository.getAll();
        return photographers;
    }

}