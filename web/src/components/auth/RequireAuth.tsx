import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { routePath } from '@/app/config/constants';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { useAuth } from '@/hooks/useAuth';
import type { Permission, Role } from '@/types/auth';
import { canAccess } from '@/utils/permission';

type RequireAuthProps = {
  children: ReactNode;
  roles?: Role[];
  permissions?: Permission[];
};

export function RequireAuth({ children, roles, permissions }: RequireAuthProps) {
  const location = useLocation();
  const { user, loading, isLoggedIn } = useAuth();

  if (loading) {
    return <Spinner label="Checking login status..." />;
  }

  if (!isLoggedIn) {
    return <Navigate to={routePath.login} replace state={{ from: location }} />;
  }

  if (!canAccess(user, { roles, permissions })) {
    return <Navigate to={routePath.forbidden} replace />;
  }

  return <>{children}</>;
}
