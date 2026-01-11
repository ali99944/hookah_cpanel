import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSeoPage, useUpdateSeo } from '../hooks/use_seo';
import { SeoForm } from '../components/seo_form';
import { Button } from '../../../components/ui/button';
import type { SeoFormValues } from '../schema/seo_schema';
import { useNotification } from '../../../core/hooks/use-notification';

export const SeoEditPage: React.FC = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotification()
  
  const { data: seo, isLoading: isFetching } = useSeoPage(key);
  const { mutateAsync: updateSeo, isPending: isSaving } = useUpdateSeo(key || '');

  const handleSubmit = async (data: SeoFormValues) => {
    await updateSeo(data, {
        onSuccess: () => {
            notify.success('تم تحديث SEO بنجاح')
            navigate('/seos')
        },

        onError: (error) => {
            notify.error(error.response.data.error.message)
        }
    })
  }

  if (isFetching) return <div>جاري التحميل...</div>;
  if (!seo) return <div>الصفحة غير موجودة</div>;

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/seos')}>
           <ArrowRight size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight font-cairo">تحسين صفحة: {seo.page_name}</h1>
          <p className="text-sm text-text-muted">مفتاح الصفحة: {seo.key}</p>
        </div>
      </div>

      <SeoForm 
        defaultValues={seo} 
        onSubmit={handleSubmit} 
        isLoading={isSaving} 
      />
    </div>
  );
};