import z from "zod";

export const changePhotographerPasswordRequestSchema = z.object({
    password: z.string().min(6).max(20),
    newPassword: z.string().min(6).max(20),
});

export type ChangePhotographerPasswordRequestDTO = z.infer<typeof changePhotographerPasswordRequestSchema>;