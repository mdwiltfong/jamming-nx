import { Container } from '@mui/material';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import Lists from './components/Lists';
import { useEffect, useState } from 'react';
import AuthContext from './context/AuthContext';
import APIHandler, { User } from './helper_functions/APIHandler';

function App() {
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
  }, []);
  return (
    <>
      <AuthContext.Provider value={user as User}>
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
          <h1>Jamming App</h1>
          <Logo />
          <SearchBar />
          <Lists />
        </Container>
      </AuthContext.Provider>
    </>
  );
}

export default App;
