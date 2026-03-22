import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../model/use-login';
import { loginSchema, type LoginFormData } from '../lib/validation';
import { LoginFormUI } from './login-form';

export const LoginFormContainer = () => {
  const navigate = useNavigate();
  const { submit, isLoading } = useLogin();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '', remember: false },
  });

  const { field: usernameField } = useController({ name: 'username', control });
  const { field: passwordField } = useController({ name: 'password', control });
  const { field: rememberField } = useController({ name: 'remember', control });

  const onSubmit = async (data: LoginFormData) => {
    const result = await submit(
      { username: data.username, password: data.password },
      data.remember ?? false
    );

    if (result.success) {
      navigate('/');
    } else {
      setError('root', { type: 'server', message: result.error });
    }
  };

  // 👇 Маппим в простые пропсы для UI
  const fields = {
    username: {
      value: usernameField.value,
      onChange: usernameField.onChange,
      error: errors.username?.message,
    },
    password: {
      value: passwordField.value,
      onChange: passwordField.onChange,
      error: errors.password?.message,
    },
    remember: {
      checked: rememberField.value ?? false,
      onChange: rememberField.onChange,
    },
  };

  return (
    <LoginFormUI
      fields={fields}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
      formError={errors.root?.message}
    />
  );
};