import { z } from 'zod';

// Helper for file or string (existing url)
// const fileOrString = z.union([
//   z.instanceof(File),
//   z.string()
// ]).optional();

export const productSchema = z.object({
  category_id: z.coerce.number().min(1, "يجب اختيار القسم").optional(),
  name: z.coerce.string().min(3, "اسم المنتج مطلوب").optional(),
  slug: z.coerce.string().min(3, "الرابط الدائم مطلوب").optional(),
  description: z.coerce.string().optional(),
  
  price: z.coerce.number().min(0, "السعر لا يمكن أن يكون سالب").optional(),
  stock: z.coerce.number().int().min(0, "المخزون لا يمكن أن يكون سالب").optional(),
  
  status: z.enum(['active', 'inactive', 'draft']).optional(),
  
  // Cover: Required on create (File), optional on update if string exists
  cover_image: z.union([z.string(), z.instanceof(File)]).optional(),

  // Gallery: Array of Files (new) or Strings (existing)
  gallery: z.array(z.any()).optional(),

  // Dynamic Arrays
  attributes: z.array(z.object({
    key: z.string().min(1, "الاسم مطلوب"),
    value: z.string().min(1, "القيمة مطلوبة")
  })).optional(),

  features: z.array(z.object({
    key: z.string().min(1, "العنوان مطلوب"),
    value: z.string().min(1, "الوصف مطلوب")
  })).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;