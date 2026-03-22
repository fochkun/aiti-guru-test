import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, AuthTokens, LoginResponse } from './types';

interface AuthState extends User, AuthTokens {
  isAuthenticated: boolean;
  login: (data: LoginResponse & { remember: boolean }) => void;
  logout: () => void;
}

const getStorage = (remember: boolean) => {
  return remember ? localStorage : sessionStorage;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      id: 0,
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      gender: '',
      image: '',
      accessToken: '',
      refreshToken: '',
      isAuthenticated: false,

      login: (data) => {
        const { remember, ...authData } = data;
        
        const storage = getStorage(remember);
        storage.setItem('auth_remember', String(remember));
        
        set({ ...authData, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem('auth-storage');
        localStorage.removeItem('auth_remember');
        sessionStorage.removeItem('auth-storage');
        set({
          isAuthenticated: false,
          accessToken: '',
          refreshToken: '',
          id: 0,
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          gender: '',
          image: '',
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => {
        const remember = localStorage.getItem('auth_remember') === 'true';
        return getStorage(remember);
      }),
    }
  )
);