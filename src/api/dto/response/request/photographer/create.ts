export class CreatePhotographerRequestDTO {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly phoneNumber: string,
        public readonly studioName?: string,
    ) {}
}