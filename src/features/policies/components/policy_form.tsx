import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Save, Search } from 'lucide-react';
import { policySchema, type PolicyFormValues } from '../schema/policy_schema';
import { type Policy } from '../types';

// Components
import { Input } from '../../../components/ui/input';
import { TextArea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { RichTextEditor } from './rich_text_editor';
import { SeoPreview } from '../../seos/components/seo_preview';

interface PolicyFormProps {
  defaultValues: Policy;
  onSubmit: (data: PolicyFormValues) => void;
  isLoading: boolean;
}

export const PolicyForm: React.FC<PolicyFormProps> = ({ 
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
  } = useForm<PolicyFormValues>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      content: defaultValues.content || '',
      seo_title: defaultValues.seo_title || defaultValues.name,
      seo_description: defaultValues.seo_description || '',
      seo_keywords: defaultValues.seo_keywords || '',
    },
  });

  const watchedSeo = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-20">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: CONTENT EDITOR (Larger space) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-border p-6">
            <h3 className="text-lg font-bold text-text-primary border-b border-border pb-4 mb-6">
              محتوى الصفحة
            </h3>
            
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <RichTextEditor 
                  value={field.value} 
                  onChange={field.onChange}
                  error={errors.content?.message}
                />
              )}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: SEO & SETTINGS */}
        <div className="space-y-6">
          
          {/* Action Card */}
          <div className="bg-white border border-border p-4 sticky top-6 z-10 shadow-sm">
             <Button 
                type="submit" 
                isLoading={isLoading}
                leftIcon={<Save size={16}/>}
                className="w-full mb-3"
              >
                حفظ التغييرات
              </Button>
              <Button 
                variant="secondary" 
                type="button" 
                onClick={() => navigate('/policies')}
                className="w-full"
              >
                إلغاء
              </Button>
          </div>

          {/* SEO Settings */}
          <div className="bg-white border border-border p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-2 mb-2">
               <Search size={18} className="text-primary" />
               <h3 className="font-bold text-text-primary">إعدادات SEO</h3>
            </div>

            <Input 
              label="عنوان الميتا (Meta Title)" 
              placeholder={defaultValues.name}
              error={errors.seo_title?.message}
              {...register('seo_title')}
            />

            <TextArea 
              label="وصف الميتا (Meta Description)" 
              className="h-28"
              placeholder="وصف مختصر يظهر في جوجل..."
              error={errors.seo_description?.message}
              {...register('seo_description')}
            />

            <Input 
              label="الكلمات المفتاحية" 
              placeholder="سياسة, خصوصية, نوبل"
              {...register('seo_keywords')}
            />
          </div>

          {/* Live Preview */}
          <div>
            <h4 className="text-sm font-bold text-text-muted uppercase mb-3">معاينة جوجل</h4>
            <div className="border border-border">
               <SeoPreview 
                 title={watchedSeo.seo_title || defaultValues.name}
                 description={watchedSeo.seo_description || "وصف الصفحة سيظهر هنا..."}
                 url={`nobel-hookah.com/${defaultValues.key}`}
                 // No Image for policies usually
               />
            </div>
          </div>

        </div>
      </div>
    </form>
  );
};