export type ThemeName = 'default' | 'blue';
export type ThemeMode = 'light' | 'dark' | 'system';
export type Density = 'normal' | 'compact';

export type ThemeContextValue = {
  theme: ThemeName;
  mode: ThemeMode;
  density: Density;
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ThemeMode) => void;
  setDensity: (density: Density) => void;
};