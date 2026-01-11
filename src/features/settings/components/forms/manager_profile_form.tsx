import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { User, Mail, Lock } from 'lucide-react';
import { useUpdateProfile } from '../../hooks/use-settings';

export const ManagerProfileForm: React.FC = () => {
  // In real app, fetch initial data from useAuth() context
  const { register, handleSubmit } = useForm({
    defaultValues: { 
        name: 'Admin', 
        email: 'admin@nobel.com',
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    }
  });
  
  const { mutate, isPending } = useUpdateProfile();

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-6">
      <div className="flex gap-4">
        <Input label="الاسم" icon={<User size={16}/>} className="flex-1" {...register('name')} />
        <Input label="البريد الإلكتروني" icon={<Mail size={16}/>} className="flex-1" {...register('email')} />
      </div>

      <div className="border-t border-border my-4" />
      <Input label="كلمة المرور الحالية" type="password" icon={<Lock size={16}/>} {...register('current_password')} />
      <div className="flex gap-4">
        <Input label="كلمة المرور الجديدة" type="password" icon={<Lock size={16}/>} {...register('new_password')} />
      <Input label="تأكيد كلمة المرور" type="password" icon={<Lock size={16}/>} {...register('new_password_confirmation')} />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" isLoading={isPending}>تحديث البيانات</Button>
      </div>
    </form>
  );
};