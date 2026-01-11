import React from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, type CategoryFormValues } from '../schema/category_schema';
import { type Category } from '../types';

// Components
import { Input } from '../../../components/ui/input';
import { TextArea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { Switch } from '../../../components/ui/switch';
import { ImagePicker } from '../../../components/ui/image-picker'; // Imported

interface CategoryFormProps {
  defaultValues?: Category;
  onSubmit: SubmitHandler<CategoryFormValues>;
  isLoading: boolean;
  onCancel: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ 
  defaultValues, 
  onSubmit, 
  isLoading,
  onCancel
}) => {
  const { 
    register, 
    handleSubmit, 
    control, // Needed for Controller
    formState: { errors } 
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues?.name || '',
      description: defaultValues?.description || '',
      is_active: defaultValues?.is_active ?? true,
      image: defaultValues?.image || undefined,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* 1. Image Picker via Controller */}
      <Controller
        control={control}
        name="image"
        render={({ field: { value, onChange } }) => (
          <ImagePicker 
            label="صورة القسم"
            value={value}
            onChange={onChange}
            error={errors.image?.message as string}
          />
        )}
      />

      {/* 2. Text Fields */}
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="اسم القسم"
          placeholder="مثال: نكهات فاخرة"
          error={errors.name?.message}
          {...register('name')}
        />

        <TextArea
          label="الوصف"
          placeholder="وصف مختصر للقسم..."
          error={errors.description?.message}
          {...register('description')}
        />

        <Controller
          control={control}
          name="is_active"
          render={({ field }) => (
            <div className="flex items-center justify-between border border-border p-3 bg-secondary/5">
              <span className="text-sm font-medium text-text-primary">حالة القسم (نشط/غير نشط)</span>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </div>
          )}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button type="button" variant="ghost" onClick={onCancel}>
          إلغاء
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {defaultValues ? 'حفظ التغييرات' : 'إضافة القسم'}
        </Button>
      </div>
    </form>
  );
};