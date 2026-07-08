import { Request, Response } from "express";
import { GetAllPhotographersResponse } from "../dto/response/photographer/get-all";
import { GetByIdPhotographerResponse } from "../dto/response/photographer/get-by-id";
import { PhotographerUseCasesFactory } from "../../infra/factories/photographer-use-cases.factory";

export class PhotographerController {
    constructor(
        private readonly useCases: PhotographerUseCasesFactory
    ) {}

    getAll = async (req: Request, res: Response) => {
        const photographersEntities = await this.useCases.getAllPhotographersUseCase.execute();
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
        const photographerEntity = await this.useCases.getByIdPhotographerUseCase.execute(String(id));
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