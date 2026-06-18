import { createContext } from 'react';
import type { ConfirmContextValue } from '@/types/confirm';

export const ConfirmContext = createContext<ConfirmContextValue | null>(null);
