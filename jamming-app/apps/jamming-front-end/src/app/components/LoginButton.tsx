import { Button } from '@mui/material';
import React from 'react';

interface ILoginButton {
  title: string;
  icon: React.ReactNode;
}

export const LoginButton: React.FC<ILoginButton> = ({ icon, title }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click');
  };
  return (
    <>
      <Button
        href="http://localhost:4000/auth/login"
        onClick={handleClick}
        startIcon={icon}
        sx={{
          height: '40px',
          width: 'auto',
          border: '1px solid black',
          display: 'flex',
          justifyContent: 'flex-start',
          color: 'black',
        }}
      >
        Continue with {title}
      </Button>
    </>
  );
};
