import { z } from 'zod';

export const productSchema = z.object({
  category_id: z.coerce.number().min(1, "يجب اختيار القسم").optional(),
  name: z.coerce.string().min(3, "اسم المنتج مطلوب").optional(),
  description: z.coerce.string().optional(),
  price: z.coerce.number().min(0, "السعر لا يمكن أن يكون سالب").optional(),
  status: z.enum(['active', 'inactive']).optional(),

  // Cover: required on create (File), optional on update if existing URL is present.
  cover_image: z.union([z.string(), z.instanceof(File)]).optional(),

  // Gallery: Array of Files (new) or Strings (existing URLs).
  gallery: z.array(z.any()).optional(),

  attributes: z.array(
    z.object({
      key: z.string().min(1, "الاسم مطلوب"),
      value: z.string().min(1, "القيمة مطلوبة"),
    })
  ).optional(),

  features: z.array(
    z.object({
      key: z.string().min(1, "العنوان مطلوب"),
      value: z.string().min(1, "الوصف مطلوب"),
    })
  ).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

