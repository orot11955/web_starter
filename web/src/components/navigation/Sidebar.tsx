import { NavLink, useLocation } from 'react-router-dom';
import { appRoutes } from '@/app/routes/routeConfig';
import { useAuth } from '@/hooks/useAuth';
import { getVisibleMenus, isActiveMenu } from '@/utils/menu';

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const menus = getVisibleMenus(appRoutes, user);

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav" aria-label="Main menu">
        {menus.map((menu) => {
          const active = isActiveMenu(location.pathname, menu.path);

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={active ? 'sidebar__link sidebar__link--active' : 'sidebar__link'}
            >
              {menu.icon}
              <span>{menu.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
