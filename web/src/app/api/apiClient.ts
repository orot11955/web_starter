import { appConfig } from '@/app/config/appConfig';
import type { ApiErrorResponse, ApiResponse } from '@/types/api';
import { tokenStorage } from '@/utils/storage';
import { AppApiError } from './apiError';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: HeadersInit;
};

function createUrl(path: string, params?: RequestOptions['params']) {
  const base =
    appConfig.apiBaseUrl.startsWith('http') || appConfig.apiBaseUrl.startsWith('//')
      ? appConfig.apiBaseUrl
      : `${window.location.origin}${appConfig.apiBaseUrl}`;
  const url = new URL(path, base.endsWith('/') ? base : `${base}/`);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = tokenStorage.getAccessToken();
  let response: Response;

  try {
    response = await fetch(createUrl(path, options.params), {
      method: options.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch (error) {
    throw new AppApiError({
      message: 'Network connection failed. Please try again.',
      raw: error,
    });
  }

  const text = await response.text();
  const json = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const errorBody = json as ApiErrorResponse | null;

    throw new AppApiError({
      status: response.status,
      code: errorBody?.code,
      message: errorBody?.message || getDefaultErrorMessage(response.status),
      errors: errorBody?.errors,
      raw: json,
    });
  }

  const apiResponse = json as ApiResponse<T>;

  if (apiResponse && 'success' in apiResponse && 'data' in apiResponse) {
    return apiResponse.data;
  }

  return json as T;
}

function getDefaultErrorMessage(status: number) {
  if (status === 401) return 'Login is required.';
  if (status === 403) return 'You do not have permission.';
  if (status === 404) return 'The requested resource was not found.';
  if (status >= 500) return 'A server error occurred.';
  return 'An error occurred while processing the request.';
}

export const apiClient = {
  get<T>(path: string, params?: RequestOptions['params']) {
    return request<T>(path, { method: 'GET', params });
  },

  post<T, B = unknown>(path: string, body?: B) {
    return request<T>(path, { method: 'POST', body });
  },

  put<T, B = unknown>(path: string, body?: B) {
    return request<T>(path, { method: 'PUT', body });
  },

  patch<T, B = unknown>(path: string, body?: B) {
    return request<T>(path, { method: 'PATCH', body });
  },

  delete<T>(path: string) {
    return request<T>(path, { method: 'DELETE' });
  },
};
