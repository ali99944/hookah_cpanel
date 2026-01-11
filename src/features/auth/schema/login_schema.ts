import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "البريد الإلكتروني مطلوب" })
    .email({ message: "صيغة البريد الإلكتروني غير صحيحة" }),
  password: z.string()
    .min(4, { message: "كلمة المرور يجب أن تكون 4 أحرف على الأقل" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;