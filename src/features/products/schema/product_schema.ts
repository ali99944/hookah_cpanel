import { z } from 'zod';

// Helper for file or string (existing url)
const fileOrString = z.union([
  z.instanceof(File),
  z.string()
]).optional();

export const productSchema = z.object({
  category_id: z.coerce.number().min(1, "يجب اختيار القسم"),
  name: z.string().min(3, "اسم المنتج مطلوب"),
  slug: z.string().min(3, "الرابط الدائم مطلوب"),
  description: z.string().optional(),
  
  price: z.coerce.number().min(0, "السعر لا يمكن أن يكون سالب"),
  stock: z.coerce.number().int().min(0, "المخزون لا يمكن أن يكون سالب"),
  
  status: z.enum(['active', 'inactive', 'draft']),
  
  // Cover: Required on create (File), optional on update if string exists
  cover_image: z.any().refine((val) => val instanceof File || typeof val === 'string', {
    message: "صورة الغلاف مطلوبة"
  }),

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