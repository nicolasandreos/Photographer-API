import { describe, it, expect, beforeEach, vi } from "vitest";
import { JwtTokenService } from "../../../infra/adapters/jwt-token-service";
import { InvalidTokenException, JwtTokenSecretKeyNotSetException } from "../../../exceptions/jwt-token-exception";
import { ITokenService, UserTokenPayload } from "../../../application/ports/token-service";
import jwt from "jsonwebtoken";

describe("JwtTokenService", () => {
    let payload: any
    let jwtTokenService: ITokenService

    beforeEach(() => {
        payload = {
            sub: "1",
            email: "john.doe@example.com",
        };
        jwtTokenService = new JwtTokenService();
    })

    it("should throw JwtTokenSecretKeyNotSetException if JWT_SECRET_KEY is not set", async () => {
        delete process.env.JWT_SECRET_KEY;
        expect(() => JwtTokenService.verifySecretKey()).toThrow(JwtTokenSecretKeyNotSetException);
    })

    it("should generate a valid access token", async () => {
        process.env.JWT_SECRET_KEY = "secret-key";

        const accessToken = await jwtTokenService.generateAccessToken(payload);
        expect(accessToken).toBeDefined();
        expect(typeof accessToken).toBe("string");

        const decoded = await jwtTokenService.verifyToken(accessToken) as any;
        expect(decoded.sub).toEqual(payload.sub);
        expect(decoded.email).toEqual(payload.email);
        expect(decoded.exp - decoded.iat).toBe(3600);
    })

    it("should generate a valid refresh token", async () => {
        process.env.JWT_SECRET_KEY = "secret-key";

        const refreshToken = await jwtTokenService.generateRefreshToken(payload);
        expect(refreshToken).toBeDefined();
        expect(typeof refreshToken).toBe("string");

        const decoded = await jwtTokenService.verifyToken(refreshToken) as any;
        expect(decoded.sub).toEqual(payload.sub);
        expect(decoded.email).toEqual(payload.email);
        expect(decoded.exp - decoded.iat).toBe(604800);
    })

    it("should throw InvalidTokenException if the token is invalid", async () => {
        process.env.JWT_SECRET_KEY = "secret-key";
        const invalidToken = "invalid-token";
        expect(() => jwtTokenService.verifyToken(invalidToken)).toThrow(InvalidTokenException);
        
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn: "-1s" });
        expect(() => jwtTokenService.verifyToken(token)).toThrow(InvalidTokenException);
    })
})