import { describe, it, expect, vi, beforeEach } from "vitest";
import { IPhotographerRepository } from "../../../domain/repositories/photographer";
import { IPasswordService } from "../../../application/ports/password-service";
import { CreatePhotographerUseCase } from "../../../application/use-cases/create-photographer";
import { PhotographerEntity } from "../../../domain/entities/photographer";
import { PhotographerAlreadyExistsException } from "../../../exceptions/photographer";

describe("CreatePhotographerUseCase", () => {

    let repository: IPhotographerRepository
    let passwordService: IPasswordService
    let useCase: CreatePhotographerUseCase

    beforeEach(() => {
        repository = {
            create: vi.fn(),
            getByEmail: vi.fn(),
            getById: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            getAll: vi.fn(),
            updatePassword: vi.fn(),
        }
        passwordService = {
            hash: vi.fn(),
            compare: vi.fn(),
        }
        useCase = new CreatePhotographerUseCase(repository, passwordService)
    })

    it("should throw PhotographerAlreadyExistsException if photographer already exists", async () => {
        const dto = {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password",
            phoneNumber: "1234567890",
            studioName: "Studio 1",
        }
        
        const photographer = new PhotographerEntity({
            id: "1",
            name: dto.name,
            email: dto.email,
            passwordHash: dto.password,
            phoneNumber: dto.phoneNumber,
            studioName: dto.studioName,
            isActive: true,
            emailVerified: true,
        })

        vi.mocked(repository.getByEmail).mockResolvedValue(photographer)

        await expect(useCase.execute(dto)).rejects.toThrow(PhotographerAlreadyExistsException);

    })
})