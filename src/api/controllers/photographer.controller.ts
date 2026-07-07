import { Request, Response } from "express";
import { GetAllPhotographersUseCase } from "../../application/use-cases/get-all-photographers";
import { PrismaPhotographerRepository } from "../../infra/repositories/prisma-photographer";
import { GetAllPhotographersResponse } from "../dto/response/photographer/get-all";

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
            const photographersEntities = await this.getAllPhotographers.execute();
            const photographersDTO = photographersEntities.map((photographer) => 
                new GetAllPhotographersResponse(
                    photographer.getId(), 
                    photographer.getName(), 
                    photographer.getEmail(), 
                    photographer.getEmailVerified()
                )
            );
            res.status(200).json(photographersDTO);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}