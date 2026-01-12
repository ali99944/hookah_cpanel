import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react'; // ArrowRight is "Back" in RTL
import { ProductForm } from '../components/product_form';
import { Button } from '../../../components/ui/button';
import { useCreateProduct } from '../hooks/use-products';
import type { ProductFormValues } from '../schema/product_schema';
import { useNotification } from '../../../core/hooks/use-notification';

export const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { notify } = useNotification()

  const { mutateAsync: create_product, isPending } = useCreateProduct(() => {
    notify.success('تم انشاء المنتج بنجاح')
    navigate('/products');
  });

  const handleSubmit = async (data: ProductFormValues) => {
    await create_product(data);
  };

  return (
    <div className="space-y-6 pb-10" dir="rtl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/products')}>
           <ArrowRight size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight font-cairo">إضافة منتج جديد</h1>
          <p className="text-sm text-text-muted">أدخل تفاصيل المنتج، الصور، والمواصفات.</p>
        </div>
      </div>

      <ProductForm onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  );
};