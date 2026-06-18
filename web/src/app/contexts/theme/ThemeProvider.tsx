import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Density, ThemeContextValue, ThemeMode, ThemeName } from '@/types/theme';
import { ThemeContext } from './ThemeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('default');
  const [mode, setMode] = useState<ThemeMode>('light');
  const [density, setDensity] = useState<Density>('normal');

  useEffect(() => {
    const root = document.documentElement;
    const resolvedMode =
      mode === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : mode;

    root.dataset.theme = theme;
    root.dataset.mode = resolvedMode;
    root.dataset.density = density;
  }, [theme, mode, density]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, mode, density, setTheme, setMode, setDensity }),
    [theme, mode, density],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}