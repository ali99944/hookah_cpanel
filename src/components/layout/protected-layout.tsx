import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { clearAuthSession, getAuthToken } from '../../core/lib/auth';
import { useValidateSession } from '../../features/auth/hooks/use-auth';

interface ProtectedLayoutProps {
    children: React.ReactNode
}

export const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const location = useLocation();
  const token = getAuthToken();

  const { isLoading, isError } = useValidateSession(token);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // CUSTOM ARABIC LOADER
  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden" dir="rtl">
        
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Custom Spinner / Brand Icon */}
          <div className="relative w-16 h-16 flex items-center justify-center">
             {/* Outer Ring */}
             <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
             {/* Spinning Arc */}
             <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
             
             {/* Center Brand Dot */}
             <div className="w-3 h-3 bg-primary rotate-45 animate-pulse" />
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-text-primary font-cairo tracking-wide">
              نوبل
            </h3>
            <p className="text-sm text-text-muted font-medium animate-pulse">
              جاري التحقق من الصلاحيات...
            </p>
          </div>
        </div>

      </div>
    );
  }

  if (isError) {
    clearAuthSession();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};