import { z } from 'zod';

export const UserNameValidator = z.object({
  name: z
    .string()
    .min(2)
    .max(32)
    .regex(/^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ_]+$/),
});

export type UserNameRequest = z.infer<typeof UserNameValidator>;
