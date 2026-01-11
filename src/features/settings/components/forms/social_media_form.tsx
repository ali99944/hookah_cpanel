import React from 'react';
import { useForm } from 'react-hook-form';
import { type SocialMedia } from '../../types';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { Facebook, Instagram, Twitter, Video, Youtube } from 'lucide-react';
import { useUpdateSettings } from '../../hooks/use-settings';

export const SocialMediaForm: React.FC<{ defaultValues: SocialMedia }> = ({ defaultValues }) => {
  const { register, handleSubmit } = useForm({ defaultValues });
  const { mutate, isPending } = useUpdateSettings();

  return (
    <form onSubmit={handleSubmit((data) => mutate({ social_media: data }))} className="space-y-6">
      
      <Input label="فيسبوك" icon={<Facebook size={16}/>} {...register('facebook_url')} />
      <Input label="انستجرام" icon={<Instagram size={16}/>} {...register('instagram_url')} />
      <Input label="تيك توك" icon={<Video size={16}/>} {...register('tiktok_url')} />
      <Input label="تويتر (X)" icon={<Twitter size={16}/>} {...register('twitter_url')} />
      <Input label="يوتيوب" icon={<Youtube size={16}/>} {...register('youtube_url')} />
      <div className="flex justify-end pt-4">
        <Button type="submit" isLoading={isPending}>حفظ الروابط</Button>
      </div>
    </form>
  );
};