import { z } from 'zod';

// We accept File (for new uploads) or String (for existing images) or undefined
const imageSchema = z.union([
  z.instanceof(File, { message: "يجب اختيار صورة صالحة" }),
  z.string().optional(),
  z.null().optional()
]);

export const categorySchema = z.object({
  name: z.string().min(2, "اسم القسم يجب أن يكون حرفين على الأقل"),
  is_active: z.boolean(),
  slug: z.string().min(2, "الرابط الدائم يجب ان يكون حرفين على الأقل"),
  image: imageSchema.optional(), // Optional on edit, but usually required on create in UI logic
});

export type CategoryFormValues = z.infer<typeof categorySchema>;