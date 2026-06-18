import type { AuthUser, LoginRequest, LoginResponse } from '@/types/auth';
import { apiClient } from './apiClient';

export const authApi = {
  login(body: LoginRequest) {
    return apiClient.post<LoginResponse, LoginRequest>('/auth/login', body);
  },

  me() {
    return apiClient.get<AuthUser>('/auth/me');
  },

  logout() {
    return apiClient.post<void>('/auth/logout');
  },
};