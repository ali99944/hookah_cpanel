import { z } from 'zod';

const imageSchema = z.union([
  z.instanceof(File),
  z.string().optional(),
  z.null().optional()
]);

export const seoSchema = z.object({
  title: z.string()
    .min(10, "العنوان قصير جداً")
    .max(70, "العنوان طويل جداً (يفضل أقل من 60 حرف)"),
  
  description: z.string()
    .min(50, "الوصف قصير جداً")
    .max(300, "الوصف طويل جداً (يفضل أقل من 160 حرف)"),
  
  keywords: z.string().optional(),
  
  og_image: imageSchema.optional(),
});

export type SeoFormValues = z.infer<typeof seoSchema>;