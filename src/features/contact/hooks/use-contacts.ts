import { useGetQuery, useMutationAction } from '../../../core/hooks/queries-actions';
import type { ContactFilters, ContactMessage } from '../types';

// --- GET MESSAGES ---
export const useContactMessages = (filters?: ContactFilters) => {
  return useGetQuery<ContactMessage[]>({
    key: ['contact_requests', filters],
    url: '/contact-requests',
    // In real app, pass params: filters
  });
};

// --- DELETE MESSAGE ---
export const useDeleteMessage = (id: number | null, onSuccess?: () => void) => {
  return useMutationAction({
    method: 'delete',
    url: `/contact-requests/${id}`,
    onSuccessCallback: onSuccess,
    key: ['contact_requests'],
  });
};
