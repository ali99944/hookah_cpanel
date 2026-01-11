import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { type SiteIdentity } from '../../types';
import { Input } from '../../../../components/ui/input';
import { TextArea } from '../../../../components/ui/textarea';
import { Button } from '../../../../components/ui/button';
import { Switch } from '../../../../components/ui/switch';
import { useUpdateSettings } from '../../hooks/use-settings';
import { ImagePicker } from '../../../../components/ui/image-picker';

export const SiteIdentityForm: React.FC<{ defaultValues: SiteIdentity }> = ({ defaultValues }) => {
  const { register, control, handleSubmit } = useForm({ defaultValues });
  
  const { mutate, isPending } = useUpdateSettings(() => {
    // Show toast
  });

  const onSubmit = (data: SiteIdentity) => {
    // Wrap in the specific key expected by backend
    mutate({ site_identity: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          control={control}
          name="logo_url"
          render={({ field }) => (
            <ImagePicker 
              label="شعار المتجر (Logo)" 
              value={field.value} 
              onChange={field.onChange} 
            />
          )}
        />
        <Controller
          control={control}
          name="favicon_url"
          render={({ field }) => (
            <ImagePicker 
              label="أيقونة المتصفح (Favicon)" 
              value={field.value} 
              onChange={field.onChange} 
            />
          )}
        />
      </div>

      <Input label="اسم المتجر" {...register('site_name')} />
      <TextArea label="وصف الموقع (SEO)" {...register('site_description')} />
      
      <Input label="حقوق النشر (Footer)" {...register('copyright')} />

      <div className="border border-border p-4 rounded-none space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-bold text-primary">وضع الصيانة</label>
          <Controller
            control={control}
            name="maintenance_mode"
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
        <TextArea 
          label="رسالة الصيانة" 
          className="bg-white"
          {...register('maintenance_mode_message')} 
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" isLoading={isPending}>حفظ الإعدادات</Button>
      </div>
    </form>
  );
};