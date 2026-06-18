import type { ReactNode } from 'react';

export function PublicLayout({ children }: { children: ReactNode }) {
  return <div className="public-layout">{children}</div>;
}
