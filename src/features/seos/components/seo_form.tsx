import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { seoSchema, type SeoFormValues } from '../schema/seo_schema';
import { type SeoPage } from '../types';

// Components
import { Input } from '../../../components/ui/input';
import { TextArea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { ImagePicker } from '../../../components/ui/image-picker';
import { SeoPreview } from './seo_preview';

interface SeoFormProps {
  defaultValues: SeoPage;
  onSubmit: (data: SeoFormValues) => void;
  isLoading: boolean;
}

export const SeoForm: React.FC<SeoFormProps> = ({ 
  defaultValues, 
  onSubmit, 
  isLoading 
}) => {
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    control,
    watch,
    formState: { errors } 
  } = useForm<SeoFormValues>({
    resolver: zodResolver(seoSchema),
    defaultValues: {
      title: defaultValues.title || '',
      description: defaultValues.description || '',
      keywords: defaultValues.keywords || '',
      og_image: defaultValues.og_image || undefined,
    },
  });

  // Watch values for Live Preview
  const watchedValues = watch();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
      
      {/* LEFT: FORM INPUTS */}
      <form id="seo-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white border border-border p-6 space-y-6">
          <h3 className="text-lg font-bold text-text-primary border-b border-border pb-2">بيانات الميتا (Meta Tags)</h3>
          
          <div className="space-y-1">
            <Input 
              label="عنوان الصفحة (Meta Title)" 
              placeholder="مثال: نوبل للشيشة - أفضل النكهات الأصلية"
              error={errors.title?.message}
              {...register('title')}
            />
            <p className="text-[10px] text-text-muted flex justify-end">
              {watchedValues.title?.length || 0} / 60 (موصى به)
            </p>
          </div>

          <div className="space-y-1">
            <TextArea 
              label="وصف الصفحة (Meta Description)" 
              placeholder="وصف مختصر وجذاب يظهر في محركات البحث..."
              className="h-32"
              error={errors.description?.message}
              {...register('description')}
            />
            <p className="text-[10px] text-text-muted flex justify-end">
              {watchedValues.description?.length || 0} / 160 (موصى به)
            </p>
          </div>

          <Input 
            label="الكلمات المفتاحية (Keywords)" 
            placeholder="شيشة, نكهات, فحم, نوبل (افصل بفاصلة)"
            {...register('keywords')}
          />
        </div>

        <div className="bg-white border border-border p-6 space-y-6">
          <h3 className="text-lg font-bold text-text-primary border-b border-border pb-2">المشاركة الاجتماعية (Open Graph)</h3>
          <Controller
            control={control}
            name="og_image"
            render={({ field }) => (
              <ImagePicker 
                label="صورة المشاركة (OG Image)"
                value={field.value}
                onChange={field.onChange}
                error={errors.og_image?.message as string}
              />
            )}
          />
        </div>
      </form>

      {/* RIGHT: LIVE PREVIEW & ACTIONS */}
      <div className="space-y-6">
        <div className="sticky top-6 space-y-6">
          <h3 className="text-lg font-bold text-text-primary">معاينة مباشرة</h3>
          
          <SeoPreview 
            title={watchedValues.title}
            description={watchedValues.description}
            image={watchedValues.og_image}
            url={`shishanobel.com/${defaultValues.key}`}
          />

          {/* Action Bar (Sticky on Desktop) */}
          <div className="bg-white border border-border p-4 flex flex-col gap-3">
            <Button 
              type="submit" 
              form="seo-form" // Links to the form ID
              isLoading={isLoading}
              leftIcon={<Save size={16}/>}
              className="w-full"
            >
              حفظ التعديلات
            </Button>
            <Button 
              variant="secondary" 
              type="button" 
              onClick={() => navigate('/seos')}
              className="w-full"
            >
              إلغاء
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};