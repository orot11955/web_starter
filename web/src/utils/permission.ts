import type { AuthUser, Permission, Role } from '@/types/auth';

type AccessRule = {
  roles?: Role[];
  permissions?: Permission[];
};

export function canAccess(user: AuthUser | null, rule: AccessRule) {
  if (!rule.roles?.length && !rule.permissions?.length) {
    return true;
  }

  if (!user) {
    return false;
  }

  const hasRole =
    !rule.roles?.length || rule.roles.some((role) => user.roles.includes(role));

  const hasPermission =
    !rule.permissions?.length ||
    rule.permissions.every((permission) => user.permissions.includes(permission));

  return hasRole && hasPermission;
}