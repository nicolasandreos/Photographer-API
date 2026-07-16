import { PhotographerEntity } from "../entities/photographer";
import { CreatePhotographerRequestDTO } from "../../api/dto/response/request/photographer/create";

export interface IPhotographerRepository {
    getAll: () => Promise<PhotographerEntity[]>;
    getById: (id: string) => Promise<PhotographerEntity | null>;
    create: (photographer: CreatePhotographerRequestDTO) => Promise<PhotographerEntity>;
    getByEmail: (email: string) => Promise<PhotographerEntity | null>;
}