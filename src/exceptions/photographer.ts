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