import { GetAllPhotographersResponse } from "../../api/dto/response/photographer/get-all";
import { IPhotographerRepository } from "../../domain/repositories/photographer";

export class GetAllPhotographersUseCase {
    constructor(
        private repository: IPhotographerRepository
    ) {}

    async execute(): Promise<GetAllPhotographersResponse[]> {
        const photographersEntities = await this.repository.getAll();
        const photographersDTO = photographersEntities.map((photographer) => 
            new GetAllPhotographersResponse(
                photographer.getId(), 
                photographer.getName(), 
                photographer.getEmail(), 
                photographer.getEmailVerified()
            )
        );
        return photographersDTO;
    }

}