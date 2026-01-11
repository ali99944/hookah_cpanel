import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode } from 'react';
import { NotificationProvider } from './notification-provider';
// import { ReduxProvider } from './redux-provider';
// import { NotificationProvider } from './notification-provider';

interface AppProviderProps {
    children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});


export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    return (
        // <ReduxProvider>
            <NotificationProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </NotificationProvider>
        // </ReduxProvider>
    );
};