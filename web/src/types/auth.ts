export type Role = 'ADMIN' | 'MANAGER' | 'USER';

export type Permission =
  | 'USER_READ'
  | 'USER_WRITE'
  | 'SYSTEM_READ'
  | 'SYSTEM_WRITE';

export type AuthUser = {
  id: string;
  name: string;
  username: string;
  roles: Role[];
  permissions: Permission[];
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  user: AuthUser;
};