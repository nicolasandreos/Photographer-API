import { Request, Response } from "express";
import { GetAllPhotographersUseCase } from "../../application/use-cases/get-all-photographers";
import { PrismaPhotographerRepository } from "../../infra/adapters/prisma-photographer";
import { GetAllPhotographersResponse } from "../dto/response/photographer/get-all";
import { GetByIdPhotographerUseCase } from "../../application/use-cases/get-id-photographer";
import { GetByIdPhotographerResponse } from "../dto/response/photographer/get-by-id";

export const createPhotographerController = () => {
    const repository = new PrismaPhotographerRepository();

    return new PhotographerController(
        new GetAllPhotographersUseCase(repository),
        new GetByIdPhotographerUseCase(repository),
    );
}

export class PhotographerController {
    constructor(
        private readonly getAllPhotographers: GetAllPhotographersUseCase,
        private readonly getByIdPhotographer: GetByIdPhotographerUseCase,
    ) {}

    getAll = async (req: Request, res: Response) => {
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
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const photographerEntity = await this.getByIdPhotographer.execute(String(id));
        const photographerDTO = new GetByIdPhotographerResponse(
            photographerEntity.getId(),
            photographerEntity.getName(),
            photographerEntity.getEmail(),
            photographerEntity.getPhoneNumber(),
            photographerEntity.getStudioName(),
            photographerEntity.getIsActive(),
            photographerEntity.getEmailVerified()
        );
        res.status(200).json(photographerDTO);
    }
}