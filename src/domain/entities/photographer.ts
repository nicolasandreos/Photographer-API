interface PhotographerEntityProps {
    id?: string;
    name?: string;
    email?: string;
    passwordHash?: string;
    phoneNumber?: string;
    studioName?: string;
    isActive?: boolean;
    emailVerified?: boolean;
}

export class PhotographerEntity {
    constructor(
        private readonly props: PhotographerEntityProps
    ) { }

    public getId(): string | undefined {
        return this.props.id;
    }

    public getName(): string | undefined {
        return this.props.name;
    }

    public getEmail(): string | undefined {
        return this.props.email;
    }

    public getPasswordHash(): string | undefined {
        return this.props.passwordHash;
    }

    public getPhoneNumber(): string | undefined {
        return this.props.phoneNumber;
    }

    public getStudioName(): string | undefined {
        return this.props.studioName;
    }
    
    public getIsActive(): boolean | undefined {
        return this.props.isActive;
    }

    public getEmailVerified(): boolean | undefined {
        return this.props.emailVerified;
    }
}

