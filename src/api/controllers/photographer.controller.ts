import { Request, Response } from "express";
import { GetAllPhotographersUseCase } from "../../application/use-cases/get-all-photographers";
import { PrismaPhotographerRepository } from "../../infra/repositories/prisma-photographer";

export const createPhotographerController = () => {
    const repository = new PrismaPhotographerRepository();

    return new PhotographerController(
        new GetAllPhotographersUseCase(repository),
    );
}

export class PhotographerController {
    constructor(
        private readonly getAllPhotographers: GetAllPhotographersUseCase,
    ) {}

    getAll = async (req: Request, res: Response) => {
        try {
            const photographers = await this.getAllPhotographers.execute();
            res.status(200).json(photographers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}