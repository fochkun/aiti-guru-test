import type { RouteObject } from 'react-router-dom';
import { AuthPage } from '../../../pages/auth/';
import { ProductsPage } from '../../../pages/products/';
import { NotFoundPage } from '../../../pages/not-found/';
import { ProtectedRoute } from './protected-route';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <ProductsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
