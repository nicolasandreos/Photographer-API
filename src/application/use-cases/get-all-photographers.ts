import { PhotographerEntity } from "../../domain/entities/photographer";
import { IPhotographerRepository } from "../../domain/ports/photographer";

export class GetAllPhotographersUseCase {
  constructor(private repository: IPhotographerRepository) {}

  async execute(): Promise<PhotographerEntity[]> {
    return this.repository.getAll();
  }
}
