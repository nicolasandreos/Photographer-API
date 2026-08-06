import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export const createAuthRouter = (controller: AuthController): Router => {
  const router = Router();

  router.post("/refresh", controller.refresh);

  return router;
};
