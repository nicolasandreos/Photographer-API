import { CreatePhotographerUseCase } from "../../application/use-cases/create-photographer";
import { DeletePhotographerUseCase } from "../../application/use-cases/delete-photographer";
import { GetAllPhotographersUseCase } from "../../application/use-cases/get-all-photographers";
import { GetByIdPhotographerUseCase } from "../../application/use-cases/get-id-photographer";
import { UpdatePhotographerUseCase } from "../../application/use-cases/update-photographer";
import { IPhotographerRepository } from "../../domain/ports/photographer";
import { PrismaPhotographerRepository } from "../adapters/prisma-photographer";

export class PhotographerUseCasesFactory {
    repository: IPhotographerRepository = new PrismaPhotographerRepository();

    getAllPhotographersUseCase = new GetAllPhotographersUseCase(this.repository);
    getByIdPhotographerUseCase = new GetByIdPhotographerUseCase(this.repository);
    createPhotographerUseCase = new CreatePhotographerUseCase(this.repository);
    updatePhotographerUseCase = new UpdatePhotographerUseCase(this.repository);
    deletePhotographerUseCase = new DeletePhotographerUseCase(this.repository);
}