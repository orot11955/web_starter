import type { AuthUser } from '@/types/auth';
import type { AppRoute } from '@/types/route';
import type { MenuItem } from '@/types/menu';
import { canAccess } from './permission';

export function getVisibleMenus(routes: AppRoute[], user: AuthUser | null): MenuItem[] {
  return routes
    .filter((route) => route.menu)
    .filter((route) => canAccess(user, route))
    .sort((a, b) => (a.menu?.order ?? 0) - (b.menu?.order ?? 0))
    .map((route) => ({
      path: route.path,
      label: route.menu!.label,
      icon: route.menu!.icon,
    }));
}

export function isActiveMenu(currentPath: string, menuPath: string) {
  if (menuPath === '/') {
    return currentPath === '/';
  }

  return currentPath.startsWith(menuPath);
}