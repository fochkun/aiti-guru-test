import { useState } from 'react';
import { api } from '../../../shared/api';
import type { LoginCredentials, LoginResponse } from '../../../entities/user';
import { useAuthStore } from '../../../entities/user';

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (credentials: LoginCredentials, remember: boolean) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await api.post<LoginResponse>('/auth/login', credentials);
      
      login({ ...data, remember });
      
      return { success: true as const };
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Login failed';
      setError(message);
      return { success: false as const, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, error };
};