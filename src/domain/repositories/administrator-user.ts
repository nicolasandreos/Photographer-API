import { AdministratorUserEntity } from "../entities/administrator-user";

export interface IAdministratorUserRepository {
    getById: (id: string) => Promise<AdministratorUserEntity | null>;
    create: (administratorUserEntity: AdministratorUserEntity) => Promise<AdministratorUserEntity>;
}