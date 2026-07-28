import { BaseApiException } from "./base-exception";

export class AdministratorUserAlreadyExistsException extends BaseApiException {
    constructor() {
        super("Administrator user already exists", 409);
    }
}

export class AdministratorUserNotFoundException extends BaseApiException {
    constructor() {
        super("Administrator user not found", 404);
    }
}