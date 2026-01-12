import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductForm } from '../components/product_form';
import { Button } from '../../../components/ui/button';
import { useProduct, useUpdateProduct } from '../hooks/use-products';
import type { ProductFormValues } from '../schema/product_schema';
import { useNotification } from '../../../core/hooks/use-notification';

export const EditProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: product, isLoading: isFetching } = useProduct(id);
  const { notify } = useNotification()
  
  const { mutateAsync: update_product, isPending: isSaving } = useUpdateProduct(Number(id), () => {
    navigate('/products');
  });

  const handleSubmit = async (data: ProductFormValues) => {
    console.log(data);
    

    await update_product(data, {
      onSuccess: () => {
        navigate('/products');
        notify.success('تم تحديث المنتج بنجاح')
      },

      onError(error) {
        
        console.error("Update Failed:", error)
        notify.error(error.response.data.error.message)
      },
    });
  }

  if (isFetching) return <div>جاري التحميل...</div>;
  if (!product) return <div>المنتج غير موجود</div>;

  return (
    <div className="space-y-6 pb-10" dir="rtl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/products')}>
           <ArrowRight size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight font-cairo">تعديل المنتج</h1>
          <p className="text-sm text-text-muted">تحديث بيانات: {product.name}</p>
        </div>
      </div>

      <ProductForm 
        defaultValues={product} 
        onSubmit={handleSubmit} 
        isLoading={isSaving} 
      />
    </div>
  );
};