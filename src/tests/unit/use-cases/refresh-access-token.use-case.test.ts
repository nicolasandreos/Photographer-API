import { describe, it, expect, beforeEach, vi } from "vitest";
import { RefreshAccessTokenUseCase } from "../../../application/use-cases/refresh-access-token";
import { ITokenService } from "../../../application/ports/token-service";
import { InvalidTokenException } from "../../../exceptions/jwt-token-exception";

describe("RefreshAccessTokenUseCase", () => {
  let tokenService: ITokenService;
  let useCase: RefreshAccessTokenUseCase;

  beforeEach(() => {
    tokenService = {
      generateAccessToken: vi.fn(),
      generateRefreshToken: vi.fn(),
      verifyToken: vi.fn(),
      verifyRefreshToken: vi.fn(),
      verifyEmailVerificationToken: vi.fn(),
      generateEmailVerificationToken: vi.fn(),
      generateChangePasswordToken: vi.fn(),
      verifyChangePasswordToken: vi.fn(),
    };
    useCase = new RefreshAccessTokenUseCase(tokenService);
  });

  it("should return a new access token when refresh token is valid", () => {
    const payload = { sub: "1", email: "john.doe@example.com" };
    vi.mocked(tokenService.verifyRefreshToken).mockReturnValue(payload);
    vi.mocked(tokenService.generateAccessToken).mockReturnValue("new-access-token");

    const result = useCase.execute({ refreshToken: "valid-refresh-token" });

    expect(tokenService.verifyRefreshToken).toHaveBeenCalledWith(
      "valid-refresh-token",
    );
    expect(tokenService.generateAccessToken).toHaveBeenCalledWith({
      sub: payload.sub,
      email: payload.email,
    });
    expect(result.accessToken).toBe("new-access-token");
  });

  it("should throw InvalidTokenException when refresh token is invalid", () => {
    vi.mocked(tokenService.verifyRefreshToken).mockImplementation(() => {
      throw new InvalidTokenException();
    });

    expect(() =>
      useCase.execute({ refreshToken: "invalid-refresh-token" }),
    ).toThrow(InvalidTokenException);
    expect(tokenService.generateAccessToken).not.toHaveBeenCalled();
  });
});
