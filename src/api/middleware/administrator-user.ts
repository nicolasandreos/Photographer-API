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

        const idAdministratorUser = await repository.getById(req.user.sub);
        const emailAdministratorUser = await repository.getByEmail(req.user.email);
        
        if (!idAdministratorUser || !emailAdministratorUser) {
            throw new OnlyAdministratorUserException();
        }
        next();
    }

}