import { post } from './client';

export type SignInResponse = { accessToken: string; tokenType: string };

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
  roles?: string[];
};

export const signIn = (data: SignInRequest) => post<SignInResponse>('/api/auth/signin', data);
export const signUp = (data: SignUpRequest) => post<{ message: string; email: string }>('/api/auth/signup', data);
