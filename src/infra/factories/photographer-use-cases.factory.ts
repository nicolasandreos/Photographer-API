import { CreatePhotographerUseCase } from "../../application/use-cases/create-photographer";
import { DeletePhotographerUseCase } from "../../application/use-cases/delete-photographer";
import { GetAllPhotographersUseCase } from "../../application/use-cases/get-all-photographers";
import { GetByIdPhotographerUseCase } from "../../application/use-cases/get-id-photographer";
import { UpdatePhotographerUseCase } from "../../application/use-cases/update-photographer";
import { IPhotographerRepository } from "../../domain/repositories/photographer";
import { PasswordService } from "../adapters/password-service";
import { PrismaPhotographerRepository } from "../adapters/prisma-photographer";
import { IPasswordService } from "../../application/ports/password-service";
import { LoginPhotographerUseCase } from "../../application/use-cases/login-photographer";
import { JwtTokenService } from "../adapters/jwt-token-service";
import { ITokenService } from "../../application/ports/token-service";
import { ChangePhotographerPasswordUseCase } from "../../application/use-cases/change-photographer-password";

export class PhotographerUseCasesFactory {
  repository: IPhotographerRepository = new PrismaPhotographerRepository();
  
  passwordService: IPasswordService = new PasswordService();
  tokenService: ITokenService = new JwtTokenService();

  getAllPhotographersUseCase = new GetAllPhotographersUseCase(this.repository);
  getByIdPhotographerUseCase = new GetByIdPhotographerUseCase(this.repository);
  createPhotographerUseCase = new CreatePhotographerUseCase(this.repository, this.passwordService);
  updatePhotographerUseCase = new UpdatePhotographerUseCase(this.repository);
  deletePhotographerUseCase = new DeletePhotographerUseCase(this.repository);
  loginPhotographerUseCase = new LoginPhotographerUseCase(this.repository, this.tokenService);
  changePhotographerPasswordUseCase = new ChangePhotographerPasswordUseCase(this.passwordService, this.repository);
}
