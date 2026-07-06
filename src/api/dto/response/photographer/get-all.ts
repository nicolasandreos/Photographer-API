export class GetAllPhotographersResponse {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly emailVerified: boolean,
    ) {}
}
