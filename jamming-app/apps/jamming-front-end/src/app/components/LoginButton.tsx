import { Button } from '@mui/material';
import React from 'react';
import { YouTube } from '@mui/icons-material';

interface ILoginButton {
  title: string;
  icon: React.ReactNode;
}

export const LoginButton: React.FC<ILoginButton> = ({ icon }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click');
  };
  return (
    <>
      <Button
        type="submit"
        href="http://localhost:4000/auth/login"
        onClick={handleClick}
        startIcon={icon}
        sx={{
          border: '1px solid black',
        }}
      ></Button>
    </>
  );
};
function styled() {
  throw new Error('Function not implemented.');
}
