import type { ReactNode } from 'react';

export type TableAlign = 'left' | 'center' | 'right';

export type DataTableColumn<T> = {
  key: string;
  title: ReactNode;
  width?: string;
  align?: TableAlign;
  render?: (row: T, index: number) => ReactNode;
};

export type SortDirection = 'asc' | 'desc';

export type TableSort = {
  key: string;
  direction: SortDirection;
};