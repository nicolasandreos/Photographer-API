import { RefreshAccessTokenRequestDTO } from "../../api/dto/request/auth/refresh";
import { RefreshAccessTokenResponseDTO } from "../../api/dto/response/auth/refresh";
import { ITokenService, UserTokenPayload } from "../ports/token-service";

export class RefreshAccessTokenUseCase {
  constructor(private readonly tokenService: ITokenService) {}

  execute(request: RefreshAccessTokenRequestDTO): RefreshAccessTokenResponseDTO {
    const payload = this.tokenService.verifyRefreshToken(request.refreshToken);

    const userPayload: UserTokenPayload = {
      sub: payload.sub,
      email: payload.email,
    };

    const accessToken = this.tokenService.generateAccessToken(userPayload);

    return new RefreshAccessTokenResponseDTO(accessToken);
  }
}
