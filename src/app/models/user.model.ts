export interface User {
  id: string;
  username: string;
  name: string;
  profile?: Profile;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  street: string;
  city: string;
  district: string;
  zip_code: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  token: string;
  new_password: string;
}

export interface MessageResponse {
  message: string;
}