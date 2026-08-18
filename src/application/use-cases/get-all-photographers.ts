import { PhotographerEntity } from "../../domain/entities/photographer";
import { IPhotographerRepository } from "../../domain/repositories/photographer";

export class GetAllPhotographersUseCase {
  constructor(private repository: IPhotographerRepository) {}

  async execute(): Promise<PhotographerEntity[]> {
    const photographers = await this.repository.getAll();
    const test_variable: string = 34;
    return photographers;
  }
}
