import { PhotographerEntity } from "../entities/photographer";

export interface IPhotographerRepository {
    getAll: () => Promise<PhotographerEntity[]>;
    getById: (id: string) => Promise<PhotographerEntity | null>;
    create: (photographer: PhotographerEntity) => Promise<PhotographerEntity>;
    getByEmail: (email: string) => Promise<PhotographerEntity | null>;
    update: (id: string, photographer: PhotographerEntity) => Promise<PhotographerEntity>;
    delete: (id: string) => Promise<void>;
}