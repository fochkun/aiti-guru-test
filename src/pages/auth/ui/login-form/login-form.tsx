import { useForm } from 'react-hook-form';

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log('Login attempt:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div role="alert" aria-live="polite">
      </div>

      <div>
        <label htmlFor="username">
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          {...register('username')}
        />
        {errors.username && (
          <span role="alert">
            {errors.username.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="password">
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
        />
        {errors.password && (
          <span role="alert">
            {errors.password.message}
          </span>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            {...register('remember')}
          />
        </label>
      </div>
      <button type="submit" disabled={isSubmitting}>
      </button>
    </form>
  );
};