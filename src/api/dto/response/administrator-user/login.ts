export class LoginAdministratorUserResponse {
    constructor(
        private readonly accessToken: string,
        private readonly refreshToken: string,
    ) {}
}
