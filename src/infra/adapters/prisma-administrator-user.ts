import { AdministratorUserEntity } from "../../domain/entities/administrator-user";
import { IAdministratorUserRepository } from "../../domain/repositories/administrator-user";
import { db } from "../database/client";
import { AdministratorUserMapperRepository } from "../mappers/administrator-user-mapper";

export class PrismaAdministratorUserRepository implements IAdministratorUserRepository {
    async getById(id: string): Promise<AdministratorUserEntity | null> {
        const databaseAdministratorUser = await db.administratorUser.findUnique({
            where: {
                id
            }
        });
        if (!databaseAdministratorUser) {
            return null;
        }
        return AdministratorUserMapperRepository.toEntity(databaseAdministratorUser);
    }
}