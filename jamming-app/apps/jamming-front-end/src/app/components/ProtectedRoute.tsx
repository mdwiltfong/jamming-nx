import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './customHooks/useAuth';

export const ProtectedRoute: React.FC<PropsWithChildren> = (
  props: PropsWithChildren
) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <>{props.children}</>;
};
