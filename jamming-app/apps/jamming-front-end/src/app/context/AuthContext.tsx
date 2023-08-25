import React from 'react';
import { User } from '../helper_functions/APIHandler';

const AuthContext = React.createContext<User | null>(null);

export default AuthContext;
