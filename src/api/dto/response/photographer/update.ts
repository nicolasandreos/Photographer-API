export class UpdatePhotographerResponseDTO {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly phoneNumber: string,
        public readonly studioName: string | null,
    ) {}
}
