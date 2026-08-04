import { Router } from "express";
import { PhotographerController } from "../controllers/photographer.controller";
import { ITokenService } from "../../application/ports/token-service";
import { createAuthMiddleware } from "../middleware/auth";
import { administratorUser } from "../middleware/administrator-user";
import { IAdministratorUserRepository } from "../../domain/repositories/administrator-user";

export const createPhotographerRouter = (
  controller: PhotographerController,
  tokenService: ITokenService,
  repository: IAdministratorUserRepository,
): Router => {
  const router = Router();

  router.get("/all", createAuthMiddleware(tokenService), administratorUser(repository), controller.getAll);
  router.post("/create", controller.create);
  router.post("/login", controller.login);
  router.get("/verify-email", controller.verifyEmail);
  router.put("/me", createAuthMiddleware(tokenService), controller.update);
  router.get("/:id", controller.getById);
  router.delete("/:id", controller.delete);
  router.put("/:id/change-password", controller.changePassword)

  return router;
};
