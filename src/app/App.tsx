import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from './providers/toast-provider';
import { router } from './providers/router';

export const App = () => {
  return (
    <>
      <ToastProvider />
      <RouterProvider router={router} />
    </>
  );
};
