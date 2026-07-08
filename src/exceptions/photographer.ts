import { BaseApiException } from "./base-exception";

export class PhotographerNotFoundException extends BaseApiException {
    constructor() {
        super("Photographer not found", 404);
    }
}