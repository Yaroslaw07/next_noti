export interface AuthApiResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

export type AuthStatuses = "loading" | "authenticated" | "unauthenticated";
