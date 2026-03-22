import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import type { AuthStore, LoginResponse } from './types';
import { authStorage } from './auth-storage';

const ACCESS_TOKEN_LIFETIME = 60 * 60 * 1000;
const REFRESH_TOKEN_LIFETIME = 7 * 24 * 60 * 60 * 1000;

const initialState: Omit<AuthStore, keyof AuthActions> = {
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  image: '',
  accessToken: '',
  refreshToken: '',
  accessTokenExpiresAt: 0,
  refreshTokenExpiresAt: 0,
  remember: false,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      initialize: () => {
        const { accessToken, accessTokenExpiresAt } = get();
        if (accessToken && Date.now() < accessTokenExpiresAt) {
          set({ isAuthenticated: true });
        } else {
          get().logout();
        }
      },

      login: (data: LoginResponse, remember: boolean) => {
        const now = Date.now();
        set({
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          image: data.image,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          accessTokenExpiresAt: now + ACCESS_TOKEN_LIFETIME,
          refreshTokenExpiresAt: now + REFRESH_TOKEN_LIFETIME,
          remember,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set(initialState);
        toast.error('РЎРµСЃСЃРёСЏ РёСЃС‚РµРєР»Р°', {
          description: 'РџРѕР¶Р°Р»СѓР№СЃС‚Р°, Р°РІС‚РѕСЂРёР·СѓР№С‚РµСЃСЊ Р·Р°РЅРѕРІРѕ',
        });
      },

      isAccessTokenExpired: () => {
        const { accessTokenExpiresAt } = get();
        return Date.now() >= accessTokenExpiresAt;
      },

      isRefreshTokenExpired: () => {
        const { refreshTokenExpiresAt } = get();
        return Date.now() >= refreshTokenExpiresAt;
      },

      getAccessToken: () => {
        const { accessToken, isAuthenticated } = get();
        return isAuthenticated ? accessToken : null;
      },

      refreshTokens: async () => {
        const { refreshToken, isRefreshTokenExpired } = get();

        if (isRefreshTokenExpired()) {
          return false;
        }

        try {
          const response = await fetch('https://dummyjson.com/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          if (!response.ok) {
            throw new Error('Refresh failed');
          }

          const data = await response.json();
          const now = Date.now();

          set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            accessTokenExpiresAt: now + ACCESS_TOKEN_LIFETIME,
            refreshTokenExpiresAt: now + REFRESH_TOKEN_LIFETIME,
          });

          return true;
        } catch (error) {
          console.error('Token refresh failed:', error);
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: authStorage,
      partialize: (state) => ({
        id: state.id,
        username: state.username,
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
        gender: state.gender,
        image: state.image,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        accessTokenExpiresAt: state.accessTokenExpiresAt,
        refreshTokenExpiresAt: state.refreshTokenExpiresAt,
        remember: state.remember,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
