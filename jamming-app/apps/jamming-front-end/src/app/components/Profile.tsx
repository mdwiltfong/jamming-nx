import { Container } from '@mui/material';
import { useAuth } from './customHooks/useAuth';

export default function Profile() {
  const authUserContext = useAuth();

  return (
    <>
      <Container maxWidth="sm">
        <h1>Profile</h1>
      </Container>
    </>
  );
}
