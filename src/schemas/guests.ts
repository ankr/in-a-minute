import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string(),
  phone: z.string(),
});

export type SIGNUP_SCHEMA = z.infer<typeof signupSchema>;
