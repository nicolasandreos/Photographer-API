import { Router } from "express"
import { PhotographerController } from "../controllers/photographer.controller";

export const createPhotographerRouter = (
    controller: PhotographerController,
): Router => {
    const router = Router();

    router.get("/all", controller.getAll);
    router.get("/:id", controller.getById);
    router.post("/create", controller.create);
    router.put("/:id", controller.update);

    return router;
}