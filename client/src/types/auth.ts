export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  email: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: AuthUser;
  };
};