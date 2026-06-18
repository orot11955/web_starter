import { routePath } from '@/app/config/constants';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ServerErrorPage } from '@/pages/ServerErrorPage';
import { UsersPage } from '@/pages/UsersPage';
import type { AppRoute } from '@/types/route';

export const appRoutes: AppRoute[] = [
  {
    path: routePath.home,
    element: <HomePage />,
    layout: 'app',
    auth: true,
    menu: {
      label: 'Home',
      order: 1,
    },
  },
  {
    path: routePath.users,
    element: <UsersPage />,
    layout: 'app',
    auth: true,
    permissions: ['USER_READ'],
    menu: {
      label: 'Users',
      order: 10,
    },
  },
  {
    path: routePath.login,
    element: <LoginPage />,
    layout: 'public',
  },
  {
    path: routePath.forbidden,
    element: <ForbiddenPage />,
    layout: 'error',
  },
  {
    path: routePath.serverError,
    element: <ServerErrorPage />,
    layout: 'error',
  },
  {
    path: '*',
    element: <NotFoundPage />,
    layout: 'error',
  },
];
