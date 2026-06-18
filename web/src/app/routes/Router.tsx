import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { AppLayout } from '@/layouts/AppLayout';
import { ErrorLayout } from '@/layouts/ErrorLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import type { AppRoute } from '@/types/route';
import { appRoutes } from './routeConfig';

function withLayout(route: AppRoute) {
  let element = route.element;

  if (route.auth) {
    element = (
      <RequireAuth roles={route.roles} permissions={route.permissions}>
        {element}
      </RequireAuth>
    );
  }

  if (route.layout === 'app') {
    return <AppLayout>{element}</AppLayout>;
  }

  if (route.layout === 'error') {
    return <ErrorLayout>{element}</ErrorLayout>;
  }

  return <PublicLayout>{element}</PublicLayout>;
}

const router = createBrowserRouter(
  appRoutes.map((route) => ({
    path: route.path,
    element: withLayout(route),
  })),
);

export function AppRouter() {
  return <RouterProvider router={router} />;
}