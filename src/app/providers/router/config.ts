import type { RouteObject } from 'react-router-dom'
import { AuthPage } from '../../../pages/auth/ui/AuthPage'
import { ProductsPage } from '../../../pages/products/ui/ProductsPage'
import { NotFoundPage } from '../../../pages/not-found/ui/NotFoundPage'

export const routes: RouteObject[] = [
  {
    path: '/login',
    Component: AuthPage,
  },
  {
    path: '/',
    Component: ProductsPage, 
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]
