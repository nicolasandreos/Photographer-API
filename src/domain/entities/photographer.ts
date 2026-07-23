import bcrypt from "bcrypt";

interface PhotographerEntityProps {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    phoneNumber: string;
    studioName: string | null;
    isActive: boolean;
    emailVerified: boolean;
}

export class PhotographerEntity {
    constructor(
        private readonly props: PhotographerEntityProps
    ) { }

    public getId(): string {
        return this.props.id;
    }

    public getName(): string {
        return this.props.name;
    }

    public getEmail(): string {
        return this.props.email;
    }

    public getPasswordHash(): string {
        return this.props.passwordHash;
    }

    public getPhoneNumber(): string {
        return this.props.phoneNumber;
    }

    public getStudioName(): string | null {
        return this.props.studioName;
    }

    public getIsActive(): boolean {
        return this.props.isActive;
    }

    public getEmailVerified(): boolean {
        return this.props.emailVerified;
    }

    public comparePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.props.passwordHash);
    }

    public updatePassword(passwordHash: string): void {
        this.props.passwordHash = passwordHash;
    }
}

interface CreatePhotographerEntityProps {
    name: string;
    email: string;
    passwordHash: string;
    phoneNumber: string;
    studioName: string | null;
}

export class CreatePhotographerEntity {
    constructor(
        private readonly props: CreatePhotographerEntityProps
    ) { }

    public getName(): string {
        return this.props.name;
    }

    public getEmail(): string {
        return this.props.email;
    }

    public getPasswordHash(): string {
        return this.props.passwordHash;
    }

    public getPhoneNumber(): string {
        return this.props.phoneNumber;
    }

    public getStudioName(): string | null {
        return this.props.studioName;
    }
}

interface UpdatePhotographerEntityProps {
    name?: string;
    email?: string;
    phoneNumber?: string;
    studioName?: string | null;
}

export class UpdatePhotographerEntity {
    constructor(
        private readonly props: UpdatePhotographerEntityProps
    ) { }

    public getName(): string | undefined {
        return this.props.name;
    }

    public getEmail(): string | undefined {
        return this.props.email;
    }

    public getPhoneNumber(): string | undefined {
        return this.props.phoneNumber;
    }

    public getStudioName(): string | null | undefined {
        return this.props.studioName;
    }
}
