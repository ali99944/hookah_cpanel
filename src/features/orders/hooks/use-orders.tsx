import { useGetQuery, useMutationAction } from '../../../core/hooks/queries-actions';
import type { Order, OrderResponse, OrderFilters, OrderUpdatePayload } from '../types';
import { useAxios } from '../../../core/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// --- GET ALL ORDERS ---
export const useOrders = (filters?: OrderFilters) => {
  const query = new URLSearchParams();
  if (filters?.limit) query.append('limit', String(filters.limit));
  if (filters?.page) query.append('page', String(filters.page));
  if (filters?.status) query.append('status', filters.status);
  if (filters?.search) query.append('search', filters.search);

  return useGetQuery<OrderResponse>({
    key: ['orders', filters],
    url: `/orders?${query.toString()}`, 
  });
}
// --- GET SINGLE ORDER ---
export const useOrder = (id: string | undefined) => {
  return useGetQuery<{ data: Order }>({
    key: ['orders', id],
    url: `/orders/${id}`,
    options: { enabled: !!id }
  });
};

// --- UPDATE ORDER STATUS ---
export const useUpdateOrderStatus = (
  id: number,
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  return useMutationAction<{ data: Order }, OrderUpdatePayload>({
    method: 'put', // Using PUT or PATCH based on API convention
    url: `/orders/${id}`,
    key: ['orders'], // Invalidates lists
    onSuccessCallback: onSuccess,
    onErrorCallback: onError as any,
  });
};

// --- DELETE ORDER ---
export const useDeleteOrder = (id: number, onSuccess?: () => void) => {
  return useMutationAction<void, void>({
    method: 'delete',
    url: `/orders/${id}`,
    key: ['orders'],
    onSuccessCallback: onSuccess,
  });
};

export const useUpdateOrder = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: OrderUpdatePayload }) => {
      const response = await axios.put<{ data: Order }>(`/orders/${id}`, payload);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      await queryClient.invalidateQueries({ queryKey: ['dashboard', 'metrics'] });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
