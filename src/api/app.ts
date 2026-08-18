import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import { BaseApiExceptionHandler } from "./middleware/base-exception-handler";
import { JwtTokenService } from "../infra/adapters/jwt-token-service";
import { PrismaAdministratorUserRepository } from "../infra/adapters/prisma-administrator-user";
import { AdministratorUserUseCasesFactory } from "../infra/factories/administrator-user-use-cases-factory";
import { PhotographerController } from "./controllers/photographer.controller";
import { PhotographerUseCasesFactory } from "../infra/factories/photographer-use-cases.factory";
import { AuthUseCasesFactory } from "../infra/factories/auth-use-cases.factory";
import { createPhotographerRouter } from "./routes/photographer.routes";
import { createAdministratorUserRoutes } from "./routes/administrator-user.routes";
import { createAuthRouter } from "./routes/auth.routes";
import { AdministratorUserController } from "./controllers/administrator-user.controller";
import { AuthController } from "./controllers/auth.controller";
import { RedisRateLimiter } from "../infra/adapters/redis-rate-limiter";
import { getRedisClient } from "../infra/database/redis-client";

export const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


  const tokenService = new JwtTokenService();

  const rateLimiter = new RedisRateLimiter(getRedisClient())

  const administratorUserRepository = new PrismaAdministratorUserRepository();

  const photographerUseCasesFactory = new PhotographerUseCasesFactory();
  const administratorUserUseCasesFactory =
    new AdministratorUserUseCasesFactory();
  const authUseCasesFactory = new AuthUseCasesFactory();

  const photographerController = new PhotographerController(
    photographerUseCasesFactory,
  );
  const administratorUserController = new AdministratorUserController(
    administratorUserUseCasesFactory,
  );
  const authController = new AuthController(authUseCasesFactory);

  const photographerRouter = createPhotographerRouter(
    photographerController,
    tokenService,
    administratorUserRepository,
    rateLimiter,
  );
  const administratorUserRouter = createAdministratorUserRoutes(
    administratorUserController,
  );
  const authRouter = createAuthRouter(authController);

  app.use("/photographer", photographerRouter);
  app.use("/administrator-user", administratorUserRouter);
  app.use("/auth", authRouter);

  app.use(BaseApiExceptionHandler);
  return app;
};
