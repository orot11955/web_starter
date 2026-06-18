import type { ReactNode } from 'react';
import { Header } from '@/components/navigation/Header';
import { Sidebar } from '@/components/navigation/Sidebar';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-layout">
      <Header />
      <Sidebar />
      <div className="app-layout__content">{children}</div>
    </div>
  );
}
