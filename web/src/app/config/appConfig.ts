import { env } from './env';

export const appConfig = {
  name: env.appName || 'React Vite Web Starter',
  apiBaseUrl: env.apiBaseUrl || '/api',
  enableDevLogin: env.isDev && env.enableDevLogin,
  mode: env.mode,
} as const;
