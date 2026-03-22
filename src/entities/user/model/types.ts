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
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
}

export interface LoginResponse extends User, AuthTokens {}

export interface LoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface AuthState extends User, AuthTokens {
  remember: boolean;
  isAuthenticated: boolean;
}

export interface AuthActions {
  login: (data: LoginResponse, remember: boolean) => void;
  logout: () => void;
  initialize: () => void;
  refreshTokens: () => Promise<boolean>;
  isAccessTokenExpired: () => boolean;
  isRefreshTokenExpired: () => boolean;
  getAccessToken: () => string | null;
}

export type AuthStore = AuthState & AuthActions;
