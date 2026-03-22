import { createJSONStorage } from 'zustand/middleware';
import type { AuthState } from './types';

const STORAGE_KEY = 'auth-storage';

interface PersistedState {
  state: AuthState;
  version: number;
}

export const authStorage = createJSONStorage<AuthState>(() => ({
  getItem: (name): PersistedState | null => {
    try {
      const local = localStorage.getItem(name);
      if (local) {
        return JSON.parse(local);
      }

      const session = sessionStorage.getItem(name);
      if (session) {
        return JSON.parse(session);
      }

      return null;
    } catch (error) {
      console.error('Failed to get auth item from storage:', error);
      return null;
    }
  },

  setItem: (name, newValue): void => {
    try {
      const parsed = newValue as PersistedState;
      const remember = parsed.state?.remember ?? false;

      localStorage.removeItem(name);
      sessionStorage.removeItem(name);

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(name, JSON.stringify(newValue));
    } catch (error) {
      console.error('Failed to set auth item in storage:', error);
    }
  },

  removeItem: (name): void => {
    try {
      localStorage.removeItem(name);
      sessionStorage.removeItem(name);
    } catch (error) {
      console.error('Failed to remove auth item from storage:', error);
    }
  },
}));
