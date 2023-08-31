import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { LoginButton } from './LoginButton';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { LibraryMusic as SpotifyIcon } from '@mui/icons-material';
import { AuthProvider } from './customHooks/useAuth';
export default function LoginPage() {
  return (
    <>
      <Container maxWidth="sm">
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid black',
            borderRadius: '20px',
            minHeight: '400px',
            p: 1,
          }}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '16px',
              width: '300px',
            }}
          >
            <h1>Hey! Welcome</h1>
            <LoginButton title={'YouTube'} icon={<YouTubeIcon />} />
            <LoginButton title={'Spotify'} icon={<SpotifyIcon />} />
          </Container>
        </Box>
      </Container>
    </>
  );
}
