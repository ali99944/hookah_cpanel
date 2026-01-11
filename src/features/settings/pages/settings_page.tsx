import React from 'react';
import { Globe, Phone, Share2, User, Loader2 } from 'lucide-react';
import { useSettings } from '../hooks/use-settings';
import { SettingsLayout } from '../components/settings_layout';

// Import Forms
import { SiteIdentityForm } from '../components/forms/site_identity_form';
import { ContactInfoForm } from '../components/forms/contact_info_form';
import { SocialMediaForm } from '../components/forms/social_media_form';
import { ManagerProfileForm } from '../components/forms/manager_profile_form';

export const SettingsPage: React.FC = () => {
  const { data, isLoading } = useSettings();
  const settings = data;

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;
  if (!settings) return <div>Failed to load settings</div>;

  const tabs = [
    {
      id: 'identity',
      label: 'هوية الموقع',
      icon: Globe,
      component: <SiteIdentityForm defaultValues={settings.site_identity} />
    },
    {
      id: 'contact',
      label: 'معلومات التواصل',
      icon: Phone,
      component: <ContactInfoForm defaultValues={settings.contact_info} />
    },
    {
      id: 'social',
      label: 'التواصل الاجتماعي',
      icon: Share2,
      component: <SocialMediaForm defaultValues={settings.social_media} />
    },
    {
      id: 'profile',
      label: 'الملف الشخصي',
      icon: User,
      component: <ManagerProfileForm />
    }
  ];

  return (
    <div className="space-y-6 pb-20" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight font-cairo">الإعدادات</h1>
        <p className="text-sm text-text-muted">التحكم في بيانات الموقع وإعدادات الحساب.</p>
      </div>

      <SettingsLayout tabs={tabs} />
    </div>
  );
};