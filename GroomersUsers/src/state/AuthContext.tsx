import React, { createContext, useContext, useMemo, useState } from 'react';
import { setAuthToken } from '../api/client';
import { signIn, signUp, SignInRequest, SignUpRequest } from '../api/auth';

type AuthContextValue = {
  token: string | null;
  login: (req: SignInRequest) => Promise<void>;
  register: (req: SignUpRequest) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = async (req: SignInRequest) => {
    const res = await signIn(req);
    setToken(res.accessToken);
    setAuthToken(res.accessToken);
  };

  const register = async (req: SignUpRequest) => {
    await signUp(req);
  };

  const logout = () => {
    setToken(null);
    setAuthToken(null);
  };

  const value = useMemo(() => ({ token, login, register, logout }), [token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthContext not found');
  return ctx;
};
