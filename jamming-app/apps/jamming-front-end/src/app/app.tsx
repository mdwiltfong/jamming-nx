import { Container } from '@mui/material';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import Lists from './components/Lists';
function App() {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid black',
          backgroundImage: "url('./assets/music_background.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50% 25%',
          height: '1024px',
          width: '1024px',
          mx: 'auto',
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
