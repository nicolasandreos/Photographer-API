import jwt from "jsonwebtoken";
import { ITokenService, UserTokenPayload } from "../../application/ports/token-service";
import { InvalidTokenException, JwtTokenSecretKeyNotSetException } from "../../exceptions/jwt-token-exception";

export class JwtTokenService implements ITokenService {

    static verifySecretKey(): string {
        if (!process.env.JWT_SECRET_KEY) {
            throw new JwtTokenSecretKeyNotSetException();
        }
        return process.env.JWT_SECRET_KEY as string;
    }

    async generateAccessToken(userPayload: UserTokenPayload): Promise<string> {
        const secret = JwtTokenService.verifySecretKey();

        const token = jwt.sign(userPayload, secret, { expiresIn: "1h" });
        return token;
    }

    async generateRefreshToken(userPayload: UserTokenPayload): Promise<string> {
        const secret = JwtTokenService.verifySecretKey();

        const token = jwt.sign(userPayload, secret, { expiresIn: "7d" });
        return token;
    }

    async verifyToken(token: string): Promise<UserTokenPayload> {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as UserTokenPayload;
            return decoded;
        } catch (error) {
            throw new InvalidTokenException();
        }
    }

}