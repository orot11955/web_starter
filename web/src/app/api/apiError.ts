import type { ApiError } from '@/types/api';

export class AppApiError extends Error implements ApiError {
  status?: number;
  code?: string;
  errors?: Record<string, string[]>;
  raw?: unknown;

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'AppApiError';
    this.status = error.status;
    this.code = error.code;
    this.errors = error.errors;
    this.raw = error.raw;
  }
}

export function isAppApiError(error: unknown): error is AppApiError {
  return error instanceof AppApiError;
}