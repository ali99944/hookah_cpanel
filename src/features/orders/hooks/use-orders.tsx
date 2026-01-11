import { useGetQuery, useMutationAction } from '../../../core/hooks/queries-actions';
import type { Order, OrderResponse, OrderFilters } from '../types';

// --- GET ALL ORDERS ---
export const useOrders = (filters?: OrderFilters) => {
  // In a real scenario, you'd serialize filters into query params
  // e.g., url: `/orders?status=${filters.status}&search=${filters.search}`
  return useGetQuery<OrderResponse>({
    key: ['orders', filters],
    url: '/orders', 
  });
};

// --- GET SINGLE ORDER ---
export const useOrder = (id: string | undefined) => {
  return useGetQuery<{ data: Order }>({
    key: ['orders', id],
    url: `/orders/${id}`,
    options: { enabled: !!id }
  });
};

// --- UPDATE ORDER STATUS ---
export const useUpdateOrderStatus = (id: number, onSuccess?: () => void) => {
  return useMutationAction<Order, { status: string; tracking_number?: string }>({
    method: 'put', // Using PUT or PATCH based on API convention
    url: `/orders/${id}`,
    key: ['orders'], // Invalidates lists
    onSuccessCallback: onSuccess,
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