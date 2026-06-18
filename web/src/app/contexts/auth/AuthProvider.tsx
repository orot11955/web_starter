import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { authApi } from '@/app/api/authApi';
import { appConfig } from '@/app/config/appConfig';
import { tokenStorage } from '@/utils/storage';
import type { AuthUser, LoginRequest, AuthContextValue } from '@/types/auth';
import { AuthContext } from './AuthContext';

type AuthProviderProps = {
  children: ReactNode;
};

const DEV_ACCESS_TOKEN = 'dev-access-token';
const DEV_USER: AuthUser = {
  id: 'dev-user',
  name: 'Dev Admin',
  username: 'dev',
  roles: ['ADMIN'],
  permissions: ['USER_READ', 'USER_WRITE', 'SYSTEM_READ', 'SYSTEM_WRITE'],
};

function getInitialUser() {
  if (appConfig.enableDevLogin && tokenStorage.getAccessToken() === DEV_ACCESS_TOKEN) {
    return DEV_USER;
  }

  return null;
}

function getInitialLoading() {
  const token = tokenStorage.getAccessToken();

  return Boolean(token && !(appConfig.enableDevLogin && token === DEV_ACCESS_TOKEN));
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(getInitialUser);
  const [loading, setLoading] = useState(getInitialLoading);

  const reloadUser = useCallback(async () => {
    const token = tokenStorage.getAccessToken();

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (appConfig.enableDevLogin && token === DEV_ACCESS_TOKEN) {
      setUser(DEV_USER);
      setLoading(false);
      return;
    }

    try {
      const me = await authApi.me();
      setUser(me);
    } catch {
      tokenStorage.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (body: LoginRequest) => {
    const result = await authApi.login(body);
    tokenStorage.setAccessToken(result.accessToken);
    setUser(result.user);
  }, []);

  const devLogin = useCallback(async () => {
    if (!appConfig.enableDevLogin) {
      return;
    }

    tokenStorage.setAccessToken(DEV_ACCESS_TOKEN);
    setUser(DEV_USER);
    setLoading(false);
  }, []);

  const logout = useCallback(async () => {
    const token = tokenStorage.getAccessToken();

    try {
      if (!(appConfig.enableDevLogin && token === DEV_ACCESS_TOKEN)) {
        await authApi.logout();
      }
    } finally {
      tokenStorage.clear();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (!tokenStorage.getAccessToken()) {
      return;
    }

    if (appConfig.enableDevLogin && tokenStorage.getAccessToken() === DEV_ACCESS_TOKEN) {
      return;
    }

    authApi
      .me()
      .then((me) => {
        setUser(me);
      })
      .catch(() => {
        tokenStorage.clear();
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isLoggedIn: Boolean(user),
      login,
      devLogin: appConfig.enableDevLogin ? devLogin : undefined,
      logout,
      reloadUser,
    }),
    [user, loading, login, devLogin, logout, reloadUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
