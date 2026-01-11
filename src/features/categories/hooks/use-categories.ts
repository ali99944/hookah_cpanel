import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Category } from '../types';
import { type CategoryFormValues } from '../schema/category_schema';
import { useGetQuery } from '../../../core/hooks/queries-actions';
import { useAxios } from '../../../core/lib/axios';

// Helper to convert object to FormData
const toFormData = (data: CategoryFormValues): FormData => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('is_active', data.is_active ? '1' : '0');
  
  // Only append image if it's a File (new upload)
  if (data.image instanceof File) {
    formData.append('image', data.image);
  }
  return formData;
};

// --- GET CATEGORIES ---
export const useCategories = () => {
  return useGetQuery<Category[]>({
    key: ['categories'],
    url: '/categories',
  });
};

// --- CREATE CATEGORY ---
export const useCreateCategory = (onSuccess?: () => void) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  // We use raw useMutation here to handle FormData transformation easily
  return useMutation({
    mutationFn: async (data: CategoryFormValues) => {
      const response = await axios.post('/categories', toFormData(data), {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    }
  });
};

// --- UPDATE CATEGORY ---
export const useUpdateCategory = (id: number, onSuccess?: () => void) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CategoryFormValues) => {
      // Using POST with _method=PUT is a common Laravel pattern for file uploads on update
      // Or just standard POST to update endpoint
      const formData = toFormData(data);
      formData.append('_method', 'PUT'); 
      
      const response = await axios.post(`/categories/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    }
  });
};

// --- DELETE CATEGORY ---
export const useDeleteCategory = (onSuccess?: () => void) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    }
  });
};