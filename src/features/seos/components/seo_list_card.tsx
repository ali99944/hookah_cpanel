import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, SparklesIcon } from 'lucide-react';
import { type SeoPage } from '../types';
import { Button } from '../../../components/ui/button';

export const SeoListCard: React.FC<{ page: SeoPage }> = ({ page }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-border p-6 flex flex-col gap-4 group hover:border-primary transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary/5 flex items-center justify-center text-primary border border-border">
            <Globe size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-text-primary">{page.page_name}</h3>
            <code dir="ltr" className="text-xs text-text-muted font-mono bg-neutral-100 px-1">/{page.key}</code>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <span className="text-[10px] uppercase font-bold text-text-muted">العنوان</span>
          <p className="text-sm font-medium text-text-primary line-clamp-1">{page.title}</p>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-text-muted">الوصف</span>
          <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
            {page.description}
          </p>
        </div>
      </div>

      <div className="pt-2 mt-auto">
        <Button 
          className="w-full" 
          variant="secondary" 
          onClick={() => navigate(`/seos/${page.key}`)}
          leftIcon={<SparklesIcon size={16}/>}
        >
          تحسين SEO
        </Button>
      </div>
    </div>
  );
};