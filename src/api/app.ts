import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import { BaseApiExceptionHandler } from "./middleware/base-exception-handler";
import { JwtTokenService } from "../infra/adapters/jwt-token-service";
import { PrismaAdministratorUserRepository } from "../infra/adapters/prisma-administrator-user";
import { AdministratorUserUseCasesFactory } from "../infra/factories/administrator-user-use-cases-factory";
import { PhotographerController } from "./controllers/photographer.controller";
import { PhotographerUseCasesFactory } from "../infra/factories/photographer-use-cases.factory";
import { createPhotographerRouter } from "./routes/photographer.routes";
import { createAdministratorUserRoutes } from "./routes/administrator-user.routes";
import { AdministratorUserController } from "./controllers/administrator-user.controller";

export const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  const tokenService = new JwtTokenService();

  const administratorUserRepository = new PrismaAdministratorUserRepository();

  const photographerUseCasesFactory = new PhotographerUseCasesFactory();
  const administratorUserUseCasesFactory =
    new AdministratorUserUseCasesFactory();

  const photographerController = new PhotographerController(
    photographerUseCasesFactory,
  );
  const administratorUserController = new AdministratorUserController(
    administratorUserUseCasesFactory,
  );

  const photographerRouter = createPhotographerRouter(
    photographerController,
    tokenService,
    administratorUserRepository,
  );
  const administratorUserRouter = createAdministratorUserRoutes(
    administratorUserController,
  );

  app.use("/photographer", photographerRouter);
  app.use("/administrator-user", administratorUserRouter);

  app.use(BaseApiExceptionHandler);
  return app;
};
