export class PhotographerEntity {
    constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly email: string,
        private readonly passwordHash: string,
        private readonly phoneNumber: string,
        private readonly studioName: string | null,
        private readonly isActive: boolean,
        private readonly emailVerified: boolean,
    ) { }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPasswordHash(): string {
        return this.passwordHash;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public getStudioName(): string | null {
        return this.studioName;
    }
    
    public getIsActive(): boolean {
        return this.isActive;
    }

    public getEmailVerified(): boolean {
        return this.emailVerified;
    }
}

