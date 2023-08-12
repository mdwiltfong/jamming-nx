import { Container } from '@mui/material';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import Lists from './components/Lists';
function App() {
  return (
    <>
      <h1>Jamming App</h1>
      <Logo />
      <SearchBar />
      <Lists />
    </>
  );
}

export default App;
