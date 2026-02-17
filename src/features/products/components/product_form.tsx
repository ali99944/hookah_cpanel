import React from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { productSchema, type ProductFormValues } from '../schema/product_schema';
import { type Product } from '../types';

import { Input } from '../../../components/ui/input';
import { TextArea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { KeyValueRepeater } from './key_value_repeater';
import { useCollections } from '../../categories/hooks/use-categories';
import { ImagePicker } from '../../../components/ui/image-picker';
import { MultiImagePicker } from '../../../components/ui/multi-image-picker';
import { Switch } from '../../../components/ui/switch';

interface ProductFormProps {
  defaultValues?: Product;
  onSubmit: SubmitHandler<ProductFormValues>;
  isLoading: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  defaultValues,
  onSubmit,
  isLoading,
}) => {
  const navigate = useNavigate();
  const { data: collections } = useCollections();

  const existingGallery = (
    defaultValues?.gallery?.map((item) => item.url || item.source) ||
    defaultValues?.gallery_images?.map((item) => item.url || item.source) ||
    []
  ).filter((item): item is string => Boolean(item));

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category_id: defaultValues?.category_id || defaultValues?.collection_id || undefined,
      name: defaultValues?.name || '',
      description: defaultValues?.description || '',
      price: Number(defaultValues?.price) || 0,
      status: defaultValues?.status || 'active',
      cover_image: defaultValues?.cover_image || undefined,
      gallery: existingGallery,
      attributes: defaultValues?.attributes || [],
      features: defaultValues?.features || [],
    },
  });

  const selectedCategoryId = watch('category_id');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 border border-border space-y-6">
            <h3 className="text-lg font-bold text-text-primary border-b border-border pb-2">بيانات المنتج</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="اسم المنتج" error={errors.name?.message} {...register('name')} />
              <div className="md:col-span-2">
                <TextArea label="الوصف" error={errors.description?.message} {...register('description')} />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-semibold uppercase text-neutral-500 mb-1.5 tracking-wide">
                  القسم
                </label>
                <div className="flex flex-wrap gap-2">
                  {(collections || []).map((collection) => {
                    const isSelected = selectedCategoryId === collection.id;

                    return (
                      <button
                        key={collection.id}
                        type="button"
                        onClick={() =>
                          setValue('category_id', collection.id, {
                            shouldTouch: true,
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }
                        className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-secondary/10 text-text-primary hover:bg-secondary/20'
                        }`}
                      >
                        {collection.name}
                      </button>
                    );
                  })}
                </div>
                {errors.category_id && (
                  <p className="text-xs text-destructive">{errors.category_id.message}</p>
                )}
                {!collections?.length && (
                  <p className="text-xs text-text-muted">لا توجد أقسام متاحة حاليًا.</p>
                )}
              </div>
            </div>
          </div>

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

        <div className="space-y-8">
          <div className="bg-white p-6 border border-border space-y-6">
            <h3 className="text-lg font-bold text-text-primary border-b border-border pb-2">الإعدادات</h3>

            <Controller
              control={control}
              name="status"
              render={({ field }) => {
                const isActive = field.value !== 'inactive';

                return (
                  <div className="flex items-center justify-between gap-4 p-3 bg-secondary/10">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">حالة المنتج</p>
                      <p className="text-xs text-text-muted">تفعيل أو إيقاف ظهور المنتج في الموقع</p>
                    </div>
                    <Switch
                      checked={isActive}
                      onCheckedChange={(checked) => field.onChange(checked ? 'active' : 'inactive')}
                      // label={isActive ? 'نشط' : 'غير نشط'}
                    />
                  </div>
                );
              }}
            />

            <Input
              label="السعر"
              type="number"
              step="0.01"
              error={errors.price?.message}
              {...register('price')}
            />
          </div>

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

