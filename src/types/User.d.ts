export interface User {
  created_at: string;
  email: string;
  id: number;
  isAdmin: boolean;
  remember_me_token: string | null;
  role_id: number;
  token: UserToken;
  updated_at: string;
  password: string;
  password_confirmation: string;
}

interface UserToken {
  type: string;
  token: string;
}

// AUTH

export type UserRegisterDTO = Pick<
  User,
  "email" | "password" | "password_confirmation"
>;

export type UserLoginDTO = Pick<User, "email" | "password">;

interface UserAuthResponse {
  created_at: string;
  email: string;
  id: number;
  isAdmin: boolean;
  token: UserToken;
  updated_at: string;
  role_id?: number;
  remember_me_token?: string;
}
