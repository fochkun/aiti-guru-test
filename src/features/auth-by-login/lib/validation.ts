import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Введите имя'),
  password: z.string().min(1, 'Введите пароль'),
  remember: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
