import { Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import { createContext, useEffect, useState } from 'react';
import APIHandler, { User } from './helper_functions/APIHandler';
interface AuthUserContext {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthUserContext>({
  user: null,
  login: (user: User) => {},
  logout: () => {},
});
function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await APIHandler.getCurrentSession();
        const loggedInUser = response;
        setUser(loggedInUser);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    if (!user) {
      fetchUser();
    }
  }, [user]);
  const navigate = useNavigate();
  const authUserContext = {
    user,
    login: (user: User) => {
      setUser(user);
      navigate('/');
    },
    logout: async () => {
      setUser(null);
      const response = await APIHandler.logout();
      console.log(response);
      navigate('/login');
    },
  };
  console.log(authUserContext);
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <AuthContext.Provider value={authUserContext}>
          <NavBar />
          <Container
            maxWidth="xl"
            disableGutters
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '50% 25%',
              height: '1024px',
              width: '1024px',
            }}
          >
            <Outlet />
          </Container>
        </AuthContext.Provider>
      )}
    </>
  );
}

export default App;
