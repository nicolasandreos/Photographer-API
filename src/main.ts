import { createApp } from "./api/app";
import { PhotographerController } from "./api/controllers/photographer.controller";
import { createPhotographerRouter } from "./api/routes/photographer.routes";
import { JwtTokenService } from "./infra/adapters/jwt-token-service";
import { PhotographerUseCasesFactory } from "./infra/factories/photographer-use-cases.factory";
import { PrismaAdministratorUserRepository } from "./infra/adapters/prisma-administrator-user";
import { AdministratorUserUseCasesFactory } from "./infra/factories/administrator-user-use-cases-factory";
import { AdministratorUserController } from "./api/controllers/administrator-user.controller";
import { createAdministratorUserRoutes } from "./api/routes/administrato-user.routes";

const tokenService = new JwtTokenService();

const administratorUserRepository = new PrismaAdministratorUserRepository();

const photographerUseCasesFactory = new PhotographerUseCasesFactory();
const administratorUserUseCasesFactory = new AdministratorUserUseCasesFactory();

const photographerController = new PhotographerController(photographerUseCasesFactory);
const administratorUserController = new AdministratorUserController(administratorUserUseCasesFactory);

const photographerRouter = createPhotographerRouter(photographerController, tokenService, administratorUserRepository);
const administratorUserRouter = createAdministratorUserRoutes(administratorUserController);

const app = createApp(photographerRouter, administratorUserRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
})
