import type { ReactNode } from 'react';
import { Button } from '../../Button/Button';

type ModalProps = {
  open: boolean;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
};

export function Modal({ open, title, children, footer, onClose }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="overlay" role="presentation">
      <section className="modal" role="dialog" aria-modal="true">
        <header className="modal__header">
          <h2 className="panel__title">{title}</h2>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </header>
        <div className="modal__body">{children}</div>
        {footer && <footer className="modal__footer">{footer}</footer>}
      </section>
    </div>
  );
}
