import { AuthUserType, PermissionEnum, RoleEnum } from '@typings/app/index.types';

const authInfo = {
  isAuthenticated: false,
  user: {
    username: undefined as string | undefined,
    accessToken: undefined as string | undefined,
    refreshToken: undefined as string | undefined,
    expires: -1 as number,
    expiresTimestamp: -1 as number,
    roles: [] as RoleEnum[],
    permissions: [] as PermissionEnum[],
  } as AuthUserType | undefined,
};

export default authInfo;
