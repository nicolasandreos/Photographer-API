import { Router } from "express"
import { PhotographerController } from "../controllers/photographer.controller";
import { createAuthMiddleware } from "../middleware/auth";
import { ITokenService } from "../../application/ports/token-service";

export const createPhotographerRouter = (
    controller: PhotographerController,
    tonkenService: ITokenService
): Router => {
    const router = Router();

    router.get("/all", createAuthMiddleware(tonkenService), controller.getAll);
    router.get("/:id", controller.getById);
    router.post("/create", controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);
    router.post("/login", controller.login);
    
    return router;
}