import { Button, Container } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import APIHandler, {
  User,
  loginCredentials,
} from '../helper_functions/APIHandler';
export default function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const response = await APIHandler.login<User>(values as loginCredentials);
      console.log(response);
    },
  });
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
            p: 1,
          }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            required
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            required
          />
          <Button type="submit" variant="contained">
            {' '}
            Submit{' '}
          </Button>
        </Box>
      </Container>
    </>
  );
}
