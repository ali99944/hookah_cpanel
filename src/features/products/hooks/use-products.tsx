import type { Product, ProductResponse } from '../types';
import { useGetQuery, useMutationAction } from '../../../core/hooks/queries-actions';

// --- READ ---
export const useProducts = () => {
  return useGetQuery<ProductResponse>({
    key: ['products'],
    url: '/products',
  });
};

export const useProduct = (id: string | undefined) => {
  return useGetQuery<Product>({
    key: ['products', id],
    url: `/products/${id}`,
    options: { enabled: !!id }
  });
};

// --- CREATE ---
export const useCreateProduct = (onSuccess?: () => void) => {
  return useMutationAction({
    url: '/products',
    method: 'post',
    contentType: 'multipart/form-data',
    onSuccessCallback: () => {
      if (onSuccess) onSuccess();
    }
  });
};

// --- UPDATE ---
export const useUpdateProduct = (id: number, onSuccess?: () => void) => {

  return useMutationAction({
    url: `/products/${id}?_method=PUT`,
    key: ['products', 'create', id],
    method: 'post',
    contentType: 'multipart/form-data',
    onSuccessCallback: () => {
      if (onSuccess) onSuccess();
    }
  });
};

// --- DELETE ---
export const useDeleteProduct = (id: number, onSuccess?: () => void) => {
  return useMutationAction({
    url: `/products/${id}`,
    method: 'delete',
    onSuccessCallback: () => {
      if (onSuccess) onSuccess();
    }
  });
};
