import { useNavigate } from 'react-router-dom';
import { useGetQuery, useMutationAction } from '../../../core/hooks/queries-actions';
import type { LoginFormValues } from '../schema/login_schema';
import { useNotification } from '../../../core/hooks/use-notification';
import { clearAuthSession, saveAuthToken } from '../../../core/lib/auth';
import type { ManagerProfile } from '../types/manager';

interface LoginResponse {
    access_token: string;
    manager: {
        id: string;
        name: string;
        email: string;
        role: 'admin';
    };
}


export const useAdminLogin = () => {
  const navigate = useNavigate();
  const { notify } = useNotification()

  return useMutationAction<LoginResponse, LoginFormValues>({
    method: 'post',
    url: '/auth/managers/login',
    onSuccessCallback: async (data) => {
      saveAuthToken(data.access_token);
      localStorage.setItem('manager', JSON.stringify(data.manager));
      
      navigate('/');
    },
    onErrorCallback: (error) => {
      console.error("Login Failed:", error)
      notify.error(error.response.data.error.message)
    }
  });
};

export const useValidateSession = (token: string | null) => {

  return useGetQuery<ManagerProfile>({
    key: ['auth', 'me'],
    url: '/auth/managers/me',
    options: {
      enabled: !!token,
      retry: false, // Fail immediately if 401/403
      refetchOnWindowFocus: false,
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { notify } = useNotification();

  return () => {
    clearAuthSession()
    localStorage.removeItem('manager');
    notify.success('Logged out successfully');
    navigate('/login');
  }
}