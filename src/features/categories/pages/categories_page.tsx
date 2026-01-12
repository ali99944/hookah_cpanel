import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CategoriesList } from '../components/categories_list';
import { CategoryForm } from '../components/category_form';
import { Button } from '../../../components/ui/button';
import { Dialog } from '../../../components/ui/dialog';
import { useCollections, useCreateCategory } from '../hooks/use-categories';
import type { CategoryFormValues } from '../schema/category_schema';
import { useNotification } from '../../../core/hooks/use-notification';

export const CategoriesPage: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { notify } = useNotification();
  const { data: categories, isLoading } = useCollections();

  const { mutateAsync: createCategory, isPending } = useCreateCategory(() => {
    notify.success('تم انشاء المجموعة بنجاح');
    setIsCreateOpen(false);
  });

  const handleSubmit = async (data: CategoryFormValues) => {
    await createCategory(data);
  };

  return (
    <div className="space-y-6 pb-20" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight font-cairo">أقسام المتجر</h1>
          <p className="text-sm text-text-muted">تصنيف المنتجات (نكهات، شيش، إكسسوارات).</p>
        </div>
        <Button 
          onClick={() => setIsCreateOpen(true)}
          leftIcon={<Plus size={16} />}
          className="font-bold"
        >
          إضافة قسم جديد
        </Button>
      </div>

      {/* List */}
      <CategoriesList 
        data={categories || []} 
        isLoading={isLoading} 
      />

      {/* Create Dialog */}
      <Dialog 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        title="إضافة قسم جديد"
      >
        <CategoryForm 
          onSubmit={handleSubmit}
          isLoading={isPending}
          onCancel={() => setIsCreateOpen(false)}
        />
      </Dialog>

    </div>
  );
};