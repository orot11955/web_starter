import type { ReactNode } from 'react';
import { cn } from '@/utils/style';

type PageProps = {
  children: ReactNode;
  className?: string;
};

export function Page({ children, className }: PageProps) {
  return <main className={cn('page', className)}>{children}</main>;
}
