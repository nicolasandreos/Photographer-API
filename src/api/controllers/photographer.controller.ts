import { Request, Response } from "express";
import { GetAllPhotographersResponseDTO } from "../dto/response/photographer/get-all";
import { GetByIdPhotographerResponseDTO  } from "../dto/response/photographer/get-by-id";
import { PhotographerUseCasesFactory } from "../../infra/factories/photographer-use-cases.factory";
import { PhotographerMapperDTO } from "../mappers/photographer-mapper";

export class PhotographerController {
    constructor(
        private readonly useCases: PhotographerUseCasesFactory
    ) {}

    getAll = async (req: Request, res: Response) => {
        const photographersEntities = await this.useCases.getAllPhotographersUseCase.execute();
        const photographersDTO = PhotographerMapperDTO.toGetAllResponseDTO(photographersEntities);
        res.status(200).json(photographersDTO);
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const photographerEntity = await this.useCases.getByIdPhotographerUseCase.execute(String(id));
        const photographerDTO = PhotographerMapperDTO.toGetByIdResponseDTO(photographerEntity);
        res.status(200).json(photographerDTO);
    }
}