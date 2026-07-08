import { PhotographerEntity } from "../entities/photographer";

export interface IPhotographerRepository {
    getAll: () => Promise<PhotographerEntity[]>;
    getById: (id: string) => Promise<PhotographerEntity | null>;
}