import { describe, expect, it, vi, beforeEach } from "vitest";
import { IPasswordService } from "../../../application/ports/password-service";
import { IPhotographerRepository } from "../../../domain/repositories/photographer";
import { ChangePhotographerPasswordUseCase } from "../../../application/use-cases/change-photographer-password";
import { ChangePhotographerPasswordRequestDTO } from "../../../api/dto/request/photographer/change-password";
import { InvalidPasswordException, NewPasswordCannotBeTheSameAsTheOldPasswordException, PhotographerNotFoundException } from "../../../exceptions/photographer";
import { PhotographerEntity } from "../../../domain/entities/photographer";

describe("ChangePhotographerPasswordUseCase", () => {
    let passwordService: IPasswordService
    let repository: IPhotographerRepository
    let useCase: ChangePhotographerPasswordUseCase
    let dto: ChangePhotographerPasswordRequestDTO
    let photographerId: string

    beforeEach(() => {
        photographerId = "1"
        passwordService = {
            hash: vi.fn(),
            compare: vi.fn(),
        }
        repository = {
            getAll: vi.fn(),
            getById: vi.fn(),
            create: vi.fn(),
            getByEmail: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            updatePassword: vi.fn(),
        }
        dto = {
            password: "password",
            newPassword: "new-password",
        }
        useCase = new ChangePhotographerPasswordUseCase(passwordService, repository)
    })

    it("should throw PhotographerNotFoundException if photographer not found", async () => {
        vi.mocked(repository.getById).mockResolvedValue(null);
        await expect(useCase.execute(photographerId, dto)).rejects.toThrow(PhotographerNotFoundException);
    })

    it("should throw InvalidPasswordException if password is incorrect", async () => {
        const databasePhotographer = new PhotographerEntity({
            id: photographerId,
            name: "John Doe",
            email: "john.doe@example.com",
            passwordHash: "hashed-password",
            phoneNumber: "1234567890",
            studioName: "Studio 1",
            isActive: true,
            emailVerified: true,
        })
        vi.mocked(repository.getById).mockResolvedValue(databasePhotographer);
        vi.mocked(passwordService.compare).mockResolvedValue(false);
        await expect(useCase.execute(photographerId, dto)).rejects.toThrow(InvalidPasswordException);
        expect(passwordService.compare).toHaveBeenCalledWith(dto.password, databasePhotographer.getPasswordHash());
    })

    it("should throw NewPasswordCannotBeTheSameAsTheOldPasswordException if new password is the same as the old password", async () => {
        const databasePhotographer = new PhotographerEntity({
            id: photographerId,
            name: "John Doe",
            email: "john.doe@example.com",
            passwordHash: "hashed-password",
            phoneNumber: "1234567890",
            studioName: "Studio 1",
            isActive: true,
            emailVerified: true,
        })
        vi.mocked(repository.getById).mockResolvedValue(databasePhotographer);
        vi.mocked(passwordService.compare).mockResolvedValue(true);
        await expect(useCase.execute(photographerId, dto)).rejects.toThrow(NewPasswordCannotBeTheSameAsTheOldPasswordException);
    })

    it("should return the updated photographer entity", async () => {
        const databasePhotographer = new PhotographerEntity({
            id: photographerId,
            name: "John Doe",
            email: "john.doe@example.com",
            passwordHash: "hashed-password",
            phoneNumber: "1234567890",
            studioName: "Studio 1",
            isActive: true,
            emailVerified: true,
        })
        vi.mocked(repository.getById).mockResolvedValue(databasePhotographer);
        vi.mocked(passwordService.compare).mockResolvedValueOnce(true).mockResolvedValueOnce(false);
        const newHashedPassword = "new-hashed-password"
        vi.mocked(passwordService.hash).mockResolvedValue(newHashedPassword);
        const updatedPhotographer = new PhotographerEntity({
            id: photographerId,
            name: "John Doe",
            email: "john.doe@example.com",
            passwordHash: newHashedPassword,
            phoneNumber: "1234567890",
            studioName: "Studio 1",
            isActive: true,
            emailVerified: true,
        })
        vi.mocked(repository.updatePassword).mockResolvedValue(updatedPhotographer);
        const result = await useCase.execute(photographerId, dto);
        expect(result).toEqual(updatedPhotographer);
    })
})