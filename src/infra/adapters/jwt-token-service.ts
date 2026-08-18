import jwt from "jsonwebtoken";
import { ITokenService, UserTokenPayload } from "../../application/ports/token-service";
import { InvalidTokenException, JwtChangePasswordSecretKeyNotSetException, JwtEmailVerificationSecretKeyNotSetException, JwtRefreshSecretKeyNotSetException, JwtTokenSecretKeyNotSetException } from "../../exceptions/jwt-token-exception";

export class JwtTokenService implements ITokenService {

    static verifySecretKey(): string {
        if (!process.env.JWT_SECRET_KEY) {
            throw new JwtTokenSecretKeyNotSetException();
        }
        return process.env.JWT_SECRET_KEY as string;
    }

    static verifyRefreshSecretKey(): string {
        if (!process.env.JWT_REFRESH_SECRET_KEY) {
            throw new JwtRefreshSecretKeyNotSetException();
        }
        return process.env.JWT_REFRESH_SECRET_KEY as string;
    }

    static verifyEmailVerificationSecretKey(): string {
        if (!process.env.JWT_EMAIL_VERIFICATION_SECRET_KEY) {
            throw new JwtEmailVerificationSecretKeyNotSetException();
        }
        return process.env.JWT_EMAIL_VERIFICATION_SECRET_KEY as string;
    }

    static verifyChangePasswordSecretKey(): string {
        if (!process.env.JWT_CHANGE_PASSWORD_SECRET_KEY) {
            throw new JwtChangePasswordSecretKeyNotSetException();
        }
        return process.env.JWT_CHANGE_PASSWORD_SECRET_KEY as string;
    }

    generateAccessToken(userPayload: UserTokenPayload): string {
        const secret = JwtTokenService.verifySecretKey();

        const token = jwt.sign(userPayload, secret, { expiresIn: "1h" });
        return token;
    }

    generateRefreshToken(userPayload: UserTokenPayload): string {
        const secret = JwtTokenService.verifyRefreshSecretKey();

        const token = jwt.sign(userPayload, secret, { expiresIn: "7d" });
        return token;
    }

    verifyToken(token: string): UserTokenPayload {
        const secret = JwtTokenService.verifySecretKey();

        try {
            const decoded = jwt.verify(token, secret) as UserTokenPayload;
            return decoded;
        } catch {
            throw new InvalidTokenException();
        }
    }

    verifyRefreshToken(token: string): UserTokenPayload {
        const secret = JwtTokenService.verifyRefreshSecretKey();

        try {
            const decoded = jwt.verify(token, secret) as UserTokenPayload;
            return decoded;
        } catch {
            throw new InvalidTokenException();
        }
    }

    generateEmailVerificationToken(userPayload: UserTokenPayload): string {
        const secret = JwtTokenService.verifyEmailVerificationSecretKey();

        const token = jwt.sign(userPayload, secret, { expiresIn: "24h" })
        return token;
    }

    verifyEmailVerificationToken(token: string): UserTokenPayload {
        const secret = JwtTokenService.verifyEmailVerificationSecretKey();
        try {
            const decoded = jwt.verify(token, secret) as UserTokenPayload;
            return decoded;
        } catch {
            throw new InvalidTokenException();
        }
    }


    generateChangePasswordToken(userPayload: UserTokenPayload): string {
        const secret = JwtTokenService.verifyChangePasswordSecretKey();

        const token = jwt.sign(userPayload, secret, { expiresIn: "1h"});
        return token;
    }

    verifyChangePasswordToken(token: string): UserTokenPayload {
        const secret = JwtTokenService.verifyChangePasswordSecretKey();

        try {
            const decoded = jwt.verify(token, secret) as UserTokenPayload;
            return decoded;
        } catch {
            throw new InvalidTokenException();
        }
    }

}