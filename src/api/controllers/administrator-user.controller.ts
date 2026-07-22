import { Request, Response } from "express";
import { AdministratorUserUseCasesFactory } from "../../infra/factories/administrator-user-use-cases-factory";
import { createAdministratorUserRequestSchema } from "../dto/request/administrator-user/create";
import { AdministratorUserMapperDTO } from "../mappers/administrator-mapper";

export class AdministratorUserController {
    constructor(
        private readonly useCases: AdministratorUserUseCasesFactory
    ) {}

    create = async (req: Request, res: Response) => {
        const request = createAdministratorUserRequestSchema.parse(req.body);
        const newAdministratorUserEntity = await this.useCases.createAdministratorUserUseCase.execute(request);
        const newAdministratorUserDTO = AdministratorUserMapperDTO.toCreateResponseDTO(newAdministratorUserEntity);
        res.status(201).json(newAdministratorUserDTO);
    }
}