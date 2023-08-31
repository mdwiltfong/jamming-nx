import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../helper_functions/APIHandler';
import { useFetchUser } from './useFetchUser';
interface AuthUserContext {
  user: User | null;
  login?: (user: User) => void;
  logout?: () => void;
}
const AuthContext = createContext<AuthUserContext>({
  user: null,
});

export const AuthProvider: React.FC<PropsWithChildren> = (
  props: PropsWithChildren
) => {
  const { user, setUser } = useFetchUser();
  const navigate = useNavigate();
  const authUserContext = {
    user: user,
    login: (user: User) => {
      setUser(user);
      navigate('/');
    },
    logout: () => {
      setUser(null);
      navigate('/login');
    },
  };

  console.log(authUserContext);
  return (
    <AuthContext.Provider value={authUserContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
