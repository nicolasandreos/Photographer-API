import { Router } from "express";
import { PhotographerController } from "../controllers/photographer.controller";
import { ITokenService } from "../../application/ports/token-service";
import { createAuthMiddleware } from "../middleware/auth";
import { administratorUser } from "../middleware/administrator-user";
import { IAdministratorUserRepository } from "../../domain/repositories/administrator-user";

export const createPhotographerRouter = (
  controller: PhotographerController,
  tonkenService: ITokenService,
  repository: IAdministratorUserRepository,
): Router => {
  const router = Router();

  router.get("/all", createAuthMiddleware(tonkenService), administratorUser(repository), controller.getAll);
  router.get("/:id", controller.getById);
  router.post("/create", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);
  router.post("/login", controller.login);

  return router;
};
