import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { ConfirmDialog } from '@/components/feedback/ConfirmDialog';
import type { ConfirmOptions, ConfirmState } from '@/types/confirm';
import { ConfirmContext } from './ConfirmContext';

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfirmState | null>(null);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    setState({ ...options, open: true });

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const resolve = useCallback((value: boolean) => {
    resolverRef.current?.(value);
    resolverRef.current = null;
    setState(null);
  }, []);

  const contextValue = useMemo(() => ({ state, confirm, resolve }), [state, confirm, resolve]);

  return (
    <ConfirmContext.Provider value={contextValue}>
      {children}
      <ConfirmDialog />
    </ConfirmContext.Provider>
  );
}
