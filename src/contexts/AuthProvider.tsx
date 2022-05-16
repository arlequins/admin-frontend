import { createContext, useState, useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AuthHelper from '@app/contexts/AuthHelper';
import { useLocationState } from '@app/hooks/locations';
import { authStorage } from '@app/services/localstorage.service';
import { PostLoginParams } from '@app/types/typings/app/api/index.types';
import { AuthUserType, LoginStatus, RedirectEnum, UrlPathEnum } from '@app/types/typings/app/index.types';
import { AuthContextType } from '@typings/app/api/usecases.types';

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { setRedirectLocation } = useLocationState();
  const userInfo = authStorage.getItem();
  const [user, setUser] = useState<AuthUserType | undefined>(userInfo);
  const [loginStatus, setLoginStatus] = useState<LoginStatus>(userInfo ? LoginStatus.LOGIN : LoginStatus.NOT_LOGIN);

  useEffect(() => {
    const check = AuthHelper.check();

    if (check.loginStatus === LoginStatus.EXPIRES && loginStatus !== LoginStatus.EXPIRES) {
      alert('expires! force logout!');

      setLoginStatus(check.loginStatus);
      setUser(undefined);
      navigate(UrlPathEnum.LOGIN, {
        state: setRedirectLocation(RedirectEnum.EXPIRES),
        replace: true,
      });
    }
  }, [navigate, loginStatus, setRedirectLocation]);

  const signIn = async (payload: PostLoginParams) => {
    const fetchUser = await AuthHelper.signIn(payload);
    if (fetchUser) {
      setUser(fetchUser);
      setLoginStatus(LoginStatus.LOGIN);
    }

    return LoginStatus.LOGIN;
  };

  const signOut = () => {
    const fetchUser = AuthHelper.signOut();
    setUser(fetchUser);
    setLoginStatus(LoginStatus.EXPIRES);
  };

  const value = { user, signIn, signOut, loginStatus };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
