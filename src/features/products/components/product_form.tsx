import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { productSchema, type ProductFormValues } from '../schema/product_schema';
import { type Product } from '../types';

// Components
import { Input } from '../../../components/ui/input';
import { TextArea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { Select } from '../../../components/ui/select';
import { KeyValueRepeater } from './key_value_repeater';
import { useCategories } from '../../categories/hooks/use-categories';
import { ImagePicker } from '../../../components/ui/image-picker';
import { MultiImagePicker } from '../../../components/ui/multi-image-picker';

interface ProductFormProps {
  defaultValues?: Product;
  onSubmit: (data: ProductFormValues) => void;
  isLoading: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ 
  defaultValues, 
  onSubmit, 
  isLoading 
}) => {
  const navigate = useNavigate();
  const { data: categories } = useCategories();

  const { 
    register, 
    handleSubmit, 
    control,
    watch,
    setValue,
    formState: { errors } 
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category_id: defaultValues?.category_id || undefined,
      name: defaultValues?.name || '',
      slug: defaultValues?.slug || '',
      description: defaultValues?.description || '',
      price: Number(defaultValues?.price) || 0,
      stock: defaultValues?.stock || 0,
      status: defaultValues?.status || 'draft',
      cover_image: defaultValues?.cover_image || undefined,
      // Map existing gallery to array of strings (URLs)
      gallery: defaultValues?.gallery_images?.map(g => g.url) || [],
      attributes: defaultValues?.attributes || [],
      features: defaultValues?.features || [],
    },
  });

  // Auto-slugify
  const nameValue = watch('name');
  useEffect(() => {
    if (!defaultValues && nameValue) {
      const slug = nameValue.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      setValue('slug', slug);
    }
  }, [nameValue, setValue, defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN (Main Info) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Basic Info */}
          <div className="bg-white p-6 border border-border space-y-6">
            <h3 className="text-lg font-bold text-text-primary border-b border-border pb-2">بيانات المنتج</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Input label="اسم المنتج" error={errors.name?.message} {...register('name')} />
               <Input label="الرابط الدائم (Slug)" error={errors.slug?.message} {...register('slug')} />
               <div className="md:col-span-2">
                 <TextArea label="الوصف" error={errors.description?.message} {...register('description')} />
               </div>
            </div>
          </div>

          {/* Section 2: Technical Specs (Attributes) */}
          <div className="bg-white p-6 border border-border">
             <KeyValueRepeater 
               control={control} 
               register={register} 
               name="attributes" 
               label="المواصفات التقنية (Attributes)"
               keyLabel="الخاصية (مثل: الطول)"
               valueLabel="القيمة (مثل: 50 سم)"
               errors={errors.attributes}
             />
          </div>

          {/* Section 3: Features */}
          <div className="bg-white p-6 border border-border">
             <KeyValueRepeater 
               control={control} 
               register={register} 
               name="features" 
               label="مميزات المنتج (Features)"
               keyLabel="الميزة"
               valueLabel="الوصف"
               isTextAreaValue
               errors={errors.features}
             />
          </div>

        </div>

        {/* RIGHT COLUMN (Settings & Media) */}
        <div className="space-y-8">
          
          {/* Status & Pricing */}
          <div className="bg-white p-6 border border-border space-y-6">
            <h3 className="text-lg font-bold text-text-primary border-b border-border pb-2">الإعدادات</h3>
            
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select
                  label="حالة المنتج"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: 'نشط (Active)', value: 'active' },
                    { label: 'مسودة (Draft)', value: 'draft' },
                    { label: 'غير نشط (Inactive)', value: 'inactive' },
                  ]}
                  // error={errors.status?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="category_id"
              render={({ field }) => (
                <Select
                  label="القسم"
                  value={String(field.value)}
                  onChange={(val) => field.onChange(Number(val))}
                  options={categories?.map(c => ({ label: c.name, value: String(c.id) })) || []}
                  placeholder="اختر القسم"
                />
              )}
            />
            {errors.category_id && <p className="text-xs text-destructive">{errors.category_id.message}</p>}

            <div className="grid grid-cols-2 gap-4">
              <Input label="السعر" type="number" step="0.01" error={errors.price?.message} {...register('price')} />
              <Input label="المخزون" type="number" error={errors.stock?.message} {...register('stock')} />
            </div>
          </div>

          {/* Media */}
          <div className="bg-white p-6 border border-border space-y-6">
            <h3 className="text-lg font-bold text-text-primary border-b border-border pb-2">الوسائط</h3>
            
            <Controller
              control={control}
              name="cover_image"
              render={({ field }) => (
                <ImagePicker
                  label="صورة الغلاف (الرئيسية)"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.cover_image?.message as string}
                />
              )}
            />

            <Controller
              control={control}
              name="gallery"
              render={({ field }) => (
                <MultiImagePicker
                  label="صور المعرض (Gallery)"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.gallery?.message as string}
                />
              )}
            />
          </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border z-10 flex justify-end gap-4 lg:pr-72">
        <Button type="button" variant="secondary" onClick={() => navigate('/products')}>
          إلغاء
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {defaultValues ? 'تحديث المنتج' : 'حفظ المنتج'}
        </Button>
      </div>

    </form>
  );
};