import React from 'react';
import { Edit, Trash2, ImageOff } from 'lucide-react';
import { type Category } from '../types';
import { Button } from '../../../components/ui/button';
import { getStorageLink } from '../../../core/lib/storage';

interface CategoryCardProps {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete }) => {
  return (
    <div className="group bg-white border border-border flex flex-col overflow-hidden transition-all duration-200">
      
      {/* IMAGE SECTION */}
      <div className="relative h-48 w-full bg-secondary/5 border-b border-border flex items-center justify-center overflow-hidden">
        {category.image ? (
          <img 
            src={getStorageLink(category.image) || ''} 
            alt={category.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        ) : (
          <div className="flex flex-col items-center text-text-muted/40">
            <ImageOff size={32} />
            <span className="text-xs mt-2">لا توجد صورة</span>
          </div>
        )}

        {/* Status Badge (Overlay) */}
        <div className="absolute top-3 left-3">
          <span className={`
            px-2 py-1 text-[10px] font-bold shadow-sm
            ${category.is_active 
              ? 'bg-success text-white' 
              : 'bg-destructive text-white'}
          `}>
            {category.is_active ? 'نشط' : 'غير نشط'}
          </span>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-bold text-text-primary font-cairo line-clamp-1">
            {category.name}
          </h3>
        </div>

      </div>

      {/* ACTIONS FOOTER */}
      <div className="bg-secondary/5 border-t border-border p-3 flex gap-2">
        <Button 
          variant="secondary" 
          size="sm" 
          className="flex-1"
          onClick={onEdit}
          leftIcon={<Edit size={14} />}
        >
          تعديل
        </Button>
        <Button 
          variant="danger" 
          size="icon" 
          className="w-10 h-8"
          onClick={onDelete}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};