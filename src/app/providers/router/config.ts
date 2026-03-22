import type { RouteObject } from 'react-router-dom'
import { AuthPage } from '../../../pages/auth/ui/auth-page'
import { ProductsPage } from '../../../pages/products/ui/products-page'
import { NotFoundPage } from '../../../pages/not-found/ui/not-found-page'

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
