interface AdministratorUserEntityProps {
    id?: string;
    email: string;
    passwordHash: string;
    lastLoginAt: Date | null;
}

export class AdministratorUserEntity {
    constructor(
        private readonly props: AdministratorUserEntityProps
    ) {}

    public getId(): string | undefined {
        return this.props.id;
    }

    public getEmail(): string {
        return this.props.email;
    }

    public getPasswordHash(): string {
        return this.props.passwordHash;
    }

    public getLastLoginAt(): Date | null {
        return this.props.lastLoginAt;
    }
    
}