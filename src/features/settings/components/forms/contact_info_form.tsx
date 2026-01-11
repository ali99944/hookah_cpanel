import React from 'react';
import { useForm } from 'react-hook-form';
import { type ContactInfo } from '../../types';
import { Input } from '../../../../components/ui/input';
import { TextArea } from '../../../../components/ui/textarea';
import { Button } from '../../../../components/ui/button';
import { Phone, Mail } from 'lucide-react';
import { useUpdateSettings } from '../../hooks/use-settings';

export const ContactInfoForm: React.FC<{ defaultValues: ContactInfo }> = ({ defaultValues }) => {
  const { register, handleSubmit } = useForm({ defaultValues });
  const { mutateAsync, isPending } = useUpdateSettings();

  const submitContactInfo = async (data: ContactInfo) => {

    await mutateAsync({ contact_info: data }, {
        onSuccess: (data) => {
            console.log(data);
        },

        onError: (error) => {
            console.log(error);
            
        }
    })
  }

  return (
    <form onSubmit={handleSubmit(submitContactInfo)} className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input dir='ltr' label="الهاتف الأساسي" icon={<Phone size={16}/>} {...register('primary_phone')} />
        <Input dir='ltr' label="الهاتف الثانوي" icon={<Phone size={16}/>} {...register('secondary_phone')} />
        
        <Input label="البريد الإلكتروني" icon={<Mail size={16}/>} {...register('primary_email')} />
        <Input dir='ltr' label="واتساب" icon={<Phone size={16}/>} {...register('whatsapp_number')} />
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <TextArea label="العنوان" placeholder='العنوان' {...register('address')} />
        <Input label="رابط خرائط جوجل" {...register('google_maps_link')} />
        <TextArea label="ساعات العمل" placeholder='ساعات العمل' className="h-24" {...register('working_hours')} />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" isLoading={isPending}>حفظ معلومات التواصل</Button>
      </div>
    </form>
  );
};