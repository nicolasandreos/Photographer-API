import { AdministratorUser } from "../../../generated/prisma/client";
import { AdministratorUserEntity } from "../../domain/entities/administrator-user";

export class AdministratorUserMapperRepository {
    static toEntity(administratorUser: AdministratorUser): AdministratorUserEntity {
        return new AdministratorUserEntity({
            id: administratorUser.id,
            email: administratorUser.email,
            passwordHash: administratorUser.passwordHash,
            lastLoginAt: administratorUser.lastLoginAt,
        });
    }
}