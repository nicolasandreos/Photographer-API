import { Request, Response } from "express";
import { AuthUseCasesFactory } from "../../infra/factories/auth-use-cases.factory";
import { refreshAccessTokenRequestSchema } from "../dto/request/auth/refresh";

export class AuthController {
  constructor(private readonly useCases: AuthUseCasesFactory) {}

  refresh = async (req: Request, res: Response) => {
    const request = refreshAccessTokenRequestSchema.parse(req.body);
    const response = this.useCases.refreshAccessTokenUseCase.execute(request);
    res.status(200).json(response);
  };
}
