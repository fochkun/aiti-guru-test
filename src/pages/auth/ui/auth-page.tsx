import { LoginForm } from '../../../features/auth-by-login';

export const AuthPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Aiti Guru Admin</h1>
          <p className="text-sm text-gray-600">Sign in to continue</p>
        </div>
        <div className="rounded-lg bg-white p-8 shadow">
          <LoginForm />
        </div>
      </div>
    </main>
  );
};