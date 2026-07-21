import { NextFunction, Request, Response } from "express";
import {
  ITokenService,
  UserTokenPayload,
} from "../../application/ports/token-service";
import { UnauthorizedException } from "../../exceptions/jwt-token-exception";

export interface AuthenticatedRequest extends Request {
  user?: UserTokenPayload;
}

export const createAuthMiddleware = (tokenService: ITokenService) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      throw new UnauthorizedException();
    }

    const token = header.split(" ")[1].trim();
    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await tokenService.verifyToken(token);
    req.user = payload;
    next();
  };
};
