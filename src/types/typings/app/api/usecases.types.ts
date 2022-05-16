import { AuthUserType, LoginStatus, PermissionEnum, RoleEnum } from '@typings/app/index.types';

import { PostLoginParams, PostLoginResponse } from './index.types';

export interface PostLoginResult extends PostLoginResponse {
  permissions?: PermissionEnum[];
  roles?: RoleEnum[];
}

export interface AuthContextType {
  user?: AuthUserType;
  signIn: (payload: PostLoginParams) => Promise<LoginStatus>;
  signOut: () => void;
  loginStatus: LoginStatus;
}
