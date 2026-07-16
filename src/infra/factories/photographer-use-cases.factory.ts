import { CreatePhotographerUseCase } from "../../application/use-cases/create-photographer";
import { GetAllPhotographersUseCase } from "../../application/use-cases/get-all-photographers";
import { GetByIdPhotographerUseCase } from "../../application/use-cases/get-id-photographer";
import { IPhotographerRepository } from "../../domain/ports/photographer";
import { PrismaPhotographerRepository } from "../adapters/prisma-photographer";

export class PhotographerUseCasesFactory {
    repository: IPhotographerRepository = new PrismaPhotographerRepository();

    getAllPhotographersUseCase = new GetAllPhotographersUseCase(this.repository);
    getByIdPhotographerUseCase = new GetByIdPhotographerUseCase(this.repository);
    createPhotographerUseCase = new CreatePhotographerUseCase(this.repository);
}