import { PhotographerEntity } from "../entities/photographer";
import { CreatePhotographerRequestDTO } from "../../api/dto/request/photographer/create";
import { UpdatePhotographerRequestDTO } from "../../api/dto/request/photographer/update";

export interface IPhotographerRepository {
    getAll: () => Promise<PhotographerEntity[]>;
    getById: (id: string) => Promise<PhotographerEntity | null>;
    create: (photographer: CreatePhotographerRequestDTO) => Promise<PhotographerEntity>;
    getByEmail: (email: string) => Promise<PhotographerEntity | null>;
    update: (id: string, photographer: UpdatePhotographerRequestDTO) => Promise<PhotographerEntity>;
    delete: (id: string) => Promise<void>;
}