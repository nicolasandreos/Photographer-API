export interface UserTokenPayload {
    sub: string;
    email: string;
}

export interface ITokenService {
    generateAccessToken(userPayload: UserTokenPayload): string;
    generateRefreshToken(userPayload: UserTokenPayload): string;
    verifyToken(token: string): UserTokenPayload;
}
