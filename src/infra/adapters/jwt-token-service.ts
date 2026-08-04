import jwt from "jsonwebtoken";
import { ITokenService, UserTokenPayload } from "../../application/ports/token-service";
import { InvalidTokenException, JwtEmailVerificationSecretKeyNotSetException, JwtTokenSecretKeyNotSetException } from "../../exceptions/jwt-token-exception";

export class JwtTokenService implements ITokenService {

    static verifySecretKey(): string {
        if (!process.env.JWT_SECRET_KEY) {
            throw new JwtTokenSecretKeyNotSetException();
        }
        return process.env.JWT_SECRET_KEY as string;
    }

    static verifyEmailVerificationSecretKey(): string {
        if (!process.env.JWT_EMAIL_VERIFICATION_SECRET_KEY) {
            throw new JwtEmailVerificationSecretKeyNotSetException();
        }
        return process.env.JWT_EMAIL_VERIFICATION_SECRET_KEY as string;
    }

    generateAccessToken(userPayload: UserTokenPayload): string {
        const secret = JwtTokenService.verifySecretKey();

        const token = jwt.sign(userPayload, secret, { expiresIn: "1h" });
        return token;
    }

    generateRefreshToken(userPayload: UserTokenPayload): string {
        const secret = JwtTokenService.verifySecretKey();

        const token = jwt.sign(userPayload, secret, { expiresIn: "7d" });
        return token;
    }

    verifyToken(token: string): UserTokenPayload {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as UserTokenPayload;
            return decoded;
        } catch (error) {
            throw new InvalidTokenException();
        }
    }

    verifyEmailVerificationToken(token: string): UserTokenPayload {
        try {
            const decoded = jwt.verify(token, process.env.JWT_EMAIL_VERIFICATION_SECRET_KEY as string) as UserTokenPayload;
            return decoded;
        } catch (error) {
            throw new InvalidTokenException();
        }
    }

    generateEmailVerificationToken(userPayload: UserTokenPayload): string {
        const secret = JwtTokenService.verifyEmailVerificationSecretKey();

        const token = jwt.sign(userPayload, secret, { expiresIn: "24h" })
        return token;
    }


}