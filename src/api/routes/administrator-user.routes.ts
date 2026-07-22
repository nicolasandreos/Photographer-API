import { Router } from "express";
import { AdministratorUserController } from "../controllers/administrator-user.controller";

export const createAdministratorUserRoutes = (
    controller: AdministratorUserController
) => {
    const router = Router();

    router.post("/create", controller.create);

    return router;
}