import { BaseApiException } from "./base-exception";

export class JwtTokenSecretKeyNotSetException extends BaseApiException {
    constructor() {
        super("JWT_SECRET_KEY is not set", 500);
    }
}

export class InvalidTokenException extends BaseApiException {
    constructor() {
        super("Invalid token or expired", 401);
    }
}