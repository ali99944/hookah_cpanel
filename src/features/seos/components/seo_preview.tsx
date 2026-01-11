import React, { useState } from 'react';
import { Globe, Share2 } from 'lucide-react';

interface SeoPreviewProps {
  title: string;
  description: string;
  image?: string | File | null;
  url?: string;
}

export const SeoPreview: React.FC<SeoPreviewProps> = ({ 
  title, 
  description, 
  image, 
  url = "https://nobel-hookah.com" 
}) => {
  const [tab, setTab] = useState<'google' | 'social'>('google');
  
  // Handle image preview logic (File object vs URL string)
  const imageUrl = image instanceof File ? URL.createObjectURL(image) : image;

  return (
    <div className="bg-white border border-border">
      
      {/* TABS */}
      <div className="flex border-b border-border">
        <button
          type="button"
          onClick={() => setTab('google')}
          className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${tab === 'google' ? 'bg-secondary/5 text-primary border-b-2 border-primary' : 'text-text-muted hover:bg-neutral-50'}`}
        >
          <Globe size={16} /> Google Search
        </button>
        <button
          type="button"
          onClick={() => setTab('social')}
          className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${tab === 'social' ? 'bg-secondary/5 text-primary border-b-2 border-primary' : 'text-text-muted hover:bg-neutral-50'}`}
        >
          <Share2 size={16} /> Social Media
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-6 min-h-[250px] bg-neutral-50/50 flex flex-col justify-center">
        
        {/* 1. GOOGLE STYLE */}
        {tab === 'google' && (
          <div className="font-sans text-left" dir="ltr"> {/* Google results are usually LTR visually structure even for Arabic text contextually, but let's keep text alignment dynamic */}
            <div className="bg-white p-4 border border-border/50 shadow-sm max-w-xl mx-auto">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-[10px] text-neutral-600">N</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xs text-neutral-800">Hookah Nobel</span>
                  <span className="text-[10px] text-neutral-500">{url}</span>
                </div>
              </div>
              <h3 className="text-[#1a0dab] text-xl font-medium hover:underline cursor-pointer truncate font-cairo">
                {title || "عنوان الصفحة يظهر هنا"}
              </h3>
              <p className="text-sm text-[#4d5156] mt-1 line-clamp-2 font-cairo">
                {description || "وصف الصفحة يظهر هنا.. هذا النص سيظهر في نتائج بحث جوجل ليساعد العملاء على فهم محتوى صفحتك."}
              </p>
            </div>
          </div>
        )}

        {/* 2. SOCIAL STYLE (Facebook/Twitter Card) */}
        {tab === 'social' && (
          <div className="max-w-md mx-auto w-full bg-white border border-border rounded-none overflow-hidden shadow-sm" dir="rtl">
            <div className="h-48 w-full bg-neutral-100 flex items-center justify-center overflow-hidden border-b border-border">
              {imageUrl ? (
                <img src={imageUrl} alt="OG Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-text-muted text-xs">صورة المشاركة (OG Image)</span>
              )}
            </div>
            <div className="p-3 bg-[#f0f2f5]">
              <p className="text-[10px] text-text-muted uppercase font-bold mb-0.5">NOBEL-HOOKAH.COM</p>
              <h3 className="text-base font-bold text-text-primary leading-tight mb-1 truncate font-cairo">
                {title || "عنوان الرابط"}
              </h3>
              <p className="text-xs text-text-muted line-clamp-1 font-cairo">
                {description || "وصف الرابط الذي سيظهر عند المشاركة..."}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};