import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { LoginButton } from './LoginButton';
import YouTubeIcon from '@mui/icons-material/YouTube';
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
              justifyContent: 'space-between',
            }}
          >
            <LoginButton title={'Spotify'} />
            <LoginButton title={'YouTube'} />
          </Container>
        </Box>
      </Container>
    </>
  );
}
