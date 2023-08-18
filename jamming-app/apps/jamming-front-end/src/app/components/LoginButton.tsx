import { Button } from '@mui/material';
import React from 'react';
interface ILoginButton {
  title: string;
}

export const LoginButton: React.FC<ILoginButton> = (props) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click');
  };
  return (
    <>
      <Button
        type="submit"
        href="http://localhost:4000/auth/login"
        onClick={handleClick}
        sx={{
          border: '1px solid black',
        }}
      >
        {props.title}
      </Button>
    </>
  );
};
function styled() {
  throw new Error('Function not implemented.');
}
