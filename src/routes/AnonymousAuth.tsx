import { Navigate } from 'react-router-dom';

import { useAuth } from '@app/contexts/AuthProvider';
import { UrlPathEnum } from '@app/types/typings/app/index.types';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  if (auth.user) {
    // Redirect if auth to public page
    return <Navigate to={UrlPathEnum.DASHBOARD} replace />;
  }

  return children;
};

export default RequireAuth;
