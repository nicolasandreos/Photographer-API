import { Router } from "express";
import { PhotographerController } from "../controllers/photographer.controller";
import { ITokenService } from "../../application/ports/token-service";
import { createAuthMiddleware } from "../middleware/auth";
import { administratorUser } from "../middleware/administrator-user";
import { IAdministratorUserRepository } from "../../domain/repositories/administrator-user";
import { rateLimiterMiddleware } from "../middleware/rate-limiter";
import { IRateLimiter } from "../../application/ports/rate-limiter";

export const createPhotographerRouter = (
  controller: PhotographerController,
  tokenService: ITokenService,
  repository: IAdministratorUserRepository,
  rateLimiter: IRateLimiter
): Router => {
  const router = Router();

  router.get("/all", createAuthMiddleware(tokenService), administratorUser(repository), controller.getAll);
  router.post("/create", controller.create);
  router.post("/login", rateLimiterMiddleware(rateLimiter, "login"), controller.login);
  router.get("/verify-email", controller.verifyEmail);
  router.put("/me", createAuthMiddleware(tokenService), controller.update);
  router.put("/send-change-password-email", createAuthMiddleware(tokenService), controller.sendChangePasswordEmail)
  router.post("/change-password", controller.changePassword)
  router.get("/change-password-form", controller.changePasswordForm)
  router.get("/:id", controller.getById);
  router.delete("/:id", controller.delete);

  return router;
};
