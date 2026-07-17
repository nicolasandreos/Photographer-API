export class LoginPhotographerResponseDTO {
    constructor(
        public readonly accessToken: string,
        public readonly refreshToken: string,
    ) {}
}