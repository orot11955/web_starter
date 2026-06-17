export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  code?: string;
};

export type ApiErrorResponse = {
  success?: false;
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
};

export type ApiError = {
  status?: number;
  code?: string;
  message: string;
  errors?: Record<string, string[]>;
  raw?: unknown;
};