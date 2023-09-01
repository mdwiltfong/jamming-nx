import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../app';

export const ProtectedRoute: React.FC<PropsWithChildren> = (
  props: PropsWithChildren
) => {
  const authContext = useContext(AuthContext);
  console.log(authContext);
  if (authContext.user == null) return <Navigate to="/login" />;
  return <>{props.children}</>;
};
