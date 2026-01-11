import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';

// Components
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Mail, Lock, ArrowLeft } from 'lucide-react'; // ArrowLeft points "Forward" in RTL
import { loginSchema, type LoginFormValues } from '../schema/login_schema';
import { useAdminLogin } from '../hooks/use-auth';

export const LoginPage: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, error } = useAdminLogin();

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    // 'dir="rtl"' ensures correct layout mirroring
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-white" dir="rtl">
      
      {/* COLUMN 1: Visual / Brand (Hidden on Mobile) */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-neutral-900 text-white">
        
        {/* Background Image: Moody Smoke/Hookah Vibe */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-no-repeat bg-center opacity-50 mix-blend-overlay"
          style={{ 
            // A dark, smoky abstract image fitting for a Hookah brand
            backgroundImage: "url('/images/login_cover.jpg')" 
          }}
        />
        {/* Gradient Overlay for text readability */}
        {/* <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-neutral-900/60 to-transparent" /> */}

        {/* Brand Logo Area */}
        <div className="relative z-10 flex items-center gap-3">
           <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-none shadow-lg">
             <div className="w-5 h-5 bg-white" />
           </div>
           <div className="flex flex-col gap-2">
             <span className="text-lg font-bold tracking-tight uppercase leading-none">متجر نوبل</span>
             <span className="text-[10px] text-white/60 tracking-widest uppercase">Nobel Hookah</span>
           </div>
        </div>

        {/* Quote / Context */}
        <div className="relative z-10 max-w-lg">
          <blockquote className="text-2xl font-medium leading-relaxed mb-6 font-cairo">
            "الجودة هي المعيار الوحيد. تحكم في مخزونك، تابع طلباتك، وقدم لعملائك التجربة التي يستحقونها."
          </blockquote>
          <div className="flex items-center gap-2 text-neutral-400 text-sm">
            <div className="h-px w-8 bg-neutral-600" />
            <span>نظام إدارة نوبل v2.0</span>
          </div>
        </div>
      </div>

      {/* COLUMN 2: Login Form */}
      <div className="flex flex-col justify-center items-center p-8 bg-white text-neutral-900 relative">
        
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="absolute top-8 right-8 lg:hidden flex items-center gap-2">
           <div className="w-8 h-8 bg-primary flex items-center justify-center">
             <div className="w-2 h-2 bg-white" />
           </div>
           <span className="font-bold uppercase tracking-tight text-primary">نوبل</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm space-y-8"
        >
          {/* Form Header */}
          <div className="space-y-2 text-right">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 font-cairo">تسجيل الدخول</h1>
            <p className="text-neutral-500 text-sm">أدخل بيانات الاعتماد للوصول إلى لوحة الإدارة.</p>
          </div>

          {/* Global Error */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 bg-destructive/5 border-r-2 border-destructive text-destructive text-sm font-bold"
            >
              {error?.response?.data?.error.message || "بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى."}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-right">
            <Input 
              label="البريد الإلكتروني"
              type="email"
              // In RTL, text should align right
              className="text-right" 
              placeholder="manager@nobel.com"
              icon={<Mail size={16} />}
              error={errors.email?.message}
              disabled={isPending}
              {...register('email')}
            />

            <div className="space-y-1">
              <Input 
                label="كلمة المرور"
                type="password"
                className="text-right"
                placeholder="••••••••"
                icon={<Lock size={16} />}
                error={errors.password?.message}
                disabled={isPending}
                {...register('password')}
              />
              <div className="flex justify-end">
                <a href="#" className="text-xs font-medium text-text-muted hover:text-primary transition-colors">
                  نسيت كلمة المرور؟
                </a>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full font-cairo font-bold" 
              size="md"
              isLoading={isPending}
            >
              تسجيل الدخول
            </Button>
          </form>

          {/* Footer */}
          <p className="text-xs text-center text-neutral-400 mt-6 font-cairo">
            جميع الحقوق محفوظة لشركة نوبل © {new Date().getFullYear()}.
          </p>
        </motion.div>
      </div>

    </div>
  );
};