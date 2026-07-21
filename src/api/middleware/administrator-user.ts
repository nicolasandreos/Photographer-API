import { NextFunction, Response } from "express";
import { IAdministratorUserRepository } from "../../domain/repositories/administrator-user";
import { AuthenticatedRequest } from "./auth";
import { UnauthorizedException } from "../../exceptions/jwt-token-exception";
import { OnlyAdministratorUserException } from "../../exceptions/jwt-token-exception";

export const administratorUser = (repository: IAdministratorUserRepository) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new UnauthorizedException();
        }

        const administratorUser = await repository.getById(req.user.sub);
        if (!administratorUser) {
            throw new OnlyAdministratorUserException();
        }
        next();
    }

}