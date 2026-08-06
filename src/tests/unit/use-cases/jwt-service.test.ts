import { describe, it, expect, beforeEach, vi } from "vitest";
import { JwtTokenService } from "../../../infra/adapters/jwt-token-service";
import {
  InvalidTokenException,
  JwtRefreshSecretKeyNotSetException,
  JwtTokenSecretKeyNotSetException,
} from "../../../exceptions/jwt-token-exception";
import { ITokenService } from "../../../application/ports/token-service";
import jwt from "jsonwebtoken";

describe("JwtTokenService", () => {
  let payload: { sub: string; email: string };
  let jwtTokenService: ITokenService;

  beforeEach(() => {
    payload = {
      sub: "1",
      email: "john.doe@example.com",
    };
    process.env.JWT_SECRET_KEY = "secret-key";
    process.env.JWT_REFRESH_SECRET_KEY = "refresh-secret-key";
    jwtTokenService = new JwtTokenService();
  });

  it("should throw JwtTokenSecretKeyNotSetException if JWT_SECRET_KEY is not set", async () => {
    delete process.env.JWT_SECRET_KEY;
    expect(() => JwtTokenService.verifySecretKey()).toThrow(
      JwtTokenSecretKeyNotSetException,
    );
  });

  it("should throw JwtRefreshSecretKeyNotSetException if JWT_REFRESH_SECRET_KEY is not set", async () => {
    delete process.env.JWT_REFRESH_SECRET_KEY;
    expect(() => JwtTokenService.verifyRefreshSecretKey()).toThrow(
      JwtRefreshSecretKeyNotSetException,
    );
  });

  it("should generate a valid access token", async () => {
    const accessToken = jwtTokenService.generateAccessToken(payload);
    expect(accessToken).toBeDefined();
    expect(typeof accessToken).toBe("string");

    const decoded = jwtTokenService.verifyToken(accessToken) as any;
    expect(decoded.sub).toEqual(payload.sub);
    expect(decoded.email).toEqual(payload.email);
    expect(decoded.exp - decoded.iat).toBe(3600);
  });

  it("should generate a valid refresh token", async () => {
    const refreshToken = jwtTokenService.generateRefreshToken(payload);
    expect(refreshToken).toBeDefined();
    expect(typeof refreshToken).toBe("string");

    const decoded = jwtTokenService.verifyRefreshToken(refreshToken) as any;
    expect(decoded.sub).toEqual(payload.sub);
    expect(decoded.email).toEqual(payload.email);
    expect(decoded.exp - decoded.iat).toBe(604800);
  });

  it("should not accept a refresh token as an access token", async () => {
    const refreshToken = jwtTokenService.generateRefreshToken(payload);
    expect(() => jwtTokenService.verifyToken(refreshToken)).toThrow(
      InvalidTokenException,
    );
  });

  it("should not accept an access token as a refresh token", async () => {
    const accessToken = jwtTokenService.generateAccessToken(payload);
    expect(() => jwtTokenService.verifyRefreshToken(accessToken)).toThrow(
      InvalidTokenException,
    );
  });

  it("should throw InvalidTokenException if the token is invalid", async () => {
    const invalidToken = "invalid-token";
    expect(() => jwtTokenService.verifyToken(invalidToken)).toThrow(
      InvalidTokenException,
    );

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "-1s",
    });
    expect(() => jwtTokenService.verifyToken(token)).toThrow(
      InvalidTokenException,
    );
  });

  it("should throw InvalidTokenException if the refresh token is expired", async () => {
    const token = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET_KEY as string,
      { expiresIn: "-1s" },
    );
    expect(() => jwtTokenService.verifyRefreshToken(token)).toThrow(
      InvalidTokenException,
    );
  });
});
