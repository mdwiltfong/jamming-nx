import { Avatar, Container } from '@mui/material';
import { useAuth } from './customHooks/useAuth';

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <Container maxWidth="sm">
        <h1>Profile</h1>
        <Avatar
          alt={user?.displayName}
          src={user?.photos[1].value}
          sx={{ width: 200, height: 200 }}
        />
        <h2>{user?.displayName}</h2>
      </Container>
    </>
  );
}
