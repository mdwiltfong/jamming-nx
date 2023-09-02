import Lists from './Lists';
import Logo from './Logo';
import SearchBar from './SearchBar';
import { useAuth } from './customHooks/useAuth';

export function SearchPage() {
  const { user } = useAuth();
  if (!user) {
    return <h1>Not logged in</h1>;
  }
  return (
    <>
      <h1>Jamming App</h1>
      <Logo />
      <SearchBar />
      <Lists />
    </>
  );
}
