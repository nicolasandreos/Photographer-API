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

export class UnauthorizedException extends BaseApiException {
    constructor() {
        super("Unauthorized", 401);
    }
}

export class OnlyAdministratorUserException extends BaseApiException {
    constructor() {
        super("Only administrator users can access this resource", 403);
    }
}