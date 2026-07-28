import { Request, Response } from "express";
import { AdministratorUserUseCasesFactory } from "../../infra/factories/administrator-user-use-cases-factory";
import { createAdministratorUserRequestSchema } from "../dto/request/administrator-user/create";
import { AdministratorUserMapperDTO } from "../mappers/administrator-mapper";
import { loginAdministratorUserRequestSchema } from "../dto/request/administrator-user/login";

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

    login = async (req: Request, res: Response) => {
        const request = loginAdministratorUserRequestSchema.parse(req.body);
        const loginAdministratorUserResponse = await this.useCases.loginAdministratorUserUseCase.execute(request);
        res.status(200).json(loginAdministratorUserResponse);
    };
}