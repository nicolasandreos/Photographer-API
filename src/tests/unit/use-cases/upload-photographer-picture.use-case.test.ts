import { beforeEach, describe, expect, it, vi } from "vitest";
import { UploadPhotographerProfilePhotoUseCase } from "../../../application/use-cases/upload-photographer-picture";
import { IUploadFile } from "../../../application/ports/upload-file";
import { IPhotographerRepository } from "../../../domain/repositories/photographer";
import { PhotographerEntity } from "../../../domain/entities/photographer";
import {
  InvalidExtensionException,
  PhotographerNotFoundException,
} from "../../../exceptions/photographer";

describe("UploadPhotographerProfilePhotoUseCase", () => {
  let uploadFile: IUploadFile;
  let repository: IPhotographerRepository;
  let useCase: UploadPhotographerProfilePhotoUseCase;

  const photographerId = "photographer-1";
  const existingPhotographer = new PhotographerEntity({
    id: photographerId,
    name: "Ana Costa",
    email: "ana@example.com",
    passwordHash: "hash",
    phoneNumber: "11999999999",
    studioName: "Studio",
    isActive: true,
    emailVerified: true,
    profilePictureBlobName: null,
  });

  beforeEach(() => {
    uploadFile = {
      upload: vi.fn().mockResolvedValue("https://blob.example/file"),
    };
    repository = {
      getAll: vi.fn(),
      getById: vi.fn(),
      create: vi.fn(),
      getByEmail: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      updatePassword: vi.fn(),
      verifyEmail: vi.fn(),
    };
    useCase = new UploadPhotographerProfilePhotoUseCase(uploadFile, repository);
  });

  it("should throw PhotographerNotFoundException when photographer does not exist", async () => {
    vi.mocked(repository.getById).mockResolvedValue(null);

    await expect(
      useCase.execute(photographerId, Buffer.from("img"), "image/jpeg"),
    ).rejects.toThrow(PhotographerNotFoundException);
  });

  it("should throw InvalidExtensionException for unsupported content type", async () => {
    vi.mocked(repository.getById).mockResolvedValue(existingPhotographer);

    await expect(
      useCase.execute(photographerId, Buffer.from("img"), "image/gif"),
    ).rejects.toThrow(InvalidExtensionException);
  });

  it("should upload file and update profile picture blob name", async () => {
    vi.mocked(repository.getById).mockResolvedValue(existingPhotographer);
    const updated = new PhotographerEntity({
      id: photographerId,
      name: "Ana Costa",
      email: "ana@example.com",
      passwordHash: "hash",
      phoneNumber: "11999999999",
      studioName: "Studio",
      isActive: true,
      emailVerified: true,
      profilePictureBlobName: `photographers/${photographerId}/123.jpeg`,
    });
    vi.mocked(repository.update).mockResolvedValue(updated);

    const result = await useCase.execute(
      photographerId,
      Buffer.from("img"),
      "image/jpeg",
    );

    expect(uploadFile.upload).toHaveBeenCalledOnce();
    const [fileName, file, contentType] = vi.mocked(uploadFile.upload).mock
      .calls[0];
    expect(fileName).toMatch(
      new RegExp(`^photographers/${photographerId}/\\d+\\.jpeg$`),
    );
    expect(file).toEqual(Buffer.from("img"));
    expect(contentType).toBe("image/jpeg");
    expect(repository.update).toHaveBeenCalledOnce();
    expect(result).toEqual(updated);
  });
});
