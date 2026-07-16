import z from "zod";

export const updatePhotographerRequestSchema = z.object({
    name: z.string().min(3).max(100).optional(),
    email: z.email().optional(),
    phoneNumber: z.string().regex(/^\d{11}$/, "Phone number must contain 11 digits").optional(),
    studioName: z.string().min(3).max(100).optional(),
})

export type UpdatePhotographerRequestDTO = z.infer<typeof updatePhotographerRequestSchema>;