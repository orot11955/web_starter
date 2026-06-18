import { routePath } from '@/app/config/constants';
import { isAppApiError } from './apiError';

export function getApiErrorMessage(error: unknown) {
  if (isAppApiError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred.';
}

export function handleGlobalApiError(error: unknown) {
  if (!isAppApiError(error)) {
    return;
  }

  if (error.status === 401) {
    window.location.href = routePath.login;
  }

  if (error.status === 403) {
    window.location.href = routePath.forbidden;
  }

  if (error.status && error.status >= 500) {
    window.location.href = routePath.serverError;
  }
}
