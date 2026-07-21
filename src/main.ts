import { createApp } from "./api/app";
import { PhotographerController } from "./api/controllers/photographer.controller";
import { createPhotographerRouter } from "./api/routes/photographer.routes";
import { JwtTokenService } from "./infra/adapters/jwt-token-service";
import { PhotographerUseCasesFactory } from "./infra/factories/photographer-use-cases.factory";
import { PrismaAdministratorUserRepository } from "./infra/adapters/prisma-administrator-user";

const tokenService = new JwtTokenService();

const photographerUseCasesFactory = new PhotographerUseCasesFactory();
const administratorUserRepository = new PrismaAdministratorUserRepository();
const photographerController = new PhotographerController(photographerUseCasesFactory);
const photographerRouter = createPhotographerRouter(photographerController, tokenService, administratorUserRepository);

const app = createApp(photographerRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
})
