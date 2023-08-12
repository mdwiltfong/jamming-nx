import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
export default function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      alert('Login successful');
    },
  });
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid black',
          p: 1,
        }}
      >
        <Box component={'form'} autoComplete="off">
          <TextField
            label="Email"
            value={formik.values.email}
            defaultValue="Email"
            className="outlined-required"
            required
          />
        </Box>
        <p>Login Page</p>
      </Container>
    </>
  );
}
