import z from "zod";

export const createPhotographerRequestSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.email(),
    password: z.string().min(6).max(20),
    phoneNumber: z.string().regex(
        /^\d{11}$/,
        "Phone number must contain 11 digits"
    ),
    studioName: z.string().min(3).max(100).optional(),
})

export type CreatePhotographerRequestDTO = z.infer<typeof createPhotographerRequestSchema>;