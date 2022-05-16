import { Navigate } from 'react-router-dom';

import { useAuth } from '@app/contexts/AuthProvider';
import { useLocationState } from '@app/hooks/locations';
import { PermissionEnum, RedirectEnum, UrlPathEnum } from '@app/types/typings/app/index.types';

const RequireAuth = ({ children, permissions }: { children: JSX.Element; permissions?: PermissionEnum[] }) => {
  const auth = useAuth();
  const { setRedirectLocation } = useLocationState();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={UrlPathEnum.LOGIN} state={setRedirectLocation(RedirectEnum.EXPIRES)} replace />;
  }

  if (permissions && !permissions.some(permission => auth.user?.permissions.includes(permission))) {
    return <Navigate to={UrlPathEnum.DASHBOARD} state={setRedirectLocation(RedirectEnum.PERMISSION)} replace />;
  }

  return children;
};

export default RequireAuth;
