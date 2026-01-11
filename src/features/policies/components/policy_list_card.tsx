import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, Calendar } from 'lucide-react';
import { type Policy } from '../types';
import { Button } from '../../../components/ui/button';

export const PolicyListCard: React.FC<{ policy: Policy }> = ({ policy }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-border p-6 flex flex-col gap-4 group hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary/5 flex items-center justify-center text-primary border border-border">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-text-primary">{policy.name}</h3>
            <span className="text-[10px] text-text-muted bg-neutral-100 px-1 font-mono">/{policy.key}</span>
          </div>
        </div>
      </div>

      <div className="py-4 border-t border-b border-border border-dashed">
        <div className="flex items-center gap-2 text-xs text-text-muted">
           <Calendar size={14} />
           <span>آخر تحديث: {new Date(policy.updated_at).toLocaleDateString('ar-EG')}</span>
        </div>
      </div>

      <div className="mt-auto">
        <Button 
          className="w-full" 
          variant="secondary" 
          onClick={() => navigate(`/policies/${policy.key}`)}
          leftIcon={<ArrowLeft size={16}/>}
        >
          تعديل المحتوى و SEO
        </Button>
      </div>
    </div>
  );
};