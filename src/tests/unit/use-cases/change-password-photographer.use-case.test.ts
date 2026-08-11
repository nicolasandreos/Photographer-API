import { describe, expect, it, vi, beforeEach } from "vitest";
import { IPasswordService } from "../../../application/ports/password-service";
import { IPhotographerRepository } from "../../../domain/repositories/photographer";
import { ITokenService } from "../../../application/ports/token-service";
import { ChangePhotographerPasswordUseCase } from "../../../application/use-cases/change-photographer-password";
import {
  NewPasswordDoesNotMatchException,
  PhotographerEmailIsNotValidException,
  PhotographerNotFoundException,
} from "../../../exceptions/photographer";
import { PhotographerEntity } from "../../../domain/entities/photographer";

describe("ChangePhotographerPasswordUseCase", () => {
  let passwordService: IPasswordService;
  let repository: IPhotographerRepository;
  let tokenService: ITokenService;
  let useCase: ChangePhotographerPasswordUseCase;
  let token: string;
  let photographerId: string;
  let email: string;

  beforeEach(() => {
    photographerId = "1";
    email = "john.doe@example.com";
    token = "valid-change-password-token";
    passwordService = {
      hash: vi.fn(),
      compare: vi.fn(),
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
    tokenService = {
      generateAccessToken: vi.fn(),
      generateRefreshToken: vi.fn(),
      verifyToken: vi.fn(),
      verifyRefreshToken: vi.fn(),
      verifyEmailVerificationToken: vi.fn(),
      generateEmailVerificationToken: vi.fn(),
      generateChangePasswordToken: vi.fn(),
      verifyChangePasswordToken: vi.fn(),
    };
    vi.mocked(tokenService.verifyChangePasswordToken).mockReturnValue({
      sub: photographerId,
      email,
    });
    useCase = new ChangePhotographerPasswordUseCase(
      passwordService,
      repository,
      tokenService,
    );
  });

  it("should throw PhotographerNotFoundException if photographer not found", async () => {
    vi.mocked(repository.getById).mockResolvedValue(null);
    await expect(
      useCase.execute(token, "new-password", "new-password"),
    ).rejects.toThrow(PhotographerNotFoundException);
  });

  it("should throw PhotographerEmailIsNotValidException if email does not match", async () => {
    const databasePhotographer = new PhotographerEntity({
      id: photographerId,
      name: "John Doe",
      email: "other@example.com",
      passwordHash: "hashed-password",
      phoneNumber: "1234567890",
      studioName: "Studio 1",
      isActive: true,
      emailVerified: true,
      profilePictureBlobName: null,
    });
    vi.mocked(repository.getById).mockResolvedValue(databasePhotographer);
    await expect(
      useCase.execute(token, "new-password", "new-password"),
    ).rejects.toThrow(PhotographerEmailIsNotValidException);
  });

  it("should throw NewPasswordDoesNotMatchException if passwords do not match", async () => {
    const databasePhotographer = new PhotographerEntity({
      id: photographerId,
      name: "John Doe",
      email,
      passwordHash: "hashed-password",
      phoneNumber: "1234567890",
      studioName: "Studio 1",
      isActive: true,
      emailVerified: true,
      profilePictureBlobName: null,
    });
    vi.mocked(repository.getById).mockResolvedValue(databasePhotographer);
    await expect(
      useCase.execute(token, "new-password", "different-password"),
    ).rejects.toThrow(NewPasswordDoesNotMatchException);
  });

  it("should return the updated photographer entity", async () => {
    const databasePhotographer = new PhotographerEntity({
      id: photographerId,
      name: "John Doe",
      email,
      passwordHash: "hashed-password",
      phoneNumber: "1234567890",
      studioName: "Studio 1",
      isActive: true,
      emailVerified: true,
      profilePictureBlobName: null,
    });
    vi.mocked(repository.getById).mockResolvedValue(databasePhotographer);
    const newHashedPassword = "new-hashed-password";
    vi.mocked(passwordService.hash).mockResolvedValue(newHashedPassword);
    const updatedPhotographer = new PhotographerEntity({
      id: photographerId,
      name: "John Doe",
      email,
      passwordHash: newHashedPassword,
      phoneNumber: "1234567890",
      studioName: "Studio 1",
      isActive: true,
      emailVerified: true,
      profilePictureBlobName: null,
    });
    vi.mocked(repository.updatePassword).mockResolvedValue(updatedPhotographer);

    const result = await useCase.execute(
      token,
      "new-password",
      "new-password",
    );

    expect(tokenService.verifyChangePasswordToken).toHaveBeenCalledWith(token);
    expect(passwordService.hash).toHaveBeenCalledWith("new-password");
    expect(result).toEqual(updatedPhotographer);
  });
});
