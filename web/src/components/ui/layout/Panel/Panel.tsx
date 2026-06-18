import type { ReactNode } from 'react';
import { cn } from '@/utils/style';

type PanelProps = {
  children: ReactNode;
  title?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function Panel({ children, title, actions, className }: PanelProps) {
  return (
    <section className={cn('panel', className)}>
      {(title || actions) && (
        <header className="panel__header">
          {title && <h2 className="panel__title">{title}</h2>}
          {actions && <div>{actions}</div>}
        </header>
      )}
      <div className="panel__body">{children}</div>
    </section>
  );
}
