import z from "zod";

export const loginPhotographerRequestSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(20),
})

export type LoginPhotographerRequestDTO = z.infer<typeof loginPhotographerRequestSchema>;