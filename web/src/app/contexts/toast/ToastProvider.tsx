import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { ToastViewport } from '@/components/feedback/ToastViewport';
import type { ToastItem, ToastType } from '@/types/toast';
import { ToastContext } from './ToastContext';

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((items) => items.filter((item) => item.id !== id));
  }, []);

  const show = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = crypto.randomUUID();
      setToasts((items) => [...items, { id, type, message }]);
      window.setTimeout(() => remove(id), 3000);
    },
    [remove],
  );

  const value = useMemo(
    () => ({
      toasts,
      show,
      success: (message: string) => show(message, 'success'),
      error: (message: string) => show(message, 'error'),
      remove,
    }),
    [toasts, show, remove],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}
