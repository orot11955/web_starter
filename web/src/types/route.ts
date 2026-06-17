import type { ReactNode } from 'react';
import type { Permission, Role } from './auth';

export type RouteLayout = 'public' | 'app' | 'error';

export type AppRoute = {
  path: string;
  element: ReactNode;
  layout?: RouteLayout;
  auth?: boolean;
  roles?: Role[];
  permissions?: Permission[];
  menu?: {
    label: string;
    order?: number;
    icon?: ReactNode;
  };
};