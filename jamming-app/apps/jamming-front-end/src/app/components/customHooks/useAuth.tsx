import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import APIHandler, { User } from '../../helper_functions/APIHandler';
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
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await APIHandler.getCurrentSession();
        const user = response as User;
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, [user]);
  const navigate = useNavigate();
  const authUserContext = {
    user,
    login: (user: User) => {
      setUser(user);
      navigate('/');
    },
    logout: () => {
      setUser(null);
      navigate('/');
    },
  };

  return (
    <AuthContext.Provider value={authUserContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
