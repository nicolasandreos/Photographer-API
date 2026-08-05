import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Request, Response } from "express";
import { PhotographerUseCasesFactory } from "../../infra/factories/photographer-use-cases.factory";
import { PhotographerMapperDTO } from "../mappers/photographer-mapper";
import { createPhotographerRequestSchema } from "../dto/request/photographer/create";
import { updatePhotographerRequestSchema } from "../dto/request/photographer/update";
import { loginPhotographerRequestSchema } from "../dto/request/photographer/login";
import { changePhotographerPasswordRequestSchema } from "../dto/request/photographer/change-password";
import { AuthenticatedRequest } from "../middleware/auth";
import { PhotographerEmailAlreadyVerifiedException } from "../../exceptions/photographer";
import {
  EmailConfirmed,
  EmailConfirmedVariant,
} from "../../infra/templates/email-confirmed";

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
        const request = createPhotographerRequestSchema.parse(req.body);
        const newPhotographerEntity = await this.useCases.createPhotographerUseCase.execute(request);
        const newPhotographerDTO = PhotographerMapperDTO.toCreateResponseDTO(newPhotographerEntity);
        res.status(201).json(newPhotographerDTO);
    }

    update = async (req: AuthenticatedRequest, res: Response) => {
        const id = req.user?.sub as string;
        const request = updatePhotographerRequestSchema.parse(req.body);
        const updatedPhotographerEntity = await this.useCases.updatePhotographerUseCase.execute(id, request);
        const updatedPhotographerDTO = PhotographerMapperDTO.toUpdateResponseDTO(updatedPhotographerEntity);
        res.status(200).json(updatedPhotographerDTO);
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        await this.useCases.deletePhotographerUseCase.execute(String(id));
        res.status(204).send();
    }

    login = async (req: Request, res: Response) => {
        const request = loginPhotographerRequestSchema.parse(req.body);
        const loginResponse = await this.useCases.loginPhotographerUseCase.execute(request);
        res.status(200).json(loginResponse);
    }

    changePassword = async (req: Request, res: Response) => {
        const { id } = req.params;
        const request = changePhotographerPasswordRequestSchema.parse(req.body);
        const updatedPhotographer = await this.useCases.changePhotographerPasswordUseCase.execute(String(id), request);
        const updatedPhotographerDTO = PhotographerMapperDTO.toChangePasswordResponseDTO(updatedPhotographer);
        res.status(200).json(updatedPhotographerDTO);
    }

    verifyEmail = async (req: Request, res: Response) => {
        const token = req.query.token as string;
        let variant: EmailConfirmedVariant = "success";

        try {
            await this.useCases.verifyEmailUseCase.execute(String(token));
        } catch (error) {
            if (error instanceof PhotographerEmailAlreadyVerifiedException) {
                variant = "already-verified";
            } else {
                throw error;
            }
        }

        const html =
            "<!DOCTYPE html>" +
            renderToStaticMarkup(
                createElement(EmailConfirmed, { variant }),
            );

        res.type("html").send(html);
    }
}