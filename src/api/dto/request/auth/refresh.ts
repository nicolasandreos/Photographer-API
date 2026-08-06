import z from "zod";

export const refreshAccessTokenRequestSchema = z.object({
  refreshToken: z.string().min(1),
});

export type RefreshAccessTokenRequestDTO = z.infer<
  typeof refreshAccessTokenRequestSchema
>;
