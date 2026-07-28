import z from "zod";

export const loginAdministratorUserRequestSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(20)
})

export type LoginAdministratorUserRequest = z.infer<typeof loginAdministratorUserRequestSchema>;
