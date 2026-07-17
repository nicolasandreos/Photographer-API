export interface UserTokenPayload {
    sub: string;
    email: string;
}

export interface ITokenService {
    generateAccessToken(userPayload: UserTokenPayload): Promise<string>;
    generateRefreshToken(userPayload: UserTokenPayload): Promise<string>;
    verifyToken(token: string): Promise<UserTokenPayload>;
}
