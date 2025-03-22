export type SignUpData = {
  email: string;
  password: string;
};

export type SignInData = {
  email: string;
  password: string;
};

export type AuthState = {
  isLoading: boolean;
  error: string | null;
};
