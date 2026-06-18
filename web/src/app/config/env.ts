export const env = {
  mode: import.meta.env.MODE,
  appName: import.meta.env.VITE_APP_NAME,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  enableDevLogin: import.meta.env.VITE_ENABLE_DEV_LOGIN === 'true',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
