import { RefreshAccessTokenUseCase } from "../../application/use-cases/refresh-access-token";
import { ITokenService } from "../../application/ports/token-service";
import { JwtTokenService } from "../adapters/jwt-token-service";

export class AuthUseCasesFactory {
  tokenService: ITokenService = new JwtTokenService();

  refreshAccessTokenUseCase = new RefreshAccessTokenUseCase(this.tokenService);
}
