export class BaseApiException extends Error {
    constructor(
        public readonly details: string,
        public readonly statusCode: number
    ) {
        super(details);
    }
}