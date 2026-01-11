import type { Product, ProductResponse } from '../types';
import { useGetQuery, useMutationAction } from '../../../core/hooks/queries-actions';

// // Helper: Convert to FormData
// const toFormData = (data: ProductFormValues, isUpdate = false): FormData => {
//   const formData = new FormData();

//   formData.append('category_id', String(data.category_id));
//   formData.append('name', data.name);
//   formData.append('slug', data.slug);
//   formData.append('price', String(data.price));
//   formData.append('stock', String(data.stock));
//   formData.append('status', data.status);
//   if (data.description) formData.append('description', data.description);

//   // Cover Image (Only append if it's a new File)
//   if (data.cover_image instanceof File) {
//     formData.append('cover_image', data.cover_image);
//   }

//   // Gallery (Only append NEW Files)
//   // Note: Handling deletion of existing images usually requires a separate 'deleted_images' array logic
//   // For this implementation, we simply upload new ones.
//   if (data.gallery && data.gallery.length > 0) {
//     data.gallery.forEach((item, index) => {
//       if (item instanceof File) {
//         formData.append(`gallery[${index}]`, item);
//       }
//     });
//   }

//   // Attributes (Array of Objects)
//   if (data.attributes) {
//     data.attributes.forEach((attr, index) => {
//       formData.append(`attributes[${index}][key]`, attr.key);
//       formData.append(`attributes[${index}][value]`, attr.value);
//     });
//   }

//   // Features
//   if (data.features) {
//     data.features.forEach((feat, index) => {
//       formData.append(`features[${index}][key]`, feat.key);
//       formData.append(`features[${index}][value]`, feat.value);
//     });
//   }

//   if (isUpdate) {
//     formData.append('_method', 'PUT');
//   }

//   return formData;
// };

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
    url: `/products/${id}`,
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
