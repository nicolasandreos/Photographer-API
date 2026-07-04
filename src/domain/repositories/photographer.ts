import { PhotographerEntity } from "../entities/photographer";

export interface IPhotographerRepository {
    getAll: () => Promise<PhotographerEntity[]>;
}