import { LoginForm } from './login-form';

export const AuthPage = () => {
  return (
    <main>
      {/* Контейнер центрирования формы */}
      <div>
        {/* TODO: логотип/заголовок приложения */}
        <header>
          <h1>
            {/* TODO: текст заголовка из макета */}
          </h1>
        </header>

        {/* Карточка формы */}
        <div>
          <LoginForm />
        </div>

        {/* TODO: футер/доп. ссылки (если есть в макете) */}
        <footer>
          {/* Например: "Нет аккаунта? Свяжитесь с администратором" */}
        </footer>
      </div>
    </main>
  );
};