import { describe, it, expect, vi, beforeEach } from "vitest";
import { IPhotographerRepository } from "../../../domain/repositories/photographer";
import { IPasswordService } from "../../../application/ports/password-service";
import { CreatePhotographerUseCase } from "../../../application/use-cases/create-photographer";
import { PhotographerEntity } from "../../../domain/entities/photographer";
import { PhotographerAlreadyExistsException, PhotographerCreationFailedException } from "../../../exceptions/photographer";
import { CreatePhotographerRequestDTO } from "../../../api/dto/request/photographer/create";
import { ISendNotificationService } from "../../../application/ports/email-verification";

describe("CreatePhotographerUseCase", () => {

    let repository: IPhotographerRepository
    let passwordService: IPasswordService
    let useCase: CreatePhotographerUseCase
    let dto: CreatePhotographerRequestDTO
    let emailNotifier: ISendNotificationService

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
        emailNotifier = {
            sendNotification: vi.fn()
        }
        passwordService = {
            hash: vi.fn(),
            compare: vi.fn(),
        }
        dto = {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password",
            phoneNumber: "1234567890",
            studioName: "Studio 1",
        }
        useCase = new CreatePhotographerUseCase(repository, passwordService, emailNotifier)
    })

    it("should throw PhotographerAlreadyExistsException if photographer already exists", async () => {
        
        const photographer = new PhotographerEntity({
            id: "1",
            name: dto.name,
            email: dto.email,
            passwordHash: dto.password,
            phoneNumber: dto.phoneNumber,
            studioName: dto.studioName ?? null,
            isActive: true,
            emailVerified: true,
        })

        vi.mocked(repository.getByEmail).mockResolvedValue(photographer)

        await expect(useCase.execute(dto)).rejects.toThrow(PhotographerAlreadyExistsException);

    })

    it("should store the hashed password in database", async () => {
        const hashedPassword = "hashed-password";
        vi.mocked(repository.getByEmail).mockResolvedValue(null);
        vi.mocked(passwordService.hash).mockResolvedValue(hashedPassword);
        const photographer = new PhotographerEntity({
            id: "1",
            name: dto.name,
            email: dto.email,
            passwordHash: hashedPassword,
            phoneNumber: dto.phoneNumber,
            studioName: dto.studioName ?? null,
            isActive: true,
            emailVerified: true,
        })

        vi.mocked(repository.create).mockResolvedValue(photographer);
        await useCase.execute(dto);
        expect(passwordService.hash).toHaveBeenCalledWith(dto.password);
        const entitySent = vi.mocked(repository.create).mock.calls[0][0];
        expect(entitySent.getPasswordHash()).toBe(hashedPassword);
        expect(entitySent.getPasswordHash()).not.toBe(dto.password);
        
    })

    it("should throw PhotographerCreationFailedException if repository creation fails", async () => {
        vi.mocked(repository.getByEmail).mockResolvedValue(null);
        vi.mocked(repository.create).mockRejectedValue(new Error("Creation failed"));
        await expect(useCase.execute(dto)).rejects.toThrow(PhotographerCreationFailedException);
    })

    it("should return the created photographer entity", async () => {
        vi.mocked(repository.getByEmail).mockResolvedValue(null);
        vi.mocked(passwordService.hash).mockResolvedValue("hashed-password");
        const createdPhotographerEntity = new PhotographerEntity({
            id: "1",
            name: dto.name,
            email: dto.email,
            passwordHash: "hashed-password",
            phoneNumber: dto.phoneNumber,
            studioName: dto.studioName ?? null,
            isActive: true,
            emailVerified: true,
        })
        vi.mocked(repository.create).mockResolvedValue(createdPhotographerEntity);
        const result = await useCase.execute(dto);
        expect(result).toEqual(createdPhotographerEntity);
    })
})