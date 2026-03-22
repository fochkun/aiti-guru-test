// src/features/auth-by-login/ui/login-form.tsx
import { clsx } from 'clsx';

export interface LoginFormUIProps {
  fields: {
    username: { value: string; onChange: (v: string) => void; error?: string };
    password: { value: string; onChange: (v: string) => void; error?: string };
    remember: { checked: boolean; onChange: (v: boolean) => void };
  };
  onSubmit: () => void;
  isLoading: boolean;
  formError?: string;
}

export const LoginFormUI = ({
  fields,
  onSubmit,
  isLoading,
  formError,
}: LoginFormUIProps) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} noValidate className="space-y-5">
      {formError && (
        <div role="alert" className="p-3 text-sm text-red-600 bg-red-50 rounded border border-red-200">
          {formError}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          id="username"
          type="text"
          value={fields.username.value}
          onChange={(e) => fields.username.onChange(e.target.value)}
          disabled={isLoading}
          className={clsx(
            'block w-full rounded-md border px-3 py-2 shadow-sm sm:text-sm',
            fields.username.error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          )}
        />
        {fields.username.error && <p className="text-sm text-red-600" role="alert">{fields.username.error}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          value={fields.password.value}
          onChange={(e) => fields.password.onChange(e.target.value)}
          disabled={isLoading}
          className={clsx(
            'block w-full rounded-md border px-3 py-2 shadow-sm sm:text-sm',
            fields.password.error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          )}
        />
        {fields.password.error && <p className="text-sm text-red-600" role="alert">{fields.password.error}</p>}
      </div>

      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          checked={fields.remember.checked}
          onChange={(e) => fields.remember.onChange(e.target.checked)}
          disabled={isLoading}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600"
        />
        <label htmlFor="remember" className="ml-2 text-sm text-gray-900">Remember me</label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={clsx(
          'w-full rounded-md px-3 py-2 text-sm font-semibold text-white',
          isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'
        )}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
};