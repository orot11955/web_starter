import type { CSSProperties } from 'react';
import type { SpaceSize } from '@/types/layout';

type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]) {
  return values.filter(Boolean).join(' ');
}

export function cssVars(
  vars: Record<`--${string}`, string | number | undefined>,
): CSSProperties {
  return Object.fromEntries(
    Object.entries(vars).filter(([, value]) => value !== undefined),
  ) as CSSProperties;
}

export function toSpaceValue(size: SpaceSize) {
  const map: Record<string, string> = {
    sm: 'var(--space-2)',
    md: 'var(--space-4)',
    lg: 'var(--space-6)',
  };

  return map[size] ?? `var(--space-${size})`;
}