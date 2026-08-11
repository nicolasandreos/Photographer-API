import { IUploadFile } from "../ports/upload-file";
import { IPhotographerRepository } from "../../domain/repositories/photographer";
import {
  InvalidExtensionException,
  PhotographerNotFoundException,
} from "../../exceptions/photographer";
import {
  PhotographerEntity,
  UpdatePhotographerEntity,
} from "../../domain/entities/photographer";

export class UploadPhotographerProfilePhotoUseCase {
  constructor(
    private readonly uploadFile: IUploadFile,
    private readonly photographerRepository: IPhotographerRepository,
    private readonly ALLOWED_EXTENSIONS: string[] = ["jpg", "jpeg", "png"],
  ) {}

  isValidExtension(extension: string): boolean {
    return this.ALLOWED_EXTENSIONS.some(
      (allowedExtension) => allowedExtension === extension,
    );
  }

  async execute(
    photographerId: string,
    file: Buffer,
    contentType: string,
  ): Promise<PhotographerEntity> {
    const photographer =
      await this.photographerRepository.getById(photographerId);
    if (!photographer) {
      throw new PhotographerNotFoundException();
    }

    const ext = contentType.split("/")[1];
    if (!this.isValidExtension(ext)) {
      throw new InvalidExtensionException();
    }

    const fileName = `photographers/${photographerId}/${Date.now()}.${ext}`;
    await this.uploadFile.upload(fileName, file, contentType);

    const photographerUpdateEntity = new UpdatePhotographerEntity({
      profilePictureBlobName: fileName,
    });

    return this.photographerRepository.update(
      photographerId,
      photographerUpdateEntity,
    );
  }
}
