import { Request, Response } from "express";
import { PhotographerUseCasesFactory } from "../../infra/factories/photographer-use-cases.factory";
import { PhotographerMapperDTO } from "../mappers/photographer-mapper";
import { CreatePhotographerRequestDTO } from "../dto/response/request/photographer/create";

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

    create = async (req: Request, res: Response) => {
        const { name, email, password, phoneNumber, studioName } = req.body;
        const newPhotographerEntity = await this.useCases.createPhotographerUseCase.execute(new CreatePhotographerRequestDTO(name, email, password, phoneNumber, studioName));
        const newPhotographerDTO = PhotographerMapperDTO.toCreateResponseDTO(newPhotographerEntity);
        res.status(201).json(newPhotographerDTO);
    }
}