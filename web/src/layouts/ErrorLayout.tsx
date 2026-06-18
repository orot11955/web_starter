import type { ReactNode } from 'react';

export function ErrorLayout({ children }: { children: ReactNode }) {
  return <div className="public-layout">{children}</div>;
}
