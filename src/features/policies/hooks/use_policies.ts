import { useGetQuery, useMutationAction } from "../../../core/hooks/queries-actions";
import type { Policy } from "../types";

// --- GET ALL ---
export const usePolicies = () => {
  return useGetQuery<Policy[]>({
    key: ['policies'],
    url: '/policies',
  });
};

// --- GET SINGLE ---
export const usePolicy = (key: string | undefined) => {
  return useGetQuery<Policy>({
    key: ['policies', key],
    url: `/policies/${key}`,
    options: { enabled: !!key }
  });
};

// --- UPDATE ---
export const useUpdatePolicy = (key: string, onSuccess?: () => void) => {
  return useMutationAction({
    method: 'put',
    url: `/policies/${key}`,
    key: ['policies'],
    onSuccessCallback: onSuccess,
  });
};