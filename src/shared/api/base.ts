import { useAuthStore } from '../../entities/user';

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface RequestOptions extends RequestInit {
  baseURL?: string;
  skipAuth?: boolean;
}

export class ApiClient {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com';
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { baseURL = this.baseURL, headers = {}, signal, skipAuth, ...restOptions } = options;

    let accessToken: string | null = null;
    if (!skipAuth) {
      const store = useAuthStore.getState();
      
      if (store.isAccessTokenExpired()) {
        const refreshed = await store.refreshTokens();
        if (!refreshed) {
          store.logout();
          throw new ApiError(401, 'Session expired');
        }
      }

      accessToken = store.getAccessToken();
    }

    const response = await fetch(`${baseURL}${endpoint}`, {
      ...restOptions,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && !skipAuth && { Authorization: `Bearer ${accessToken}` }),
        ...headers,
      },
      signal,
      // credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.message || `HTTP ${response.status}`,
        data
      );
    }

    return data;
  }

  public get public() {
    return {
      get: <T>(endpoint: string, options?: RequestOptions) =>
        this.request<T>(endpoint, { ...options, skipAuth: true, method: 'GET' }),
      
      post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
        this.request<T>(endpoint, { ...options, skipAuth: true, method: 'POST', body: JSON.stringify(body) }),
    };
  }

  public get private() {
    return {
      get: <T>(endpoint: string, options?: RequestOptions) =>
        this.request<T>(endpoint, { ...options, skipAuth: false, method: 'GET' }),
      
      post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
        this.request<T>(endpoint, { ...options, skipAuth: false, method: 'POST', body: JSON.stringify(body) }),
    };
  }
}

export const api = new ApiClient();
