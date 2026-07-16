import { CreatePhotographerUseCase } from "../../application/use-cases/create-photographer";
import { DeletePhotographerUseCase } from "../../application/use-cases/delete-photographer";
import { GetAllPhotographersUseCase } from "../../application/use-cases/get-all-photographers";
import { GetByIdPhotographerUseCase } from "../../application/use-cases/get-id-photographer";
import { UpdatePhotographerUseCase } from "../../application/use-cases/update-photographer";
import { IPhotographerRepository } from "../../domain/repositories/photographer";
import { PasswordService } from "../adapters/password-service";
import { PrismaPhotographerRepository } from "../adapters/prisma-photographer";
import { IPasswordService } from "../../application/ports/password-service";

export class PhotographerUseCasesFactory {
  repository: IPhotographerRepository = new PrismaPhotographerRepository();
  
  passwordService: IPasswordService = new PasswordService();

  getAllPhotographersUseCase = new GetAllPhotographersUseCase(this.repository);
  getByIdPhotographerUseCase = new GetByIdPhotographerUseCase(this.repository);
  createPhotographerUseCase = new CreatePhotographerUseCase(this.repository, this.passwordService);
  updatePhotographerUseCase = new UpdatePhotographerUseCase(this.repository);
  deletePhotographerUseCase = new DeletePhotographerUseCase(this.repository);
}
