import type { ReactNode } from 'react';
import { Button } from '../../Button/Button';

type DrawerProps = {
  open: boolean;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
};

export function Drawer({ open, title, children, footer, onClose }: DrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="overlay" role="presentation">
      <aside className="drawer" role="dialog" aria-modal="true">
        <header className="drawer__header">
          <h2 className="panel__title">{title}</h2>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </header>
        <div className="drawer__body">{children}</div>
        {footer && <footer className="drawer__footer">{footer}</footer>}
      </aside>
    </div>
  );
}
