import { PhotographerEntity } from "../../domain/entities/photographer";
import { IPhotographerRepository } from "../../domain/ports/photographer";
import { PhotographerNotFoundException } from "../../exceptions/photographer";

export class GetAllPhotographersUseCase {
  constructor(private repository: IPhotographerRepository) {}

  async execute(): Promise<PhotographerEntity[]> {
    const photographers = await this.repository.getAll();
    if (photographers.length === 0) {
      throw new PhotographerNotFoundException();
    }
    return photographers;
  }
}
