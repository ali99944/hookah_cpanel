import { type GlobalSettings } from '../types';
import { useGetQuery, useMutationAction } from '../../../core/hooks/queries-actions';


// --- GET SETTINGS ---
export const useSettings = () => {
  return useGetQuery<GlobalSettings>({
    key: ['global_settings'],
    url: '/settings',
  });
};

// --- UPDATE GLOBAL SETTINGS (Generic) ---
export const useUpdateSettings = (onSuccess?: () => void) => {
  return useMutationAction<GlobalSettings, Partial<GlobalSettings>>({
    method: 'post',
    url: '/settings',
    onSuccessCallback: onSuccess
  });
}

// --- MANAGER PROFILE UPDATES (Specific Endpoints) ---
export const useUpdateProfile = (onSuccess?: () => void) => {
  return useMutationAction({
    method: 'put',
    url: '/admin/profile',
    onSuccessCallback: onSuccess
  });
};

export const useUpdatePassword = (onSuccess?: () => void) => {
  return useMutationAction({
    method: 'put',
    url: '/admin/password',
    onSuccessCallback: onSuccess
  });
};