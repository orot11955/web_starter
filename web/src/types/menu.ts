import type { ReactNode } from 'react';

export type MenuItem = {
  path: string;
  label: string;
  icon?: ReactNode;
  active?: boolean;
};