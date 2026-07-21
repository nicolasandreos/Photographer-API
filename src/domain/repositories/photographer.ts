import {
    CreatePhotographerEntity,
    PhotographerEntity,
    UpdatePhotographerEntity,
} from "../entities/photographer";

export interface IPhotographerRepository {
    getAll: () => Promise<PhotographerEntity[]>;
    getById: (id: string) => Promise<PhotographerEntity | null>;
    create: (photographer: CreatePhotographerEntity) => Promise<PhotographerEntity>;
    getByEmail: (email: string) => Promise<PhotographerEntity | null>;
    update: (id: string, photographer: UpdatePhotographerEntity) => Promise<PhotographerEntity>;
    delete: (id: string) => Promise<void>;
}
