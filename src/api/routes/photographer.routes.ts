import { Router } from "express"
import { GetAllPhotographersUseCase } from "../../application/use-cases/get-all-photographers"

export const createPhotographerRouter =(
    getAllPhotographers: GetAllPhotographersUseCase,
): Router => {
    const router = Router();

    router.get("/all", async (req, res) => {
        try {
            const photographers = await getAllPhotographers.execute();
            res.status(200).json(photographers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    })

    return router;
}