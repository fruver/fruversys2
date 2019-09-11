import * as React from 'react';
import {User} from '../api/Auth/types';

// RootContext
export interface RootContext {
  user?: User; 
  signin?: any;
  signup?: any;
  signout?: any;
  isLoading: boolean;
}

// Initial State
export const initialState = {
  isLoading: true
};

// Create Context AuthContext
export const AuthContext = React.createContext<RootContext>(initialState);