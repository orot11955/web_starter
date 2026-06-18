import type { ReactNode } from 'react';
import { AuthProvider } from '@/app/contexts/auth';
import { ThemeProvider } from '@/app/contexts/theme';
import { ToastProvider } from '@/app/contexts/toast';
import { ConfirmProvider } from '@/app/contexts/confirm';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ConfirmProvider>
          <AuthProvider>{children}</AuthProvider>
        </ConfirmProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}