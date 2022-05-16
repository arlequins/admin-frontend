import { postUserInfo } from '@app/api/v1/index.api';
import authInfo from '@app/services/auth.service';
import { authStorage } from '@app/services/localstorage.service';
import { PostLoginParams } from '@app/types/typings/app/api/index.types';
import { PostLoginResult } from '@app/types/typings/app/api/usecases.types';
import { makeExpireTimestamp } from '@app/utils/index.utils';
import { LoginStatus } from '@typings/app/index.types';

const AuthHelper = {
  signIn: async (payload: PostLoginParams) => {
    const info: PostLoginResult = await postUserInfo(payload);
    const user = {
      username: info.username,
      expiresTimestamp: makeExpireTimestamp(info.expiresIn),
      expires: info.expiresIn,
      accessToken: info.accessToken,
      refreshToken: info.refreshToken,
      permissions: info.permissions ?? [],
      roles: info.roles ?? [],
    };
    authInfo.user = user;
    authInfo.isAuthenticated = true;

    authStorage.setItem(user);
    return user;
  },
  signOut: () => {
    const user = undefined;
    authInfo.user = user;
    authInfo.isAuthenticated = false;

    authStorage.removeItem();
    return user;
  },
  check: () => {
    const user = authStorage.getItem();

    if (!user) {
      return {
        user,
        loginStatus: LoginStatus.NOT_LOGIN,
      };
    }

    const currentTimestamp = new Date().getTime();
    const expiresTimestamp = user.expiresTimestamp ?? -1;
    const isExpired = currentTimestamp > expiresTimestamp;

    if (isExpired) {
      authInfo.user = undefined;
      authInfo.isAuthenticated = false;

      authStorage.removeItem();
      return {
        user,
        loginStatus: LoginStatus.EXPIRES,
      };
    } else {
      authInfo.user = user;
      authInfo.isAuthenticated = true;

      return {
        user,
        loginStatus: LoginStatus.LOGIN,
      };
    }
  },
};

export default AuthHelper;
