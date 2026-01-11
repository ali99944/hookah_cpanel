import { z } from 'zod';

export const policySchema = z.object({
  // Content Validation: Strip HTML tags to check actual text length
  content: z.string().refine(
    (val) => val.replace(/<[^>]*>/g, '').trim().length > 10,
    { message: "المحتوى قصير جداً، يرجى كتابة تفاصيل السياسة." }
  ),

  // SEO Validation
  seo_title: z.string()
    .min(10, "عنوان الميتا قصير جداً")
    .max(70, "عنوان الميتا طويل جداً")
    .optional().or(z.literal('')),
    
  seo_description: z.string()
    .min(50, "وصف الميتا قصير جداً")
    .max(300, "وصف الميتا طويل جداً")
    .optional().or(z.literal('')),

  seo_keywords: z.string().optional().or(z.literal('')),
});

export type PolicyFormValues = z.infer<typeof policySchema>;