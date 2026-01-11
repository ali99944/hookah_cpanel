import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePolicy, useUpdatePolicy } from '../hooks/use_policies';
import { PolicyForm } from '../components/policy_form';
import { Button } from '../../../components/ui/button';
import type { PolicyFormValues } from '../schema/policy_schema';
import { useNotification } from '../../../core/hooks/use-notification';

export const PolicyEditPage: React.FC = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  
  const { data: policy, isFetching: isFetching } = usePolicy(key);
  
  const { mutateAsync: update_policy, isPending: isSaving } = useUpdatePolicy(key || '',);
  const { notify } = useNotification()

  const handleSubmit = async (data: PolicyFormValues) => {
    await update_policy(data, {
        onSuccess: () => {
            notify.success('تم تحديث السياسة')
        },

        onError(error) {
            notify.error(error.response.data.error.message)
        },
    })
  }

  if (isFetching) return <div>جاري التحميل...</div>;
  if (!policy) return <div>الصفحة غير موجودة</div>;

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/policies')}>
           <ArrowRight size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight font-cairo">
            تعديل: {policy.name}
          </h1>
          <p className="text-sm text-text-muted">آخر تحديث: {new Date(policy.updated_at).toLocaleDateString('ar-EG')}</p>
        </div>
      </div>

      <PolicyForm 
        defaultValues={policy} 
        onSubmit={handleSubmit} 
        isLoading={isSaving} 
      />
    </div>
  );
};