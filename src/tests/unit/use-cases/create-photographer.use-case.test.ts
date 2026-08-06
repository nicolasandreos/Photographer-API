import { describe, it, expect, vi, beforeEach } from "vitest";
import { IPhotographerRepository } from "../../../domain/repositories/photographer";
import { IPasswordService } from "../../../application/ports/password-service";
import { CreatePhotographerUseCase } from "../../../application/use-cases/create-photographer";
import { PhotographerEntity } from "../../../domain/entities/photographer";
import { PhotographerAlreadyExistsException, PhotographerCreationFailedException } from "../../../exceptions/photographer";
import { CreatePhotographerRequestDTO } from "../../../api/dto/request/photographer/create";
import { ISendNotificationService } from "../../../application/ports/email-verification";
import { ITokenService } from "../../../application/ports/token-service";

describe("CreatePhotographerUseCase", () => {

    let repository: IPhotographerRepository
    let passwordService: IPasswordService
    let useCase: CreatePhotographerUseCase
    let dto: CreatePhotographerRequestDTO
    let emailNotifier: ISendNotificationService
    let tokenService: ITokenService

    beforeEach(() => {
        repository = {
            create: vi.fn(),
            getByEmail: vi.fn(),
            getById: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            getAll: vi.fn(),
            updatePassword: vi.fn(),
            verifyEmail: vi.fn(),
        }
        emailNotifier = {
            sendConfirmationEmailNotification: vi.fn(),
            sendChangePasswordEmailNotification: vi.fn(),
        }
        passwordService = {
            hash: vi.fn(),
            compare: vi.fn(),
        }
        tokenService = {
            generateAccessToken: vi.fn(),
            generateRefreshToken: vi.fn(),
            verifyToken: vi.fn(),
            verifyRefreshToken: vi.fn(),
            verifyEmailVerificationToken: vi.fn(),
            generateEmailVerificationToken: vi.fn(),
            generateChangePasswordToken: vi.fn(),
            verifyChangePasswordToken: vi.fn(),
        }
        dto = {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password",
            phoneNumber: "1234567890",
            studioName: "Studio 1",
        }
        useCase = new CreatePhotographerUseCase(repository, passwordService, emailNotifier, tokenService)
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