import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { ProductsList } from '../components/products_list';
import { Button } from '../../../components/ui/button';
import { useProducts } from '../hooks/use-products';

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useProducts();

  return (
    <div className="space-y-6 pb-20" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight font-cairo">المنتجات</h1>
          <p className="text-sm text-text-muted">إدارة النكهات والشيش والإكسسوارات.</p>
        </div>
        <Button
          onClick={() => navigate('/products/create')}
          leftIcon={<Plus size={16} />}
          className="font-bold"
        >
          إضافة منتج جديد
        </Button>
      </div>

      <ProductsList data={data?.data || []} isLoading={isLoading} />
    </div>
  );
};
