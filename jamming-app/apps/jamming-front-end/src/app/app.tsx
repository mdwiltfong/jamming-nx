import { Container } from '@mui/material';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import Lists from './components/Lists';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          'http://localhost:4000/auth/current-session'
        );
        const json = await response.json();
        setUser(json);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, []);
  return (
    <>
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
    </>
  );
}

export default App;
