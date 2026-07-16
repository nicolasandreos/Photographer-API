export class GetByIdPhotographerResponseDTO {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly phoneNumber: string,
        public readonly studioName: string | null,
        public readonly isActive: boolean,
        public readonly emailVerified: boolean,
    ) {}
}
