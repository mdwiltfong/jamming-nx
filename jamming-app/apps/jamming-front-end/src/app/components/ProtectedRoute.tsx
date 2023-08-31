import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../app';

export const ProtectedRoute: React.FC<PropsWithChildren> = (
  props: PropsWithChildren
) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  if (!user) return <Navigate to="/login" />;
  return <>{props.children}</>;
};
