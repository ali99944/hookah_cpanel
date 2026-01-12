import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { DangerDialog, Dialog } from '../../../components/ui/dialog';
import { CategoryForm } from './category_form';
import { type Category } from '../types';
import { CategoryCard } from './category_card'; // Import the card
import { useDeleteCategory, useUpdateCategory } from '../hooks/use-categories';
import { type CategoryFormValues } from '../schema/category_schema';
import { useNotification } from '../../../core/hooks/use-notification';
import type { ApiError } from '../../../core/hooks/queries-actions';

interface CategoriesListProps {
  data: Category[];
  isLoading: boolean;
}

export const CategoriesList: React.FC<CategoriesListProps> = ({ data, isLoading }) => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const deleteMutation = useDeleteCategory(() => setDeletingId(null));

  // --- RENDER LOADING STATE ---
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-80 bg-card animate-pulse border border-border" />
        ))}
      </div>
    );
  }

  // --- RENDER EMPTY STATE ---
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-border bg-secondary/5 rounded-none">
        <div className="w-16 h-16 bg-white border border-border flex items-center justify-center mb-4 text-text-muted">
          <Layers size={32} />
        </div>
        <h3 className="text-lg font-bold text-text-primary">لا يوجد أقسام</h3>
        <p className="text-sm text-text-muted mt-1">ابدأ بإضافة تصنيفات لمنتجاتك.</p>
      </div>
    );
  }

  // --- RENDER GRID ---
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={() => setEditingCategory(category)}
            onDelete={() => setDeletingId(category.id)}
          />
        ))}
      </div>

      {/* Delete Dialog */}
      <DangerDialog 
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deletingId && deleteMutation.mutate(deletingId)}
        title="حذف القسم؟"
        description="هل أنت متأكد من حذف هذا القسم؟ سيتم إخفاء المنتجات المرتبطة به من المتجر."
        isLoading={deleteMutation.isPending}
      />

      {/* Edit Dialog */}
      {editingCategory && (
        <UpdateCategoryDialog 
          category={editingCategory} 
          onClose={() => setEditingCategory(null)} 
        />
      )}
    </>
  );
};

// Update Wrapper
const UpdateCategoryDialog = ({ category, onClose }: { category: Category; onClose: () => void }) => {
  const { mutateAsync: update_category, isPending } = useUpdateCategory(category.id, onClose);
  const { notify } = useNotification();
  
  const handleSubmit = async (data: CategoryFormValues) => {
    await update_category(data, {
      onSuccess: () => notify.success('تم التحديث بنجاح'),

      onError: (error) => notify.error((error as unknown as ApiError).response.data.error.message),
    });
  };
  
  return (
    <Dialog isOpen={true} onClose={onClose} title={`تعديل: ${category.name}`}>
      <CategoryForm 
        defaultValues={category}
        onSubmit={handleSubmit}
        isLoading={isPending}
        onCancel={onClose}
      />
    </Dialog>
  );
};