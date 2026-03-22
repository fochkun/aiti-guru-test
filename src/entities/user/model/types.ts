export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse extends User, AuthTokens {}

export interface LoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number;
}
