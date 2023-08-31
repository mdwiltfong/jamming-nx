import { useEffect, useState } from 'react';
import APIHandler, { User } from '../../helper_functions/APIHandler';

type UseFetchReturnType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const useFetchUser = (): UseFetchReturnType => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await APIHandler.getCurrentSession();
        const loggedInUser = response as User;
        setUser(loggedInUser);
      } catch (error) {
        console.error(error);
      }
    };
    if (!user) {
      fetchUser();
    }
  }, [user]);
  console.log(user);
  return { user, setUser };
};
