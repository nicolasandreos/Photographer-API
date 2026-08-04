import { BaseApiException } from "./base-exception";

export class PhotographerNotFoundException extends BaseApiException {
    constructor() {
        super("Photographer not found", 404);
    }
}

export class PhotographerAlreadyExistsException extends BaseApiException {
    constructor() {
        super("Photographer already exists", 409);
    }
}

export class PhotographerCreationFailedException extends BaseApiException {
    constructor() {
        super("Photographer creation failed", 500);
    }
}

export class PhotographerEmailAlreadyExistsException extends BaseApiException {
    constructor() {
        super("Photographer email already exists", 409);
    }
}

export class PhotographerEmailIsNotValidException extends BaseApiException {
    constructor() {
        super("Photographer email is not valid", 401)
    }
}

export class InvalidPasswordException extends BaseApiException {
    constructor() {
        super("Invalid password", 401);
    }
}

export class NewPasswordCannotBeTheSameAsTheOldPasswordException extends BaseApiException {
    constructor() {
        super("New password cannot be the same as the old password", 400);
    }
}

export class EmailNotVerifiedException extends BaseApiException {
    constructor() {
        super("Email not verified. Please verify your email to login.", 401);
    }
}